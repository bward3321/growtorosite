"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/lib/blog";

const CATEGORIES = [
  "All",
  "Cold Email",
  "Newsletter Growth",
  "AI & Automation",
  "Lead Generation",
  "Outbound Strategy",
];

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      {/* Category filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              active === cat
                ? "bg-cyan/15 text-cyan border border-cyan/30"
                : "bg-bg-card text-text-dim border border-border hover:text-text hover:border-border-light"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts grid */}
      {filtered.length === 0 ? (
        <p className="text-text-dim text-center py-16">No posts in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="card-hover rounded-2xl border border-border bg-bg-card p-8 block"
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan/10 text-cyan border border-cyan/20 mb-4">
                {post.category}
              </span>
              <h2 className="text-xl font-bold text-text mb-2 leading-snug">{post.title}</h2>
              <p className="text-text-dim text-[15px] leading-relaxed mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-text-muted text-sm">
                <span>{post.readTime}</span>
                <span>·</span>
                <span>{formatDate(post.publishedAt)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
