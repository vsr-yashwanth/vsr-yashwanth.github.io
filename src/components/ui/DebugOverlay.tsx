"use client";

import React, { useState, useEffect } from "react";
import { useSystem } from "@/context/SystemContext";
import { Bug, X, Activity } from "lucide-react";

export default function DebugOverlay() {
  const { debugMode, setDebugMode, activeSection, coreMode, soundEnabled } = useSystem();
  const [fps, setFps] = useState(60);
  const [windowDims, setWindowDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!debugMode) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };

    animId = requestAnimationFrame(calcFps);

    const updateDims = () => {
      setWindowDims({ w: window.innerWidth, h: window.innerHeight });
    };
    updateDims();
    window.addEventListener("resize", updateDims);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", updateDims);
    };
  }, [debugMode]);

  if (!debugMode) return null;

  return (
    <aside
      className="fixed bottom-4 right-4 z-50 p-4 rounded-xl border border-red-500/40 bg-[#07090e]/95 backdrop-blur-md shadow-[0_0_30px_rgba(239,68,68,0.2)] font-mono text-xs w-72 text-zinc-300"
      aria-label="Quill Debug Telemetry HUD"
    >
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
        <div className="flex items-center gap-1.5 text-red-400 font-semibold">
          <Bug className="w-3.5 h-3.5" />
          <span>QUILL // DEBUG PROTOCOL</span>
        </div>
        <button
          onClick={() => setDebugMode(false)}
          className="text-zinc-500 hover:text-white"
          aria-label="Close debug overlay"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-1.5 text-[11px]">
        <div className="flex justify-between">
          <span className="text-zinc-500">FPS REFRESH:</span>
          <span className={`font-bold ${fps > 45 ? "text-emerald-400" : "text-amber-400"}`}>{fps} FPS</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">ACTIVE SECTION:</span>
          <span className="text-orange-400 uppercase">{activeSection}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">3D CORE STATE:</span>
          <span className="text-cyan-400 uppercase">{coreMode}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">SFX SYNTHESIZER:</span>
          <span className={soundEnabled ? "text-emerald-400" : "text-zinc-500"}>
            {soundEnabled ? "ONLINE" : "MUTED"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">VIEWPORT RESOLUTION:</span>
          <span className="text-zinc-300">
            {windowDims.w} × {windowDims.h}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-zinc-500">RUNTIME:</span>
          <span className="text-zinc-300">NEXT 16 + REACT 19</span>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-1 text-[9px] text-zinc-500">
        <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
        <span>KONAMI CHEAT CODE ACTIVATED</span>
      </div>
    </aside>
  );
}
