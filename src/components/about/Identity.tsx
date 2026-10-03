"use client";

import React from "react";
import { useSystem } from "@/context/SystemContext";
import { GraduationCap, Cpu, BookOpen, Sparkles, MapPin, Compass } from "lucide-react";

export default function Identity() {
  const { playSound, setCursorText } = useSystem();

  return (
    <section
      id="about"
      className="py-16 relative border-t border-white/10 bg-[#07090e]"
      aria-label="About Identity Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
              01 // CORE PROFILE
            </span>
            <span className="text-white/20">|</span>
            <span className="font-mono text-xs text-zinc-400">VANGALA SREERAM YASHWANTH (QUILL)</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500">
            <MapPin className="w-3 h-3 text-emerald-400" />
            <span>CHENNAI, IN</span>
          </div>
        </div>

        {/* 3 High-Impact Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Pillar 1: Dual Technical Academics */}
          <div className="rounded-xl border border-white/10 bg-[#0c1018] p-6 space-y-4 hover:border-orange-500/30 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded">
                9.05 CGPA
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Dual Academic Rigor</h3>
              <p className="text-xs font-mono text-zinc-400 mt-1">SRM IST × IIT MADRAS</p>
            </div>
            <ul className="text-xs text-zinc-300 space-y-1.5 font-mono border-t border-white/5 pt-3">
              <li className="flex items-start gap-1.5">
                <span className="text-orange-400">›</span>
                <span>B.Tech CSE (Data Science) @ SRM IST</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-orange-400">›</span>
                <span>BS Data Science &amp; Apps @ IIT Madras</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-orange-400">›</span>
                <span>Ranked in top academic percentile</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: End-to-End Systems & AI */}
          <div className="rounded-xl border border-white/10 bg-[#0c1018] p-6 space-y-4 hover:border-cyan-500/30 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2 py-0.5 rounded">
                EDGE AI
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Systems &amp; Quantization</h3>
              <p className="text-xs font-mono text-zinc-400 mt-1">OFFLINE MESH &amp; EDGE CV</p>
            </div>
            <ul className="text-xs text-zinc-300 space-y-1.5 font-mono border-t border-white/5 pt-3">
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400">›</span>
                <span>INT8 PTQ Edge Acceleration (4.1× speedup)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400">›</span>
                <span>P2P LoRa mesh radio networks (Whisp)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-cyan-400">›</span>
                <span>Spatial incident dispatch infrastructure</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Creative Technology & Writing */}
          <div className="rounded-xl border border-white/10 bg-[#0c1018] p-6 space-y-4 hover:border-purple-500/30 transition-all">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-purple-400 font-bold bg-purple-500/10 px-2 py-0.5 rounded">
                AUTHOR
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Literature &amp; Simulation</h3>
              <p className="text-xs font-mono text-zinc-400 mt-1">PAPERHEARTS &amp; FIA WEC</p>
            </div>
            <ul className="text-xs text-zinc-300 space-y-1.5 font-mono border-t border-white/5 pt-3">
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400">›</span>
                <span>Novelist: 17-chapter manuscript (Paperhearts)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400">›</span>
                <span>24H Le Mans telemetry &amp; race modeling</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-purple-400">›</span>
                <span>Interactive WebGL shader experiences</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Compact Footer Strip: The Architectural Rule & Interests */}
        <div className="p-4 rounded-xl border border-white/10 bg-[#0c1018]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-300">
            <Compass className="w-4 h-4 text-orange-400 shrink-0" />
            <span>&ldquo;Do not tell people you can build systems. Build the system, deploy the benchmarks.&rdquo;</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-zinc-400">
            <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300">Motorsport (WEC)</span>
            <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300">Creative Writing</span>
            <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300">Japanese Jazz Fusion</span>
          </div>
        </div>
      </div>
    </section>
  );
}
