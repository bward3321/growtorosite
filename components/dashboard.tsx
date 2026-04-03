"use client";

import { useEffect, useState, useRef } from "react";

interface CounterProps {
  label: string;
  value: number;
  increment: number;
  intervalMs: number;
  live?: boolean;
}

function StatCounter({ label, value, increment, intervalMs, live }: CounterProps) {
  const [count, setCount] = useState(value);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setCount((c) => c + increment);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [visible, increment, intervalMs]);

  return (
    <div ref={ref} className="bg-bg-card border border-border rounded-xl p-6 card-hover">
      <div className="flex items-center justify-between mb-3">
        <span className="text-text-dim text-sm">{label}</span>
        {live && (
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-glow text-green text-xs font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-green" style={{ animation: "pulse-dot 2s infinite" }} />
            LIVE
          </span>
        )}
      </div>
      <div className="text-[28px] md:text-[38px] font-mono font-extrabold text-text leading-none">
        {count.toLocaleString()}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-cyan font-mono text-sm uppercase tracking-widest">— Systems Dashboard</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-text mb-12">
          All Stations Reporting
        </h2>

        {/* 4-column stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCounter label="Emails Deployed 2026" value={2847193} increment={3} intervalMs={800} live />
          <StatCounter label="Leads Generated" value={184291} increment={1} intervalMs={3000} live />
          <StatCounter label="Appointments Booked" value={12430} increment={1} intervalMs={12000} />
          <StatCounter label="Newsletter Subs Delivered" value={89200} increment={1} intervalMs={8000} />
        </div>

        {/* Revenue hero card */}
        <div className="bg-bg-card border border-border rounded-xl p-8 md:p-10 card-hover">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-[36px] md:text-[52px] font-mono font-extrabold text-cyan leading-none mb-2">
                $250M+
              </div>
              <div className="text-text-dim text-lg">Total Client Revenue Generated</div>
            </div>
            <div className="flex flex-col gap-2 text-text-dim text-sm font-mono">
              <span>23 industries served</span>
              <span>2 exits before Growtoro</span>
              <span>150+ active campaigns running now</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
