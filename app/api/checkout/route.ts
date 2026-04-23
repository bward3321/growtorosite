import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ANCHORS: Array<[number, number]> = [
  [1500, 399],
  [2500, 599],
  [5000, 999],
  [7500, 1299],
  [10000, 1499],
  [15000, 1949],
  [20000, 2399],
  [25000, 2749],
];

const MIN_SUBS = 1500;
const MAX_SUBS = 25000;

function monthlyPriceFor(subs: number): number {
  if (subs <= ANCHORS[0][0]) return ANCHORS[0][1];
  if (subs >= ANCHORS[ANCHORS.length - 1][0]) return ANCHORS[ANCHORS.length - 1][1];
  for (let i = 0; i < ANCHORS.length - 1; i++) {
    const [sA, pA] = ANCHORS[i];
    const [sB, pB] = ANCHORS[i + 1];
    if (subs >= sA && subs <= sB) {
      const t = (subs - sA) / (sB - sA);
      return Math.round(pA + t * (pB - pA));
    }
  }
  return ANCHORS[0][1];
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return NextResponse.json(
      { error: "Stripe is not configured. Missing STRIPE_SECRET_KEY." },
      { status: 500 },
    );
  }

  let body: { subscriberCount?: unknown; costPerSub?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const subscriberCount = Number(body.subscriberCount);
  if (!Number.isFinite(subscriberCount) || subscriberCount < MIN_SUBS || subscriberCount > MAX_SUBS) {
    return NextResponse.json(
      { error: `Subscriber count must be between ${MIN_SUBS} and ${MAX_SUBS}.` },
      { status: 400 },
    );
  }

  const authoritativePrice = monthlyPriceFor(subscriberCount);
  const costPerSub = Number((authoritativePrice / subscriberCount).toFixed(4));

  const stripe = new Stripe(secret);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            recurring: { interval: "month" },
            product_data: {
              name: `Growtoro Newsletter Growth - ${subscriberCount.toLocaleString("en-US")} Subscribers/mo`,
              description: "Monthly newsletter subscriber delivery service. Cancel anytime.",
            },
            unit_amount: authoritativePrice * 100,
          },
        },
      ],
      subscription_data: {
        metadata: {
          subscriber_count: String(subscriberCount),
          price_per_sub: String(costPerSub),
        },
      },
      success_url:
        "https://docs.google.com/forms/d/e/1FAIpQLSfjAbk0ROmzwiBM8_1MCuJP6XGeIjg0k9Nr5e92NzIJKGaONQ/viewform?usp=header",
      cancel_url: "https://growtoro.com/grow-your-newsletter",
      consent_collection: {
        terms_of_service: "required",
      },
      custom_text: {
        terms_of_service_acceptance: {
          message:
            "I agree to a recurring monthly subscription for newsletter subscriber delivery services. I understand I will be billed monthly at the selected rate and can cancel anytime with no penalties or commitments.",
        },
      },
      allow_promotion_codes: true,
    });

    console.log("[checkout] session created", {
      sessionId: session.id,
      subscriberCount,
      monthlyPrice: authoritativePrice,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown Stripe error";
    console.error("[checkout] stripe error", { message, subscriberCount, authoritativePrice });
    return NextResponse.json({ error: "Unable to create checkout session." }, { status: 500 });
  }
}
