"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgba(6,10,16,0.85)] backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="w-full px-5 md:px-10 flex items-center justify-between h-16">
        {/* Left side: Logo + Status badge */}
        <div className="flex items-center gap-4">
          <a href="#">
            <Image
              src="/images/LOGOOLD.png"
              alt="Growtoro"
              width={140}
              height={36}
              className="h-auto"
              style={{ width: 140 }}
              priority
            />
          </a>

          {/* Status badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-green/20 bg-green-glow">
            <span className="w-2 h-2 rounded-full bg-green animate-pulse" style={{ animation: "pulse-dot 2s infinite" }} />
            <span className="text-green text-xs font-mono font-medium">ALL SYSTEMS ONLINE</span>
          </div>
        </div>

        {/* Right side: Desktop links + CTA */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#stations" className="text-[15px] text-text-dim hover:text-text transition-colors">
            Stations
          </a>
          <a href="#missions" className="text-[15px] text-text-dim hover:text-text transition-colors">
            Case Studies
          </a>
          <Link href="/blog" className="text-[15px] text-text-dim hover:text-text transition-colors">
            Blog
          </Link>
          <a href="/grow-your-newsletter" className="text-[15px] text-text-dim hover:text-text transition-colors">
            Newsletter Growth
          </a>
          <a
            href="https://leads.growtoro.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] text-text-dim hover:text-text transition-colors"
          >
            Lead Scraper
          </a>
          <a
            href="/campaign-builder"
            target="_blank"
            className="btn-gradient rounded-lg text-[16px] inline-flex items-center gap-1 font-semibold"
            style={{ padding: "12px 28px" }}
          >
            Build a Campaign <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-text-dim hover:text-text"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu — full-screen overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-[rgba(6,10,16,0.98)] backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-6 px-6">
          <a href="#stations" className="text-text text-xl font-semibold py-2" onClick={() => setMobileOpen(false)}>
            Stations
          </a>
          <a href="#missions" className="text-text text-xl font-semibold py-2" onClick={() => setMobileOpen(false)}>
            Case Studies
          </a>
          <Link href="/blog" className="text-text text-xl font-semibold py-2" onClick={() => setMobileOpen(false)}>
            Blog
          </Link>
          <a href="/grow-your-newsletter" className="text-text text-xl font-semibold py-2" onClick={() => setMobileOpen(false)}>
            Newsletter Growth
          </a>
          <a href="https://leads.growtoro.com" target="_blank" rel="noopener noreferrer" className="text-text text-xl font-semibold py-2">
            Lead Scraper
          </a>
          <a href="/campaign-builder" target="_blank" className="btn-gradient px-8 py-3 rounded-xl text-center text-lg font-semibold mt-4">
            Build a Campaign →
          </a>
        </div>
      )}
    </nav>
  );
}
