"use client";

import { useMemo, useState } from "react";

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

const META_CPA = 2.5;
const MIN_SUBS = 1500;
const MAX_SUBS = 25000;
const STEP = 100;

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

function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export default function NewsletterPricingSlider() {
  const [subs, setSubs] = useState(5000);
  const [loading, setLoading] = useState(false);

  const price = useMemo(() => monthlyPriceFor(subs), [subs]);
  const perSub = useMemo(() => price / subs, [price, subs]);
  const metaCost = useMemo(() => Math.round(subs * META_CPA), [subs]);
  const savings = useMemo(() => metaCost - price, [metaCost, price]);

  const pct = ((subs - MIN_SUBS) / (MAX_SUBS - MIN_SUBS)) * 100;

  async function handleCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriberCount: subs,
          monthlyPrice: price,
          costPerSub: Number(perSub.toFixed(4)),
        }),
      });
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        alert(data?.error || "Unable to start checkout. Please try again.");
        setLoading(false);
      }
    } catch {
      alert("Checkout failed. Please try again.");
      setLoading(false);
    }
  }

  const trackBackground = `linear-gradient(to right, #00d4ff 0%, #8b5cf6 ${pct}%, var(--border) ${pct}%, var(--border) 100%)`;

  return (
    <section id="pricing-slider" className="py-[72px] px-6 scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-3">
          <span className="text-cyan font-mono text-sm uppercase tracking-widest">
            — Build Your Plan
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
          Choose Your Monthly Subscribers
        </h2>
        <p
          className="text-center text-lg mb-10 max-w-2xl mx-auto"
          style={{ color: "#e8ecf1" }}
        >
          Drag to select. We always aim to slightly overdeliver.
        </p>

        <div
          className="rounded-2xl border border-border bg-bg-card p-6 md:p-10"
          style={{
            boxShadow: "0 0 40px rgba(0, 212, 255, 0.08)",
          }}
        >
          {/* Live subscriber count */}
          <div className="text-center mb-1">
            <span
              className="font-mono font-extrabold"
              style={{
                fontSize: "clamp(56px, 10vw, 104px)",
                color: "#ffffff",
                letterSpacing: "-0.02em",
                textShadow: "0 0 40px rgba(0, 212, 255, 0.55)",
                lineHeight: 1,
              }}
            >
              {formatNumber(subs)}
            </span>
          </div>
          <div className="text-center mb-8">
            <span
              className="text-[14px] md:text-[15px] font-semibold uppercase tracking-widest"
              style={{ color: "#e8ecf1" }}
            >
              subscribers per month
            </span>
          </div>

          {/* Slider */}
          <div className="px-1 md:px-3 mb-2">
            <input
              type="range"
              min={MIN_SUBS}
              max={MAX_SUBS}
              step={STEP}
              value={subs}
              onChange={(e) => setSubs(Number(e.target.value))}
              className="pricing-slider"
              style={{ background: trackBackground }}
              aria-label="Monthly subscriber count"
            />
          </div>
          <div
            className="flex justify-between text-[12px] md:text-[13px] font-mono mb-10"
            style={{ color: "#e8ecf1" }}
          >
            <span>{formatNumber(MIN_SUBS)}</span>
            <span>{formatNumber(MAX_SUBS)}</span>
          </div>

          {/* Pricing card */}
          <div
            className="rounded-xl border border-border p-6 md:p-8 mb-6"
            style={{
              background: "linear-gradient(135deg, rgba(0,212,255,0.04), rgba(139,92,246,0.04))",
            }}
          >
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
              <div>
                <div
                  className="font-extrabold text-white leading-none"
                  style={{ fontSize: "clamp(40px, 7vw, 56px)" }}
                >
                  ${formatNumber(price)}
                  <span
                    className="text-[18px] md:text-[20px] font-semibold ml-1"
                    style={{ color: "#e8ecf1" }}
                  >
                    /mo
                  </span>
                </div>
                <div
                  className="mt-2 text-[15px] md:text-[16px]"
                  style={{ color: "#e8ecf1" }}
                >
                  ${perSub.toFixed(3)} per subscriber
                </div>
              </div>
              <div className="sm:text-right">
                <div
                  className="text-[13px] md:text-[14px] uppercase tracking-widest font-mono"
                  style={{ color: "#e8ecf1" }}
                >
                  Meta Ads cost
                </div>
                <div
                  className="text-[20px] md:text-[22px] font-bold"
                  style={{ color: "#e8ecf1", textDecoration: "line-through", textDecorationColor: "rgba(239, 68, 68, 0.6)" }}
                >
                  ${formatNumber(metaCost)}
                </div>
              </div>
            </div>

            <div
              className="rounded-lg px-4 py-3 flex items-center gap-3 overflow-x-auto"
              style={{
                background: "rgba(34, 232, 123, 0.08)",
                border: "1px solid rgba(34, 232, 123, 0.25)",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
                <path
                  d="M5 10l3.5 3.5L15 7"
                  stroke="#22e87b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div
                className="font-semibold"
                style={{
                  color: "#ffffff",
                  fontSize: "clamp(11px, 1.55vw, 16px)",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: "#22e87b", fontWeight: 800 }}>
                  You save ${formatNumber(savings)}/mo
                </span>
                <span style={{ color: "#e8ecf1", fontWeight: 500 }}>
                  {" "}— Meta Ads charges ${META_CPA.toFixed(2)}/sub, you pay ${perSub.toFixed(2)}/sub
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="btn-gradient w-full px-8 py-4 rounded-xl text-[18px] font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Starting Checkout…" : <>Start Growing <span aria-hidden="true">→</span></>}
          </button>
          <p
            className="text-center text-[13px] mt-3"
            style={{ color: "#e8ecf1" }}
          >
            Billed monthly. Cancel anytime. No contracts.
          </p>
        </div>
      </div>
    </section>
  );
}
