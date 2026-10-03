export interface BenchmarkRow {
  precision: string;
  framework: string;
  latencyMs: string;
  fps: string;
  map50: string;
  sizeMb: string;
  vramMb: string;
}

export interface ResearchPaper {
  id: string;
  slug: string;
  code: string;
  title: string;
  subtitle: string;
  status: "RESEARCH LOG" | "CONFERENCE PROCEEDINGS" | "EXPERIMENTAL RECORD";
  affiliation: string;
  timeline: string;
  abstract: string;
  keywords: string[];
  problem: string;
  motivation: string;
  methodology: {
    title: string;
    description: string;
    points: string[];
  }[];
  modelArchitecture: {
    base: string;
    optimization: string;
    quantizationScheme: string;
    targetHardware: string[];
  };
  benchmarks: BenchmarkRow[];
  observations: string[];
  deploymentImplications: string[];
  interactiveDemoConfig: {
    sampleCrackTypes: {
      id: string;
      name: string;
      surface: string;
      severity: "LOW" | "MODERATE" | "CRITICAL";
      contourPoints: [number, number][];
      widthMm: number;
    }[];
  };
}

export const researchArchive: ResearchPaper[] = [
  {
    id: "structural-crack-segmentation-yolo26n",
    slug: "structural-crack-segmentation-yolo26n",
    code: "RESEARCH // 001",
    title:
      "Deployment-Oriented Structural Crack Segmentation Using YOLO26n-Seg with Post-Training Quantization for Edge Computing",
    subtitle:
      "Evaluation of INT8 Quantization, TensorRT Optimizations, and Edge Latency-Accuracy Pareto Frontiers in Civil Infrastructure Inspection",
    status: "EXPERIMENTAL RECORD",
    affiliation: "National Institute of Technology (NIT), Silchar — Deep Learning & ML Research",
    timeline: "May 2026 – July 2026",
    abstract:
      "Structural crack inspection on aging reinforced concrete and masonry requires automated segmentation capable of operating in real-time on power-constrained edge computing devices (e.g., UAVs, robotic crawlers, handheld inspection rigs). While large vision transformers offer high mask accuracy, their computational overhead prohibits field edge deployment. This research investigates the deployment-oriented evaluation of YOLO26n-Seg, focusing on ONNX graph optimizations and INT8 Post-Training Quantization (PTQ) to maximize inference throughput while preserving sub-pixel crack boundary delineations.",
    keywords: [
      "Computer Vision",
      "Structural Crack Segmentation",
      "YOLO26n-Seg",
      "Post-Training Quantization (PTQ)",
      "INT8 Optimization",
      "Edge Computing",
      "ONNX Runtime",
      "Civil Infrastructure Inspection",
    ],
    problem:
      "Civil infrastructure—including bridges, structural columns, and highway overpasses—suffers from micro-fissures that precede catastrophic structural failures. Manual inspection is hazardous, slow, and subjective. Deploying heavy deep neural networks onto autonomous inspection drones is severely constrained by thermal limits, battery capacity, and limited onboard compute (e.g., Jetson Orin Nano, Raspberry Pi 5 with NPU).",
    motivation:
      "Rather than claiming a novel architectural foundation from scratch, this investigation focuses on the pragmatic engineering reality of edge deployment: how much precision is lost when compressing segmentation heads to 8-bit integers, and does the 3x-4x frame rate boost justify the trade-off in safety-critical crack inspection?",
    methodology: [
      {
        title: "1. Dataset Synthesis & Structural Crack Taxonomy",
        description:
          "Curated and normalized a high-resolution concrete fracture dataset categorized by crack morphology: longitudinal cracks, transverse cracks, and alligator structural crazing under variable lighting conditions.",
        points: [
          "Preprocessing pipeline with contrast-limited adaptive histogram equalization (CLAHE) to counter harsh outdoor solar shadows.",
          "Polygonal mask annotations with sub-pixel vertex boundaries.",
        ],
      },
      {
        title: "2. Model Training & Baseline FP32 Convergence",
        description:
          "Trained YOLO26n-Seg with a lightweight CSPDarknet backbone and decoupled segmentation head producing prototype masks and per-box mask coefficients.",
        points: [
          "Trained across 150 epochs using SGD with momentum and cosine annealing learning rate scheduler.",
          "Loss function combining CIoU bounding box loss and BCE mask segmentation loss.",
        ],
      },
      {
        title: "3. ONNX Graph Optimization & Operator Fusion",
        description:
          "Exported weights into Open Neural Network Exchange (ONNX) format, fusing batch normalization into preceding convolutional layers and eliminating dead tensor allocations.",
        points: [
          "Static input tensor shape enforcement for zero-copy memory transfers on edge accelerators.",
        ],
      },
      {
        title: "4. INT8 Post-Training Calibration (PTQ)",
        description:
          "Constructed representative calibration caches (1,000 representative concrete surface patches) to compute symmetric per-channel weight quantization scales and KL-divergence dynamic activation ranges.",
        points: [
          "Prevented activation clipping on sparse crack mask contours by preserving key convolutional layers in FP16 where INT8 error exceeded 1.5% delta.",
        ],
      },
    ],
    modelArchitecture: {
      base: "YOLO26n-Seg (Lightweight Convolutional Segmentation Backbone)",
      optimization: "ONNX Runtime with Graph Simplification + Constant Folding",
      quantizationScheme: "Symmetric INT8 Per-Channel Weights + Asymmetric INT8 Activations",
      targetHardware: [
        "NVIDIA Jetson Orin Nano (8GB)",
        "NVIDIA RTX Laptop Edge Rig",
        "Raspberry Pi 5 + Hailo-8L NPU",
      ],
    },
    benchmarks: [
      {
        precision: "FP32 Baseline",
        framework: "PyTorch 2.3",
        latencyMs: "28.4 ms",
        fps: "35.2 FPS",
        map50: "84.6%",
        sizeMb: "14.2 MB",
        vramMb: "480 MB",
      },
      {
        precision: "FP16 Optimized",
        framework: "ONNX Runtime (CUDA)",
        latencyMs: "13.1 ms",
        fps: "76.3 FPS",
        map50: "84.3%",
        sizeMb: "7.1 MB",
        vramMb: "260 MB",
      },
      {
        precision: "INT8 PTQ (Calibrated)",
        framework: "TensorRT / ONNX INT8",
        latencyMs: "7.4 ms",
        fps: "135.1 FPS",
        map50: "82.8%",
        sizeMb: "3.8 MB",
        vramMb: "140 MB",
      },
    ],
    observations: [
      "INT8 Post-Training Quantization reduced model memory footprint from 14.2 MB down to 3.8 MB (a 73.2% compression ratio) while maintaining 97.8% of the baseline FP32 mAP50 performance.",
      "Inference throughput climbed from 35.2 FPS to 135.1 FPS on edge test hardware, comfortably enabling real-time video stream inspection on 60 FPS industrial drone cameras with headroom for concurrent flight telemetry.",
      "Crack boundary degradation under INT8 was concentrated along ultra-thin micro-fissures (<0.5mm pixel width); applying mild bilateral post-filtering recovered structural continuity without measurable latency penalties.",
    ],
    deploymentImplications: [
      "Direct deployment onto compact drone companion computers without requiring active external cloud uplinks, ensuring continuous inspection inside GPS-denied concrete tunnels and bridge undersides.",
      "Lowered thermal throttling risks and battery consumption on inspection UAVs by over 60% compared to unquantized PyTorch runtimes.",
    ],
    interactiveDemoConfig: {
      sampleCrackTypes: [
        {
          id: "longitudinal-01",
          name: "Longitudinal Shear Fracture",
          surface: "Reinforced Concrete Pier",
          severity: "CRITICAL",
          widthMm: 3.4,
          contourPoints: [
            [20, 30],
            [35, 75],
            [48, 120],
            [54, 180],
            [62, 240],
            [58, 300],
            [70, 360],
          ],
        },
        {
          id: "transverse-02",
          name: "Transverse Tension Fissure",
          surface: "Prestressed Bridge Girder",
          severity: "MODERATE",
          widthMm: 1.8,
          contourPoints: [
            [40, 160],
            [90, 165],
            [140, 158],
            [200, 172],
            [260, 166],
            [320, 175],
          ],
        },
        {
          id: "surface-crazing-03",
          name: "Surface Shrinkage Micro-Crazing",
          surface: "Cured Slab Surface",
          severity: "LOW",
          widthMm: 0.6,
          contourPoints: [
            [100, 80],
            [130, 95],
            [120, 140],
            [160, 150],
            [180, 120],
            [150, 85],
          ],
        },
      ],
    },
  },
];
