"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSystem } from "@/context/SystemContext";
import { Volume2, VolumeX, Terminal, Menu, X, Radio } from "lucide-react";

const NAV_ITEMS = [
  { id: "identity", label: "01 IDENTITY", href: "#identity" },
  { id: "work", label: "02 WORK", href: "#work" },
  { id: "research", label: "03 RESEARCH", href: "#research" },
  { id: "experience", label: "04 EXP", href: "#experience" },
  { id: "stack", label: "05 STACK", href: "#stack" },
  { id: "writing", label: "06 NOTES", href: "#writing" },
  { id: "lab", label: "07 LAB", href: "#lab" },
  { id: "contact", label: "08 CONTACT", href: "#contact" },
];

export default function Navbar() {
  const {
    activeSection,
    setActiveSection,
    setCoreMode,
    commandPaletteOpen,
    setCommandPaletteOpen,
    soundEnabled,
    toggleSound,
    playSound,
  } = useSystem();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [istTime, setIstTime] = useState("");
  const [scrolled, setScrolled] = useState(false);

  // Live IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setIstTime(new Intl.DateTimeFormat("en-GB", options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string, href: string) => {
    playSound("click");
    setActiveSection(id);

    // Sync 3D core mode
    if (id === "identity") setCoreMode("identity");
    else if (id === "work") setCoreMode("work");
    else if (id === "research") setCoreMode("research");
    else if (id === "lab") setCoreMode("lab");
    else if (id === "contact") setCoreMode("contact");

    setMobileMenuOpen(false);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#07090e]/85 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Branding & System State */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            onClick={() => handleNavClick("identity", "#identity")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse-subtle shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="font-mono text-xs font-semibold tracking-widest text-white group-hover:text-orange-400 transition-colors">
              QUILL<span className="text-orange-400/80">.SYSTEM</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-white/10 text-[11px] font-mono text-zinc-400">
            <span className="flex items-center gap-1.5 text-zinc-500">
              <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
              ONLINE
            </span>
            <span className="text-white/20">|</span>
            <span className="text-zinc-400">CHENNAI [IST {istTime || "00:00:00"}]</span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id, item.href);
                }}
                className={`relative px-2.5 py-1 text-[11px] font-mono tracking-wider transition-all duration-200 rounded ${
                  isActive
                    ? "text-orange-400 bg-orange-400/10 border border-orange-400/30"
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Audio Toggle & Command Palette Trigger */}
        <div className="flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? "Mute audio" : "Enable procedural interface sound"}
            title={soundEnabled ? "Audio ON (Click to Mute)" : "Audio Muted (Click to Enable)"}
            className={`p-2 rounded border text-xs font-mono flex items-center gap-1.5 transition-all ${
              soundEnabled
                ? "border-orange-500/40 bg-orange-500/10 text-orange-400 shadow-[0_0_12px_rgba(255,140,55,0.2)]"
                : "border-white/10 bg-white/[0.02] text-zinc-400 hover:text-white hover:border-white/20"
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[10px]">{soundEnabled ? "SFX ON" : "MUTED"}</span>
          </button>

          {/* Command Palette Button */}
          <button
            onClick={() => {
              playSound("click");
              setCommandPaletteOpen(true);
            }}
            aria-label="Open system command palette (Ctrl+K or Cmd+K)"
            className="flex items-center gap-2 px-3 py-1.5 rounded border border-white/10 bg-white/[0.03] hover:border-orange-500/40 hover:bg-white/[0.06] text-zinc-300 hover:text-white transition-all text-xs font-mono"
          >
            <Terminal className="w-3.5 h-3.5 text-orange-400" />
            <span className="hidden sm:inline text-[11px]">COMMAND</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 text-[9px] bg-white/10 text-zinc-400 rounded">⌘K</kbd>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => {
              playSound("click");
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            aria-label="Toggle mobile menu"
            className="md:hidden p-2 rounded border border-white/10 text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#07090e]/95 backdrop-blur-xl border-b border-white/10 px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center justify-between py-1 px-2 border-b border-white/5 text-[10px] font-mono text-zinc-500">
            <span>LOCATION: CHENNAI [IST +05:30]</span>
            <span className="text-emerald-400">SYSTEM ONLINE</span>
          </div>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id, item.href);
              }}
              className={`block px-3 py-2 text-xs font-mono tracking-wider rounded transition-colors ${
                activeSection === item.id
                  ? "text-orange-400 bg-orange-400/10 border border-orange-400/30"
                  : "text-zinc-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
