"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import { soundEngine } from "@/lib/sound";

export type Core3DMode = "identity" | "work" | "research" | "lab" | "contact";

interface SystemContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
  coreMode: Core3DMode;
  setCoreMode: (mode: Core3DMode) => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: () => void;
  playSound: (type: "click" | "hover" | "transition" | "boot" | "glitch" | "easterEgg") => void;
  debugMode: boolean;
  setDebugMode: (debug: boolean) => void;
  entryCompleted: boolean;
  setEntryCompleted: (completed: boolean) => void;
  cursorText: string;
  setCursorText: (text: string) => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export function SystemProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<string>("identity");
  const [coreMode, setCoreMode] = useState<Core3DMode>("identity");
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  // Default sound enabled so audio works immediately
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [debugMode, setDebugMode] = useState(false);
  const [entryCompleted, setEntryCompleted] = useState(true);
  const [cursorText, setCursorText] = useState("");
  const soundEnabledRef = useRef(true);

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
  }, [soundEnabled]);

  // Check sessionStorage for entry skip on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const skipped = sessionStorage.getItem("quill_entry_skipped");
      if (!skipped) {
        setEntryCompleted(false);
      }
    }
  }, []);

  // Unlock AudioContext on the very first user interaction
  useEffect(() => {
    const unlockAudio = () => {
      soundEngine.initOnGesture();
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };

    window.addEventListener("pointerdown", unlockAudio, { passive: true });
    window.addEventListener("keydown", unlockAudio, { passive: true });
    window.addEventListener("touchstart", unlockAudio, { passive: true });

    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  const playSound = useCallback(
    (type: "click" | "hover" | "transition" | "boot" | "glitch" | "easterEgg") => {
      if (!soundEnabledRef.current) return;

      if (type === "hover") {
        soundEngine.playHover();
      } else if (type === "click") {
        soundEngine.playClick();
      } else if (type === "transition") {
        soundEngine.playTransition();
      } else if (type === "boot") {
        soundEngine.playBoot();
      } else if (type === "easterEgg") {
        soundEngine.playEasterEgg();
      }
    },
    []
  );

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundEnabledRef.current = next;
      if (next) {
        soundEngine.initOnGesture();
        soundEngine.playTransition();
      }
      return next;
    });
  }, []);

  // Keyboard shortcut listener for Command Palette (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Konami Code listener (↑ ↑ ↓ ↓ ← → ← → b a)
  useEffect(() => {
    const sequence = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let position = 0;

    const handleKonami = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === sequence[position].toLowerCase()) {
        position++;
        if (position === sequence.length) {
          setDebugMode((prev) => !prev);
          soundEngine.playEasterEgg();
          position = 0;
        }
      } else {
        position = 0;
      }
    };

    window.addEventListener("keydown", handleKonami);
    return () => window.removeEventListener("keydown", handleKonami);
  }, []);

  return (
    <SystemContext.Provider
      value={{
        activeSection,
        setActiveSection,
        coreMode,
        setCoreMode,
        commandPaletteOpen,
        setCommandPaletteOpen,
        soundEnabled,
        setSoundEnabled,
        toggleSound,
        playSound,
        debugMode,
        setDebugMode,
        entryCompleted,
        setEntryCompleted,
        cursorText,
        setCursorText,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
}

export function useSystem() {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error("useSystem must be used within a SystemProvider");
  }
  return context;
}
