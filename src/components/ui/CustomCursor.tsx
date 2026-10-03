"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSystem } from "@/context/SystemContext";

export default function CustomCursor() {
  const { cursorText, playSound } = useSystem();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const mousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const isHovered = useRef(false);
  const isMouseDown = useRef(false);
  const isVisible = useRef(false);
  const lastHoveredTarget = useRef<Element | null>(null);

  // Default false so it NEVER hides by default on laptops/desktops
  const [isPureTouch, setIsPureTouch] = useState(false);

  // Sync cursor badge label
  const cursorTextRef = useRef(cursorText);
  useEffect(() => {
    cursorTextRef.current = cursorText;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (label && ring) {
      label.innerText = cursorText;
      if (cursorText) {
        label.style.display = "inline-block";
        ring.style.width = "auto";
        ring.style.height = "auto";
        ring.style.borderRadius = "9999px";
        ring.style.padding = "3px 10px";
      } else {
        label.style.display = "none";
        ring.style.width = "28px";
        ring.style.height = "28px";
        ring.style.borderRadius = "9999px";
        ring.style.padding = "0px";
      }
    }
  }, [cursorText]);

  useEffect(() => {
    // Only disable custom cursor on mobile phones/tablets that strictly lack hover capability
    if (typeof window !== "undefined") {
      const isCoarseOnly =
        window.matchMedia("(pointer: coarse) and (hover: none)").matches;
      if (isCoarseOnly) {
        setIsPureTouch(true);
        return;
      }
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let animId: number;

    const onPointerMove = (e: PointerEvent | MouseEvent) => {
      if ("pointerType" in e && e.pointerType === "touch") return;

      const x = e.clientX;
      const y = e.clientY;
      mousePos.current.x = x;
      mousePos.current.y = y;

      if (!isVisible.current) {
        isVisible.current = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        ringPos.current.x = x;
        ringPos.current.y = y;
        document.documentElement.classList.add("has-custom-cursor");
      }

      // 0ms instant precision dot transform
      const dotScale = isMouseDown.current ? 0.75 : isHovered.current ? 1.25 : 1;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
    };

    const onPointerDown = (e: PointerEvent | MouseEvent) => {
      if ("pointerType" in e && e.pointerType === "touch") return;
      isMouseDown.current = true;
      playSound("click");
      if (dot) {
        dot.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(0.7)`;
      }
    };

    const onPointerUp = (e: PointerEvent | MouseEvent) => {
      if ("pointerType" in e && e.pointerType === "touch") return;
      isMouseDown.current = false;
      if (dot) {
        dot.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%) scale(${
          isHovered.current ? 1.25 : 1
        })`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "button, a, [role='button'], .interactive-cursor, .quill-card, [data-interactive]"
      );

      if (interactive) {
        if (lastHoveredTarget.current !== interactive) {
          lastHoveredTarget.current = interactive;
          isHovered.current = true;
          playSound("hover");
          if (ring) {
            ring.style.borderColor = "#ff8c37";
            ring.style.backgroundColor = "rgba(255, 140, 55, 0.2)";
            ring.style.boxShadow = "0 0 16px rgba(255, 140, 55, 0.4)";
          }
        }
      } else {
        if (isHovered.current) {
          isHovered.current = false;
          lastHoveredTarget.current = null;
          if (ring) {
            ring.style.borderColor = "rgba(255, 140, 55, 0.65)";
            ring.style.backgroundColor = "rgba(255, 140, 55, 0.05)";
            ring.style.boxShadow = "none";
          }
        }
      }
    };

    const onMouseLeaveDoc = () => {
      isVisible.current = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
      document.documentElement.classList.remove("has-custom-cursor");
    };

    const onMouseEnterDoc = () => {
      isVisible.current = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      document.documentElement.classList.add("has-custom-cursor");
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("mousedown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("mouseup", onPointerUp, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeaveDoc);
    document.addEventListener("mouseenter", onMouseEnterDoc);

    // Highly responsive spring lerp loop (0.52 lerp rate for instant tracking with zero lag)
    const render = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      ringPos.current.x += (targetX - ringPos.current.x) * 0.52;
      ringPos.current.y += (targetY - ringPos.current.y) * 0.52;

      const scale = isMouseDown.current
        ? 0.78
        : cursorTextRef.current
        ? 1.35
        : isHovered.current
        ? 1.3
        : 1;

      ring.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%) scale(${scale})`;

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeaveDoc);
      document.removeEventListener("mouseenter", onMouseEnterDoc);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [playSound]);

  if (isPureTouch) return null;

  return (
    <>
      {/* Precision Micro Dot (Zero Lag, Instant Pixel Alignment) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] opacity-0 will-change-transform"
        style={{
          width: "7px",
          height: "7px",
          backgroundColor: "#ff8c37",
          boxShadow: "0 0 10px rgba(255, 140, 55, 1)",
          transition: "opacity 0.15s ease",
        }}
      />

      {/* Reactive Orbit Ring & Contextual Badge */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99998] opacity-0 flex items-center justify-center will-change-transform"
        style={{
          width: "28px",
          height: "28px",
          border: "1.5px solid rgba(255, 140, 55, 0.65)",
          backgroundColor: "rgba(255, 140, 55, 0.05)",
          transition:
            "opacity 0.15s ease, border-color 0.15s ease, background-color 0.15s ease, width 0.15s ease, height 0.15s ease, box-shadow 0.15s ease",
        }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[9px] font-bold text-[#ff8c37] tracking-wider uppercase select-none hidden"
        />
      </div>
    </>
  );
}
