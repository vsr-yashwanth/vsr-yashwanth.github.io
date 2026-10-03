export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  organizationUrl?: string;
  location: string;
  period: string;
  type: "RESEARCH" | "LEADERSHIP" | "COMMUNITY" | "HACKATHON";
  description: string;
  achievements: string[];
  skills: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    id: "nit-silchar",
    role: "Research Intern – Deep Learning & Machine Learning",
    organization: "National Institute of Technology (NIT), Silchar",
    organizationUrl: "http://www.nits.ac.in",
    location: "Silchar, India",
    period: "May 2026 – July 2026",
    type: "RESEARCH",
    description:
      "Conducted experimental research on computer vision models for automated civil infrastructure inspection, focusing on structural building crack segmentation and severity triage on edge compute.",
    achievements: [
      "Engineered deployment-ready YOLO26n-Seg models optimized via ONNX Runtime and INT8 post-training quantization.",
      "Achieved a 73.2% reduction in memory footprint (14.2 MB down to 3.8 MB) and inference speeds of 135+ FPS on edge hardware.",
      "Authored research journal publication presenting the methodology, empirical benchmarks, and deployment implications.",
    ],
    skills: ["PyTorch", "YOLO26n-Seg", "ONNX Runtime", "INT8 PTQ", "Computer Vision", "Model Optimization"],
  },
  {
    id: "sih-netrunners",
    role: "Team Leader – Project Whisp",
    organization: "Smart India Hackathon 2026 (Team NETRUNNERS)",
    location: "National Level, India",
    period: "August 2026 – Present",
    type: "HACKATHON",
    description:
      "Led a 6-developer engineering team to build Whisp, an off-grid decentralized peer-to-peer mesh networking and delay-tolerant communication system under Problem Statement ID SIH25002.",
    achievements: [
      "Architected the core HybridMeshTransport combining Wi-Fi Direct and BLE beaconing with store-and-forward PRoPHET routing.",
      "Integrated hardware-backed Google Tink AEAD encryption and LWWMap Conflict-Free Replicated Data Types (CRDTs) for off-grid note sync.",
      "Engineered an embedded local Ktor HTTP diagnostics plane (:8080) for field operator topology inspection.",
    ],
    skills: ["Kotlin", "Jetpack Compose", "Delay-Tolerant Networking", "Google Tink AEAD", "BLE Mesh", "CRDT"],
  },
  {
    id: "zephyr-operations",
    role: "Head of Operations / Associate Director of Operations",
    organization: "Zephyr — English Literature Club, SRM IST",
    location: "Chennai, India",
    period: "2026 – Present",
    type: "LEADERSHIP",
    description:
      "Directing operational workflows, logistical staging, and event infrastructure for the premier literary society at SRM Institute of Science and Technology.",
    achievements: [
      "Overseeing event execution, stage operations, and inter-collegiate literary summits hosting hundreds of participants.",
      "Bridging analytical structure with creative writing initiatives, fostering interdisciplinary projects connecting technology and storytelling.",
    ],
    skills: ["Operations Management", "Logistics Architecture", "Team Leadership", "Event Staging"],
  },
  {
    id: "sqac-media",
    role: "Associate Media Lead",
    organization: "Student Quality Assurance Cell (SQAC), SRM IST",
    location: "Chennai, India",
    period: "2025 – Present",
    type: "LEADERSHIP",
    description:
      "Leading media initiatives, public communication assets, and digital design documentation to uphold academic and organizational quality benchmarks across university departments.",
    achievements: [
      "Designed and produced institutional media assets, visual reports, and student outreach campaigns.",
      "Standardized digital communication templates ensuring visual coherence across all internal publications.",
    ],
    skills: ["Media Strategy", "Visual Design", "Quality Assurance", "Institutional Communication"],
  },
  {
    id: "acm-sigapp",
    role: "Associate Management Lead",
    organization: "SRM ACM SIGAPP (Special Interest Group on Applied Computing)",
    location: "Chennai, India",
    period: "2025 – Present",
    type: "COMMUNITY",
    description:
      "Coordinating developer workshops, technical seminars, and hackathon logistics focusing on applied computing, software engineering, and emerging AI technologies.",
    achievements: [
      "Managed technical logistics for competitive programming sprints and hands-on system architecture sessions.",
      "Mentored junior peers in Git workflows, full-stack fundamentals, and collaborative repository development.",
    ],
    skills: ["Technical Management", "Developer Advocacy", "Workshop Logistics", "Applied Computing"],
  },
  {
    id: "kendriya-vidyalaya-rep",
    role: "Student Body Representative",
    organization: "Kendriya Vidyalaya",
    location: "India",
    period: "2024 – 2025",
    type: "LEADERSHIP",
    description:
      "Elected representative advocating for student academic welfare, organizing inter-school science symposiums, and coordinating student council initiatives.",
    achievements: [
      "Represented over 800+ students in administrative councils and organized campus-wide technical exhibitions.",
    ],
    skills: ["Public Speaking", "Student Advocacy", "Council Governance"],
  },
];
