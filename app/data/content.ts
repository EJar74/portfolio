// Single source of truth for site content.
// Game facts trace to the project brief; bio + experience come from Eli's resume.

export const SITE = {
  name: "Eli Jaramillo",
  resumeUrl: "/resume.pdf",
  email: "Eli.Jaramillo74@gmail.com",
  location: "Los Angeles, CA",
  links: {
    github: "https://github.com/EJar74",
    linkedin: "https://www.linkedin.com/in/eli-jaramillo",
    game: "https://siliconianshowdown.com",
  },
};

// Optional: point this at a real stats endpoint later to make the numbers live.
// Returns e.g. { playersNow: number, players: number, discord: number }.
export const STATS_URL = process.env.NEXT_PUBLIC_STATS_URL || "";

// --- HERO ---------------------------------------------------------------
export const HERO = {
  eyebrow: "Software Engineer",
  line1: "Eli Jaramillo",
  // Lead with the unfakeable thing: real people use a real system he built alone.
  hook: {
    pre: "On my own time I built a real-time multiplayer game, and I run it for ",
    emph1: "1,300+ players",
    mid: ". Three services and 86,000 lines of code. ",
    emph2: "Built solo",
    post: ".",
  },
  chips: [
    { value: 1300, suffix: "+", label: "players" },
    { value: 600, suffix: "", label: "in Discord" },
    { value: 86, suffix: "K+", label: "lines of code" },
    { value: 5, suffix: "+ yrs", label: "live & solo" },
  ],
};

// --- ABOUT --------------------------------------------------------------
export const ABOUT = {
  paragraphs: [
    "I'm a software engineer who likes owning the whole problem, from the architecture down to whether the people using it are actually better off. Over the past five years I've shipped enterprise applications, led cross-functional teams, and built the integrations that hold them together across media and financial services.",
    "At NBCUniversal I support payment systems that move more than $6 billion a year, and I write the Python tooling that turns hours of manual reconciliation into minutes. Before that, at Capital Group, I ran a $2.5 million platform build as product manager, scrum master, and QA lead for a nine-person team, and it earned $1.3 million in follow-on funding.",
  ],
  bridge:
    "Then there's the project I do for myself. I designed, built, and operate Siliconian Showdown, a live multiplayer game with its own real-time distributed backend. It's where I go deep on the parts of engineering I like most: concurrency, crash recovery, and keeping game state consistent for more than a thousand players at once.",
  // Core stack only, kept short on purpose. The work below proves the rest.
  stack: [
    "TypeScript",
    "Python",
    "React / Next.js",
    "Node / Express",
    "MongoDB",
    ".NET",
    "Socket.IO",
    "SQL",
  ],
  languages: "Works in English & Spanish",
};

// --- ARCHITECTURE (centerpiece walkthrough) ----------------------------
export type ArchNode = {
  id: "client" | "relay" | "engine";
  title: string;
  stack: string;
  owns: string;
};

export const ARCH_NODES: ArchNode[] = [
  {
    id: "client",
    title: "Client",
    stack: "Next.js / React",
    owns: "Everything the player sees and does. It never talks to the engine directly; it only renders state.",
  },
  {
    id: "relay",
    title: "Communication Server",
    stack: "Node.js · Express · Socket.IO",
    owns: "All real-time messaging and match orchestration: matchmaking, rooms, spectating, and reconnection.",
  },
  {
    id: "engine",
    title: "Game Engine",
    stack: "Python · WebSocket RPC",
    owns: "All game logic: damage, status effects, win conditions, and AI decisions.",
  },
];

// A walkthrough of how one real battle action moves through the system.
export type FlowStep = {
  from: ArchNode["id"] | "player";
  to: ArchNode["id"] | "player";
  channel: string;
  log: string;
  ms: number;
};

export const FLOW_STEPS: FlowStep[] = [
  { from: "player", to: "client", channel: "input", log: "player taps move → Pyro Strike on slot 2", ms: 0 },
  { from: "client", to: "relay", channel: "socket.io", log: 'emit "match:action" { move: "pyro_strike", target: 2 }', ms: 6 },
  { from: "relay", to: "engine", channel: "ws-rpc", log: "rpc.call resolve_turn(matchId, action)", ms: 11 },
  { from: "engine", to: "engine", channel: "compute", log: "resolve damage · apply status(burn) · check win-cond", ms: 18 },
  { from: "engine", to: "relay", channel: "ws-rpc", log: "return { dmg: 42, status: [burn], winner: null }", ms: 9 },
  { from: "relay", to: "client", channel: "socket.io", log: 'broadcast "match:state" to both players + spectators', ms: 7 },
  { from: "client", to: "player", channel: "render", log: "animate hit · update HP bars · 60fps", ms: 4 },
];

