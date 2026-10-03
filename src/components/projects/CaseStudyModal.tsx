"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Project } from "@/data/projects";
import { X, ExternalLink, CheckCircle2, AlertTriangle, Layers, Cpu, Code2, ArrowRight } from "lucide-react";
import { Github } from "@/components/ui/Icons";

interface CaseStudyModalProps {
  project: Project;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] rounded-2xl border border-white/15 bg-[#090d15] text-zinc-200 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0c1018] shrink-0">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold text-orange-400">[{project.index}]</span>
            <h3 className="text-lg font-bold text-white tracking-tight">{project.title}</h3>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              {project.category}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={`/projects/${project.slug}`}
              className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1"
            >
              <span>FULL PAGE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={onClose}
              className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10"
              aria-label="Close case study modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Subtitle & Summary */}
          <div className="space-y-2">
            <h4 className="text-xl sm:text-2xl font-semibold text-white">{project.subtitle}</h4>
            <p className="text-sm text-zinc-300 leading-relaxed">{project.caseStudy.overview}</p>
          </div>

          {/* The Problem */}
          <div className="p-5 rounded-xl border border-red-500/20 bg-red-500/[0.03] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-semibold uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>THE CORE PROBLEM</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              {project.caseStudy.problem}
            </p>
          </div>

          {/* Architecture & Decisions */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase">
              <Layers className="w-4 h-4" />
              <span>SYSTEM ARCHITECTURE & KEY DECISIONS</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              {project.caseStudy.architecture}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {project.caseStudy.keyDecisions.map((dec, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-lg border border-white/5 bg-white/[0.02] text-xs font-mono text-zinc-300 flex items-start gap-2.5"
                >
                  <span className="text-orange-400 font-bold">0{i + 1}.</span>
                  <span className="leading-relaxed">{dec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benchmarks (if available) */}
          {project.caseStudy.benchmarks && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase">
                <Cpu className="w-4 h-4" />
                <span>MEASURED PERFORMANCE BENCHMARKS</span>
              </div>
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-white/5 text-zinc-400 border-b border-white/10">
                    <tr>
                      <th className="p-3">METRIC</th>
                      <th className="p-3">MEASURED VALUE</th>
                      <th className="p-3">CONTEXT / SLA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-zinc-300">
                    {project.caseStudy.benchmarks.map((b, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="p-3 font-semibold text-white">{b.metric}</td>
                        <td className="p-3 text-orange-400 font-bold">{b.value}</td>
                        <td className="p-3 text-zinc-400">{b.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Code Highlight (if available) */}
          {project.caseStudy.codeHighlight && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 flex items-center gap-1.5 font-semibold">
                  <Code2 className="w-4 h-4 text-orange-400" />
                  {project.caseStudy.codeHighlight.filename}
                </span>
                <span className="text-zinc-500 uppercase">{project.caseStudy.codeHighlight.language}</span>
              </div>
              <pre className="p-4 rounded-xl border border-white/10 bg-black/60 font-mono text-xs text-orange-200 overflow-x-auto leading-relaxed">
                <code>{project.caseStudy.codeHighlight.code}</code>
              </pre>
              <p className="text-[11px] font-mono text-zinc-400">
                {project.caseStudy.codeHighlight.explanation}
              </p>
            </div>
          )}

          {/* Outcomes & Lessons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.02] space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-semibold block">VERIFIED OUTCOMES</span>
              <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                {project.caseStudy.outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-emerald-400">✓</span> {o}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.02] space-y-2">
              <span className="text-xs font-mono text-amber-400 font-semibold block">LESSONS LEARNED</span>
              <ul className="space-y-1.5 text-xs text-zinc-300 font-mono">
                {project.caseStudy.lessons.map((l, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-amber-400">›</span> {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#0c1018] shrink-0">
          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GITHUB REPO</span>
              </a>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs font-mono tracking-wider transition-all"
          >
            CLOSE CASE STUDY
          </button>
        </div>
      </div>
    </div>
  );
}
