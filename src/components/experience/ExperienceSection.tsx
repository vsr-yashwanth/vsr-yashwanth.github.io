"use client";

import React, { useState } from "react";
import { experienceData } from "@/data/experience";
import { useSystem } from "@/context/SystemContext";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

export default function ExperienceSection() {
  const { playSound, setCursorText } = useSystem();
  const [filterType, setFilterType] = useState<string>("ALL");

  const types = ["ALL", "RESEARCH", "HACKATHON", "LEADERSHIP", "COMMUNITY"];

  const filteredItems =
    filterType === "ALL"
      ? experienceData
      : experienceData.filter((item) => item.type === filterType);

  return (
    <section
      id="experience"
      className="py-16 relative bg-[#07090e] border-t border-white/10"
      aria-label="Experience and Leadership Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold tracking-widest uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>04 // TIMELINE &amp; ROLES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              EXPERIENCE &amp; <span className="text-amber-400">LEADERSHIP</span>
            </h2>
          </div>

          {/* Filter Type Pills */}
          <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl border border-white/10 bg-[#0c1018]">
            {types.map((t) => (
              <button
                key={t}
                onClick={() => {
                  playSound("hover");
                  setFilterType(t);
                }}
                className={`px-2.5 py-1 text-xs font-mono rounded-lg transition-all ${
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

        {/* Compact Timeline Grid (2 columns on medium+ screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-white/10 bg-[#0c1018] p-5 space-y-3 hover:border-amber-400/30 transition-all flex flex-col justify-between"
              onMouseEnter={() => setCursorText("EXP")}
              onMouseLeave={() => setCursorText("")}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-400/20 font-semibold">
                    {item.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-zinc-500 text-[11px]">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                    {item.role}
                  </h3>
                  <div className="text-xs font-mono text-zinc-400 flex items-center gap-1.5 mt-0.5">
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

                {/* 2 Key Responsibilities */}
                <ul className="text-xs font-mono text-zinc-300 space-y-1 pt-1">
                  {item.achievements.slice(0, 2).map((ach, i) => (
                    <li key={i} className="flex items-start gap-1.5 line-clamp-2">
                      <span className="text-amber-400 mt-0.5">›</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/5">
                {item.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[10px] font-mono text-zinc-400"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
