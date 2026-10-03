"use client";

import React, { useState } from "react";
import { techStackData, TechItem } from "@/data/stack";
import { projectsData } from "@/data/projects";
import { useSystem } from "@/context/SystemContext";
import { Cpu, Terminal, Layers, Database, Wrench, ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function TechConstellation() {
  const { playSound, setCursorText } = useSystem();
  const [selectedTech, setSelectedTech] = useState<TechItem>(techStackData[0]);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  const categories = [
    { id: "ALL", label: "ALL MATRIX" },
    { id: "LANGUAGES", label: "LANGUAGES" },
    { id: "AI / ML", label: "AI & VISION" },
    { id: "SYSTEMS & WEB", label: "SYSTEMS & WEB" },
    { id: "DATA & STORAGE", label: "DATA & SECURITY" },
    { id: "TOOLS & EXPERIMENTAL", label: "TOOLS & GRAPHICS" },
  ];

  const filteredTech = activeCategory === "ALL"
    ? techStackData
    : techStackData.filter((t) => t.category === activeCategory);

  // Find projects associated with the selected technology
  const associatedProjectsList = projectsData.filter((p) =>
    selectedTech.associatedProjects.includes(p.id) ||
    selectedTech.associatedProjects.includes(p.slug) ||
    p.technologies.some((tech) => tech.toLowerCase().includes(selectedTech.name.toLowerCase()))
  );

  return (
    <section
      id="stack"
      className="py-16 relative bg-[#07090e] border-t border-white/10"
      aria-label="Technology Constellation Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 font-semibold tracking-widest uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>05 // TECHNOLOGY CONSTELLATION</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              TECHNICAL <span className="text-purple-400">INDEX</span>
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-white/10 bg-[#0c1018]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playSound("hover");
                  setActiveCategory(cat.id);
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                  activeCategory === cat.id
                    ? "bg-purple-500 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.4)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Matrix Grid + Project Linkage Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Tech Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredTech.map((item) => {
              const isSelected = selectedTech.name === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    playSound("click");
                    setSelectedTech(item);
                  }}
                  onMouseEnter={() => {
                    playSound("hover");
                    setCursorText("NODE");
                  }}
                  onMouseLeave={() => setCursorText("")}
                  className={`p-4 rounded-xl border text-left transition-all relative overflow-hidden group ${
                    isSelected
                      ? "border-purple-400 bg-purple-500/15 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
                      : "border-white/10 bg-[#0c1018] hover:border-white/25 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">{item.category}</span>
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.proficiencyLevel === "CORE"
                          ? "bg-emerald-400"
                          : item.proficiencyLevel === "PROFICIENT"
                          ? "bg-cyan-400"
                          : "bg-amber-400"
                      }`}
                    />
                  </div>
                  <h4 className="text-sm font-mono font-bold text-white group-hover:text-purple-300 transition-colors">
                    {item.name}
                  </h4>
                  <div className="mt-2 text-[10px] font-mono text-zinc-400 line-clamp-2">
                    {item.description}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Node Inspector & Linked Projects (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 bg-[#0c1018] p-6 space-y-6 sticky top-24">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  SELECTED NODE INSPECTOR
                </span>
                <h3 className="text-2xl font-bold text-white font-mono mt-0.5">{selectedTech.name}</h3>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                {selectedTech.proficiencyLevel}
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <span className="text-zinc-500 block text-[10px] uppercase">PRACTICAL USAGE NOTE:</span>
              <p className="text-zinc-300 leading-relaxed font-sans">{selectedTech.description}</p>
            </div>

            {/* Linked Projects list */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400 font-semibold">
                  ASSOCIATED PROJECTS [{associatedProjectsList.length}]
                </span>
                <span className="text-[10px] font-mono text-emerald-400">APPLIED EVIDENCE</span>
              </div>

              {associatedProjectsList.length === 0 ? (
                <div className="p-4 rounded-lg border border-white/5 bg-black/40 text-xs font-mono text-zinc-500">
                  Foundational computational utility applied across multiple algorithms and experimental scripts.
                </div>
              ) : (
                <div className="space-y-2">
                  {associatedProjectsList.map((p) => (
                    <Link
                      key={p.id}
                      href={`/projects/${p.slug}`}
                      className="block p-3 rounded-lg border border-white/10 bg-black/40 hover:border-purple-400/40 hover:bg-purple-500/[0.04] transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-white group-hover:text-purple-300">
                          {p.title}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400 line-clamp-1 mt-0.5">
                        {p.subtitle}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
