"use client";

import React, { useState, useEffect } from "react";
import { useSystem } from "@/context/SystemContext";
import { Terminal, ArrowRight, SkipForward } from "lucide-react";

export default function EntryScreen() {
  const { entryCompleted, setEntryCompleted, playSound } = useSystem();
  const [bootStep, setBootStep] = useState(0);

  const bootLogs = [
    { text: "QUILL.SYSTEM INITIALIZING...", status: "OK" },
    { text: "IDENTITY .................... FOUND [SRM × IIT MADRAS]", status: "VERIFIED" },
    { text: "PROJECTS ARCHIVE ............ LOADED [KIROSHI, WHISP, QUANTAFEAT]", status: "MOUNTED" },
    { text: "RESEARCH RECORD ............. ACTIVE [YOLO26n-Seg × INT8 PTQ]", status: "ONLINE" },
    { text: "EXPERIMENTAL LAB ............ READY [N-BODY, WEC TELEMETRY]", status: "ARMED" },
  ];

  useEffect(() => {
    if (entryCompleted) return;

    // Fast sequential boot (each step 300ms)
    const interval = setInterval(() => {
      setBootStep((prev) => {
        if (prev < bootLogs.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 280);

    return () => clearInterval(interval);
  }, [entryCompleted, bootLogs.length]);

  const handleEnter = () => {
    playSound("boot");
    if (typeof window !== "undefined") {
      sessionStorage.setItem("quill_entry_skipped", "true");
    }
    setEntryCompleted(true);
  };

  if (entryCompleted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07090e] px-4 font-mono select-none">
      {/* Background subtle scanline */}
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

      <div className="w-full max-w-xl rounded-xl border border-white/10 bg-[#0c1018]/90 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
            <span className="text-xs tracking-wider text-orange-400 font-semibold">
              BOOTLOADER // SILVER QUILL
            </span>
          </div>
          <button
            onClick={handleEnter}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-2 py-1 rounded border border-white/10 hover:border-white/20 transition-colors"
          >
            <SkipForward className="w-3 h-3" />
            <span>SKIP</span>
          </button>
        </div>

        {/* Boot Sequence Lines */}
        <div className="space-y-3 mb-8 min-h-[160px]">
          {bootLogs.slice(0, bootStep).map((log, index) => (
            <div key={index} className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-zinc-300 flex items-center gap-2">
                <span className="text-orange-400">›</span> {log.text}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                {log.status}
              </span>
            </div>
          ))}
          {bootStep < bootLogs.length && (
            <div className="flex items-center gap-2 text-xs text-orange-400/80 animate-pulse">
              <span>›</span> INITIALIZING SUBSYSTEMS...
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-[10px] text-zinc-500">PRESS ENTER OR CLICK TO COMMENCE</span>
          <button
            onClick={handleEnter}
            className="flex items-center gap-2 px-5 py-2.5 rounded bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs tracking-widest transition-all shadow-[0_0_20px_rgba(255,140,55,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>ENTER LAB</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
