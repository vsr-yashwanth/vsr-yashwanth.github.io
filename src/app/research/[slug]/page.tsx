import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { researchArchive } from "@/data/research";
import { ArrowLeft, Cpu, Layers, Sparkles, Sliders } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return researchArchive.map((paper) => ({
    slug: paper.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const paper = researchArchive.find((p) => p.slug === slug);
  if (!paper) return { title: "Research Not Found" };
  return {
    title: `${paper.title} — Research Archive | Silver Quill`,
    description: paper.abstract,
  };
}

export default async function ResearchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const paper = researchArchive.find((p) => p.slug === slug);

  if (!paper) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-200 py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-emerald-400 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-12">
        <Link
          href="/#research"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
          <span>RETURN TO DIGITAL LAB // RESEARCH ARCHIVE</span>
        </Link>

        {/* Paper Header */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="text-emerald-400 font-bold">{paper.code}</span>
            <span className="text-white/20">|</span>
            <span className="text-zinc-400">{paper.timeline}</span>
            <span className="text-white/20">|</span>
            <span className="text-zinc-300 font-semibold">{paper.affiliation}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {paper.title}
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 font-mono">{paper.subtitle}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {paper.keywords.map((kw) => (
              <span
                key={kw}
                className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 border border-white/10 text-zinc-300"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Abstract Box */}
        <div className="p-6 rounded-xl border border-white/10 bg-[#0c1018] space-y-3">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider block font-semibold">
            PAPER ABSTRACT & EXECUTIVE SUMMARY:
          </span>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">{paper.abstract}</p>
        </div>

        {/* Problem and Motivation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
            <span className="text-xs font-mono text-orange-400 font-semibold uppercase block">THE CIVIL PROBLEM</span>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{paper.problem}</p>
          </div>
          <div className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
            <span className="text-xs font-mono text-cyan-400 font-semibold uppercase block">RESEARCH MOTIVATION</span>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{paper.motivation}</p>
          </div>
        </div>

        {/* Methodology */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase">
            <Layers className="w-4 h-4" />
            <span>EXPERIMENTAL METHODOLOGY</span>
          </div>

          <div className="space-y-4">
            {paper.methodology.map((m, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-white/10 bg-[#0c1018] space-y-2">
                <h3 className="text-base font-bold text-white font-mono">{m.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{m.description}</p>
                <ul className="space-y-1 text-xs font-mono text-zinc-400 pt-1">
                  {m.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">›</span> {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Benchmarks Table */}
        <div className="space-y-3 pt-4">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase">
            <Cpu className="w-4 h-4" />
            <span>MEASURED PERFORMANCE BENCHMARKS (EDGE TESTBED)</span>
          </div>
          <div className="rounded-xl border border-white/10 overflow-hidden font-mono text-xs">
            <table className="w-full text-left">
              <thead className="bg-white/5 text-zinc-400 border-b border-white/10">
                <tr>
                  <th className="p-3.5">PRECISION</th>
                  <th className="p-3.5">RUNTIME</th>
                  <th className="p-3.5">LATENCY</th>
                  <th className="p-3.5">THROUGHPUT</th>
                  <th className="p-3.5">mAP50</th>
                  <th className="p-3.5">MODEL SIZE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {paper.benchmarks.map((row, i) => (
                  <tr key={i} className={row.precision.includes("INT8") ? "bg-emerald-500/[0.04] text-emerald-200" : ""}>
                    <td className="p-3.5 font-bold text-white">{row.precision}</td>
                    <td className="p-3.5 text-zinc-400">{row.framework}</td>
                    <td className="p-3.5 text-orange-400 font-semibold">{row.latencyMs}</td>
                    <td className="p-3.5 text-emerald-400 font-bold">{row.fps}</td>
                    <td className="p-3.5">{row.map50}</td>
                    <td className="p-3.5 text-cyan-300">{row.sizeMb}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Observations & Deployment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="p-5 rounded-xl border border-white/10 bg-[#0c1018] space-y-3">
            <span className="text-xs font-mono text-orange-400 font-semibold block">EMPIRICAL OBSERVATIONS</span>
            <ul className="space-y-2 text-xs font-mono text-zinc-300">
              {paper.observations.map((obs, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-orange-400">›</span> {obs}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-5 rounded-xl border border-white/10 bg-[#0c1018] space-y-3">
            <span className="text-xs font-mono text-cyan-400 font-semibold block">DEPLOYMENT IMPLICATIONS</span>
            <ul className="space-y-2 text-xs font-mono text-zinc-300">
              {paper.deploymentImplications.map((imp, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-cyan-400">✓</span> {imp}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-12 border-t border-white/10 flex justify-between items-center text-xs font-mono">
          <Link href="/#research" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO RESEARCH ARCHIVE</span>
          </Link>
          <span className="text-zinc-500">SILVER QUILL // NIT SILCHAR RESEARCH</span>
        </div>
      </div>
    </div>
  );
}
