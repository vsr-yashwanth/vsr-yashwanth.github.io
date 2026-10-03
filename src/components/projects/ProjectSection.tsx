"use client";

import React, { useState } from "react";
import Link from "next/link";
import { projectsData, Project } from "@/data/projects";
import { useSystem } from "@/context/SystemContext";
import { ArrowUpRight, ExternalLink, Terminal } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import CaseStudyModal from "./CaseStudyModal";

export default function ProjectSection() {
  const { playSound, setCursorText, setCoreMode } = useSystem();
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeCaseStudyProject, setActiveCaseStudyProject] = useState<Project | null>(null);

  const categories = ["ALL", "SYSTEMS", "AI / ML", "QUANTUM", "CIVIC TECH", "SIMULATION"];

  const filteredProjects =
    selectedCategory === "ALL"
      ? projectsData
      : projectsData.filter(
          (p) =>
            p.category === selectedCategory ||
            (selectedCategory === "AI / ML" && p.category.includes("AI"))
        );

  const handleOpenCaseStudy = (project: Project) => {
    playSound("click");
    setActiveCaseStudyProject(project);
  };

  return (
    <section
      id="work"
      className="py-16 relative bg-[#07090e] border-t border-white/10"
      aria-label="Selected Projects Section"
    >
      <div className="absolute inset-0 bg-dot-matrix opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold tracking-widest uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span>02 // SELECTED WORK</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              ENGINEERED <span className="text-orange-400">SYSTEMS</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl border border-white/10 bg-[#0c1018]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playSound("hover");
                  setSelectedCategory(cat);
                  setCoreMode("work");
                }}
                className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all ${
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

        {/* Compact, High-Impact Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group relative rounded-xl border border-white/10 bg-[#0c1018] p-5 sm:p-6 hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between"
              onMouseEnter={() => {
                setCursorText("VIEW");
                setCoreMode("work");
              }}
              onMouseLeave={() => setCursorText("")}
            >
              <div className="space-y-3">
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-orange-400 font-bold">[{project.index}]</span>
                  <span className="text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 text-[10px]">
                    {project.category}
                  </span>
                  <span className="text-zinc-500 text-[11px]">{project.year}</span>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-zinc-400 font-mono mt-0.5 line-clamp-1">
                    {project.subtitle}
                  </p>
                </div>

                {/* Compact Punchy Summary */}
                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                  {project.summary}
                </p>

                {/* Key Metrics Strip (Punchy visual callout) */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 py-2">
                    {project.metrics.slice(0, 2).map((metric, i) => (
                      <div
                        key={i}
                        className="p-2 rounded bg-black/40 border border-white/5 font-mono text-[11px]"
                      >
                        <span className="text-zinc-500 block text-[9px] uppercase">{metric.label}</span>
                        <span className="text-orange-300 font-bold">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Technologies */}
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-white/[0.04] border border-white/5 text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-500">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => handleOpenCaseStudy(project)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs tracking-wider transition-all shadow-[0_0_12px_rgba(255,140,55,0.2)]"
                >
                  <span>CASE STUDY</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="p-1.5 rounded border border-white/10 text-zinc-400 hover:text-white transition-colors"
                    title="Dedicated page"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playSound("click")}
                      className="p-1.5 rounded border border-white/10 text-zinc-400 hover:text-white transition-colors"
                      title="Source code"
                    >
                      <Github className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeCaseStudyProject && (
        <CaseStudyModal
          project={activeCaseStudyProject}
          onClose={() => setActiveCaseStudyProject(null)}
        />
      )}
    </section>
  );
}
