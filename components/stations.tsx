"use client";

import StationCard from "./station-card";

const platforms = [
  "Instagram",
  "LinkedIn",
  "Google Maps",
  "X / Twitter",
  "YouTube",
  "Facebook",
  "TikTok",
  "B2B Database",
];

function PlatformPills() {
  return (
    <div className="relative w-full pt-6 px-6 pb-4 pointer-events-none">
      <div className="grid grid-cols-2 gap-2">
        {platforms.map((p, i) => (
          <span
            key={p}
            className="px-3 py-1.5 rounded-full text-xs font-mono text-cyan border border-cyan/20 bg-cyan-glow text-center"
            style={{
              animation: `pill-glow 3s ease infinite ${i * 0.3}s`,
            }}
          >
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

function TerminalAnimation() {
  return (
    <div className="absolute inset-0 flex items-end p-6 pointer-events-none">
      <div className="font-mono text-[11px] text-cyan/50 leading-relaxed">
        <div>&gt; initializing campaign_builder...</div>
        <div>&gt; loading ICP targeting module</div>
        <div>&gt; market_sizing: ready</div>
        <div>&gt; copy_engine: armed</div>
        <div className="text-green/50">&gt; system ready. awaiting input_</div>
      </div>
    </div>
  );
}

function WaveformOverlay() {
  return (
    <div className="absolute bottom-8 left-8 right-8 flex items-end gap-1 h-12 pointer-events-none opacity-30">
      {Array.from({ length: 24 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 bg-cyan rounded-full"
          style={{
            animation: `waveform 1.5s ease-in-out infinite ${i * 0.1}s`,
            minHeight: "4px",
          }}
        />
      ))}
    </div>
  );
}

export default function Stations() {
  return (
    <section id="stations" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-cyan font-mono text-sm uppercase tracking-widest">— Command Stations</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-text mb-12">
          Launch a System
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Station 01 — AI Campaign Builder (Featured) */}
          <StationCard
            number="Station 01"
            label="Interactive Product"
            name="AI Campaign Builder"
            description="Talk to our AI. It builds your entire cold email campaign in 90 seconds — ICP targeting, market sizing, custom copy, full email sequences. Then launch it."
            image="/images/cold-email.jpg"
            featured
            stats={[
              { value: "90s", label: "build time" },
              { value: "4-Step", label: "sequence" },
              { value: "AI", label: "custom copy" },
            ]}
            cta={{ text: "Build Your Campaign →", href: "/campaign-builder", primary: true }}
          >
            <TerminalAnimation />
          </StationCard>

          {/* Station 02 — Lead Scraper (Featured) */}
          <StationCard
            number="Station 02"
            label="Interactive Product"
            name="Lead Scraper"
            description="Extract verified emails and B2B contacts from 8 platforms. Pay per lead, no subscriptions."
            featured
            stats={[
              { value: "8", label: "platforms" },
              { value: "$0.15", label: "/lead" },
              { value: "Verified", label: "email data" },
            ]}
            cta={{ text: "Open Lead Scraper →", href: "https://leads.growtoro.com", primary: true }}
            topVisual={<PlatformPills />}
          />

          {/* Station 03 — Cold Email */}
          <StationCard
            number="Station 03"
            label="Managed Service"
            name="Cold Email Outreach"
            description="High-volume, AI-personalized cold email campaigns. Dedicated domains, warm-up, deliverability monitoring — all managed."
            image="/images/cold-email.jpg"
            stats={[
              { value: "10K+", label: "emails/day" },
              { value: "2 wks", label: "launch" },
            ]}
            cta={{ text: "Request Briefing →", href: "https://calendly.com/growtoro/discovery-chat" }}
          />

          {/* Station 04 — AI Voice */}
          <StationCard
            number="Station 04"
            label="Managed Service"
            name="AI Voice Solutions"
            description="AI voice agents that qualify leads, book appointments, and handle inbound/outbound calls around the clock."
            image="/images/ai-voice.jpg"
            stats={[
              { value: "24/7", label: "availability" },
              { value: "30s", label: "response" },
            ]}
            cta={{ text: "Request Briefing →", href: "https://calendly.com/growtoro/discovery-chat" }}
          >
            <WaveformOverlay />
          </StationCard>

          {/* Station 05 — Social DMs */}
          <StationCard
            number="Station 05"
            label="Managed Service"
            name="Social DM Campaigns"
            description="AI-powered direct message outreach across Instagram, LinkedIn, and X. Personalized at scale."
            image="/images/social-dms.jpg"
            stats={[
              { value: "3", label: "platforms" },
              { value: "AI", label: "personalized" },
            ]}
            cta={{ text: "Request Briefing →", href: "https://calendly.com/growtoro/discovery-chat" }}
          />

          {/* Station 06 — AI Agents */}
          <StationCard
            number="Station 06"
            label="Managed Service"
            name="AI Agents"
            description="Custom-built AI agents for your specific workflows. Automate repetitive tasks and scale operations."
            image="/images/ai-agents.jpg"
            stats={[
              { value: "Custom", label: "built" },
              { value: "∞", label: "use cases" },
            ]}
            cta={{ text: "Request Briefing →", href: "https://calendly.com/growtoro/discovery-chat" }}
          />

          {/* Station 07 — Newsletter Growth */}
          <StationCard
            number="Station 07"
            label="Managed Service"
            name="Newsletter Growth"
            description="Grow your newsletter with verified, engaged subscribers. Targeted acquisition at scale."
            image="/images/newsletter-growth.jpg"
            stats={[
              { value: "2,500+", label: "subs/month" },
              { value: "95%", label: "retention" },
              { value: "$0.15", label: "/sub" },
            ]}
            cta={{ text: "Request Briefing →", href: "https://calendly.com/growtoro/discovery-chat" }}
          />

          {/* Station 08 — Speed-to-Lead */}
          <StationCard
            number="Station 08"
            label="Managed Service"
            name="Speed-to-Lead & Reactivation"
            description="Instant multi-channel follow-up on inbound leads. AI-powered reactivation of cold prospects."
            image="/images/speed-to-lead.jpg"
            stats={[
              { value: "30s", label: "response" },
              { value: "Auto", label: "multi-channel" },
            ]}
            cta={{ text: "Request Briefing →", href: "https://calendly.com/growtoro/discovery-chat" }}
          />
        </div>
      </div>
    </section>
  );
}
