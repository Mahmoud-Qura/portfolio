// ─── constants.ts ────────────────────────────────────────────────────────────
// Single source of truth for:
//   • Design tokens (colors, font names)
//   • Portfolio content (skills, projects, navigation)
//
// Change values here to update the whole site instantly.
// ─────────────────────────────────────────────────────────────────────────────

// ── Design Tokens ─────────────────────────────────────────────────────────────
export const COLORS = {
  // Backgrounds
  lightBg: "#fdf9f3",   // warm cream — easy on the eyes for long sessions
  darkBg: "#18181b",    // deep charcoal — rich but not pure black

  // Text
  lightText: "#18181b", // near-black for max contrast on cream
  darkText: "#f4f4f5",  // near-white for contrast on charcoal

  // Accent — calm indigo, same hue in both modes (slightly lighter in dark)
  accent: "#6366f1",
  accentDark: "#818cf8",

  // Muted
  muted: "#6b7280",
} as const;

// ── Font Families ─────────────────────────────────────────────────────────────
export const FONTS = {
  display: "'Playfair Display', Georgia, serif",
  body: "'DM Sans', system-ui, sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

// ── Developer Info ────────────────────────────────────────────────────────────
export const DEV = {
  name: "Mahmoud Qura",
  title: "Full-Stack Web Developer",
  tagline: "Full Stack Specialist · Building products people love to use.",
  heroImage:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=80",
  // Small hero/card photo — use the local JPEG from public/images
  heroCardImage: "/images/hero-card.jpeg",
  email: "mahmoudqura98@gmail.com",
  location: "Banha, Egypt",
  github: "https://github.com/Zom3a",
  linkedin: "https://linkedin.com/in/mahmoudqura",
  cvUrl: "../app/assests/files/Mahmoud_Qura_CV.pdf",
} as const;

// ── Navigation Links ───────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact",  href: "/contact" },
] as const;

// ── Skills ────────────────────────────────────────────────────────────────────
export interface Skill {
  name: string;
  category: "core" | "tools" | "practices";
}

export const SKILLS: Skill[] = [
  // Core Full Stack
  { name: "MongoDB",    category: "core" },
  { name: "Express.js", category: "core" },
  { name: "React",      category: "core" },
  { name: "Node.js",    category: "core" },
  { name: "Next.js",    category: "core" },
  // Tools
  { name: "TypeScript", category: "tools" },
  { name: "Tailwind CSS", category: "tools" },
  { name: "Git & GitHub", category: "tools" },
  { name: "REST APIs",  category: "tools" },
  { name: "Docker",     category: "tools" },
  { name: "Vercel / Netlify", category: "tools" },
  // Practices
  { name: "JWT Auth",   category: "practices" },
  { name: "OAuth 2.0",  category: "practices" },
  { name: "Agile / Scrum", category: "practices" },
  { name: "CI / CD",    category: "practices" },
  { name: "Testing (Jest)", category: "practices" },
];

// ── Projects ──────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tech: string[];
  github: string;
  demo?: string;
  featured: boolean;
  image: string;
  imageAlt: string;
  imagePosition?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "SkillsTracker",
    title: "SkillsTracker — Skill Management App",
    description:
      "A comprehensive skill management app with progress tracking, goal setting, and social sharing.",
    longDescription:
      "SkillsTracker is a personal development platform that helps users manage their skills, set learning goals, and track their progress over time. The app features a clean UI built with React, a robust backend powered by Node.js and MongoDB, and seamless integration with popular learning platforms.",
    tech: ["MongoDB", "Express", "React", "Node.js", "Socket.io", "JWT"],
    github: "https://github.com/Zom3a/SkillsTracker",
    demo: "https://skillstracker-demo.vercel.app",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Developer workstation with code on screen",
    imagePosition: "center center",
  },
  {
    id: "El-Akella",
    title: "El-Akella — Community Platform",
    description:
      "A social platform for connecting with others and sharing experiences.",
    longDescription:
      "El-Akella is a community-driven platform that allows users to create profiles, share posts, and engage with others in a dynamic social environment. It features real-time messaging, content moderation, and a user-friendly interface built with modern web technologies.",
    tech: ["Next.js", "MongoDB", "Node.js", "Cloudinary", "Tailwind CSS"],
    github: "https://github.com/Zom3a/El-Akella",
    demo: "https://el-akella-demo.vercel.app",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "People collaborating around a workspace",
    imagePosition: "center center",
  },
  {
    id: "shopmart",
    title: "ShopMart — E-Commerce Platform",
    description:
      "End-to-end e-commerce site with product catalog, cart, orders, and Stripe payment integration.",
    longDescription:
      "ShopMart is a full marketplace with seller/buyer roles, product listings with search and filters, a cart system, Stripe checkout, and an admin dashboard for order management. Inventory is managed in MongoDB with optimistic concurrency.",
    tech: ["React", "Node.js", "MongoDB", "Express", "Stripe API", "Redux"],
    github: "https://github.com/Zom3a/ShopMart",
    demo: "https://shopmart-demo.vercel.app",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Shopping and online checkout scene",
    imagePosition: "center center",
  },
  {
    id: " PVCFormulationOptimizer",
    title: " PVCFormulationOptimizer — Chemical Formulation Tool",
    description:
      "A tool for optimizing PVC formulation processes with real-time simulation and analysis.",
    longDescription:
      " PVCFormulationOptimizer is a specialized application designed to assist chemical engineers in optimizing PVC formulations. It provides real-time simulation capabilities, detailed analysis reports, and a user-friendly interface built with modern web technologies.",
    tech: ["Next.js", "MongoDB", "Chart.js", "Tailwind CSS", "NextAuth"],
    github: "https://github.com/Zom3a/PVCFormulationOptimizer",
    demo: "https://pvcformulationoptimizer-demo.vercel.app",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Laboratory glassware and scientific workspace",
    imagePosition: "center center",
  },
  {
    id: "Doctory",
    title: "Doctory — Medical Appointment Scheduler",
    description:
      "A web application for scheduling and managing medical appointments with real-time availability updates.",
    longDescription:
      "Doctory is a comprehensive medical appointment scheduling platform that allows patients to book, reschedule, and cancel appointments in real-time. The app features a user-friendly interface built with React, a robust backend powered by Node.js and MongoDB, and seamless integration with popular calendar services.",
    tech: ["Express", "Angular", "MongoDB", "Mongoose", "Bootstrap", "REST API"],
    github: "https://github.com/Zom3a/Doctory",
    demo: "https://doctory-demo.vercel.app",  
    featured: true,
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Doctor and patient in a medical office",
    imagePosition: "center top",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description:
      "A responsive portfolio website showcasing projects and skills.",
    longDescription:
      "This is a modern portfolio website built with React and Next.js, featuring a clean design, smooth animations, and a fully responsive layout. It includes sections for projects, about me, and contact information.",
    tech: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Zom3a/portfolio-website",
    demo: "https://portfolio-website-demo.vercel.app",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Creative desk setup for a portfolio website",
    imagePosition: "center center",
  },
];

// ── Helper — get featured projects only ───────────────────────────────────────
export const getFeaturedProjects = () => PROJECTS.filter((p) => p.featured);
