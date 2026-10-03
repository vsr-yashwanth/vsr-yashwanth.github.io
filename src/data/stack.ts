export interface TechItem {
  name: string;
  category: "LANGUAGES" | "AI / ML" | "SYSTEMS & WEB" | "DATA & STORAGE" | "TOOLS & EXPERIMENTAL";
  proficiencyLevel: "CORE" | "PROFICIENT" | "EXPLORING";
  description: string;
  associatedProjects: string[]; // Project IDs
}

export const techStackData: TechItem[] = [
  // Languages
  {
    name: "Python",
    category: "LANGUAGES",
    proficiencyLevel: "CORE",
    description: "Primary language for computer vision research, deep learning pipelines, and high-performance FastAPI backends.",
    associatedProjects: ["kiroshi", "structural-crack-segmentation-yolo26n", "quantafeat", "wec-race-simulator", "wec-lap-time"],
  },
  {
    name: "TypeScript",
    category: "LANGUAGES",
    proficiencyLevel: "CORE",
    description: "Strict typing for resilient web architectures, responsive client dashboards, and distributed systems.",
    associatedProjects: ["kiroshi", "kyg", "quantafeat"],
  },
  {
    name: "Kotlin",
    category: "LANGUAGES",
    proficiencyLevel: "PROFICIENT",
    description: "Used for Android native mesh networking, hardware-level radio coordination, and Jetpack Compose interfaces.",
    associatedProjects: ["whisp"],
  },
  {
    name: "C / C++",
    category: "LANGUAGES",
    proficiencyLevel: "PROFICIENT",
    description: "Low-level computational algorithms, data structures, and edge performance optimization.",
    associatedProjects: ["structural-crack-segmentation-yolo26n"],
  },
  {
    name: "Java",
    category: "LANGUAGES",
    proficiencyLevel: "PROFICIENT",
    description: "Object-oriented architectures, algorithmic problem solving, and enterprise system foundations.",
    associatedProjects: [],
  },
  {
    name: "SQL",
    category: "LANGUAGES",
    proficiencyLevel: "CORE",
    description: "Relational modeling, complex spatial indexing queries with PostGIS, and data consistency.",
    associatedProjects: ["kiroshi", "kyg", "mindbloom"],
  },

  // AI / ML
  {
    name: "PyTorch",
    category: "AI / ML",
    proficiencyLevel: "CORE",
    description: "Model training, transfer learning, segmentation loss function design, and export pipelines.",
    associatedProjects: ["structural-crack-segmentation-yolo26n", "kiroshi"],
  },
  {
    name: "YOLO26 / YOLOv8",
    category: "AI / ML",
    proficiencyLevel: "CORE",
    description: "Real-time object detection and instance segmentation architectures optimized for edge deployment.",
    associatedProjects: ["structural-crack-segmentation-yolo26n"],
  },
  {
    name: "ONNX Runtime & TensorRT",
    category: "AI / ML",
    proficiencyLevel: "CORE",
    description: "Graph optimization, operator fusion, and INT8 post-training quantization calibration.",
    associatedProjects: ["structural-crack-segmentation-yolo26n"],
  },
  {
    name: "OpenCV",
    category: "AI / ML",
    proficiencyLevel: "CORE",
    description: "Computer vision image processing, CLAHE equalization, contour extraction, and spatial filters.",
    associatedProjects: ["structural-crack-segmentation-yolo26n", "kiroshi"],
  },
  {
    name: "Qiskit",
    category: "AI / ML",
    proficiencyLevel: "EXPLORING",
    description: "IBM quantum computing SDK for simulating quantum circuits and solving combinatorial QUBO matrices.",
    associatedProjects: ["quantafeat"],
  },
  {
    name: "NumPy & Pandas",
    category: "AI / ML",
    proficiencyLevel: "CORE",
    description: "Vectorized numerical manipulation, statistical modeling, and experimental data preprocessing.",
    associatedProjects: ["structural-crack-segmentation-yolo26n", "kiroshi", "wec-race-simulator"],
  },

  // Systems & Web
  {
    name: "FastAPI",
    category: "SYSTEMS & WEB",
    proficiencyLevel: "CORE",
    description: "Asynchronous Python web framework delivering sub-5ms API response times and strict Pydantic schemas.",
    associatedProjects: ["kiroshi", "kyg"],
  },
  {
    name: "Next.js & React 19",
    category: "SYSTEMS & WEB",
    proficiencyLevel: "CORE",
    description: "App Router, server/client hybrid rendering, fast hydration, and modern component composition.",
    associatedProjects: ["kiroshi", "quantafeat", "kyg"],
  },
  {
    name: "Tailwind CSS v4",
    category: "SYSTEMS & WEB",
    proficiencyLevel: "CORE",
    description: "Utility-first modern tokenized styling, fluid scale systems, and bespoke micro-interactions.",
    associatedProjects: ["kiroshi", "quantafeat", "kyg"],
  },
  {
    name: "Flutter & Dart",
    category: "SYSTEMS & WEB",
    proficiencyLevel: "PROFICIENT",
    description: "Cross-platform mobile client architecture with persistent offline-first state synchronization.",
    associatedProjects: ["kiroshi"],
  },
  {
    name: "Jetpack Compose",
    category: "SYSTEMS & WEB",
    proficiencyLevel: "PROFICIENT",
    description: "Declarative Android UI framework for native, fluid reactive state rendering.",
    associatedProjects: ["whisp"],
  },

  // Data & Storage
  {
    name: "PostgreSQL & PostGIS",
    category: "DATA & STORAGE",
    proficiencyLevel: "CORE",
    description: "Spatial indexes, ST_Contains geofencing calculations, and relational integrity guarantees.",
    associatedProjects: ["kiroshi", "kyg"],
  },
  {
    name: "Google Tink Cryptography",
    category: "DATA & STORAGE",
    proficiencyLevel: "PROFICIENT",
    description: "Multi-platform AEAD cryptographic library integrated with hardware keystores for off-grid encryption.",
    associatedProjects: ["whisp", "kiroshi"],
  },
  {
    name: "Conflict-Free Replicated Data (CRDT)",
    category: "DATA & STORAGE",
    proficiencyLevel: "PROFICIENT",
    description: "Distributed eventual consistency data structures for collision-free multi-peer editing without servers.",
    associatedProjects: ["whisp"],
  },
  {
    name: "Redis & SQLite",
    category: "DATA & STORAGE",
    proficiencyLevel: "PROFICIENT",
    description: "High-speed caching layers and local persistent offline queues surviving operating system kills.",
    associatedProjects: ["kiroshi", "whisp"],
  },

  // Tools & Experimental
  {
    name: "Three.js & WebGL",
    category: "TOOLS & EXPERIMENTAL",
    proficiencyLevel: "PROFICIENT",
    description: "Interactive 3D geometry, procedural vertex shaders, custom canvas rendering, and dynamic lighting.",
    associatedProjects: [],
  },
  {
    name: "Docker & Containerization",
    category: "TOOLS & EXPERIMENTAL",
    proficiencyLevel: "CORE",
    description: "Multi-stage container definitions, isolated microservice topologies, and reproducible deployments.",
    associatedProjects: ["kiroshi", "kyg", "mindbloom"],
  },
  {
    name: "Git & GitHub CI/CD",
    category: "TOOLS & EXPERIMENTAL",
    proficiencyLevel: "CORE",
    description: "Automated verification pipelines, branching workflows, and regression benchmarking suites.",
    associatedProjects: ["kiroshi", "whisp", "quantafeat", "kyg"],
  },
];
