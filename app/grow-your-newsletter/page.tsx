"use client";

import { useState } from "react";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import NewsletterPricingSlider from "@/components/newsletter-pricing-slider";

const BODY_TEXT = "#d1d9e3";

const faqs = [
  {
    q: "How does this compare to paid ads?",
    a: "Cold outreach delivers subscribers at $0.10–$0.25 each — that's 60–80% cheaper than Facebook or Instagram ads, which typically cost $1–$3+ per subscriber. Plus, our subscribers are pre-qualified and genuinely interested in your content, leading to better engagement and retention rates.",
  },
  {
    q: "Is this compliant with anti-spam laws?",
    a: "Yes. We build fully CAN-SPAM compliant infrastructure with proper opt-out mechanisms, accurate sender information, and clear identification. Every email includes an unsubscribe link, and we immediately honor all opt-out requests. We also use separate sending domains to protect your main brand reputation.",
  },
  {
    q: "What kind of newsletters do you work with?",
    a: "We work with newsletters across every niche — business, tech, finance, health, lifestyle, creator economy, SaaS, marketing, and more. If your newsletter has a defined audience, we can source and deliver subscribers for it. We currently serve 20+ active newsletter clients.",
  },
  {
    q: "How quickly can we start?",
    a: "We can have your campaign live within 2 weeks of signing up. That includes audience research, infrastructure setup, copywriting, and the first batch of emails going out. Most clients see their first subscribers coming in within the first week of campaign launch.",
  },
  {
    q: "What's the cost and guarantees?",
    a: "Campaigns start at $600/month with a guaranteed minimum of 2,000–2,500+ verified subscribers delivered. That works out to $0.10–$0.15 per subscriber. Month-to-month, no long-term contracts. If we don't deliver, you don't pay for what wasn't delivered.",
  },
  {
    q: "Can I pause or cancel anytime?",
    a: "Absolutely. There are no contracts and no commitments. You can pause, scale up, scale down, or cancel at any time with 30 days notice. Our 95% retention rate speaks for itself — clients stay because it works, not because they're locked in.",
  },
];

const metrics = [
  { value: "2,500+", label: "Verified Subs Delivered Per Month" },
  { value: "10K+", label: "Emails Sent Per Day" },
  { value: "95%", label: "Client Retention Rate" },
  { value: "$0.10", label: "Average Cost Per Subscriber" },
];

const stats = [
  "20+ Active Newsletter Clients",
  "95% Client Retention Rate",
  "$0.10–$0.15 Per Subscriber",
  "Month-to-Month, No Contracts",
];

const heroBullets = [
  { plain: "", highlight: "2,000–2,500+ verified subscribers", tail: " delivered per month" },
  { plain: "", highlight: "$0.10–$0.15 per subscriber", tail: " — 10x cheaper than paid ads" },
  { plain: "Compliant infrastructure built ", highlight: "under your brand", tail: "" },
  { plain: "Month-to-month, no contracts, ", highlight: "95% client retention", tail: "" },
];

const howItWorks = [
  {
    num: "01",
    title: "Targeted Subscriber Sourcing",
    desc: "We identify and source your ideal subscribers from Instagram, TikTok, Facebook Groups, LinkedIn, and B2B databases. Using proprietary scraping technology, we find 50,000+ targeted prospects who match your content, niche, and audience profile — then verify every email with 95%+ accuracy.",
  },
  {
    num: "02",
    title: "Custom Branded Infrastructure",
    desc: "We build separate, compliant sending infrastructure under your brand with personalized 4-email sequences that introduce your newsletter naturally. Built-in opt-outs, full CAN-SPAM compliance, and 10,000+ emails sent daily across 4 touchpoints — all managed for you.",
  },
  {
    num: "03",
    title: "Warm Subscriber Handoff",
    desc: "Only engaged, interested prospects who didn't opt-out transition into your newsletter. You get 3,000–20,000 pre-warmed subscribers per month ready for your content — not cold, uninterested contacts. All at 60–80% less cost than Facebook or Instagram ads.",
  },
];

