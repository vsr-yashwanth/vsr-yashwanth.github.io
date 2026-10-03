"use client";

import React, { useState } from "react";
import Link from "next/link";
import { researchArchive } from "@/data/research";
import { useSystem } from "@/context/SystemContext";
import {
  FlaskConical,
  Cpu,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  Activity,
  ArrowRight,
  Sliders,
  CheckCircle2,
} from "lucide-react";

export default function ResearchSection() {
  const { playSound, setCursorText, setCoreMode } = useSystem();
  const [expandedPaper, setExpandedPaper] = useState<string | null>(
    researchArchive[0]?.id || null
  );

  // Interactive In-Browser Crack Simulation state
  const [activeCrackIndex, setActiveCrackIndex] = useState(0);
  const [isINT8Mode, setIsINT8Mode] = useState(true);
  const [threshold, setThreshold] = useState(65);

  const paper = researchArchive[0];
  const activeCrack = paper.interactiveDemoConfig.sampleCrackTypes[activeCrackIndex];

  const toggleExpand = (id: string) => {
    playSound("hover");
    setExpandedPaper((prev) => (prev === id ? null : id));
    setCoreMode("research");
  };

  return (
    <section
      id="research"
      className="py-24 relative bg-[#07090e] border-t border-white/10"
      aria-label="Research Archive Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>03 // RESEARCH ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              EXPERIMENTAL <span className="text-emerald-400">RECORDS</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-400 font-mono max-w-2xl">
              Pragmatic deployment-oriented machine learning evaluation. Moving beyond theoretical benchmarks to edge compute reality.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-zinc-500">LAB AFFILIATION:</span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              NIT SILCHAR ML LAB (2026)
            </span>
          </div>
        </div>

        {/* Research Paper Module */}
        <div className="rounded-2xl border border-white/10 bg-[#0c1018] p-6 sm:p-8 space-y-8 shadow-2xl">
          {/* Paper Header Dossier */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold tracking-wider">{paper.code}</span>
                <span className="text-white/20">|</span>
                <span className="text-zinc-400">{paper.timeline}</span>
                <span className="text-white/20">|</span>
                <span className="text-zinc-300 font-semibold">{paper.affiliation}</span>
              </div>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px]">
                {paper.status}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
              {paper.title}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-mono">
              {paper.subtitle}
            </p>

            {/* Keyword Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {paper.keywords.map((kw) => (
                <span
                  key={kw}
                  className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-white/[0.03] border border-white/10 text-zinc-300"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Abstract Box */}
          <div className="p-5 rounded-xl border border-white/10 bg-black/40 space-y-2">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block">
              RESEARCH ABSTRACT:
            </span>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              {paper.abstract}
            </p>
          </div>

          {/* Interactive In-Browser Edge CV Quantization Demo Simulator */}
          <div className="rounded-xl border border-emerald-500/30 bg-[#090d15] p-5 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5 text-xs font-mono text-emerald-400 font-semibold">
                <Sliders className="w-4 h-4" />
                <span>INTERACTIVE IN-BROWSER EDGE SEGMENTATION SIMULATOR</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-zinc-400">QUANTIZATION MODE:</span>
                <button
                  onClick={() => setIsINT8Mode(!isINT8Mode)}
                  className={`px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                    isINT8Mode
                      ? "bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                      : "bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]"
                  }`}
                >
                  {isINT8Mode ? "INT8 PTQ (7.4 ms)" : "FP32 CONTINUOUS (28.4 ms)"}
                </button>
              </div>
            </div>

            {/* Fracture Type Selector */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <span className="text-zinc-500">SAMPLE SPECIMEN:</span>
              {paper.interactiveDemoConfig.sampleCrackTypes.map((sample, idx) => (
                <button
                  key={sample.id}
                  onClick={() => setActiveCrackIndex(idx)}
                  className={`px-3 py-1 rounded border transition-colors ${
                    activeCrackIndex === idx
                      ? "border-emerald-400 bg-emerald-500/10 text-emerald-300 font-bold"
                      : "border-white/10 text-zinc-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {sample.name} ({sample.severity})
                </button>
              ))}
            </div>

            {/* Interactive Canvas / Visualizer for Crack Contours */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Synthetic Crack Polygon Visualizer (7 cols) */}
              <div className="md:col-span-7 aspect-video rounded-lg border border-white/10 bg-black/80 relative overflow-hidden flex items-center justify-center p-4">
                {/* Surface texture grid */}
                <div className="absolute inset-0 bg-tech-grid opacity-20 pointer-events-none" />

                {/* SVG Visualizer Rendering the Crack Contour */}
                <svg className="w-full h-full" viewBox="0 0 360 220">
                  {/* Background Concrete texture lines */}
                  <line x1="20" y1="40" x2="340" y2="40" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="20" y1="110" x2="340" y2="110" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <line x1="20" y1="180" x2="340" y2="180" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                  {/* Crack Path */}
                  <path
                    d={`M ${activeCrack.contourPoints.map((p) => `${p[0]},${p[1]}`).join(" L ")}`}
                    fill="none"
                    stroke={isINT8Mode ? "#10b981" : "#00e5ff"}
                    strokeWidth={isINT8Mode ? Math.max(2, activeCrack.widthMm * 1.5) : activeCrack.widthMm * 1.8}
                    strokeDasharray={isINT8Mode ? "none" : "none"}
                    strokeLinecap={isINT8Mode ? "square" : "round"}
                    className="transition-all duration-300"
                  />

                  {/* Vertex Bounding Nodes */}
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

                {/* Live Inspection Overlay HUD */}
                <div className="absolute top-3 left-3 text-[10px] font-mono text-zinc-400 bg-black/70 px-2 py-1 rounded border border-white/10">
                  SURFACE: {activeCrack.surface}
                </div>
                <div className="absolute bottom-3 right-3 text-[10px] font-mono text-emerald-400 bg-black/70 px-2 py-1 rounded border border-emerald-500/30">
                  EST. WIDTH: {activeCrack.widthMm} mm | CONFIDENCE: 94.2%
                </div>
              </div>

              {/* Edge Metrics readout (5 cols) */}
              <div className="md:col-span-5 space-y-3 font-mono text-xs">
                <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] flex justify-between">
                  <span className="text-zinc-500">INFERENCE LATENCY:</span>
                  <span className="text-emerald-400 font-bold">{isINT8Mode ? "7.4 ms (135 FPS)" : "28.4 ms (35 FPS)"}</span>
                </div>
                <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] flex justify-between">
                  <span className="text-zinc-500">PRECISION SCHEME:</span>
                  <span className="text-white font-semibold">{isINT8Mode ? "INT8 Symmetric PTQ" : "FP32 Baseline"}</span>
                </div>
                <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] flex justify-between">
                  <span className="text-zinc-500">MEMORY CONSUMPTION:</span>
                  <span className="text-cyan-400 font-semibold">{isINT8Mode ? "3.8 MB (73% saved)" : "14.2 MB (FP32)"}</span>
                </div>
                <div className="p-3 rounded-lg border border-white/5 bg-white/[0.02] flex justify-between">
                  <span className="text-zinc-500">SEVERITY CLASSIFICATION:</span>
                  <span
                    className={`font-bold ${
                      activeCrack.severity === "CRITICAL"
                        ? "text-red-400"
                        : activeCrack.severity === "MODERATE"
                        ? "text-amber-400"
                        : "text-emerald-400"
                    }`}
                  >
                    {activeCrack.severity}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Benchmark Table (FP32 vs FP16 vs INT8 PTQ) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-2">
                <Cpu className="w-4 h-4" />
                EMPIRICAL BENCHMARK COMPARISON // EDGE ACCELERATORS
              </span>
              <span className="text-[10px] font-mono text-zinc-500">TESTED OVER 500 INFERENCES</span>
            </div>

            <div className="rounded-xl border border-white/10 overflow-hidden">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-white/5 text-zinc-400 border-b border-white/10">
                  <tr>
                    <th className="p-3">PRECISION LEVEL</th>
                    <th className="p-3">FRAMEWORK RUNTIME</th>
                    <th className="p-3">LATENCY</th>
                    <th className="p-3">THROUGHPUT</th>
                    <th className="p-3">mAP50</th>
                    <th className="p-3">MODEL SIZE</th>
                    <th className="p-3">VRAM ALLOC</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-zinc-300">
                  {paper.benchmarks.map((row, i) => (
                    <tr
                      key={i}
                      className={row.precision.includes("INT8") ? "bg-emerald-500/[0.04] text-emerald-200" : "hover:bg-white/[0.02]"}
                    >
                      <td className="p-3 font-bold text-white flex items-center gap-1.5">
                        {row.precision.includes("INT8") && <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
                        {row.precision}
                      </td>
                      <td className="p-3 text-zinc-400">{row.framework}</td>
                      <td className="p-3 font-semibold text-orange-400">{row.latencyMs}</td>
                      <td className="p-3 font-bold text-emerald-400">{row.fps}</td>
                      <td className="p-3">{row.map50}</td>
                      <td className="p-3 font-mono text-cyan-300">{row.sizeMb}</td>
                      <td className="p-3 text-zinc-400">{row.vramMb}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Observations & Deployment Implications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
              <span className="text-xs font-mono text-orange-400 font-semibold block">
                CRITICAL OBSERVATIONS
              </span>
              <ul className="space-y-2 text-xs font-mono text-zinc-300">
                {paper.observations.map((obs, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-0.5">›</span>
                    <span className="leading-relaxed">{obs}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-semibold block">
                EDGE DEPLOYMENT IMPLICATIONS
              </span>
              <ul className="space-y-2 text-xs font-mono text-zinc-300">
                {paper.deploymentImplications.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-400 mt-0.5">✓</span>
                    <span className="leading-relaxed">{imp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom link to dedicated paper route */}
          <div className="pt-2 flex justify-end">
            <Link
              href={`/research/${paper.slug}`}
              className="flex items-center gap-2 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <span>OPEN FULL RESEARCH ARCHIVE PAGE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
