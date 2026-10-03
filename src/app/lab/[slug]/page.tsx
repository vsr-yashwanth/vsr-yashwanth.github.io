import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { experimentsData } from "@/data/experiments";
import { ArrowLeft, FlaskConical, Sliders, Cpu } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return experimentsData.map((exp) => ({
    slug: exp.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const exp = experimentsData.find((e) => e.slug === slug);
  if (!exp) return { title: "Experiment Not Found" };
  return {
    title: `${exp.title} — Lab Prototype | Silver Quill`,
    description: exp.tagline,
  };
}

export default async function LabPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const exp = experimentsData.find((e) => e.slug === slug);

  if (!exp) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-200 py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-yellow-400 selection:text-black">
      <div className="max-w-4xl mx-auto space-y-12">
        <Link
          href="/#lab"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-yellow-400" />
          <span>RETURN TO DIGITAL LAB // ACTIVE PROTOTYPES</span>
        </Link>

        {/* Experiment Header */}
        <div className="space-y-4 border-b border-white/10 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="text-yellow-400 font-bold">{exp.code}</span>
            <span className="text-white/20">|</span>
            <span className="text-zinc-400">{exp.category}</span>
            <span className="text-white/20">|</span>
            <span className="text-emerald-400">{exp.status}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-mono">
            {exp.title}
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 font-mono">{exp.tagline}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono rounded bg-white/5 border border-white/10 text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Technical Description */}
        <div className="p-6 rounded-xl border border-white/10 bg-[#0c1018] space-y-3 font-mono text-xs sm:text-sm">
          <span className="text-yellow-400 font-semibold block uppercase">PROTOTYPE EXPERIMENT RECORD:</span>
          <p className="text-zinc-300 leading-relaxed font-sans">{exp.description}</p>
        </div>

        {/* Instructions & Interactive Sandbox note */}
        <div className="p-6 rounded-xl border border-yellow-500/20 bg-yellow-500/[0.03] space-y-2 font-mono text-xs">
          <span className="text-yellow-400 font-semibold uppercase block">SANDBOX INSTRUCTIONS:</span>
          <p className="text-zinc-300 leading-relaxed">{exp.instructions}</p>
        </div>

        {/* Footer */}
        <div className="pt-12 border-t border-white/10 flex justify-between items-center text-xs font-mono">
          <Link href="/#lab" className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO ALL EXPERIMENTS</span>
          </Link>
          <span className="text-zinc-500">SILVER QUILL // THE EXPERIMENTAL LAB</span>
        </div>
      </div>
    </div>
  );
}
