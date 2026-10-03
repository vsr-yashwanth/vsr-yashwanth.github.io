"use client";

import React, { useState } from "react";
import Link from "next/link";
import { researchArchive } from "@/data/research";
import { useSystem } from "@/context/SystemContext";
import {
  Cpu,
  Sparkles,
  ArrowRight,
  Sliders,
} from "lucide-react";

export default function ResearchSection() {
  const { playSound, setCursorText, setCoreMode } = useSystem();

  // Interactive In-Browser Crack Simulation state
  const [activeCrackIndex, setActiveCrackIndex] = useState(0);
  const [isINT8Mode, setIsINT8Mode] = useState(true);

  const paper = researchArchive[0];
  const activeCrack = paper.interactiveDemoConfig.sampleCrackTypes[activeCrackIndex];

  return (
    <section
      id="research"
      className="py-16 relative bg-[#07090e] border-t border-white/10"
      aria-label="Research Archive Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold tracking-widest uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>03 // RESEARCH &amp; QUANTIZATION</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              YOLO26n-Seg <span className="text-emerald-400">INT8 PTQ</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded border border-emerald-500/20">
            <span>NIT SILCHAR ML LAB (2026)</span>
          </div>
        </div>

        {/* 4-Stat High-Impact Metric Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-xl border border-white/10 bg-[#0c1018] text-center">
            <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-400">7.4 ms</div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase">INT8 Latency</div>
          </div>
          <div className="p-3 rounded-xl border border-white/10 bg-[#0c1018] text-center">
            <div className="text-xl sm:text-2xl font-mono font-bold text-orange-400">135 FPS</div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase">4.1× Speedup</div>
          </div>
          <div className="p-3 rounded-xl border border-white/10 bg-[#0c1018] text-center">
            <div className="text-xl sm:text-2xl font-mono font-bold text-cyan-400">3.8 MB</div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase">73% VRAM Saved</div>
          </div>
          <div className="p-3 rounded-xl border border-white/10 bg-[#0c1018] text-center">
            <div className="text-xl sm:text-2xl font-mono font-bold text-purple-400">94.2%</div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase">mAP50 Retained</div>
          </div>
        </div>

        {/* Interactive Simulator Card */}
        <div className="rounded-xl border border-emerald-500/30 bg-[#090d15] p-5 sm:p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
              <Sliders className="w-4 h-4" />
              <span>LIVE EDGE SEGMENTATION SIMULATOR</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-zinc-500">MODE:</span>
              <button
                onClick={() => {
                  playSound("click");
                  setIsINT8Mode(!isINT8Mode);
                }}
                className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                  isINT8Mode
                    ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                    : "bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]"
                }`}
              >
                {isINT8Mode ? "INT8 PTQ (7.4 ms)" : "FP32 BASELINE (28.4 ms)"}
              </button>
            </div>
          </div>

          {/* Fracture Specimen Buttons */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-zinc-500">SPECIMEN:</span>
            {paper.interactiveDemoConfig.sampleCrackTypes.map((sample, idx) => (
              <button
                key={sample.id}
                onClick={() => {
                  playSound("hover");
                  setActiveCrackIndex(idx);
                }}
                className={`px-2.5 py-1 rounded border transition-colors ${
                  activeCrackIndex === idx
                    ? "border-emerald-400 bg-emerald-500/10 text-emerald-300 font-bold"
                    : "border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                {sample.name}
              </button>
            ))}
          </div>

          {/* Visual Canvas Viewport + Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* SVG Visualizer (7 cols) */}
            <div className="md:col-span-7 aspect-[16/9] rounded-lg border border-white/10 bg-black/80 relative overflow-hidden flex items-center justify-center p-3">
              <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />
              <svg className="w-full h-full" viewBox="0 0 360 200">
                <line x1="20" y1="40" x2="340" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="20" y1="100" x2="340" y2="100" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <line x1="20" y1="160" x2="340" y2="160" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                <path
                  d={`M ${activeCrack.contourPoints.map((p) => `${p[0]},${p[1]}`).join(" L ")}`}
                  fill="none"
                  stroke={isINT8Mode ? "#10b981" : "#00e5ff"}
                  strokeWidth={isINT8Mode ? Math.max(2, activeCrack.widthMm * 1.5) : activeCrack.widthMm * 1.8}
                  strokeLinecap={isINT8Mode ? "square" : "round"}
                  className="transition-all duration-300"
                />

                {activeCrack.contourPoints.map((pt, i) => (
                  <circle
                    key={i}
                    cx={pt[0]}
                    cy={pt[1]}
                    r={isINT8Mode ? 2.5 : 3.5}
                    fill={isINT8Mode ? "#10b981" : "#00e5ff"}
                    opacity={0.8}
                  />
                ))}
              </svg>

              <div className="absolute top-2 left-2 text-[10px] font-mono text-zinc-400 bg-black/70 px-2 py-0.5 rounded border border-white/10">
                {activeCrack.surface}
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] font-mono text-emerald-400 bg-black/70 px-2 py-0.5 rounded border border-emerald-500/30">
                EST: {activeCrack.widthMm} mm | CONFIDENCE: 94.2%
              </div>
            </div>

            {/* Readout Column (5 cols) */}
            <div className="md:col-span-5 space-y-2 font-mono text-xs">
              <div className="p-2.5 rounded-lg border border-white/5 bg-white/[0.02] flex justify-between">
                <span className="text-zinc-500">LATENCY:</span>
                <span className="text-emerald-400 font-bold">{isINT8Mode ? "7.4 ms (135 FPS)" : "28.4 ms (35 FPS)"}</span>
              </div>
              <div className="p-2.5 rounded-lg border border-white/5 bg-white/[0.02] flex justify-between">
                <span className="text-zinc-500">PRECISION:</span>
                <span className="text-white font-semibold">{isINT8Mode ? "INT8 Symmetric PTQ" : "FP32 Baseline"}</span>
              </div>
              <div className="p-2.5 rounded-lg border border-white/5 bg-white/[0.02] flex justify-between">
                <span className="text-zinc-500">MEMORY:</span>
                <span className="text-cyan-400 font-semibold">{isINT8Mode ? "3.8 MB (73% saved)" : "14.2 MB"}</span>
              </div>
              <div className="p-2.5 rounded-lg border border-white/5 bg-white/[0.02] flex justify-between">
                <span className="text-zinc-500">SEVERITY:</span>
                <span className={`font-bold ${activeCrack.severity === "CRITICAL" ? "text-red-400" : "text-amber-400"}`}>
                  {activeCrack.severity}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Streamlined Benchmark Comparison Table */}
        <div className="mt-6 rounded-xl border border-white/10 bg-[#0c1018] p-4 sm:p-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-xs font-mono">
            <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              BENCHMARK SPECTRUM // 500 INFERENCES
            </span>
            <Link
              href={`/research/${paper.slug}`}
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
            >
              <span>FULL PAPER</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs">
              <thead className="text-zinc-500 border-b border-white/5 text-[10px]">
                <tr>
                  <th className="pb-2">PRECISION</th>
                  <th className="pb-2">RUNTIME</th>
                  <th className="pb-2">LATENCY</th>
                  <th className="pb-2">THROUGHPUT</th>
                  <th className="pb-2">mAP50</th>
                  <th className="pb-2">SIZE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {paper.benchmarks.map((row, i) => (
                  <tr
                    key={i}
                    className={row.precision.includes("INT8") ? "bg-emerald-500/[0.06] text-emerald-200" : ""}
                  >
                    <td className="py-2.5 font-bold text-white flex items-center gap-1">
                      {row.precision.includes("INT8") && <Sparkles className="w-3 h-3 text-emerald-400" />}
                      {row.precision}
                    </td>
                    <td className="py-2.5 text-zinc-400">{row.framework}</td>
                    <td className="py-2.5 text-orange-400 font-semibold">{row.latencyMs}</td>
                    <td className="py-2.5 text-emerald-400 font-bold">{row.fps}</td>
                    <td className="py-2.5">{row.map50}</td>
                    <td className="py-2.5 text-cyan-300">{row.sizeMb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
