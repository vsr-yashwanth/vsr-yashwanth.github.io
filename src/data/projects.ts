export interface CaseStudy {
  overview: string;
  problem: string;
  architecture: string;
  keyDecisions: string[];
  benchmarks?: { metric: string; value: string; note: string }[];
  codeHighlight?: {
    filename: string;
    language: string;
    code: string;
    explanation: string;
  };
  outcomes: string[];
  lessons: string[];
}

export interface Project {
  id: string;
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  category: "AI / ML" | "SYSTEMS" | "CIVIC TECH" | "QUANTUM" | "SIMULATION";
  year: string;
  summary: string;
  description: string;
  technologies: string[];
  status: "PRODUCTION-HARDENED" | "PROTOTYPE" | "RESEARCH PROTOTYPE" | "COMPLETED";
  featured: boolean;
  githubUrl: string;
  demoUrl?: string;
  metrics?: { label: string; value: string }[];
  caseStudy: CaseStudy;
}

export const projectsData: Project[] = [
  {
    id: "kiroshi",
    slug: "kiroshi",
    index: "01",
    title: "KIROSHI",
    subtitle: "Smart Tourist Safety Monitoring & Incident Response System",
    category: "SYSTEMS",
    year: "2026",
    summary:
      "Enterprise-grade tourist safety platform engineered for real-time geospatial monitoring, explainable risk assessment, offline-first synchronization, and cryptographically verifiable audit logging.",
    description:
      "KIROSHI (Keypoint Intelligence for Real-time Observation, Safety & Human Interaction) bridges traveler mobile clients, deterministic multi-signal risk scoring engines, and emergency authority command consoles. Built with PostGIS spatial containment, decoupled kinematic fall detection, and SHA-256 forward-pointer hash chains.",
    technologies: [
      "Python 3.10+",
      "FastAPI",
      "PostgreSQL 16",
      "PostGIS 3.4",
      "Flutter",
      "React 18",
      "TypeScript",
      "Docker",
      "Pytest",
    ],
    status: "PRODUCTION-HARDENED",
    featured: true,
    githubUrl: "https://github.com/vsr-yashwanth/Kiroshi",
    metrics: [
      { label: "API Roundtrip", value: "3.14 ms" },
      { label: "Risk Eval Latency", value: "< 0.04 ms" },
      { label: "Verification Suite", value: "110 Tests Passed" },
      { label: "Audit Integrity", value: "SHA-256 Chained" },
    ],
    caseStudy: {
      overview:
        "KIROSHI was designed to eliminate the critical failure points in traditional tourist safety systems: complete telemetry blindness during cellular dropouts, ambiguous SOS alerts without spatial context, and disputable audit timelines following incidents.",
      problem:
        "International and wilderness travelers frequently venture into high-risk cliffs, national parks, or dense heritage corridors where cellular reception is intermittent. When emergencies occur, conventional apps fail to send or report zero contextual risk telemetry to dispatchers.",
      architecture:
        "A decoupled 3-tier architecture: (1) Flutter mobile client with a persistent SQLite FIFO queue and honest offline state guardrails, (2) FastAPI gateway executing deterministic PostGIS ST_Contains spatial containment queries and rule-based risk scoring, and (3) React + TypeScript dispatch console hooked to an authoritative 9-state incident transition machine.",
      keyDecisions: [
        "Replaced black-box neural risk prediction with a deterministic, configurable policy engine (RiskConfig) achieving <0.04ms evaluation latency and zero hallucination risk.",
        "Integrated forward-pointer SHA-256 hash chaining on all audit events, guaranteeing mathematical tamper evidence without third-party ledger overhead.",
        "Engineered GDPR Art. 17 right-to-erasure compliance by zeroing profile identities while maintaining mathematical chain continuity via ON DELETE SET NULL.",
        "Decoupled kinematic fall detection (evaluating aspect ratio > 0.95, torso tilt < 45 deg, descent velocity > 0.25/s) to isolate vision subsystem failure from core dispatch.",
      ],
      benchmarks: [
        { metric: "Core API Health Latency", value: "3.14 ms", note: "P95: 4.61 ms vs target <25 ms" },
        { metric: "Deterministic Risk Scoring", value: "0.035 ms", note: "Sub-millisecond multi-signal evaluation" },
        { metric: "Audit Hash Digest", value: "0.015 ms", note: "Canonical JSON + SHA-256 digest" },
        { metric: "100-Event Audit Chain Verify", value: "1.92 ms", note: "Full historical cryptographic integrity check" },
      ],
      codeHighlight: {
        filename: "backend/app/services/audit.py",
        language: "python",
        code: `def compute_event_hash(prev_hash: str, event_payload: dict) -> str:
    \"\"\"Forward-pointer canonical SHA-256 hash chaining.\"\"\"
    canonical_bytes = json.dumps(
        {"prev": prev_hash, "payload": event_payload},
        sort_keys=True,
        separators=(',', ':')
    ).encode('utf-8')
    return hashlib.sha256(canonical_bytes).hexdigest()`,
        explanation:
          "Canonical JSON sorting guarantees deterministic hashing across distributed runtimes, creating an immutable audit trail.",
      },
      outcomes: [
        "110 automated unit, security, and integration tests covering spatial geometry, risk rules, and RBAC.",
        "Sub-millisecond risk evaluation guaranteeing instant incident escalation under high concurrent load.",
      ],
      lessons: [
        "In safety-critical systems, explainability beats black-box accuracy. Responders need to know *why* an alert triggered instantly.",
        "Offline-first requires radical user honesty: never show a green 'SOS Sent' tick mark unless a verified acknowledgment packet returns from the gateway.",
      ],
    },
  },
  {
    id: "whisp",
    slug: "whisp",
    index: "02",
    title: "Whisp",
    subtitle: "Decentralized Zero-Network Hybrid Mesh & Delay-Tolerant Communication",
    category: "SYSTEMS",
    year: "2026",
    summary:
      "Decentralized, zero-network hybrid mesh communication protocol enabling encrypted off-grid peer-to-peer messaging and CRDT notes across physical device antennas without cellular towers or internet access.",
    description:
      "Developed for Smart India Hackathon 2026 (Problem Statement ID: SIH25002) as Team Leader of Team NETRUNNERS. Whisp unites Wi-Fi Direct and BLE beacons with opportunistic PRoPHET delay-tolerant store-and-forward routing, Google Tink hardware AEAD encryption, and an embedded Ktor diagnostic web plane.",
    technologies: [
      "Kotlin 1.9",
      "Android SDK 34",
      "Jetpack Compose",
      "Google Tink AEAD",
      "Wi-Fi Direct",
      "BLE Mesh",
      "Ktor",
      "Room DB",
    ],
    status: "PROTOTYPE",
    featured: true,
    githubUrl: "https://github.com/vsr-yashwanth/Whisp",
    metrics: [
      { label: "Infrastructure Needed", value: "Zero (Off-Grid)" },
      { label: "Routing Scheme", value: "Store-and-Forward DTN" },
      { label: "Cryptography", value: "Hardware Tink AEAD" },
      { label: "Document Sync", value: "LWWMap CRDT" },
    ],
    caseStudy: {
      overview:
        "Whisp is engineered for humanitarian relief teams, deep wilderness exploration, and communication blackout zones where conventional telecommunications infrastructure has collapsed or never existed.",
      problem:
        "During natural disasters or rugged expeditions, cellular towers fail immediately. Current off-grid apps either require specialized expensive satellite transceivers or fail to support multi-hop routing between moving devices.",
      architecture:
        "A multi-layer communication engine: (1) HybridMeshTransport coordinator dynamically managing Wi-Fi Direct groups and low-power BLE discovery, (2) Delay-Tolerant Networking (DTN) custody manager holding message bundles until opportunistic contact, (3) Battery-Aware Relay Policy preventing nodes below 15% from relay exhaustion, and (4) an embedded Ktor web server (:8080) for field operator diagnostics.",
      keyDecisions: [
        "Implemented PRoPHET probabilistic routing alongside store-and-forward custody to ensure messages propagate forward even when a continuous path between sender and receiver never exists simultaneously.",
        "Integrated Google Tink AEAD with Android Keystore backed by hardware Secure Element for key exchange and AES-256-GCM / XChaCha20-Poly1305 encryption.",
        "Adopted Conflict-Free Replicated Data Types (CRDT) using Last-Write-Wins Map (LWWMap) to let disaster teams collaboratively edit field triage notes without sync merge conflicts.",
        "Built an embedded local HTTP control plane inside the Android process so field coordinators can inspect active node topology through any browser.",
      ],
      outcomes: [
        "Demonstrated multi-hop peer discovery and encrypted bundle forwarding over local ad-hoc Wi-Fi Direct + BLE radios.",
        "Validated battery throttling mechanics to safeguard participant device longevity.",
      ],
      lessons: [
        "Radio state transitions (switching between BLE beaconing and Wi-Fi Direct Group Owner) are physically volatile; state machines must be robust to sudden socket disconnections.",
        "Mesh networks must be designed for intermittent custody rather than continuous streams.",
      ],
    },
  },
  {
    id: "quantafeat",
    slug: "quantafeat",
    index: "03",
    title: "QuantaFeat",
    subtitle: "Quantum-Inspired Supply Chain & Route Optimization",
    category: "QUANTUM",
    year: "2026",
    summary:
      "Quantum-inspired simulation platform evaluating high-dimensional combinatorial supply chain outcomes before physical logistics execution.",
    description:
      "QuantaFeat addresses NP-hard logistics dispatching and multi-hub routing bottlenecks by mapping constraints into Quadratic Unconstrained Binary Optimization (QUBO) formulations, running quantum simulation algorithms via Qiskit and benchmarking them against classical Dijkstra pathfinding.",
    technologies: [
      "Python",
      "Qiskit",
      "Dijkstra Algorithm",
      "QUBO Formulations",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],
    status: "PROTOTYPE",
    featured: true,
    githubUrl: "https://github.com/vsr-yashwanth/QuantaFeat",
    metrics: [
      { label: "Optimization Model", value: "QUBO / Annealing" },
      { label: "Simulation Library", value: "IBM Qiskit" },
      { label: "Classical Baseline", value: "Dijkstra Graph" },
      { label: "Hackathon Sprint", value: "36 Hours" },
    ],
    caseStudy: {
      overview:
        "Developed during an intensive 36-hour national hackathon, QuantaFeat bridges classical algorithmic pathfinding with quantum simulation paradigms to handle combinatorial explosion in multi-node freight networks.",
      problem:
        "As global supply networks scale, calculating optimal multi-stop freight distribution subject to stochastic delay risks, fuel consumption constraints, and warehouse capacity limits becomes intractable for classical brute force.",
      architecture:
        "Dual-engine hybrid architecture: a Python backend running Dijkstra graph traversals for baseline deterministic routes and Qiskit quantum circuit simulators solving QUBO matrices, coupled to a reactive Next.js dashboard visualizer.",
      keyDecisions: [
        "Formulated inventory distribution and vehicle routing as binary quadratic penalty matrices suitable for quantum annealers and classical variational quantum eigensolvers (VQE).",
        "Constructed a comparative dashboard allowing logistics managers to evaluate trade-offs between classical heuristics and quantum-inspired state sampling.",
      ],
      outcomes: [
        "Successfully evaluated route permutations on simulated graph networks with up to 24 hubs.",
        "Proved feasibility of quantum-inspired pre-computation for high-stakes shipping routes.",
      ],
      lessons: [
        "Quantum computing is not magic speedup—it requires rigorous mathematical reformulation of business constraints into clean quadratic penalty terms.",
      ],
    },
  },
  {
    id: "kyg",
    slug: "kyg",
    index: "04",
    title: "KYG — Know Your Government",
    subtitle: "Citizen Participation & Municipal Governance Platform",
    category: "CIVIC TECH",
    year: "2026",
    summary:
      "Civic-tech governance platform engineered to increase transparency, citizen grievance resolution, and localized public infrastructure accountability.",
    description:
      "KYG links citizens with municipal governance data, policy proposals, and public works tracking. Built with containerized microservices separating AI-powered sentiment and categorization pipelines from core public administration registries.",
    technologies: [
      "TypeScript",
      "Next.js",
      "Python FastAPIs",
      "Docker Compose",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    status: "PROTOTYPE",
    featured: false,
    githubUrl: "https://github.com/vsr-yashwanth/KYG-Know-Your-Government",
    metrics: [
      { label: "Stack", value: "Docker Microservices" },
      { label: "Domain", value: "Civic Technology" },
      { label: "Frontend", value: "Next.js + TypeScript" },
    ],
    caseStudy: {
      overview:
        "KYG simplifies complex administrative bureaucracies into transparent, actionable citizen interfaces for municipal issue reporting and participatory governance.",
      problem:
        "Citizens lack visible tracking when filing public infrastructure grievances (potholes, water supply, lighting) and municipalities lack structured categorization pipelines to prioritize repair dispatches.",
      architecture:
        "Microservices architecture orchestrated via Docker Compose: a Next.js citizen portal, a Python AI categorization service parsing incoming reports, and a relational database maintaining immutable ticket logs.",
      keyDecisions: [
        "Implemented automated ticket routing using natural language classification to route complaints to the appropriate ward department automatically.",
        "Provided transparent public progress tracking dashboards to prevent complaints from vanishing into bureaucratic black holes.",
      ],
      outcomes: [
        "Prototyped end-to-end citizen reporting with real-time status progression from submission to inspection.",
      ],
      lessons: [
        "Civic applications must prioritize clarity and low cognitive load over complex UI gimmicks.",
      ],
    },
  },
  {
    id: "mindbloom",
    slug: "mindbloom",
    index: "05",
    title: "MindBloom",
    subtitle: "AI-Augmented Mental Wellness & Clinical Management Ecosystem",
    category: "AI / ML",
    year: "2026",
    summary:
      "Role-based mental wellness ecosystem bridging student self-reflection with authenticated clinical therapist workflows and automated crisis monitoring.",
    description:
      "MindBloom provides a serene, privacy-centric sanctuary for daily emotional journaling and structured mental wellness tracking. Features crisis detection sentiment heuristics that flag high-risk entries to verified practitioners within a HIPAA/GDPR-conscious role-based boundary.",
    technologies: [
      "Python",
      "Django",
      "Google Gemini API",
      "Docker",
      "HuggingFace Spaces",
      "PostgreSQL",
    ],
    status: "PROTOTYPE",
    featured: false,
    githubUrl: "https://github.com/vsr-yashwanth/Mind-Bloom",
    metrics: [
      { label: "Portals", value: "Student × Therapist × Admin" },
      { label: "Hosting", value: "Docker / HuggingFace" },
      { label: "AI Integration", value: "Gemini Reflection" },
    ],
    caseStudy: {
      overview:
        "MindBloom unites self-paced reflective journaling with professional clinical oversight to create a safe digital environment for student well-being.",
      problem:
        "Students experiencing severe academic distress frequently avoid formal clinical help until crises manifest, while therapists lack longitudinal mood data between infrequent appointments.",
      architecture:
        "Multi-role web application with three distinct security boundaries: (1) Student Sanctuary for mindful journaling and reflection, (2) Therapist Portal for encrypted session notes and longitudinal engagement trends, and (3) Administrator Command Center for verifying licensed clinicians.",
      keyDecisions: [
        "Enforced strict approval workflows preventing open registration for therapist accounts.",
        "Integrated automated crisis detection to surface critical journal distress patterns immediately to connected therapists.",
      ],
      outcomes: [
        "Deployed on HuggingFace Spaces with persistent volume storage and containerized reliability.",
      ],
      lessons: [
        "In healthcare tech, empathetic UI design directly influences emotional vulnerability and authentic reflection.",
      ],
    },
  },
  {
    id: "wec-race-simulator",
    slug: "wec-race-simulator",
    index: "06",
    title: "WEC Race Simulator",
    subtitle: "Terminal Endurance Racing Simulation Engine",
    category: "SIMULATION",
    year: "2026",
    summary:
      "A race-focused, terminal-based World Endurance Championship (WEC) simulator written in Python modeling multi-class traffic, dynamic weather fronts, and attrition.",
    description:
      "Recreates the chaos, strategy, and unpredictability of 6-hour and 24-hour endurance racing lap by lap in the console. Features multi-class battles across Hypercar, LMP2, and LMGT3, sudden rain shifts, Safety Car bunching, and realistic mechanical retirements.",
    technologies: [
      "Python 3.8+",
      "Probabilistic Modeling",
      "Terminal ANSI Engine",
      "Event Logging",
    ],
    status: "COMPLETED",
    featured: false,
    githubUrl: "https://github.com/vsr-yashwanth/WEC-Race-Simulator",
    metrics: [
      { label: "Race Formats", value: "6H (180 laps) / 24H (720 laps)" },
      { label: "Classes", value: "Hypercar, LMP2, LMGT3" },
      { label: "Dependencies", value: "Pure Python Stdlib" },
    ],
    caseStudy: {
      overview:
        "Built out of a deep personal fascination with endurance motorsport (Le Mans 24h, Spa 6h) to explore stochastic event generation and multi-agent competitive pacing.",
      problem:
        "Most racing games focus on twitch graphics rather than the macro strategic flow of endurance racing: fuel burn rates, tire degradation in shifting rain, and safety car interventions.",
      architecture:
        "Event-driven simulation loop evaluating lap times based on base vehicle class pacing, driver consistency, tire grip in current weather state, and mechanical reliability thresholds.",
      keyDecisions: [
        "Kept zero external dependencies (pure Python standard library) so the entire race can execute anywhere instantaneously.",
        "Logged every pit stop, safety car phase, and sector delta to automated race transcript files.",
      ],
      outcomes: [
        "Produces unpredictable, narratively compelling race stories every time the script executes.",
      ],
      lessons: [
        "Simulation realism emerges not from hyper-complex mathematics, but from well-tuned probabilistic tension.",
      ],
    },
  },
  {
    id: "wec-lap-time",
    slug: "wec-lap-time",
    index: "07",
    title: "WEC Lap & Stint Calculator",
    subtitle: "Endurance Racing Strategy & Fuel Window Engineering GUI",
    category: "SIMULATION",
    year: "2026",
    summary:
      "Clean desktop engineering GUI for endurance racing teams and sim-racers to calculate stint windows, fuel consumption rates, and pit strategy.",
    description:
      "A lightweight Python and Tkinter engineering tool that estimates fuel consumption, stint length in laps and minutes, pit stop counts, and splash-and-dash margins using realistic WEC class presets (Hypercar, LMP2, LMGT3) and classic endurance circuits (Le Mans, Spa, Nürburgring).",
    technologies: [
      "Python",
      "Tkinter",
      "Endurance Race Engineering",
      "Strategy Math",
    ],
    status: "COMPLETED",
    featured: false,
    githubUrl: "https://github.com/vsr-yashwanth/WEC-Lap-Time",
    metrics: [
      { label: "Interface", value: "Dark-Themed Tkinter GUI" },
      { label: "Circuits", value: "Le Mans, Spa, Nürburgring" },
      { label: "Calculations", value: "Fuel, Stints, Pit Windows" },
    ],
    caseStudy: {
      overview:
        "Designed to solve the real math of endurance racing: calculating exact fuel margins so a car doesn't run dry on the Mulsanne straight or make an unnecessary pit stop with 5 minutes remaining.",
      problem:
        "Sim-racers and endurance fans need fast calculations for pit windows and fuel burns without having to build complex spreadsheets during live practice sessions.",
      architecture:
        "Standalone GUI utility applying endurance racing formulas across user-configurable tank capacity, fuel consumption rate, and lap time presets.",
      keyDecisions: [
        "Implemented clear splash-and-dash warnings when remaining race time exceeds tank capacity by less than 2 laps.",
      ],
      outcomes: [
        "Rapidly provides accurate pit stop predictions and stint windows.",
      ],
      lessons: [
        "Focused, single-purpose software that does one thing reliably is often far more satisfying to use than bloated suites.",
      ],
    },
  },
];
