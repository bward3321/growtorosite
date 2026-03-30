"use client";

import Image from "next/image";

export default function FooterCTA() {
  return (
    <section className="relative pt-[60px] pb-24 px-6 overflow-hidden">
      {/* Background */}
      <Image
        src="/images/mission-control.jpg"
        alt=""
        fill
        className="object-cover opacity-10"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/60" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-[48px] font-extrabold text-text mb-4 leading-tight">
          Ready to Launch?
        </h2>
        <p className="text-text-dim text-lg mb-10">
          Build your campaign with AI in 90 seconds, or let our team handle everything.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/campaign-builder"
            target="_blank"
            className="btn-gradient px-[48px] py-[20px] rounded-xl text-[18px] font-semibold"
          >
            Build a Campaign
          </a>
          <a
            href="https://leads.growtoro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient-border px-[48px] py-[20px] rounded-xl text-[18px] font-semibold"
          >
            Find Leads
          </a>
          <a
            href="https://calendly.com/growtoro/discovery-chat"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient-border px-[48px] py-[20px] rounded-xl text-[18px] font-semibold"
          >
            Book a Strategy Call
          </a>
        </div>
      </div>
    </section>
  );
}
