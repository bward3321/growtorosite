"use client";

import Image from "next/image";

const tools = ["Claude Code", "Instantly", "Apollo", "n8n", "Perplexity", "ChatGPT"];

export default function Commander() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-cyan font-mono text-sm uppercase tracking-widest">— Commander Profile</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-text mb-12">
          Who&apos;s Running This
        </h2>

        <div className="bg-bg-card border border-border rounded-xl p-8 md:p-10 card-hover">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Photo */}
            <div className="shrink-0">
              <Image
                src="/images/Me7.png"
                alt="Brendan Ward"
                width={120}
                height={120}
                className="rounded-xl object-cover"
                style={{ width: 120, height: 120 }}
              />
            </div>

            <div className="flex-1">
              <h3 className="text-2xl font-extrabold text-text mb-1">Brendan Ward</h3>
              <p className="font-mono text-cyan text-sm mb-4">FOUNDER & CEO — GROWTORO</p>
              <p className="text-text-dim leading-relaxed mb-6">
                Two exits. $250M+ in cumulative client revenue through outbound systems. Built the AI infrastructure that powers every station on this board. If your pipeline is empty, it&apos;s because you haven&apos;t talked to us yet.
              </p>

              {/* Tool badges */}
              <div className="flex flex-wrap gap-2">
                {tools.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg border border-border-light bg-[rgba(0,212,255,0.04)] text-text-dim text-xs font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
