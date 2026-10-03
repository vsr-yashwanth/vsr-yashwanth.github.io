"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSystem } from "@/context/SystemContext";
import { socialConfig } from "@/data/social";
import {
  Terminal,
  Search,
  ArrowRight,
  ExternalLink,
  Download,
  FileCode,
  BookOpen,
  FlaskConical,
  Mail,
  Volume2,
  Bug,
  X,
} from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  category: "NAVIGATION" | "ACTIONS" | "EXTERNAL" | "EASTER EGG";
  icon: React.ReactNode;
  shortcut?: string;
  perform: () => void;
}

export default function CommandPalette() {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    setActiveSection,
    setCoreMode,
    soundEnabled,
    toggleSound,
    playSound,
    setDebugMode,
  } = useSystem();

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [easterEggMessage, setEasterEggMessage] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commandPaletteOpen) {
      playSound("click");
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setEasterEggMessage(null);
    }
  }, [commandPaletteOpen, playSound]);

  const navigateTo = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === "identity") setCoreMode("identity");
    else if (sectionId === "work") setCoreMode("work");
    else if (sectionId === "research") setCoreMode("research");
    else if (sectionId === "lab") setCoreMode("lab");
    else if (sectionId === "contact") setCoreMode("contact");

    setCommandPaletteOpen(false);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const commands: CommandItem[] = [
    {
      id: "nav-identity",
      label: "Go to Identity (About Quill)",
      category: "NAVIGATION",
      icon: <Terminal className="w-4 h-4 text-orange-400" />,
      shortcut: "G I",
      perform: () => navigateTo("identity"),
    },
    {
      id: "nav-work",
      label: "Go to Selected Work (Projects)",
      category: "NAVIGATION",
      icon: <FileCode className="w-4 h-4 text-cyan-400" />,
      shortcut: "G W",
      perform: () => navigateTo("work"),
    },
    {
      id: "nav-research",
      label: "Go to Research Archive (YOLO26n-Seg PTQ)",
      category: "NAVIGATION",
      icon: <FlaskConical className="w-4 h-4 text-emerald-400" />,
      shortcut: "G R",
      perform: () => navigateTo("research"),
    },
    {
      id: "nav-experience",
      label: "Go to Experience & Leadership",
      category: "NAVIGATION",
      icon: <Terminal className="w-4 h-4 text-amber-400" />,
      shortcut: "G E",
      perform: () => navigateTo("experience"),
    },
    {
      id: "nav-stack",
      label: "Go to Technology Constellation",
      category: "NAVIGATION",
      icon: <FileCode className="w-4 h-4 text-purple-400" />,
      shortcut: "G S",
      perform: () => navigateTo("stack"),
    },
    {
      id: "nav-writing",
      label: "Open The Notebook & Paperhearts Novel",
      category: "NAVIGATION",
      icon: <BookOpen className="w-4 h-4 text-rose-400" />,
      shortcut: "G N",
      perform: () => navigateTo("writing"),
    },
    {
      id: "nav-lab",
      label: "Enter Experimental Lab",
      category: "NAVIGATION",
      icon: <FlaskConical className="w-4 h-4 text-yellow-400" />,
      shortcut: "G L",
      perform: () => navigateTo("lab"),
    },
    {
      id: "act-resume",
      label: "Download Official Resume (PDF)",
      category: "ACTIONS",
      icon: <Download className="w-4 h-4 text-emerald-400" />,
      shortcut: "D R",
      perform: () => {
        window.open(socialConfig.resumeUrl, "_blank");
        setCommandPaletteOpen(false);
      },
    },
    {
      id: "act-sound",
      label: soundEnabled ? "Mute Interface Audio" : "Enable Procedural Interface Sound",
      category: "ACTIONS",
      icon: <Volume2 className="w-4 h-4 text-orange-400" />,
      perform: () => {
        toggleSound();
      },
    },
    {
      id: "act-debug",
      label: "Toggle Quill Debug HUD Overlay",
      category: "ACTIONS",
      icon: <Bug className="w-4 h-4 text-red-400" />,
      perform: () => {
        setDebugMode(true);
        playSound("easterEgg");
        setCommandPaletteOpen(false);
      },
    },
    {
      id: "ext-github",
      label: "Open GitHub Profile (@vsr-yashwanth)",
      category: "EXTERNAL",
      icon: <ExternalLink className="w-4 h-4 text-zinc-400" />,
      perform: () => {
        window.open(socialConfig.github, "_blank");
        setCommandPaletteOpen(false);
      },
    },
    {
      id: "ext-linkedin",
      label: "Open LinkedIn Profile",
      category: "EXTERNAL",
      icon: <ExternalLink className="w-4 h-4 text-blue-400" />,
      perform: () => {
        window.open(socialConfig.linkedin, "_blank");
        setCommandPaletteOpen(false);
      },
    },
    {
      id: "ext-instagram",
      label: "Open Instagram Profile",
      category: "EXTERNAL",
      icon: <ExternalLink className="w-4 h-4 text-pink-400" />,
      perform: () => {
        window.open(socialConfig.instagram, "_blank");
        setCommandPaletteOpen(false);
      },
    },
    {
      id: "act-contact",
      label: "Contact Quill (Email & Direct Channels)",
      category: "ACTIONS",
      icon: <Mail className="w-4 h-4 text-orange-400" />,
      perform: () => navigateTo("contact"),
    },
  ];

  // Check for Easter Egg Queries
  useEffect(() => {
    const clean = query.trim().toLowerCase();
    if (clean === "sudo enter_lab" || clean === "sudo lab") {
      setEasterEggMessage("ACCESS GRANTED. You probably shouldn't have done that. Initializing Experimental Lab...");
      playSound("easterEgg");
      const timer = setTimeout(() => {
        navigateTo("lab");
      }, 1400);
      return () => clearTimeout(timer);
    } else if (clean === "konami" || clean === "debug") {
      setEasterEggMessage("QUILL // DEBUG PROTOCOL ACTIVATED.");
      setDebugMode(true);
      playSound("easterEgg");
    } else if (clean === "whois quill" || clean === "whoami") {
      setEasterEggMessage("Vangala Sreeram Yashwanth // Silver Quill. Dual degree CS & Data Science. SRM × IIT Madras.");
    } else {
      setEasterEggMessage(null);
    }
  }, [query]);

  const filtered = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) || cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        playSound("click");
        filtered[selectedIndex].perform();
      }
    }
  };

  if (!commandPaletteOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setCommandPaletteOpen(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl rounded-xl border border-white/15 bg-[#090d15] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, search projects, or type 'sudo enter_lab'..."
            className="w-full bg-transparent text-sm font-mono text-white placeholder-zinc-500 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="text-zinc-500 hover:text-zinc-300">
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-zinc-500 bg-white/5 rounded border border-white/10">
            ESC
          </kbd>
        </div>

        {/* Easter Egg Notice */}
        {easterEggMessage && (
          <div className="px-4 py-2.5 bg-orange-500/10 border-b border-orange-500/20 text-xs font-mono text-orange-400 flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 animate-pulse" />
            <span>{easterEggMessage}</span>
          </div>
        )}

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-white/5">
          {filtered.length === 0 ? (
            <div className="py-8 text-center text-xs font-mono text-zinc-500">
              No matching commands found. Try &ldquo;work&rdquo;, &ldquo;resume&rdquo;, or &ldquo;lab&rdquo;.
            </div>
          ) : (
            filtered.map((cmd, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    playSound("click");
                    cmd.perform();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-xs font-mono transition-colors ${
                    isSelected
                      ? "bg-orange-500/15 text-white border border-orange-500/30"
                      : "text-zinc-400 hover:bg-white/[0.03] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1 rounded bg-white/5">{cmd.icon}</span>
                    <span className={isSelected ? "text-white font-medium" : "text-zinc-300"}>{cmd.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/5 text-zinc-500">
                      {cmd.category}
                    </span>
                    {cmd.shortcut && (
                      <kbd className="text-[10px] font-mono text-zinc-500 bg-white/5 px-1 rounded border border-white/5">
                        {cmd.shortcut}
                      </kbd>
                    )}
                    <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? "text-orange-400" : "text-transparent"}`} />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span>↑ ↓ to navigate</span>
            <span>•</span>
            <span>↵ to select</span>
          </div>
          <span>QUILL // SYSTEM PALETTE v1.0</span>
        </div>
      </div>
    </div>
  );
}
