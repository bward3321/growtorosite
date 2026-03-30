"use client";

import Image from "next/image";

interface StationCardProps {
  number: string;
  label: string;
  name: string;
  description: string;
  image?: string;
  stats: { label: string; value: string }[];
  cta: { text: string; href: string; primary?: boolean };
  featured?: boolean;
  children?: React.ReactNode;
  topVisual?: React.ReactNode;
}

export default function StationCard({
  number,
  label,
  name,
  description,
  image,
  stats,
  cta,
  featured,
  children,
  topVisual,
}: StationCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border card-hover group ${
        featured ? "border-cyan/40" : "border-border"
      } bg-bg-card`}
    >
      {/* Background image */}
      {image && (
        <div className="absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            className="object-cover opacity-55 group-hover:opacity-65 transition-opacity"
            style={{ filter: "brightness(1.3) saturate(1.2)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, rgba(6,10,16,0.45) 0%, rgba(6,10,16,0) 100%)",
            }}
          />
        </div>
      )}

      {/* Custom visual overlay (children) */}
      {children && <div className="absolute inset-0">{children}</div>}

      {/* Top visual area (non-overlapping) */}
      {topVisual && <div className="relative z-10">{topVisual}</div>}

      <div className="relative z-10 p-6 md:p-8 flex flex-col h-full min-h-[340px]">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-4">
          {featured && (
            <span className="text-xs font-mono font-medium text-amber px-2 py-0.5 rounded border border-amber/30 bg-amber/10">
              ★ LAUNCH TOOL
            </span>
          )}
          <span className="text-xs font-mono text-text-muted">{label}</span>
        </div>

        {/* Station number + name */}
        <div className="mb-3">
          <span className="text-cyan font-mono text-sm">{number}</span>
          <h3 className="text-2xl font-extrabold text-text mt-1">{name}</h3>
        </div>

        <p className="text-sm leading-relaxed mb-6 max-w-md" style={{ color: "#d1d9e3" }}>{description}</p>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="px-3 py-1.5 rounded-lg bg-[rgba(0,212,255,0.06)] border border-border-light">
              <span className="text-cyan font-mono text-sm font-medium">{s.value}</span>
              <span className="text-text-muted text-xs ml-1.5">{s.label}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <a
            href={cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              cta.primary
                ? "btn-gradient"
                : "border border-border-light text-text-dim hover:text-text hover:border-cyan/40 hover:bg-cyan-glow"
            }`}
          >
            {cta.text}
          </a>
        </div>
      </div>
    </div>
  );
}
