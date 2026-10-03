# Silver Quill — Personal Digital Laboratory & Engineering Archive

> **Interactive digital identity, systems engineering showcase, research notebook, and creative technology laboratory of Vangala Sreeram Yashwanth (Quill).**

[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=flat&logo=three.js)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-success?style=flat&logo=github)](https://vsr-yashwanth.github.io/)

---

## Architecture & Features

- **Interactive 3D Core Canvas**: Custom Three.js procedural particle field reacting to section transitions and pointer physics (Identity, Work, Research, Lab, Contact).
- **Procedural Sound Engine**: Zero-asset Web Audio API acoustic synthesizer delivering tactile feedback, hover ticks, click pops, and boot sequences.
- **Hardware-Accelerated Custom Cursor**: Micro dot tracking with 0ms latency and 0.52 spring lerp orbit ring that adapts contextually.
- **Projects Showcase**: Deep-dive case studies for **Kiroshi** (multimodal computer vision HUD), **Whisp** (offline P2P LoRa mesh network), and **QuantaFeat** (automated tabular feature engineering).
- **Research Archive**: Interactive INT8 Post-Training Quantization visualizer for YOLO26n-Seg structural crack segmentation.
- **The Notebook**: Excerpts and manuscript viewer for *Paperhearts* (Quill's debut 17-chapter sci-fi/mystery novel) and engineering essays.
- **The Lab (Live Prototypes)**: In-browser interactive sandboxes including N-body gravitational fields, WEC endurance telemetry runners, and crack severity analyzers.
- **System Command Palette**: Instant navigation via `Cmd+K` / `Ctrl+K`.

---

## Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router), React 19, TypeScript |
| **Styling** | Tailwind CSS v4, Vanilla CSS Design System |
| **Graphics & 3D** | Three.js, WebGL2, HTML5 Canvas |
| **Audio** | Web Audio API (procedural oscillator synthesis) |
| **Motion** | Lenis smooth scroll, CSS hardware transforms |
| **Deployment** | GitHub Actions Automated GitHub Pages Static Export |

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/vsr-yashwanth/Personal-Website.git

# Enter the project directory
cd Personal-Website

# Install dependencies
npm install

# Start local development server
npm run dev

# Open in browser
open http://localhost:3000
```

---

## Static Production Build

```bash
# Build and export static site to /out
npm run build

# Preview static export
npx serve out
```

---

## License

Created by **Vangala Sreeram Yashwanth (Silver Quill)**. Dual-degree Computer Science & Data Science @ SRM IST × IIT Madras.
