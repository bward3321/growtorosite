"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const [utcTime, setUtcTime] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setUtcTime(
        now.toISOString().slice(11, 19) + " UTC"
      );
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={heroRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/hero-bg.jpg"
        alt=""
        fill
        className="object-cover"
        style={{ opacity: 0.22, filter: "saturate(1.3)" }}
        priority
      />

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

      {/* Radar sweep */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[600px] h-[600px] md:w-[800px] md:h-[800px]">
          {/* Radar rings */}
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute rounded-full border border-cyan"
              style={{
                width: `${i * 25}%`,
                height: `${i * 25}%`,
                top: `${50 - (i * 25) / 2}%`,
                left: `${50 - (i * 25) / 2}%`,
                opacity: 0.12,
              }}
            />
          ))}
          {/* Sweep */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent 0deg, rgba(0, 212, 255, 0.15) 30deg, transparent 60deg)",
              animation: "radar-sweep 4s linear infinite",
            }}
          />
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent pointer-events-none" />

      {/* Ambient readouts */}
      <div className="absolute top-24 left-6 md:left-10 font-mono text-[14px] md:text-[18px] leading-relaxed pointer-events-none select-none">
        <div>
          <span className="text-cyan-dim">SYS</span>{" "}
          <span className="text-green">ACTIVE_CAMPAIGNS: 257</span>
        </div>
        <div>
          <span className="text-cyan-dim">NET</span>{" "}
          <span className="text-text-dim">EMAILS_IN_QUEUE: 73,450</span>
        </div>
      </div>

      <div className="absolute top-24 right-6 md:right-10 font-mono text-[14px] md:text-[18px] leading-relaxed text-right pointer-events-none select-none">
        <div className="text-green">UPTIME: 99.97%</div>
        <div className="text-text-dim">{utcTime}</div>
      </div>

      <div className="absolute bottom-10 left-6 md:left-10 font-mono text-[14px] md:text-[18px] text-text-muted pointer-events-none select-none">
        LOC 41.0934°N, 73.9190°W
      </div>

      <div className="absolute bottom-10 right-6 md:right-10 font-mono text-[14px] md:text-[18px] text-text-muted pointer-events-none select-none animate-pulse">
        SCROLL TO ENTER ↓
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border-light bg-[rgba(0,212,255,0.06)] mb-8">
          <span className="text-cyan text-sm font-medium">AI-Powered Lead Generation</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
          Your Pipeline.
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #00d4ff, #8b5cf6, #ec4899, #00d4ff)",
              backgroundSize: "300% 300%",
              animation: "gradient-shift 4s ease infinite",
            }}
          >
            Our Mission.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white leading-relaxed mb-10 max-w-2xl mx-auto">
          AI-driven outreach systems that find your ideal customers and fill your calendar. Cold email, LinkedIn DMs, social campaigns, AI voice — all from one command center.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/campaign-builder"
            target="_blank"
            className="btn-gradient px-8 py-3.5 rounded-xl text-lg font-semibold"
          >
            Build a Campaign
          </a>
          <a
            href="#stations"
            className="btn-gradient-border px-8 py-3.5 rounded-xl text-lg font-semibold"
          >
            Explore Stations ↓
          </a>
        </div>
      </div>
    </section>
  );
}
