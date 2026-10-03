"use client";

import React from "react";
import Link from "next/link";
import { writingData } from "@/data/writing";
import { useSystem } from "@/context/SystemContext";
import { Feather, BookOpen, Clock, ArrowRight, Bookmark } from "lucide-react";

export default function WritingSection() {
  const { playSound, setCursorText } = useSystem();
  const book = writingData.find((w) => w.type === "NOVEL") || writingData[0];
  const essays = writingData.filter((w) => w.id !== book.id);

  return (
    <section
      id="writing"
      className="py-16 relative bg-[#06080d] border-t border-white/10"
      aria-label="Writing and Notebook Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-400 font-semibold tracking-widest uppercase mb-1">
              <Feather className="w-3.5 h-3.5" />
              <span>06 // THE NOTEBOOK &amp; MANUSCRIPTS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase font-serif">
              LITERARY &amp; <span className="text-rose-400 italic font-light">ESSAYS</span>
            </h2>
          </div>
          <div className="text-xs font-mono text-zinc-500">
            <span>WORDS OUTSIDE THE COMPILER</span>
          </div>
        </div>

        {/* Compact 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Featured Novel Card (Paperhearts) (6 cols) */}
          <div className="lg:col-span-6 rounded-xl border border-rose-500/30 bg-gradient-to-br from-[#0c0d15] to-[#140b12] p-6 sm:p-7 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-rose-400 font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                  DEBUT NOVEL MANUSCRIPT
                </span>
                <span className="text-zinc-500">17 CHAPTERS</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {book.title}
                </h3>
                <p className="text-xs text-rose-300 font-mono mt-0.5">{book.subtitle}</p>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 font-serif italic leading-relaxed">
                &ldquo;{book.excerpt}&rdquo;
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {book.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-rose-400" />
                {book.readTime}
              </span>
              <Link
                href={`/writing/${book.slug}`}
                onClick={() => playSound("click")}
                onMouseEnter={() => setCursorText("READ")}
                onMouseLeave={() => setCursorText("")}
                className="flex items-center gap-2 px-4 py-2 rounded bg-rose-500 hover:bg-rose-600 text-white font-semibold text-xs font-mono tracking-wider transition-all shadow-[0_0_15px_rgba(244,63,94,0.3)]"
              >
                <span>OPEN MANUSCRIPT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Compact Engineering Essays List (6 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
            {essays.map((entry) => (
              <Link
                key={entry.id}
                href={`/writing/${entry.slug}`}
                onClick={() => playSound("click")}
                onMouseEnter={() => {
                  playSound("hover");
                  setCursorText("READ");
                }}
                onMouseLeave={() => setCursorText("")}
                className="group p-4 rounded-xl border border-white/10 bg-[#0a0d14] hover:border-rose-400/30 hover:bg-rose-500/[0.04] transition-all flex flex-col justify-between flex-1"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-1">
                  <span className="text-rose-400 font-semibold">{entry.type}</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {entry.readTime}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-serif font-bold text-white group-hover:text-rose-300 transition-colors">
                    {entry.title}
                  </h4>
                  <p className="text-xs text-zinc-400 font-mono line-clamp-1 mt-0.5">{entry.subtitle}</p>
                </div>

                <div className="mt-2 text-xs text-zinc-400 font-serif italic line-clamp-1">
                  &ldquo;{entry.excerpt}&rdquo;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
