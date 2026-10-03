"use client";

import React from "react";
import QuillCore from "@/components/core-3d/QuillCore";
import { useSystem } from "@/context/SystemContext";
import { socialConfig } from "@/data/social";
import { ArrowDownRight, FileText, Sparkles, Terminal } from "lucide-react";

export default function Hero() {
  const { playSound, setCursorText, setCoreMode } = useSystem();

  const scrollTo = (id: string, mode?: "identity" | "work" | "research" | "lab" | "contact") => {
    playSound("click");
    if (mode) setCoreMode(mode);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="identity"
      className="relative min-h-[88vh] flex items-center justify-center pt-20 pb-12 overflow-hidden bg-tech-grid"
      aria-label="Hero Identity Section"
    >
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Hero Content & Punchy Hierarchy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Identity Stamp */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-orange-400 font-semibold">SILVER QUILL</span>
              <span className="text-white/20">|</span>
              <span className="text-zinc-400">SRM IST (9.05 CGPA) × IIT MADRAS</span>
            </div>

            {/* Main Monolith Title */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05]">
                SYSTEMS, <span className="text-orange-400">VISION</span> &amp; EXPERIMENTS.
              </h1>
              <p className="text-lg sm:text-xl font-light text-zinc-300 tracking-tight leading-snug max-w-xl">
                Creative developer &amp; deep learning researcher building software that turns ideas into resilient tools people use.
              </p>
            </div>

            {/* High-Impact Stat Strip (Compact & Striking) */}
            <div className="grid grid-cols-4 gap-2 py-2">
              <div className="p-3 rounded-lg border border-white/10 bg-[#0c1018]/80 text-center">
                <div className="text-lg sm:text-xl font-bold font-mono text-orange-400">9.05</div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase">SRM CGPA</div>
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-[#0c1018]/80 text-center">
                <div className="text-lg sm:text-xl font-bold font-mono text-cyan-400">IIT-M</div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Data Science</div>
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-[#0c1018]/80 text-center">
                <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400">4.1×</div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase">INT8 Speedup</div>
              </div>
              <div className="p-3 rounded-lg border border-white/10 bg-[#0c1018]/80 text-center">
                <div className="text-lg sm:text-xl font-bold font-mono text-purple-400">17 Ch.</div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Novel Author</div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => scrollTo("work", "work")}
                onMouseEnter={() => setCursorText("EXPLORE")}
                onMouseLeave={() => setCursorText("")}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(255,140,55,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>EXPLORE WORK</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo("research", "research")}
                onMouseEnter={() => setCursorText("PAPERS")}
                onMouseLeave={() => setCursorText("")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white text-xs font-mono tracking-wider transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>RESEARCH</span>
              </button>

              <a
                href={socialConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound("click")}
                onMouseEnter={() => setCursorText("PDF")}
                onMouseLeave={() => setCursorText("")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-mono tracking-wider transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-zinc-400" />
                <span>RESUME</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Interactive Core (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[420px] rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-2xl">
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none z-20 text-[10px] font-mono text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-orange-400" />
                  <span className="text-zinc-400">THE QUILL CORE // 3D HUD</span>
                </div>
                <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  REALTIME
                </span>
              </div>

              <div
                className="w-full h-full"
                onMouseEnter={() => setCursorText("ORBIT")}
                onMouseLeave={() => setCursorText("")}
              >
                <QuillCore />
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none z-20 text-[10px] font-mono text-zinc-500 border-t border-white/5 pt-2">
                <span>DRAG TO ROTATE</span>
                <span className="text-cyan-400">REACTIVE MESH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
