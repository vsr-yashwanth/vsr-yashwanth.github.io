"use client";

import React from "react";
import QuillCore from "@/components/core-3d/QuillCore";
import { useSystem } from "@/context/SystemContext";
import { socialConfig } from "@/data/social";
import { ArrowDownRight, FileText, Sparkles, Terminal, Activity } from "lucide-react";

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
      className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-tech-grid"
      aria-label="Hero Identity Section"
    >
      {/* Background Radial Vignette */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      {/* Background Ambience Signal Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Content & Typography (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Identity Stamp */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-orange-400 font-semibold">01 // IDENTITY</span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-300">VANGALA SREERAM YASHWANTH</span>
            </div>

            {/* Giant Monolith Title */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05]">
                SILVER <span className="text-orange-400">QUILL</span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl font-light text-zinc-200 tracking-tight leading-snug">
                I build things that live between <span className="text-white font-medium">code</span>,{" "}
                <span className="text-cyan-400 font-medium">data</span>, and{" "}
                <span className="text-orange-400 font-medium">ideas</span>.
              </p>
            </div>

            {/* Secondary Technical Stems */}
            <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm font-mono text-zinc-400">
              <span className="text-orange-400/90 font-semibold">COMPUTER SCIENCE</span>
              <span className="text-zinc-600">×</span>
              <span className="text-cyan-400/90 font-semibold">DATA SCIENCE</span>
              <span className="text-zinc-600">×</span>
              <span className="text-emerald-400/90 font-semibold">EXPERIMENTATION</span>
            </div>

            {/* Supporting Institutional Badges */}
            <div className="p-4 rounded-xl border border-white/10 bg-[#0c1018]/60 backdrop-blur-sm space-y-2 text-xs font-mono">
              <div className="flex flex-wrap items-center gap-2 text-zinc-400">
                <span className="text-zinc-500">ACADEMICS:</span>
                <span className="text-zinc-200 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  SRM IST CHENNAI (B.Tech CSE Data Science)
                </span>
                <span className="text-zinc-600">+</span>
                <span className="text-zinc-200 bg-white/5 px-2 py-0.5 rounded border border-white/5">
                  IIT MADRAS (BS Data Science)
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-zinc-400">
                <span className="text-zinc-500">CORE FOCUS:</span>
                <span className="text-orange-300">AI / ML</span>
                <span>•</span>
                <span className="text-cyan-300">SYSTEMS & ARCHITECTURE</span>
                <span>•</span>
                <span className="text-emerald-300">CV RESEARCH</span>
                <span>•</span>
                <span className="text-zinc-300">CREATIVE TECH</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo("work", "work")}
                onMouseEnter={() => setCursorText("EXPLORE")}
                onMouseLeave={() => setCursorText("")}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_25px_rgba(255,140,55,0.3)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>EXPLORE WORK</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollTo("research", "research")}
                onMouseEnter={() => setCursorText("PAPERS")}
                onMouseLeave={() => setCursorText("")}
                className="flex items-center gap-2 px-5 py-3 rounded-lg border border-cyan-500/40 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 hover:text-white text-xs font-mono tracking-wider transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>RESEARCH ARCHIVE</span>
              </button>

              <a
                href={socialConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound("click")}
                onMouseEnter={() => setCursorText("PDF")}
                onMouseLeave={() => setCursorText("")}
                className="flex items-center gap-2 px-4 py-3 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white text-xs font-mono tracking-wider transition-all"
              >
                <FileText className="w-3.5 h-3.5 text-zinc-400" />
                <span>RESUME</span>
              </a>
            </div>

            {/* Micro Telemetry Footer */}
            <div className="pt-4 flex items-center gap-6 text-[11px] font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-emerald-400" />
                STATUS: DEPLOYING EXPERIMENTS
              </span>
              <span>•</span>
              <span>LOCATION: CHENNAI, IN</span>
            </div>
          </div>

          {/* Right Column: Interactive 3D Quill Core (5 cols) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual Frame */}
            <div className="relative w-full aspect-square max-w-[460px] rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              {/* Header HUD */}
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none z-20 text-[10px] font-mono text-zinc-500">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-orange-400" />
                  <span className="text-zinc-400">THE QUILL CORE // 3D HUD</span>
                </div>
                <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                  REALTIME
                </span>
              </div>

              {/* Three.js Core Viewport */}
              <div
                className="w-full h-full"
                onMouseEnter={() => setCursorText("ORBIT")}
                onMouseLeave={() => setCursorText("")}
              >
                <QuillCore />
              </div>

              {/* Bottom HUD Metadata */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none z-20 text-[10px] font-mono text-zinc-500 border-t border-white/5 pt-2">
                <span>INTERACTION: DRAG TO ROTATE</span>
                <span className="text-cyan-400">STATE: REACTIVE MESH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
