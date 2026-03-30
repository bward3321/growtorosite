"use client";

import { useState, useEffect } from "react";

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
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="text-xl font-extrabold text-text tracking-tight">
          Grow<span className="text-cyan">toro</span>
        </a>

        {/* Status badge */}
        <div className="hidden md:flex items-center gap-2 ml-4 px-3 py-1 rounded-full border border-green/20 bg-green-glow">
          <span className="w-2 h-2 rounded-full bg-green animate-pulse" style={{ animation: "pulse-dot 2s infinite" }} />
          <span className="text-green text-xs font-mono font-medium">ALL SYSTEMS ONLINE</span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 ml-auto">
          <a href="#stations" className="text-[15px] text-text-dim hover:text-text transition-colors">
            Stations
          </a>
          <a href="#missions" className="text-[15px] text-text-dim hover:text-text transition-colors">
            Case Studies
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
            className="btn-gradient px-3 py-1.5 rounded-lg text-[16px] inline-flex items-center gap-1"
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

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[rgba(6,10,16,0.95)] backdrop-blur-xl border-b border-border px-6 pb-4 flex flex-col gap-3">
          <a href="#stations" className="text-text-dim hover:text-text py-2" onClick={() => setMobileOpen(false)}>
            Stations
          </a>
          <a href="#missions" className="text-text-dim hover:text-text py-2" onClick={() => setMobileOpen(false)}>
            Case Studies
          </a>
          <a href="https://leads.growtoro.com" target="_blank" rel="noopener noreferrer" className="text-text-dim hover:text-text py-2">
            Lead Scraper
          </a>
          <a href="/campaign-builder" target="_blank" className="btn-gradient px-4 py-2 rounded-lg text-center text-sm">
            Build a Campaign →
          </a>
        </div>
      )}
    </nav>
  );
}
