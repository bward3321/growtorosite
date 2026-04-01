import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog";
import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} — Growtoro Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publishedAt,
    publisher: {
      "@type": "Organization",
      name: "Growtoro",
      url: "https://growtoro.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://growtoro.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <Nav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="pt-28 pb-24 px-6">
        <article className="max-w-[720px] mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-text-dim hover:text-cyan text-sm mb-8 transition-colors"
          >
            ← Back to Blog
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan/10 text-cyan border border-cyan/20">
              {post.category}
            </span>
            <span className="text-text-muted text-sm">{formatDate(post.publishedAt)}</span>
            <span className="text-text-muted text-sm">·</span>
            <span className="text-text-muted text-sm">{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-[42px] font-extrabold leading-tight mb-4">
            {post.title}
          </h1>

          {/* Author */}
          <p className="text-text-dim text-[15px] mb-10">By {post.author}</p>

          {/* Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Banner */}
          <div className="mt-16 rounded-2xl border border-border bg-bg-card p-10 text-center">
            <h3 className="text-2xl font-bold mb-3">Ready to launch your next campaign?</h3>
            <p className="text-text-dim mb-6">
              Build your outreach campaign in 90 seconds with our AI Campaign Builder.
            </p>
            <a
              href="/campaign-builder"
              target="_blank"
              className="btn-gradient px-8 py-3.5 rounded-xl text-lg font-semibold inline-flex items-center gap-2"
            >
              Build a Campaign <span aria-hidden="true">→</span>
            </a>
          </div>
        </article>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="max-w-5xl mx-auto mt-24">
            <h2 className="text-2xl font-bold mb-8 text-center">Related Dispatches</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="card-hover rounded-2xl border border-border bg-bg-card p-6 block"
                >
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cyan/10 text-cyan border border-cyan/20 mb-3">
                    {r.category}
                  </span>
                  <h3 className="text-lg font-bold text-text mb-2 leading-snug">{r.title}</h3>
                  <p className="text-text-dim text-sm line-clamp-2">{r.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
