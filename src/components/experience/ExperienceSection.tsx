"use client";

import React, { useState } from "react";
import { experienceData } from "@/data/experience";
import { useSystem } from "@/context/SystemContext";
import { Briefcase, Calendar, MapPin, Award, ChevronRight, ExternalLink } from "lucide-react";

export default function ExperienceSection() {
  const { playSound, setCursorText } = useSystem();
  const [filterType, setFilterType] = useState<string>("ALL");

  const types = ["ALL", "RESEARCH", "HACKATHON", "LEADERSHIP", "COMMUNITY"];

  const filteredItems = filterType === "ALL"
    ? experienceData
    : experienceData.filter((item) => item.type === filterType);

  return (
    <section
      id="experience"
      className="py-24 relative bg-[#07090e] border-t border-white/10"
      aria-label="Experience and Leadership Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>04 // TIMELINE & ROLES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase">
              EXPERIENCE & <span className="text-amber-400">LEADERSHIP</span>
            </h2>
            <p className="mt-2 text-sm text-zinc-400 font-mono max-w-xl">
              Chronological record of engineering internships, hackathon team leadership, and institutional responsibilities.
            </p>
          </div>

          {/* Filter Type Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border border-white/10 bg-[#0c1018]">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => {
                  playSound("hover");
                  setFilterType(t);
                }}
                className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                  filterType === t
                    ? "bg-amber-400 text-black font-semibold shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Items */}
        <div className="relative border-l border-white/15 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="relative group"
              onMouseEnter={() => setCursorText("EXP")}
              onMouseLeave={() => setCursorText("")}
            >
              {/* Timeline Node Point */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 border-amber-400 bg-[#07090e] group-hover:scale-125 group-hover:bg-amber-400 transition-all shadow-[0_0_10px_rgba(245,158,11,0.5)]" />

              {/* Experience Card */}
              <div className="rounded-xl border border-white/10 bg-[#0c1018] p-6 sm:p-7 space-y-4 hover:border-amber-400/30 transition-all">
                {/* Meta Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2 text-zinc-400">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>{item.period}</span>
                    <span className="text-white/20">|</span>
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{item.location}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20">
                    {item.type}
                  </span>
                </div>

                {/* Role and Organization */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {item.role}
                  </h3>
                  <div className="text-sm font-mono text-zinc-400 mt-1 flex items-center gap-2">
                    <span>{item.organization}</span>
                    {item.organizationUrl && (
                      <a
                        href={item.organizationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-white"
                      >
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Key Contributions & Achievements */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                    KEY RESPONSIBILITIES & CONTRIBUTIONS:
                  </span>
                  <ul className="space-y-1.5 text-xs font-mono text-zinc-300">
                    {item.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">›</span>
                        <span className="leading-relaxed">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skills used */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[10px] font-mono text-zinc-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