const included = [
  {
    title: "Audience Research & Targeting",
    desc: "We identify your ideal subscribers across Instagram, TikTok, Facebook Groups, LinkedIn, and B2B databases — matching prospects to your content, niche, and audience profile.",
  },
  {
    title: "Email Verification & Scraping",
    desc: "Using proprietary scraping technology, we find 50,000+ targeted prospects and verify every email with 95%+ accuracy before any outreach begins.",
  },
  {
    title: "Custom Branded Infrastructure",
    desc: "We build separate, compliant sending infrastructure under your brand with personalized email sequences that introduce your newsletter naturally.",
  },
  {
    title: "Copywriting & Messaging",
    desc: "Our team crafts personalized 4-email sequences designed to introduce your newsletter and drive genuine interest — not spam, not clickbait.",
  },
  {
    title: "Campaign Management & Optimization",
    desc: "10,000+ emails sent daily across 4 touchpoints, fully managed. We continuously optimize targeting, copy, and deliverability for maximum results.",
  },
  {
    title: "Warm Subscriber Handoff",
    desc: "Only engaged, interested prospects who didn't opt-out transition into your newsletter — pre-warmed and ready for your content.",
  },
];

const videos = [
  {
    src: "https://www.youtube.com/embed/dbmiPH1XK6U",
    title: "Strategic Seeing Club",
    subtitle: "Newsletter Growth Campaign Results",
  },
  {
    src: "https://www.youtube.com/embed/L54KlU7d-hk",
    title: "Stock Therapy with Penny Queen",
    subtitle: "Newsletter Growth Campaign Results",
  },
  {
    src: "https://www.youtube.com/embed/LhysRVtb-Fk",
    title: "Client Testimonial",
    subtitle: "Newsletter Growth Campaign Results",
  },
];

