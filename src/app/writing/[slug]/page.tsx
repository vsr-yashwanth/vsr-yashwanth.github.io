import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { writingData } from "@/data/writing";
import { ArrowLeft, Clock, Feather, Bookmark } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return writingData.map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = writingData.find((w) => w.slug === slug);
  if (!entry) return { title: "Entry Not Found" };
  return {
    title: `${entry.title} — The Notebook | Silver Quill`,
    description: entry.excerpt,
  };
}

export default async function WritingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = writingData.find((w) => w.slug === slug);

  if (!entry) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-200 py-16 px-4 sm:px-6 lg:px-8 font-serif selection:bg-rose-500 selection:text-white">
      <div className="max-w-3xl mx-auto space-y-12">
        <Link
          href="/#writing"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-rose-400" />
          <span>RETURN TO DIGITAL LAB // THE NOTEBOOK</span>
        </Link>

        {/* Entry Header */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="text-rose-400 font-bold">{entry.index}</span>
            <span className="text-white/20">|</span>
            <span className="text-zinc-400">{entry.date}</span>
            <span className="text-white/20">|</span>
            <span className="text-zinc-500 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {entry.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-serif">
            {entry.title}
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 font-mono">{entry.subtitle}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs font-mono rounded bg-white/5 border border-white/10 text-zinc-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Excerpt Callout */}
        <div className="p-6 rounded-xl border border-rose-500/20 bg-rose-500/[0.03] italic text-zinc-300 leading-relaxed text-base sm:text-lg font-serif">
          &ldquo;{entry.excerpt}&rdquo;
        </div>

        {/* Content Body */}
        <article className="space-y-6 text-base sm:text-lg text-zinc-200 leading-relaxed font-serif">
          {entry.content.map((paragraph, index) => (
            <p key={index} className="indent-6 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </article>

        {/* Footer */}
        <div className="pt-12 border-t border-white/10 flex justify-between items-center text-xs font-mono">
          <Link href="/#writing" className="text-rose-400 hover:text-rose-300 flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO THE NOTEBOOK</span>
          </Link>
          <span className="text-zinc-500">SILVER QUILL // ARCHIVAL MANUSCRIPT</span>
        </div>
      </div>
    </div>
  );
}
