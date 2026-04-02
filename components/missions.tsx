"use client";

const missions = [
  {
    client: "Evium",
    result: "+$10M",
    resultLabel: "In Sales Generated",
    category: "Cold Email — Market Penetration",
    objective: "Drive massive marketing penetration and sales growth through targeted cold email outreach campaigns.",
  },
  {
    client: "Sunday Citizen",
    result: "15 Stores New Retail Locations",
    category: "Cold Email — Retail Expansion",
  },
  {
    client: "Sweet Switch",
    result: "50 Colleges In 3 Months",
    category: "Cold Email — Higher Education",
  },
  {
    client: "Agua Blanca",
    result: "Tri-State Market Penetration",
    category: "Cold Email — Distribution",
  },
  {
    client: "Groupon Australia",
    result: "10x Pipeline Growth",
    category: "Pipeline Scaling",
  },
  {
    client: "23 Industries",
    result: "$250M+ Client Revenue Generated",
    category: "Cold Email — B2B Services",
  },
];

export default function Missions() {
  return (
    <section id="missions" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-cyan font-mono text-sm uppercase tracking-widest">— Mission Log — Declassified</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-text mb-12">
          Completed Operations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((m) => (
            <div
              key={m.client}
              className="relative bg-bg-card border border-border rounded-xl p-6 card-hover overflow-hidden"
            >
              {/* Completed ribbon */}
              <div className="absolute top-4 right-[-28px] rotate-45 bg-green/90 text-[10px] font-mono font-bold text-bg px-8 py-0.5 tracking-widest">
                COMPLETED
              </div>

              <div className="mb-4">
                <span className="text-xs font-mono text-text-muted">{m.category}</span>
              </div>
              <h3 className="text-xl font-extrabold text-text mb-2">{m.client}</h3>
              {m.objective && (
                <p className="text-text-muted text-sm mb-3">{m.objective}</p>
              )}
              <p className="text-cyan font-mono text-sm font-medium">{m.result}</p>
              {m.resultLabel && (
                <p className="text-text-muted font-mono text-xs mt-1">{m.resultLabel}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