function StrategyCallCTA() {
  return (
    <div className="mt-10 text-center">
      <a
        href="https://calendly.com/growtoro/newsletter-growth-strategy-chat"
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gradient px-8 py-3.5 rounded-xl text-lg font-semibold inline-flex items-center gap-2"
      >
        Book a Strategy Call <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

export default function GrowYourNewsletter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 212, 255, 0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 212, 255, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            opacity: 0.3,
          }}
        />

        {/* Radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,212,255,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent pointer-events-none" />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-24">
          {/* Badge */}
          <div
            className="btn-gradient-border inline-flex items-center gap-2 rounded-full mb-8"
            style={{
              padding: "10px 24px",
              background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))",
              boxShadow: "0 0 20px rgba(0,212,255,0.3)",
            }}
          >
            <span className="text-white text-[15px] font-bold">Newsletter Growth Service</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Grow Your Newsletter With
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #00d4ff, #8b5cf6, #ec4899, #00d4ff)",
                backgroundSize: "300% 300%",
                animation: "gradient-shift 4s ease infinite",
              }}
            >
              Targeted Cold Outreach
            </span>
          </h1>

          {/* Subtitle — intro line */}
          <p
            className="text-lg md:text-xl leading-relaxed mb-5 max-w-3xl mx-auto"
            style={{ color: BODY_TEXT }}
          >
            We find your ideal subscribers and fill your newsletter on autopilot:
          </p>

          {/* Subtitle — bullets */}
          <ul className="mb-10 max-w-2xl mx-auto flex flex-col gap-3 text-left sm:items-center">
            {heroBullets.map((b, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-[16px] md:text-[17px] leading-relaxed"
                style={{ color: "#ffffff" }}
              >
                <span
                  aria-hidden="true"
                  className="flex-shrink-0 font-bold"
                  style={{ color: "#00d4ff", lineHeight: "1.6" }}
                >
                  →
                </span>
                <span>
                  {b.plain}
                  <span style={{ color: "#00d4ff", fontWeight: 700 }}>{b.highlight}</span>
                  {b.tail}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="https://calendly.com/growtoro/newsletter-growth-strategy-chat"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient px-8 py-3.5 rounded-xl text-lg font-semibold inline-flex items-center gap-2"
          >
            Book a Strategy Call <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="py-10 px-6 border-y border-border">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat} className="flex items-center gap-3">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full bg-green/10"
                style={{ width: 40, height: 40 }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M5 10l3.5 3.5L15 7"
                    stroke="#22e87b"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-text text-[18px] font-semibold">{stat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENT RESULTS */}
      <section className="py-[60px] px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-3">
            <span className="text-cyan font-mono text-sm uppercase tracking-widest">— Client Results</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
            Hear It From Our Clients
          </h2>
          <p
            className="text-center text-lg mb-8 max-w-2xl mx-auto"
            style={{ color: BODY_TEXT }}
          >
            Real newsletter operators sharing their real results with Growtoro.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.title}
                className="card-hover rounded-2xl border border-border bg-bg-card p-5"
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    paddingBottom: "56.25%",
                    borderRadius: 12,
                    border: "1px solid var(--border)",
                  }}
                >
                  <iframe
                    src={video.src}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-white font-bold text-[18px]">{video.title}</h3>
                  <p className="text-[14px] mt-1" style={{ color: BODY_TEXT }}>
                    {video.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SLIDER */}
      <NewsletterPricingSlider />

      {/* PERFORMANCE METRICS */}
      <section className="py-[60px] px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
            Performance Metrics
          </h2>
          <p
            className="text-center text-lg mb-8 max-w-2xl mx-auto"
            style={{ color: BODY_TEXT }}
          >
            Real numbers from real newsletter growth campaigns.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="card-hover rounded-2xl border border-border bg-bg-card p-8 text-center"
              >
                <div
                  className="text-4xl md:text-5xl font-extrabold mb-2 bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #00d4ff, #8b5cf6)",
                  }}
                >
                  {m.value}
                </div>
                <div className="text-[15px] font-medium" style={{ color: BODY_TEXT }}>
                  {m.label}
                </div>
              </div>
            ))}
          </div>
          <StrategyCallCTA />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-[60px] px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">How It Works</h2>
          <p
            className="text-center text-lg mb-8 max-w-2xl mx-auto"
            style={{ color: BODY_TEXT }}
          >
            A simple, proven three-step system to grow your newsletter predictably.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorks.map((step) => (
              <div
                key={step.num}
                className="card-hover relative rounded-2xl border border-border bg-bg-card p-8 overflow-hidden"
              >
                {/* Faded number */}
                <span
                  className="absolute top-4 right-6 text-[96px] font-extrabold leading-none pointer-events-none select-none"
                  style={{ color: "rgba(0, 212, 255, 0.06)" }}
                >
                  {step.num}
                </span>
                <div className="relative z-10">
                  <h3 className="text-[20px] font-bold text-text mb-3">{step.title}</h3>
                  <p
                    className="text-[15px] leading-relaxed"
                    style={{ color: BODY_TEXT }}
                  >
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <StrategyCallCTA />
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className="py-[60px] px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-3">
            What&apos;s Included
          </h2>
          <p
            className="text-center text-lg mb-8 max-w-2xl mx-auto"
            style={{ color: BODY_TEXT }}
          >
            Everything you need for predictable newsletter growth, fully managed.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {included.map((item) => (
              <div
                key={item.title}
                className="card-hover rounded-2xl border border-border bg-bg-card p-8"
              >
                <h3 className="text-[20px] font-bold text-text mb-2">{item.title}</h3>
                <p
                  className="text-[16px] leading-relaxed"
                  style={{ color: BODY_TEXT }}
                >
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
          <StrategyCallCTA />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[60px] px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border bg-bg-card overflow-hidden"
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span
                    className="text-[18px] font-semibold pr-4"
                    style={{ color: "#e8ecf1" }}
                  >
                    {faq.q}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`flex-shrink-0 transition-transform duration-200 ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M5 7.5l5 5 5-5"
                      stroke="#d1d9e3"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5">
                    <p
                      className="text-[16px] leading-relaxed"
                      style={{ color: BODY_TEXT }}
                    >
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <StrategyCallCTA />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-[60px] px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[48px] font-extrabold text-text mb-4 leading-tight">
            Stop Waiting for Organic Growth.
          </h2>
          <p
            className="text-lg mb-10 max-w-2xl mx-auto"
            style={{ color: BODY_TEXT }}
          >
            Our done-for-you system finds your ideal subscribers, reaches them with personalized
            outreach, and delivers 2,000–2,500+ verified subscribers per month. Predictable.
            Affordable. Scalable.
          </p>
          <a
            href="https://calendly.com/growtoro/newsletter-growth-strategy-chat"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient px-[48px] py-[20px] rounded-xl text-[18px] font-semibold inline-flex items-center gap-2"
          >
            Book a Strategy Call <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
