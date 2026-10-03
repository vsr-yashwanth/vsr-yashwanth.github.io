"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useSystem, Core3DMode } from "@/context/SystemContext";

export default function QuillCore() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { coreMode, playSound } = useSystem();
  const [webGLFailed, setWebGLFailed] = useState(false);
  const modeRef = useRef<Core3DMode>(coreMode);

  useEffect(() => {
    modeRef.current = coreMode;
  }, [coreMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect WebGL capability
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setWebGLFailed(true);
      return;
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene setup
    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);
    } catch {
      setWebGLFailed(true);
      return;
    }

    // --- Core Group Hierarchy ---
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Outer Polyhedral Crystal Mesh (Crystalline / Architectural Structure)
    const icosaGeometry = new THREE.IcosahedronGeometry(2.1, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xff8c37,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const icosaMesh = new THREE.Mesh(icosaGeometry, wireframeMaterial);
    coreGroup.add(icosaMesh);

    // 2. Inner Glowing Energy Nucleus (Dodecahedron)
    const nucleusGeometry = new THREE.DodecahedronGeometry(1.1, 0);
    const nucleusMaterial = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
    coreGroup.add(nucleusMesh);

    // 3. Neural Synapse Nodes (Points cloud around vertices)
    const pointsCount = 180;
    const pointsPositions = new Float32Array(pointsCount * 3);
    const originalPositions = new Float32Array(pointsCount * 3);

    for (let i = 0; i < pointsCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 2.4 + (Math.random() - 0.5) * 0.8;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pointsPositions[i * 3] = x;
      pointsPositions[i * 3 + 1] = y;
      pointsPositions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }

    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(pointsPositions, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0xffedd6,
      size: 0.055,
      transparent: true,
      opacity: 0.75,
    });
    const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
    coreGroup.add(pointsMesh);

    // 4. Orbital Data Rings
    const ringGeometry = new THREE.RingGeometry(2.8, 2.82, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    coreGroup.add(ring2);

    // Mouse & Velocity Tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = normX * 0.8;
      targetY = normY * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth cursor lerp
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      coreGroup.rotation.y = currentX * 0.6 + elapsedTime * 0.15;
      coreGroup.rotation.x = -currentY * 0.6 + Math.sin(elapsedTime * 0.2) * 0.1;

      // Mode-dependent transforms
      const mode = modeRef.current;

      if (mode === "identity") {
        // Structured crystalline mode
        wireframeMaterial.color.setHex(0xff8c37);
        nucleusMaterial.color.setHex(0x00e5ff);
        wireframeMaterial.opacity = 0.4;
        nucleusMesh.scale.setScalar(1 + Math.sin(elapsedTime * 2) * 0.08);
        icosaMesh.scale.setScalar(1);
        ring1.rotation.z += 0.005;
        ring2.rotation.z -= 0.004;
      } else if (mode === "work") {
        // Fragmented architectural matrix
        wireframeMaterial.color.setHex(0x38bdf8);
        nucleusMaterial.color.setHex(0xff8c37);
        wireframeMaterial.opacity = 0.55;
        icosaMesh.scale.setScalar(1.15 + Math.sin(elapsedTime * 1.5) * 0.1);
        nucleusMesh.scale.setScalar(0.9);
        ring1.rotation.z += 0.01;
        ring2.rotation.z -= 0.008;
      } else if (mode === "research") {
        // Neural analytical network
        wireframeMaterial.color.setHex(0x00e5ff);
        nucleusMaterial.color.setHex(0x10b981);
        wireframeMaterial.opacity = 0.25;
        pointsMaterial.size = 0.08;
        nucleusMesh.scale.setScalar(1.2 + Math.cos(elapsedTime * 3) * 0.1);
        ring1.rotation.z += 0.003;
      } else if (mode === "lab") {
        // Dynamic turbulent procedural state
        wireframeMaterial.color.setHex(0xf59e0b);
        nucleusMaterial.color.setHex(0xef4444);
        wireframeMaterial.opacity = 0.7;
        const turbulentScale = 1.05 + Math.sin(elapsedTime * 4) * 0.15;
        icosaMesh.scale.set(turbulentScale, 1 / turbulentScale, turbulentScale);
        ring1.rotation.z += 0.02;
        ring2.rotation.z -= 0.02;
      } else if (mode === "contact") {
        // Calm harmonic orbit
        wireframeMaterial.color.setHex(0x94a3b8);
        nucleusMaterial.color.setHex(0xff8c37);
        wireframeMaterial.opacity = 0.3;
        nucleusMesh.scale.setScalar(1.0 + Math.sin(elapsedTime * 0.8) * 0.05);
        ring1.rotation.z += 0.002;
        ring2.rotation.z -= 0.002;
      }

      // If reduced motion is requested, stop heavy rotation
      if (prefersReducedMotion) {
        coreGroup.rotation.set(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      icosaGeometry.dispose();
      wireframeMaterial.dispose();
      nucleusGeometry.dispose();
      nucleusMaterial.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // WebGL Fallback View
  if (webGLFailed) {
    return (
      <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none">
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-orange-500/20 animate-spin-slow" />
          <div className="absolute inset-4 rounded-full border border-dashed border-cyan-400/30 animate-spin" />
          <div className="absolute inset-10 rounded-full border border-amber-400/40 animate-pulse-subtle" />
          <div className="w-16 h-16 rounded-xl border border-orange-500/60 rotate-45 flex items-center justify-center bg-black/60 shadow-[0_0_20px_rgba(255,140,55,0.2)]">
            <span className="font-mono text-[9px] text-orange-400 tracking-wider">CORE</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="relative w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center"
      aria-label="Interactive 3D Quill Core computational model"
      role="img"
    />
  );
}
