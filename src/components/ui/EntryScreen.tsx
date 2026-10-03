"use client";

import React, { useState, useEffect } from "react";
import { useSystem } from "@/context/SystemContext";
import { ArrowRight, SkipForward } from "lucide-react";

export default function EntryScreen() {
  const { entryCompleted, setEntryCompleted, playSound } = useSystem();
  const [bootStep, setBootStep] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const bootLogs = [
    { text: "QUILL.SYSTEM BOOTING...", status: "OK" },
    { text: "ACADEMICS ................... SRM IST [9.05] × IIT MADRAS", status: "VERIFIED" },
    { text: "ENGINEERING ARCHIVE ......... KIROSHI, WHISP, QUANTAFEAT", status: "MOUNTED" },
    { text: "RESEARCH BENCHMARK .......... YOLO26n-Seg × INT8 PTQ", status: "ONLINE" },
  ];

  const handleEnter = () => {
    playSound("boot");
    if (typeof window !== "undefined") {
      sessionStorage.setItem("quill_entry_skipped", "true");
    }
    setEntryCompleted(true);
  };

  useEffect(() => {
    if (entryCompleted) return;

    // Fast sequential log advance (every 320ms)
    const logInterval = setInterval(() => {
      setBootStep((prev) => (prev < bootLogs.length ? prev + 1 : prev));
    }, 320);

    // Automatically close bootloader after exactly 2 seconds
    const autoCloseTimer = setTimeout(() => {
      setIsFading(true);
      setTimeout(() => {
        handleEnter();
      }, 250);
    }, 2000);

    return () => {
      clearInterval(logInterval);
      clearTimeout(autoCloseTimer);
    };
  }, [entryCompleted]);

  if (entryCompleted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#07090e] px-4 font-mono select-none transition-all duration-300 ease-out ${
        isFading ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />

      <div className="w-full max-w-lg rounded-xl border border-white/10 bg-[#0c1018]/95 p-6 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
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

        {/* Boot Logs */}
        <div className="space-y-2 mb-5 min-h-[110px]">
          {bootLogs.slice(0, bootStep).map((log, index) => (
            <div key={index} className="flex items-center justify-between text-xs">
              <span className="text-zinc-300 flex items-center gap-2">
                <span className="text-orange-400">›</span> {log.text}
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                {log.status}
              </span>
            </div>
          ))}
          {bootStep < bootLogs.length && (
            <div className="flex items-center gap-2 text-xs text-orange-400/80 animate-pulse">
              <span>›</span> INITIALIZING...
            </div>
          )}
        </div>

        {/* 2-Second Auto-dismiss Progress Bar */}
        <div className="space-y-2 pt-3 border-t border-white/10">
          <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span>AUTO-ENTERING SYSTEM (2.0s)</span>
            <span className="text-orange-400 font-bold">READY</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 rounded-full"
              style={{
                animation: "autoCloseProgress 2s linear forwards",
              }}
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-3">
          <span className="text-[9px] text-zinc-500">PRESS ANY KEY TO COMMENCE</span>
          <button
            onClick={handleEnter}
            className="flex items-center gap-1.5 px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 text-black font-semibold text-xs tracking-wider transition-all shadow-[0_0_15px_rgba(255,140,55,0.3)]"
          >
            <span>ENTER</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes autoCloseProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
