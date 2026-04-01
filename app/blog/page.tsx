import { getAllPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import BlogGrid from "./blog-grid";

export const metadata: Metadata = {
  title: "Blog — Growtoro Intel Feed",
  description:
    "Dispatches from the war room: cold email strategy, newsletter growth, AI automation, lead generation, and outbound tactics from the Growtoro team.",
  openGraph: {
    title: "Blog — Growtoro Intel Feed",
    description:
      "Dispatches from the war room: cold email strategy, newsletter growth, AI automation, lead generation, and outbound tactics.",
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main className="pt-28 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <span className="font-mono text-cyan text-sm tracking-widest uppercase">
              Intel Feed
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mt-3 mb-4">
              Dispatches from the War Room
            </h1>
            <p className="text-text-dim text-lg max-w-2xl mx-auto">
              Strategy, tactics, and real data from the front lines of B2B outreach, newsletter
              growth, and AI-powered lead generation.
            </p>
          </div>

          {/* Grid with client-side filtering */}
          <BlogGrid posts={posts} />
        </div>
      </main>
      <Footer />
    </>
  );
}
