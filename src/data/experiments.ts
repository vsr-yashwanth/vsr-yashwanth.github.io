export interface LabExperiment {
  id: string;
  slug: string;
  code: string;
  title: string;
  tagline: string;
  category: "GRAPHICS" | "SIMULATION" | "COMPUTER VISION" | "QUANTUM" | "NETWORKING";
  status: "ACTIVE EXPERIMENT" | "PROTOTYPE" | "BETA LAB";
  year: string;
  technologies: string[];
  description: string;
  instructions: string;
}

export const experimentsData: LabExperiment[] = [
  {
    id: "particle-field",
    slug: "particle-field",
    code: "[001]",
    title: "Gravitational Particle Field",
    tagline: "N-body physics field reacting to cursor gravity well and velocity vectors",
    category: "GRAPHICS",
    status: "ACTIVE EXPERIMENT",
    year: "2026",
    technologies: ["Canvas API", "Physics Equations", "Vector Dynamics"],
    description:
      "A real-time simulation of 300+ autonomous particles floating in harmonic equilibrium until disrupted by cursor mass attraction, elastic repulsion, and speed vectors.",
    instructions: "Move your cursor across the canvas to apply a localized gravitational pull. Click to trigger an explosive dispersion pulse.",
  },
  {
    id: "wec-telemetry-runner",
    slug: "wec-telemetry-runner",
    code: "[002]",
    title: "WEC Telemetry & Attrition Engine",
    tagline: "Real-time endurance lap simulation across Le Mans with multi-class pacing and weather shifts",
    category: "SIMULATION",
    status: "ACTIVE EXPERIMENT",
    year: "2026",
    technologies: ["JavaScript Engine", "Probabilistic Race Flow", "ANSI HUD"],
    description:
      "A browser-adapted version of the WEC race simulation engine. Watch Hypercar, LMP2, and LMGT3 contenders battle across 24 simulated hours with dynamic safety car bunching, tire wear, and rain fronts.",
    instructions: "Toggle weather states (Clear / Rain), deploy the Safety Car, or trigger rapid pit stop simulations to inspect sector delta changes.",
  },
  {
    id: "crack-severity-analyzer",
    slug: "crack-severity-analyzer",
    code: "[003]",
    title: "Structural Crack Contour & INT8 Quantizer",
    tagline: "Interactive computer vision edge detection and simulated INT8 quantization thresholding",
    category: "COMPUTER VISION",
    status: "ACTIVE EXPERIMENT",
    year: "2026",
    technologies: ["Edge Detection", "Bilateral Filtering", "Quantization Calibration"],
    description:
      "Visualizes the edge evaluation pipeline from the structural crack research project. Toggle between FP32 continuous contouring and INT8 discrete quantization matrices to observe sub-pixel boundary preservation.",
    instructions: "Slide the severity threshold or toggle INT8 quantization mode to observe real-time contour segmentations and boundary delta.",
  },
  {
    id: "quantum-superposition-router",
    slug: "quantum-superposition-router",
    code: "[004]",
    title: "QUBO State Probability Superposition",
    tagline: "Visualizing combinatorial node routing states before quantum annealer collapse",
    category: "QUANTUM",
    status: "PROTOTYPE",
    year: "2026",
    technologies: ["Qiskit Simulation Math", "State Vectors", "Combinatorial Graphs"],
    description:
      "A visual interactive abstraction of the supply chain routing problem modeled in QuantaFeat. Watch multi-hop probabilistic node distributions converge into deterministic minimal paths.",
    instructions: "Click nodes on the network graph to add logistics bottlenecks and trigger state re-sampling.",
  },
  {
    id: "mesh-packet-hopper",
    slug: "mesh-packet-hopper",
    code: "[005]",
    title: "DTN Store-and-Forward Mesh Simulator",
    tagline: "Delay-tolerant custody transfer between moving ad-hoc radio nodes without internet",
    category: "NETWORKING",
    status: "ACTIVE EXPERIMENT",
    year: "2026",
    technologies: ["Radio Emulation", "PRoPHET Routing", "Bundle Custody"],
    description:
      "Simulates the core routing principles of Project Whisp. Autonomous nodes drift across a coordinate grid; messages are cached on handsets until physical radio proximity enables bundle exchange.",
    instructions: "Drag nodes to bring them within radio broadcast circles (green ring) to observe custody bundle handoffs.",
  },
];
