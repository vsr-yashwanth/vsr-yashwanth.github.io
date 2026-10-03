"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { experimentsData, LabExperiment } from "@/data/experiments";
import { useSystem } from "@/context/SystemContext";
import { FlaskConical, Play, RefreshCw, Zap, Sliders, ArrowRight } from "lucide-react";

export default function LabSection() {
  const { playSound, setCursorText, setCoreMode } = useSystem();
  const [activeExp, setActiveExp] = useState<LabExperiment>(experimentsData[0]);

  // Particle Field Canvas Ref & State
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // WEC Telemetry Simulation State
  const [wecLaps, setWecLaps] = useState(1);
  const [wecWeather, setWecWeather] = useState<"CLEAR" | "RAIN">("CLEAR");
  const [wecSafetyCar, setWecSafetyCar] = useState(false);
  const [wecLeaderTime, setWecLeaderTime] = useState("3:26.412");

  // Mesh Radio Simulation State
  const [radioHops, setRadioHops] = useState(1);
  const [custodyBundles, setCustodyBundles] = useState(4);

  // Canvas interactive simulation for [001] Particle Field
  useEffect(() => {
    if (activeExp.id !== "particle-field") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 350);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; color: string }[] = [];
    const colors = ["#ff8c37", "#00e5ff", "#10b981", "#edf2f7"];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    const handleClick = () => {
      playSound("click");
      // Explosive dispersion pulse
      particles.forEach((p) => {
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        p.vx += (dx / dist) * 8;
        p.vy += (dy / dist) * 8;
      });
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    let animId: number;
    const render = () => {
      ctx.fillStyle = "rgba(7, 9, 14, 0.25)";
      ctx.fillRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        // Gravitational pull toward cursor if hovering
        if (isHovering) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 5) {
            p.vx += (dx / dist) * 0.12;
            p.vy += (dy / dist) * 0.12;
          }
        }

        // Apply friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        p.x += p.vx;
        p.y += p.vy;

        // Bounce walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect close neighbors
        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 140, 55, ${0.15 * (1 - dist / 60)})`;
            ctx.stroke();
          }
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
    };
  }, [activeExp.id, playSound]);

  // WEC Simulation Next Lap
  const stepWecLap = () => {
    playSound("click");
    setWecLaps((prev) => prev + 1);

    // Dynamic lap time based on weather
    const baseSec = wecWeather === "CLEAR" ? 206 : 228;
    const delta = (Math.random() * 3 - 1.5).toFixed(3);
    const totalSec = baseSec + parseFloat(delta);
    const mins = Math.floor(totalSec / 60);
    const secs = (totalSec % 60).toFixed(3);
    setWecLeaderTime(`${mins}:${secs.padStart(6, "0")}`);
  };

  return (
    <section
      id="lab"
      className="py-16 relative bg-[#07090e] border-t border-white/10"
      aria-label="Experimental Lab Section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-yellow-400 font-semibold tracking-widest uppercase mb-1">
              <FlaskConical className="w-3.5 h-3.5" />
              <span>07 // THE EXPERIMENTAL LAB</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              ACTIVE <span className="text-yellow-400">PROTOTYPES</span>
            </h2>
          </div>

          <span className="text-xs font-mono text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded border border-yellow-400/20">
            INTERACTIVE SANDBOX
          </span>
        </div>

        {/* Experiment Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
          {experimentsData.map((exp) => {
            const isSelected = activeExp.id === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => {
                  playSound("click");
                  setActiveExp(exp);
                  setCoreMode("lab");
                }}
                onMouseEnter={() => setCursorText("LAB")}
                onMouseLeave={() => setCursorText("")}
                className={`p-3 rounded-xl border text-left transition-all font-mono text-xs ${
                  isSelected
                    ? "border-yellow-400 bg-yellow-400/15 text-white shadow-[0_0_15px_rgba(250,204,21,0.2)]"
                    : "border-white/10 bg-[#0c1018] text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className="text-[10px] text-yellow-400 font-bold">{exp.code}</div>
                <div className="font-semibold truncate mt-0.5">{exp.title}</div>
              </button>
            );
          })}
        </div>

        {/* Live Interactive Experiment Runner Workspace */}
        <div className="rounded-2xl border border-white/15 bg-[#090d15] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          {/* Header Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className="text-yellow-400 font-bold">{activeExp.code}</span>
                <span>•</span>
                <span>{activeExp.category}</span>
                <span>•</span>
                <span className="text-emerald-400">{activeExp.status}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-mono mt-1">
                {activeExp.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {activeExp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] font-mono text-zinc-400"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <p className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed">
            {activeExp.description}
          </p>

          {/* Interactive Workspace Area Based on Active Experiment */}
          <div className="rounded-xl border border-white/10 bg-black/60 p-4 min-h-[360px] flex flex-col justify-center relative overflow-hidden">
            {activeExp.id === "particle-field" && (
              <div className="relative w-full h-[320px] flex items-center justify-center">
                <canvas ref={canvasRef} className="w-full h-full block cursor-crosshair" />
                <div className="absolute top-3 left-3 text-[10px] font-mono text-zinc-500 bg-black/80 px-2 py-1 rounded border border-white/10">
                  {activeExp.instructions}
                </div>
              </div>
            )}

            {activeExp.id === "wec-telemetry-runner" && (
              <div className="w-full space-y-4 font-mono text-xs">
                {/* WEC Control Panel */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg border border-white/10 bg-white/[0.02]">
                  <div className="flex items-center gap-4">
                    <span className="text-zinc-400">CURRENT LAP:</span>
                    <span className="text-yellow-400 text-lg font-bold">{wecLaps} / 720 (LE MANS 24H)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setWecWeather(wecWeather === "CLEAR" ? "RAIN" : "CLEAR")}
                      className="px-3 py-1 rounded border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-300"
                    >
                      WEATHER: <span className={wecWeather === "RAIN" ? "text-cyan-400 font-bold" : "text-amber-400"}>{wecWeather}</span>
                    </button>
                    <button
                      onClick={() => setWecSafetyCar(!wecSafetyCar)}
                      className={`px-3 py-1 rounded border font-bold ${
                        wecSafetyCar ? "bg-amber-500 text-black border-amber-400" : "bg-white/5 border-white/15 text-zinc-400"
                      }`}
                    >
                      {wecSafetyCar ? "SAFETY CAR ACTIVE" : "GREEN FLAG"}
                    </button>
                    <button
                      onClick={stepWecLap}
                      className="flex items-center gap-1.5 px-4 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                    >
                      <Play className="w-3 h-3" />
                      <span>NEXT LAP</span>
                    </button>
                  </div>
                </div>

                {/* Telemetry Leaderboard Screen */}
                <div className="p-4 rounded-lg border border-white/10 bg-black/90 space-y-2">
                  <div className="flex justify-between text-[11px] text-zinc-500 border-b border-white/10 pb-1">
                    <span>POS / CLASS</span>
                    <span>CAR & ENTRY</span>
                    <span>LAST LAP TIME</span>
                    <span>STATUS</span>
                  </div>
                  <div className="flex justify-between text-white font-semibold">
                    <span className="text-yellow-400">P1 [HYPERCAR]</span>
                    <span>#51 Ferrari 499P (AF Corse)</span>
                    <span className="text-emerald-400">{wecLeaderTime}</span>
                    <span className="text-emerald-400">ACTIVE LEADER</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-cyan-400">P2 [HYPERCAR]</span>
                    <span>#6 Porsche 963 (Penske Motorsport)</span>
                    <span className="text-zinc-400">+1.240s</span>
                    <span className="text-zinc-400">CHASING</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span className="text-purple-400">P1 [LMGT3]</span>
                    <span>#92 Manthey PureRxcing 911 GT3 R</span>
                    <span className="text-zinc-400">3:58.210</span>
                    <span className="text-cyan-400">TIRES: {wecWeather === "RAIN" ? "WETS" : "SLICKS"}</span>
                  </div>
                </div>
              </div>
            )}

            {activeExp.id === "crack-severity-analyzer" && (
              <div className="w-full space-y-4 font-mono text-xs">
                <div className="p-4 rounded-lg border border-white/10 bg-black/80 space-y-3">
                  <span className="text-yellow-400 font-semibold block">EDGE QUANTIZATION CALIBRATION TESTBED</span>
                  <p className="text-zinc-400 leading-relaxed font-sans text-xs">
                    Simulates symmetric 8-bit clipping against continuous FP32 tensor distributions.
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <span className="text-zinc-400">CALIBRATION RANGE:</span>
                    <span className="text-emerald-400 font-bold">[-128, 127] SYMMETRIC INT8</span>
                  </div>
                  <div className="p-3 rounded bg-white/[0.02] border border-white/5 text-[11px] text-zinc-400">
                    STATUS: Graph Constant Folding Complete. Ready to execute on Jetson / Raspberry Pi NPU accelerators.
                  </div>
                </div>
              </div>
            )}

            {activeExp.id === "quantum-superposition-router" && (
              <div className="w-full space-y-4 font-mono text-xs">
                <div className="p-4 rounded-lg border border-white/10 bg-black/80 space-y-3">
                  <span className="text-purple-400 font-semibold block">QUBO PENALTY MATRIX FORMULATION</span>
                  <p className="text-zinc-400 leading-relaxed font-sans text-xs">
                    Formulating route graph penalty terms: H = ∑ Q_ij * x_i * x_j subject to capacity and delay boundaries.
                  </p>
                  <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[10px]">
                    <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300">
                      STATE |0011⟩: 32%
                    </div>
                    <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300">
                      STATE |0101⟩: 48% (MIN)
                    </div>
                    <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300">
                      STATE |1100⟩: 12%
                    </div>
                    <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300">
                      STATE |1110⟩: 8%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeExp.id === "mesh-packet-hopper" && (
              <div className="w-full space-y-4 font-mono text-xs">
                <div className="p-4 rounded-lg border border-white/10 bg-black/80 space-y-3">
                  <span className="text-cyan-400 font-semibold block">DTN STORE-AND-FORWARD CUSTODY DISPATCH</span>
                  <div className="flex items-center justify-between text-zinc-300">
                    <span>ACTIVE BUFFERED PACKETS: {custodyBundles}</span>
                    <button
                      onClick={() => {
                        playSound("click");
                        setRadioHops((prev) => prev + 1);
                        setCustodyBundles((prev) => Math.max(0, prev - 1));
                      }}
                      className="px-3 py-1 rounded bg-cyan-500 text-black font-bold"
                    >
                      TRIGGER RADIO HOP
                    </button>
                  </div>
                  <div className="p-3 rounded bg-white/[0.02] border border-white/5 text-[11px] text-zinc-400">
                    HOP COUNT: {radioHops} | PRoPHET PROBABILISTIC DELIVERY ESTIMATE: 89.4%
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer instruction note */}
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-2 border-t border-white/5">
            <span>INSPECTION NOTE: {activeExp.instructions}</span>
            <Link
              href={`/lab/${activeExp.slug}`}
              className="text-yellow-400 hover:text-yellow-300 flex items-center gap-1 font-semibold"
            >
              <span>DEDICATED LAB VIEW</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
