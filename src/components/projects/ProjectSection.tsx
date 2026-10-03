"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projectsData, Project } from "@/data/projects";
import { useSystem } from "@/context/SystemContext";
import { ArrowUpRight, ExternalLink, Layers, CheckCircle2, Cpu, ShieldAlert, Sparkles, Terminal } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import CaseStudyModal from "./CaseStudyModal";

export default function ProjectSection() {
  const { playSound, setCursorText, setCoreMode } = useSystem();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeCaseStudyProject, setActiveCaseStudyProject] = useState<Project | null>(null);

  const categories = ["ALL", "SYSTEMS", "AI / ML", "QUANTUM", "CIVIC TECH", "SIMULATION"];

  const filteredProjects = selectedCategory === "ALL"
    ? projectsData
    : projectsData.filter((p) => p.category === selectedCategory || (selectedCategory === "AI / ML" && p.category.includes("AI")));

  const handleOpenCaseStudy = (project: Project) => {
    playSound("click");
    setActiveCaseStudyProject(project);
  };

  return (
    <section id="work" className="py-24 relative bg-[#07090e] border-t border-white/10" aria-label="Selected Projects Section">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>02 // SELECTED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              ENGINEERED <span className="text-orange-400">SYSTEMS</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-400 font-mono max-w-xl">
              From deterministic safety state machines to zero-network delay-tolerant mesh radios and quantum simulation.
            </p>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-white/10 bg-[#0c1018]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playSound("hover");
                  setSelectedCategory(cat);
                  setCoreMode("work");
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                  selectedCategory === cat
                    ? "bg-orange-500 text-black font-semibold shadow-[0_0_12px_rgba(255,140,55,0.3)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Major Projects List: Large High-Impact Entries */}
        <div className="space-y-12">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative rounded-2xl border border-white/10 bg-[#0c1018]/90 p-6 sm:p-8 hover:border-orange-500/40 transition-all duration-300 shadow-xl overflow-hidden"
              onMouseEnter={() => {
                setCursorText("VIEW");
                setCoreMode("work");
              }}
              onMouseLeave={() => setCursorText("")}
            >
              {/* Subtle accent corner glow */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/[0.03] group-hover:bg-orange-500/[0.08] rounded-full blur-[80px] pointer-events-none transition-all duration-500" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                {/* Left Column: Index, Title & Description (8 cols) */}
                <div className="lg:col-span-8 space-y-4">
                  {/* Meta Bar */}
                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                    <span className="text-orange-400 font-bold text-sm">[{project.index}]</span>
                    <span className="text-white/20">|</span>
                    <span className="text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      {project.category}
                    </span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-zinc-400">{project.year}</span>
                    <span className="text-zinc-500">•</span>
                    <span className="text-emerald-400 font-medium">{project.status}</span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl sm:text-4xl font-bold tracking-tight text-white group-hover:text-orange-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 font-mono mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Summary */}
                  <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                    {project.summary}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono rounded bg-white/[0.04] border border-white/10 text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => handleOpenCaseStudy(project)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(255,140,55,0.25)]"
                    >
                      <span>VIEW CASE STUDY</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white text-xs font-mono transition-all"
                    >
                      <span>DEDICATED PAGE</span>
                      <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
                    </Link>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playSound("click")}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white text-xs font-mono transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>SOURCE CODE</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Key Empirical Metrics / Architecture Callout (4 cols) */}
                <div className="lg:col-span-4 rounded-xl border border-white/10 bg-[#080b11] p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 font-semibold">
                      <Terminal className="w-3.5 h-3.5 text-orange-400" />
                      SYSTEM BENCHMARKS
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">MEASURED</span>
                  </div>

                  {project.metrics && project.metrics.length > 0 ? (
                    <div className="space-y-3 font-mono">
                      {project.metrics.map((metric, i) => (
                        <div key={i} className="flex items-center justify-between text-xs">
                          <span className="text-zinc-500">{metric.label}:</span>
                          <span className="text-orange-300 font-semibold bg-white/[0.04] px-2 py-0.5 rounded border border-white/5">
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-4 text-xs font-mono text-zinc-500">
                      Modular deployment verified. Run test suite to evaluate local latency.
                    </div>
                  )}

                  {/* Highlights Snippet */}
                  <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-zinc-400 leading-relaxed">
                    <span className="text-zinc-500 block text-[9px] uppercase tracking-wider mb-1">
                      ENGINEERING FOCUS:
                    </span>
                    {project.caseStudy.keyDecisions[0] || project.description}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {activeCaseStudyProject && (
        <CaseStudyModal
          project={activeCaseStudyProject}
          onClose={() => setActiveCaseStudyProject(null)}
        />
      )}
    </section>
  );
}
