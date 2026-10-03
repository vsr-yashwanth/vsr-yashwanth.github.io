"use client";

import React from "react";
import { socialConfig } from "@/data/social";
import { ArrowUp, Terminal } from "lucide-react";
import { useSystem } from "@/context/SystemContext";

export default function Footer() {
  const { playSound, setCursorText } = useSystem();

  const scrollToTop = () => {
    playSound("click");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-white/10 bg-[#04060a] text-zinc-500 font-mono text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand & Location */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>SILVER QUILL</span>
              <span className="text-zinc-600">//</span>
              <span className="text-zinc-400 font-normal">DIGITAL LAB & RESEARCH ARCHIVE</span>
            </div>
            <p className="text-[11px] text-zinc-500">
              CHENNAI, INDIA • SRM INSTITUTE OF SCIENCE AND TECHNOLOGY × IIT MADRAS
            </p>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            onMouseEnter={() => setCursorText("TOP")}
            onMouseLeave={() => setCursorText("")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/10 hover:border-white/25 text-zinc-400 hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div className="flex flex-wrap items-center gap-4 text-zinc-400">
            <a href={socialConfig.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GITHUB
            </a>
            <span className="text-zinc-700">•</span>
            <a href={socialConfig.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LINKEDIN
            </a>
            <span className="text-zinc-700">•</span>
            <a href={socialConfig.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              INSTAGRAM
            </a>
            <span className="text-zinc-700">•</span>
            <a href="#contact" className="hover:text-white transition-colors">
              CONTACT
            </a>
          </div>

          <div className="text-zinc-600 text-center sm:text-right">
            Built with curiosity, caffeine, and questionable amounts of JavaScript. © 2026 SILVER QUILL.
          </div>
        </div>
      </div>
    </footer>
  );
}