// --- SCALE + TRACTION METRICS ------------------------------------------
export const METRICS = [
  { value: "1,300+", label: "Registered players", sub: "grew from 200, all organic" },
  { value: "600", label: "Discord members", sub: "active player community" },
  { value: "86K+", label: "Lines of code", sub: "TypeScript, JavaScript, Python" },
  { value: "3", label: "Independent services", sub: "client, relay, engine" },
  { value: "50+", label: "REST endpoints", sub: "plus a custom WebSocket RPC" },
  { value: "120+", label: "Playable characters", sub: "across 3 warring factions" },
  { value: "22", label: "AI configurations", sub: "tiers, bosses, and raids" },
  { value: "5+ yrs", label: "Live in production", sub: "2020 to today" },
];

// --- CASE STUDIES -------------------------------------------------------
export type CaseStudy = {
  id: string;
  title: string;
  tag: string;
  analog: string;
  summary: string;
  detail: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "wager",
    title: "Wager lifecycle",
    tag: "Correctness under concurrency",
    analog: "the same invariant payments systems live by",
    summary:
      "Escrow, then normalization, then settlement, all with ACID guarantees so in-game currency can't be lost or duplicated when operations run at the same time.",
    detail: [
      "Funds are escrowed at match start and settled atomically at resolution using MongoDB multi-document transactions.",
      "Settlement is normalized so concurrent payouts, refunds, and rake never race into a double-spend or a lost balance.",
      "The invariant holds even when many matches settle at once: total currency in always equals total currency out.",
    ],
  },
  {
    id: "conquest",
    title: "Conquest finalize",
    tag: "Crash-safe distributed state",
    analog: "idempotent, checkpoint-based finalize",
    summary:
      "A 7-day, 3-faction territory war with a hand-authored tile map, faction chat, and time-weighted scoring. Its finalize step is idempotent and checkpoint-based, so multi-document reward payouts survive a crash mid-finalize without ever double-paying.",
    detail: [
      "If the process dies partway through dispatch, finalize resumes from the last checkpoint instead of paying anyone twice.",
      "Rewards across many players and documents are dispatched exactly once, even under partial failure.",
      "It was built as a self-contained subsystem on top of the existing PvP infrastructure, added without disrupting live matches.",
    ],
  },
  {
    id: "ai",
    title: "Config-driven AI",
    tag: "Predictable over fashionable",
    analog: "data and rule-trees, not ML",
    summary:
      "22 AI configurations driven by data and rule-trees instead of machine learning, chosen because they're predictable, debuggable, and tunable by a non-engineer. Behavior profiles change without touching code.",
    detail: [
      "CombatIQ scores the board against authored rule-trees to pick a move, so every decision is traceable and reproducible.",
      "Difficulty tiers and boss personalities are data, not code, which means balance changes ship without a redeploy.",
      "It's a deliberate trade-off: ML would look flashier but be far harder to debug, tune, and trust in a live competitive game.",
    ],
  },
];

// --- WAR STORIES (bug cards) -------------------------------------------
export type WarStory = {
  id: string;
  title: string;
  symptom: string;
  diagnosis: string;
  fix: string;
};

export const WAR_STORIES: WarStory[] = [
  {
    id: "bsod",
    title: "The BSOD chain",
    symptom:
      "After many rounds, some Windows machines hit a VIDEO_TDR_FAILURE blue screen in the middle of a match.",
    diagnosis:
      "Every <video> with a loaded source holds a GPU decoder context in VRAM that the browser never frees on hide or removal. Over many rounds the orphaned decoders piled up, exhausted VRAM, and blue-screened Windows.",
    fix: "An explicit releaseDecoder() that keeps just one active decoder per slot, plus disciplined cleanup of preload elements, timers, and listeners.",
  },
  {
    id: "badge",
    title: "The badge XP bug",
    symptom:
      "In co-op, character-badge XP looked inflated. More was landing than the action should ever grant.",
    diagnosis:
      "XP was being granted to every party member instead of only the character that earned it.",
    fix: "Scoped the grant to the earner. Caught in review before it ever shipped.",
  },
  {
    id: "splat",
    title: "The stronghold splat bug",
    symptom:
      "On a home-base loss, defenders weren't being eliminated the way the rules require.",
    diagnosis:
      "When deciding eliminations the engine read post-mutation state, so it was judging the board after it had already changed.",
    fix: "Read the pre-mutation state at the right point in the turn lifecycle, which restored the intended ordering.",
  },
];

