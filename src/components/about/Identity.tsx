"use client";

import React from "react";
import { useSystem } from "@/context/SystemContext";
import { socialConfig } from "@/data/social";
import { Compass, BookOpen, Cpu, ShieldCheck, Flag, Sparkles } from "lucide-react";

export default function Identity() {
  const { playSound, setCursorText } = useSystem();

  return (
    <section
      id="about"
      className="py-24 relative border-t border-white/10 bg-[#07090e]"
      aria-label="About Identity Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Stamp */}
        <div className="flex items-center justify-between pb-8 border-b border-white/10 mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-orange-400 font-semibold tracking-widest uppercase">
              01 // CORE PHILOSOPHY
            </span>
            <span className="text-white/20">|</span>
            <span className="font-mono text-xs text-zinc-400">DIGITAL LAB DOSSIER</span>
          </div>
          <span className="font-mono text-[11px] text-zinc-500 hidden sm:inline">
            COORDINATES: 13.0827° N, 80.2707° E [CHENNAI]
          </span>
        </div>

        {/* Editorial Statement */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Big Editorial Statement (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
              &ldquo;I like building systems that turn ideas into things{" "}
              <span className="font-medium text-orange-400 underline decoration-orange-500/30 underline-offset-8">
                people can actually use
              </span>
              .&rdquo;
            </h2>

            <div className="space-y-5 text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
              <p>
                My work exists at the intersection of deep learning research, distributed software engineering, and
                creative technology. I am currently pursuing two simultaneous technical degrees: a B.Tech in Computer
                Science & Engineering (Data Science) at SRM Institute of Science and Technology (9.05 CGPA), alongside a
                BS in Data Science & Applications at IIT Madras.
              </p>
              <p>
                Rather than treating AI as an isolated novelty, I engineer the complete infrastructure around it:
                offline-first synchronization queues, deterministic policy engines, cryptographic audit chains, and
                low-latency INT8 quantization so vision models can execute on power-constrained edge hardware without
                cloud dependence.
              </p>
              <p>
                Whether architecting decentralized mesh radios for humanitarian zones (Whisp), high-speed geospatial
                safety dispatch networks (Kiroshi), or terminal simulations of the 24 Hours of Le Mans, the goal remains
                the same: curiosity transformed into resilient software.
              </p>
            </div>

            {/* Outside the Terminal Pill Badges */}
            <div className="pt-2 p-5 rounded-xl border border-white/10 bg-[#0c1018]/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-orange-400 font-semibold">
                <Flag className="w-3.5 h-3.5" />
                <span>OUTSIDE THE TERMINAL // PERSONAL PURSUITS</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                When I am not training models or debugging network sockets:
              </p>
              <div className="flex flex-wrap gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300">
                  🏁 Endurance Motorsport (FIA WEC, Le Mans)
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300">
                  📖 Creative Writing & Novel Author (Paperhearts)
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300">
                  🎮 Strategy & Simulation Games
                </span>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-zinc-300">
                  🎵 Japanese Jazz Fusion & Ambient Soundscapes
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Dossier Metadata Matrix (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-white/10 bg-[#0c1018] p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-mono text-xs text-zinc-400 font-semibold tracking-wider">
                  SYSTEM DOSSIER // METRICS
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  VERIFIED RECORD
                </span>
              </div>

              {/* Dossier Items */}
              <div className="space-y-4 font-mono text-xs">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">IDENTITY / PREFERRED</span>
                  <span className="text-white font-medium text-sm">Vangala Sreeram Yashwanth (Silver Quill)</span>
                </div>

                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">BASED IN</span>
                  <span className="text-white">Chennai, India [IST +05:30]</span>
                </div>

                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">DUAL-DEGREE ACADEMICS</span>
                  <div className="mt-1 space-y-1 text-zinc-300">
                    <p className="flex justify-between">
                      <span>• SRM IST (B.Tech CSE Data Science)</span>
                      <span className="text-orange-400 font-semibold">9.05 / 10 CGPA</span>
                    </p>
                    <p className="flex justify-between">
                      <span>• IIT Madras (BS Data Science)</span>
                      <span className="text-cyan-400 font-semibold">In Progress</span>
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">RESEARCH FOCUS</span>
                  <span className="text-zinc-200">
                    Computer Vision, Structural Crack Segmentation, INT8 PTQ Model Optimization & Edge Deployment
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">SYSTEM ARCHITECTURE</span>
                  <span className="text-zinc-200">
                    FastAPI, PostGIS Spatial Engine, Offline-First Mobile (Flutter/Kotlin), Cryptographic Chaining
                  </span>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-zinc-500">OPERATING MODE:</span>
                  <span className="text-emerald-400 font-semibold">ACTIVE BUILDING & RESEARCH</span>
                </div>
              </div>
            </div>

            {/* Quick Quote / Mindset */}
            <div className="p-4 rounded-xl border border-orange-500/20 bg-orange-500/[0.04] text-xs font-mono text-zinc-300 flex items-start gap-3">
              <Compass className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-orange-400 font-semibold block mb-0.5">THE ARCHITECTURAL RULE:</span>
                &ldquo;Do not tell people you can build systems. Build the system, deploy the benchmarks, and let the
                latency curves speak for themselves.&rdquo;
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
