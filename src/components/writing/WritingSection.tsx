"use client";

import React, { useState } from "react";
import Link from "next/link";
import { writingData, WritingEntry } from "@/data/writing";
import { useSystem } from "@/context/SystemContext";
import { BookOpen, Feather, Clock, ArrowRight, Bookmark, Sparkles } from "lucide-react";

export default function WritingSection() {
  const { playSound, setCursorText } = useSystem();
  const [selectedEntry, setSelectedEntry] = useState<WritingEntry>(writingData[0]);

  return (
    <section
      id="writing"
      className="py-24 relative bg-[#06080d] border-t border-white/10"
      aria-label="Writing and Notebook Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-rose-400 font-semibold tracking-widest uppercase mb-2">
              <Feather className="w-3.5 h-3.5" />
              <span>06 // THE NOTEBOOK & MANUSCRIPTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase font-serif">
              LITERARY & <span className="text-rose-400 italic font-light">ESSAYS</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-400 font-mono max-w-xl">
              Manuscripts, architectural essays, and philosophical reflections outside the compiler. Words that resist optimization.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <Bookmark className="w-3.5 h-3.5 text-rose-400" />
            <span>ARCHIVAL MANUSCRIPTS</span>
          </div>
        </div>

        {/* Notebook Layout: Manuscript Reading Room */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Index of Entries (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
              SELECT ENTRY TO READ:
            </span>

            {writingData.map((entry) => {
              const isSelected = selectedEntry.id === entry.id;
              return (
                <button
                  key={entry.id}
                  onClick={() => {
                    playSound("click");
                    setSelectedEntry(entry);
                  }}
                  onMouseEnter={() => {
                    playSound("hover");
                    setCursorText("READ");
                  }}
                  onMouseLeave={() => setCursorText("")}
                  className={`w-full text-left p-5 rounded-xl border transition-all relative overflow-hidden group ${
                    isSelected
                      ? "border-rose-400/40 bg-rose-500/[0.08] shadow-[0_0_20px_rgba(244,63,94,0.15)]"
                      : "border-white/10 bg-[#0a0d14] hover:border-white/20 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-1.5">
                    <span className="text-rose-400 font-semibold">{entry.index}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {entry.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-white group-hover:text-rose-300 transition-colors">
                    {entry.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5 line-clamp-1">{entry.subtitle}</p>

                  <div className="mt-3 text-xs text-zinc-400 font-serif italic line-clamp-2 leading-relaxed">
                    &ldquo;{entry.excerpt}&rdquo;
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Active Manuscript Reader (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-white/15 bg-[#0a0d14] p-8 sm:p-10 shadow-2xl relative">
            {/* Top Manuscript Details */}
            <div className="border-b border-white/10 pb-6 mb-6 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <span className="text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 font-semibold">
                  {selectedEntry.type}
                </span>
                <span className="text-zinc-500">{selectedEntry.date}</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-snug">
                {selectedEntry.title}
              </h3>
              <p className="text-xs sm:text-sm font-mono text-zinc-400">{selectedEntry.subtitle}</p>
            </div>

            {/* Manuscript Excerpt Body */}
            <div className="space-y-5 text-sm sm:text-base font-serif text-zinc-200 leading-relaxed max-w-none">
              {selectedEntry.content.map((paragraph, index) => (
                <p key={index} className="indent-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Footer with Dedicated Route Link */}
            <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-1.5">
                {selectedEntry.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-zinc-400"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/writing/${selectedEntry.slug}`}
                className="flex items-center gap-2 text-xs font-mono text-rose-400 hover:text-rose-300 font-semibold transition-colors"
              >
                <span>OPEN FULL ESSAY VIEW</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