// --- MODE FAMILIES ------------------------------------------------------
export const MODES = [
  { name: "PvP", detail: "1v1, 3P FFA, 4P FFA, 2v2, casual and ranked" },
  { name: "PvE Incursion", detail: "solo, co-op, 3v1 raid" },
  { name: "Survival", detail: "endless run, escalating difficulty" },
  { name: "Conquest", detail: "3-faction, 7-day territory war" },
  { name: "Custom Rooms", detail: "player-hosted, configurable matches" },
];

// --- EXPERIENCE ---------------------------------------------------------
export type Role = {
  position: string;
  company: string;
  location?: string;
  period: string;
  summary?: string;
  bullets?: string[];
};

export const EXPERIENCE: Role[] = [
  {
    position: "Senior Application Engineer",
    company: "NBCUniversal",
    location: "Los Angeles, CA",
    period: "Dec 2024 – May 2026",
    bullets: [
      "Backed enterprise payment systems handling $6B+ in annual revenue across 200M+ transactions, acting as the technical bridge between payment vendors, POS platforms, and internal teams.",
      "Led the rollout of 70+ mobile payment terminals across 5 venues, owning device configuration, Oracle POS integration, operator training, and hypercare.",
      "Built Python automation for transaction reporting, compliance auditing, and reconciliation that cut multi-hour processes down to minutes.",
      "Found and closed a PCI compliance gap where full card numbers were collected over email, working with Infosec and Finance to redesign the process and purge the exposed data.",
    ],
  },
  {
    position: "Consultant",
    company: "California Thrift Store",
    location: "Remote",
    period: "Dec 2023 – Present",
    summary:
      "Leading the digital transformation of store operations, moving inventory into multichannel retail to lift turnover.",
  },
  {
    position: "Solutions Engineer II",
    company: "Capital Group",
    location: "Irvine, CA",
    period: "Aug 2021 – Dec 2023",
    bullets: [
      "Acted as product manager, scrum master, and QA lead for a $2.5M web app (.NET/Angular/SQL) consolidating HRIS data for 400+ associates at a $2.5T AUM firm, delivered on time and earning $1.3M in expansion funding.",
      "Led a 9-person Agile team through planning, backlog refinement, and biweekly stakeholder demos, shipping features that saved $750K+ a year in manual work.",
      "Ran vendor evaluation and selection for a $1M enterprise review platform, from gap analysis through launch in 10 months at 80%+ user satisfaction.",
      "Shipped a self-service module that let investment professionals validate their own compensation data, saving operations 1,000+ hours ($150K+) a year.",
    ],
  },
  {
    position: "Post-Closing Intern",
    company: "CoreVest Finance",
    period: "Jul 2020 – Aug 2020",
    summary:
      "Kept loan documentation accurate and consistent to support audit readiness and operational integrity.",
  },
  {
    position: "Commercial Lending Intern",
    company: "Pacific Enterprise Bank",
    period: "May 2019 – Sep 2019",
    summary:
      "Ran property site visits and financial analyses to validate loan eligibility and sharpen lending decisions.",
  },
  {
    position: "Research Protections Assistant",
    company: "UCI Office of Research",
    period: "Nov 2017 – Jun 2018",
    summary:
      "Managed research records and compliance documentation so they stayed organized and audit-ready.",
  },
];

// --- SECONDARY PROJECTS -------------------------------------------------
export const OTHER_PROJECTS = [
  {
    title: "California Thrift Store",
    image: "/CTS.png",
    link: "https://californiathriftstore.com",
    description:
      "An e-commerce platform that moved a family thrift store online, with a simple flow for selling one-of-a-kind finds.",
  },
  {
    title: "Nanovor Reborn",
    image: "/Logo_Reborn.png",
    link: "http://nanovorreborn.com",
    description:
      "A community hub for the Nanovor franchise, built as a home base for new and returning players.",
  },
  {
    title: "Vor: Silicon Showdown",
    image: "/Vor.png",
    link: "https://www.youtube.com/watch?v=mPGhiMdALts",
    description:
      "Where it started. A standalone Python/Tkinter desktop game that became the seed for Siliconian Showdown.",
  },
];

// --- EDUCATION ----------------------------------------------------------
export const EDUCATION = {
  school: "University of California, Irvine",
  degrees: "BS Informatics · BA Business Economics",
  year: "2021",
};
