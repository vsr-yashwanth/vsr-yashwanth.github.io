import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projectsData } from "@/data/projects";
import { ArrowLeft, ExternalLink, Cpu, Layers, AlertTriangle, CheckCircle2, Code2 } from "lucide-react";
import { Github } from "@/components/ui/Icons";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Case Study | Silver Quill`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-200 py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-orange-500 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Navigation Back */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
          <span>RETURN TO DIGITAL LAB // SELECTED WORK</span>
        </Link>

        {/* Title Header */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="text-orange-400 font-bold">[{project.index}]</span>
            <span className="text-white/20">|</span>
            <span className="text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              {project.category}
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-400">{project.year}</span>
            <span className="text-zinc-500">•</span>
            <span className="text-emerald-400">{project.status}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">{project.title}</h1>
          <p className="text-base sm:text-lg text-zinc-400 font-mono">{project.subtitle}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 border border-white/10 text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {project.githubUrl && (
            <div className="pt-3">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs font-mono tracking-wider transition-all shadow-[0_0_15px_rgba(255,140,55,0.3)]"
              >
                <Github className="w-4 h-4" />
                <span>INSPECT GITHUB REPOSITORY</span>
              </a>
            </div>
          )}
        </div>

        {/* Overview & Problem */}
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-white tracking-tight">Project Overview</h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">{project.caseStudy.overview}</p>
          </div>

          <div className="p-6 rounded-xl border border-red-500/20 bg-red-500/[0.03] space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 font-semibold uppercase">
              <AlertTriangle className="w-4 h-4" />
              <span>THE CORE PROBLEM</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">{project.caseStudy.problem}</p>
          </div>

          {/* Architecture */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase">
              <Layers className="w-4 h-4" />
              <span>SYSTEM ARCHITECTURE & KEY DECISIONS</span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed font-sans">{project.caseStudy.architecture}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {project.caseStudy.keyDecisions.map((dec, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border border-white/5 bg-white/[0.02] text-xs font-mono text-zinc-300 flex items-start gap-3"
                >
                  <span className="text-orange-400 font-bold">0{i + 1}.</span>
                  <span className="leading-relaxed">{dec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Measured Benchmarks Table */}
          {project.caseStudy.benchmarks && (
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold uppercase">
                <Cpu className="w-4 h-4" />
                <span>MEASURED PERFORMANCE BENCHMARKS</span>
              </div>
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="bg-white/5 text-zinc-400 border-b border-white/10">
                    <tr>
                      <th className="p-3.5">METRIC</th>
                      <th className="p-3.5">MEASURED VALUE</th>
                      <th className="p-3.5">CONTEXT / SLA</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-zinc-300">
                    {project.caseStudy.benchmarks.map((b, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="p-3.5 font-semibold text-white">{b.metric}</td>
                        <td className="p-3.5 text-orange-400 font-bold">{b.value}</td>
                        <td className="p-3.5 text-zinc-400">{b.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Code Highlight */}
          {project.caseStudy.codeHighlight && (
            <div className="space-y-2 pt-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400 flex items-center gap-2 font-semibold">
                  <Code2 className="w-4 h-4 text-orange-400" />
                  {project.caseStudy.codeHighlight.filename}
                </span>
                <span className="text-zinc-500 uppercase">{project.caseStudy.codeHighlight.language}</span>
              </div>
              <pre className="p-5 rounded-xl border border-white/10 bg-black/60 font-mono text-xs text-orange-200 overflow-x-auto leading-relaxed">
                <code>{project.caseStudy.codeHighlight.code}</code>
              </pre>
              <p className="text-xs font-mono text-zinc-400">{project.caseStudy.codeHighlight.explanation}</p>
            </div>
          )}

          {/* Outcomes & Lessons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.02] space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-semibold block">VERIFIED OUTCOMES</span>
              <ul className="space-y-2 text-xs text-zinc-300 font-mono">
                {project.caseStudy.outcomes.map((o, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span> {o}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-xl border border-amber-500/20 bg-amber-500/[0.02] space-y-3">
              <span className="text-xs font-mono text-amber-400 font-semibold block">LESSONS LEARNED</span>
              <ul className="space-y-2 text-xs text-zinc-300 font-mono">
                {project.caseStudy.lessons.map((l, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-400">›</span> {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-12 border-t border-white/10 flex justify-between items-center text-xs font-mono">
          <Link href="/#work" className="text-orange-400 hover:text-orange-300 flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO ALL PROJECTS</span>
          </Link>
          <span className="text-zinc-500">SILVER QUILL // SYSTEM ARCHIVE</span>
        </div>
      </div>
    </div>
  );
}
