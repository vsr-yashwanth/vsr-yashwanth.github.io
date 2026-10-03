export interface WritingEntry {
  id: string;
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  type: "NOVEL" | "TECHNICAL ESSAY" | "RESEARCH LOG" | "PHILOSOPHY";
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  tags: string[];
  isManuscript?: boolean;
}

export const writingData: WritingEntry[] = [
  {
    id: "paperhearts",
    slug: "paperhearts",
    index: "BOOK // 01",
    title: "Paperhearts",
    subtitle: "A Novel by Silver Quill",
    type: "NOVEL",
    date: "Manuscript in Progress",
    readTime: "Excerpt // 5 min read",
    isManuscript: true,
    excerpt:
      "We build paper monuments to people who have already turned into ghosts. We fold our intentions into sharp, immaculate corners, pretending that fragile things don't crease when the rain begins to fall.",
    tags: ["Literary Fiction", "Novel", "Manuscript", "Silver Quill"],
    content: [
      "There is a particular quiet that belongs only to rooms where someone used to be.",
      "It isn't silence—silence is clean, undisturbed, like snow before footsteps. This quiet is heavier. It holds the residual frequency of conversations that never quite finished, of doors closed with too much gentleness, of apologies drafted in heads and left on nightstands to yellow in the afternoon sun.",
      "I had spent three years learning how to preserve things that were never meant to survive. In bookbinding, you learn that paper remembers every crease. You can press it beneath iron weights, you can smooth it with bone folders until the fibers ache, but the fracture remains. Light will always find the fault line.",
      "She used to say that people were constructed the same way—origami folded in haste, trying to stand tall against drafts they never saw coming.",
      "\"If you unfold a heart often enough,\" she told me once, holding a creased letter up against the blue haze of the window, \"eventually it stops being a shape. It just becomes an address where something used to live.\"",
      "This is the record of what remained after the folding stopped.",
    ],
  },
  {
    id: "on-mesh-radios-and-connectivity",
    slug: "on-mesh-radios-and-connectivity",
    index: "ESSAY // 01",
    title: "On Mesh Radios and the Illusion of Connectivity",
    subtitle: "Why Decentralized Protocols Fail When Software Ignores Antenna Physics",
    type: "TECHNICAL ESSAY",
    date: "September 2026",
    readTime: "7 min read",
    excerpt:
      "Modern software engineering has trained us to treat networks as frictionless abstractions. We write fetch() and assume electrons will obey our promises. When you step into the wilderness with zero cell towers, the physics of antennas reasserts itself with violent clarity.",
    tags: ["Distributed Systems", "Mesh Networking", "DTN", "Wireless"],
    content: [
      "We have spent thirty years building an internet predicated on the fantasy of infinite, continuous bandwidth. In modern web architectures, a momentary disconnection is treated as an exceptional error—a red toast notification, an exponential backoff loop, a panic.",
      "When we engineered Whisp for Smart India Hackathon, our biggest breakthrough wasn't algorithmic; it was philosophical.",
      "In the physical world of Bluetooth Low Energy and Wi-Fi Direct, nodes do not form a cozy, persistent constellation. They drift. A human carrying a handset turns a rocky corner in a ravine, and the link drops instantly. Two hikers walk past each other on a switchback trail, their radios sharing a fleeting 4-second window of RF proximity before parting.",
      "If your network protocol demands synchronous handshakes, it will collapse. You cannot negotiate three-way handshakes when the contact window is 200 milliseconds.",
      "The answer lies in Delay-Tolerant Networking (DTN): store-and-forward custody transfer. You treat data not as a fluid stream, but as a physical letter dropped into a traveler's satchel. The node takes custody. It carries the packet through the dark. It hands it off when radio geometry allows.",
      "Decentralization is not just about removing servers from your diagrams; it is about building software that respects the stubborn, beautiful physics of distance.",
    ],
  },
  {
    id: "deterministic-guards-for-safety-ai",
    slug: "deterministic-guards-for-safety-ai",
    index: "RESEARCH LOG // 02",
    title: "Deterministic Guards for Mission-Critical AI",
    subtitle: "Why Safety Dispatchers Need Exact Rules Rather Than Probabilistic Hallucinations",
    type: "RESEARCH LOG",
    date: "July 2026",
    readTime: "6 min read",
    excerpt:
      "When a tourist is stranded on a crumbling cliff at 2,800 meters, an emergency dispatcher cannot wait for a non-deterministic generative model to decide if the situation is urgent. They need audited, explainable, sub-millisecond evaluation.",
    tags: ["Safety Systems", "Explainable AI", "Kiroshi", "Deterministic Logic"],
    content: [
      "There is an unfortunate modern tendency to slap a large language model onto every problem and declare it 'intelligent.' In emergency dispatch systems, this tendency is not just lazy—it is dangerous.",
      "When developing KIROSHI, we made an intentional architectural commitment: the risk scoring engine would remain strictly deterministic.",
      "A deterministic rule-based evaluator evaluating geofence containment, topological cliff proximity, kinematic fall speed, and route deviation runs in under 0.04 milliseconds. It never hallucinates. It produces identical output for identical inputs across every invocation. Most critically, it generates an exact natural language audit sentence: 'Route deviation > 450m from designated trail vector coupled with kinematic descent velocity 0.32/s.'",
      "An emergency responder reading that alert knows precisely what physical reality triggered the dispatch.",
      "AI is extraordinary when extracting patterns from messy sensor streams—such as convolutional pose estimation or crack segmentation. But the final decision plane—the state machine that decides whether to scramble a search-and-rescue team—must be anchored in verifiable, deterministic software engineering.",
    ],
  },
  {
    id: "zen-of-endurance-racing",
    slug: "zen-of-endurance-racing",
    index: "ESSAY // 03",
    title: "The Zen of 24-Hour Endurance Racing",
    subtitle: "What 720 Laps at Le Mans Teaches About Distributed Systems and Attrition",
    type: "PHILOSOPHY",
    date: "February 2026",
    readTime: "5 min read",
    excerpt:
      "Sprint racing is about speed. Endurance racing is about survival. You can lead 719 laps of the Circuit de la Sarthe, but if your alternator fails at 2:45 PM on Sunday, your race never happened.",
    tags: ["Motorsport", "Endurance", "Systems Engineering", "Resilience"],
    content: [
      "Every year in June, sixty-two cars gather in north-western France to drive as fast as humanly possible for twenty-four consecutive hours. Over four thousand kilometers in a single day.",
      "To outsiders, motorsport looks like thirty wealthy people driving in circles. But to anyone who understands systems, the 24 Hours of Le Mans is the most brutal, romantic distributed systems stress-test on Earth.",
      "At 3:00 AM on the Mulsanne straight, traveling at 330 km/h in absolute darkness, the fastest car is not the one with the highest peak horsepower. The fastest car is the one whose cooling ducts didn't clog with rubber marbles, whose telemetry sensors didn't desync under vibration, and whose pit crew planned for a safety car twelve laps before the rain fell.",
      "Building software is no different. The tech industry worships sprint speed: 10x developers, rapid MVPs, fragile architectures taped together with venture capital and frantic workarounds.",
      "Endurance engineering is about staying on track when the storm hits. It is about fault tolerance, graceful degradation, and writing systems that are still running when the clock strikes twenty-four.",
    ],
  },
];
