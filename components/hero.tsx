"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const [estTime, setEstTime] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const est = now.toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setEstTime(est + " EST");
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

      {/* Ambient readouts — desktop only */}
      <div className="hidden md:block absolute top-24 left-10 font-mono text-[18px] leading-relaxed pointer-events-none select-none">
        <div>
          <span className="text-cyan-dim">SYS</span>{" "}
          <span className="text-green">ACTIVE_CAMPAIGNS: 257</span>
        </div>
        <div>
          <span className="text-cyan-dim">NET</span>{" "}
          <span className="text-text-dim">EMAILS_IN_QUEUE: 73,450</span>
        </div>
      </div>

      <div className="hidden md:block absolute top-24 right-10 font-mono text-[18px] leading-relaxed text-right pointer-events-none select-none">
        <div className="text-green">UPTIME: 99.97%</div>
        <div className="text-text-dim">{estTime}</div>
      </div>

      <div className="hidden md:block absolute bottom-10 left-10 font-mono text-[18px] text-text-muted pointer-events-none select-none">
        LOC 41.0934°N, 73.9190°W
      </div>

      <div className="hidden md:block absolute bottom-10 right-10 font-mono text-[18px] text-text-muted pointer-events-none select-none animate-pulse">
        SCROLL TO ENTER ↓
      </div>

      {/* Center content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-5 md:px-6 pt-[120px] md:pt-0">
        {/* Badge */}
        <div
          className="btn-gradient-border inline-flex items-center gap-2 rounded-full mb-8"
          style={{
            padding: "10px 24px",
            background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))",
            boxShadow: "0 0 20px rgba(0,212,255,0.3)",
          }}
        >
          <span className="text-white text-[15px] font-bold">AI-Powered Lead Generation</span>
        </div>

        {/* Headline */}
        <h1 className="text-[32px] md:text-7xl font-extrabold leading-tight mb-6">
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
            className="btn-gradient px-8 py-3.5 rounded-xl text-lg font-semibold w-full sm:w-auto text-center"
          >
            Build a Campaign
          </a>
          <a
            href="#stations"
            className="btn-gradient-border px-8 py-3.5 rounded-xl text-lg font-semibold w-full sm:w-auto text-center"
          >
            Explore Stations ↓
          </a>
        </div>
      </div>
    </section>
  );
}
