/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problemSolved: string;
  solution: string;
  technologies: string[];
  keyFeatures: string[];
  role: string;
  githubUrl?: string;
  liveUrl?: string;
  category: 'Full Stack' | 'Frontend' | 'Web App';
  status: 'Completed' | 'In Active Development';
  isFeatured: boolean;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  isCurrent: boolean;
  platformSupported: string;
  summary: string;
  highlights: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  skillsUsed: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  details?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialType: 'Course Certification' | 'Job Simulation' | 'Professional Skill';
  skillsGained: string[];
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: {
    name: string;
    highlight?: boolean;
  }[];
}

export interface PortfolioData {
  profile: {
    name: string;
    initials: string;
    headline: string;
    location: string;
    email: string;
    bioIntro: string;
    bioParagraphs: string[];
    availability: string;
    primaryRole: string;
    secondaryRoles: string[];
    canonicalUrl: string;
  };
  socialLinks: {
    name: string;
    url: string;
    icon: string;
    label: string;
    isPrimary?: boolean;
  }[];
  atsKeywords: string[];
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
}

export const initialPortfolioData: PortfolioData = {
  profile: {
    name: "Shivank Maurya",
    initials: "SM",
    headline: "FullStack MERN Developer | Customer Support & Technical Support",
    location: "Lucknow, India",
    email: "codewithshivank@gmail.com",
    availability: "Available for FullStack MERN & Frontend Engineering Opportunities",
    primaryRole: "FullStack MERN Developer",
    secondaryRoles: [
      "Full Stack Developer",
      "MERN Stack Developer",
      "Frontend Developer",
      "Web Developer",
      "JavaScript Developer",
      "Technical Support / SaaS Support"
    ],
    canonicalUrl: "https://ais-pre-myo7dlpp3wzoswvjayfl5m-510071491043.asia-east1.run.app",
    bioIntro: "FullStack MERN developer based in Lucknow, India, bridging responsive frontends with robust backend architectures and disciplined, SLA-driven customer problem solving.",
    bioParagraphs: [
      "Currently pursuing a Bachelor of Computer Applications (BCA) at Babu Banarasi Das University (2025–2028), I combine rigorous academic computer science foundations with real-world engineering across the modern JavaScript and TypeScript ecosystem.",
      "My day-to-day workflow bridges full-stack MERN application development (MongoDB, Express.js, React.js, Node.js, Next.js, and PostgreSQL) with battle-tested technical support experience supporting Swiggy's food-delivery and quick-commerce platform at Niftel Communications. This background gives me an acute understanding of real customer pain points, root-cause troubleshooting, SLA adherence, and operational reliability.",
      "I believe the best software is not just technically sound, but maintainable, accessible, and designed to solve actual human problems without unnecessary friction."
    ]
  },
  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/shivank-maurya-21257a303/",
      icon: "linkedin",
      label: "Connect on LinkedIn",
      isPrimary: true
    },
    {
      name: "GitHub",
      url: "https://github.com/shivankmaurya",
      icon: "github",
      label: "View Code on GitHub",
      isPrimary: true
    },
    {
      name: "Email",
      url: "mailto:codewithshivank@gmail.com",
      icon: "mail",
      label: "Email Directly",
      isPrimary: true
    }
  ],
  atsKeywords: [
    "FullStack MERN",
    "MERN Stack",
    "JavaScript (ES6+)",
    "TypeScript",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "REST APIs",
    "Tailwind CSS",
    "State Management",
    "Technical Support",
    "Root Cause Analysis",
    "Agile Development",
    "Git",
    "Docker"
  ],
  skills: [
    {
      name: "Languages",
      description: "Core programming and markup languages",
      skills: [
        { name: "JavaScript (ES6+)", highlight: true },
        { name: "TypeScript", highlight: true },
        { name: "HTML5" },
        { name: "CSS3" }
      ]
    },
    {
      name: "Frontend",
      description: "Modern component-driven web interfaces",
      skills: [
        { name: "React.js", highlight: true },
        { name: "Next.js", highlight: true },
        { name: "Tailwind CSS", highlight: true },
        { name: "Material UI" },
        { name: "Ant Design" },
        { name: "React Hook Form" },
        { name: "React Query" },
        { name: "Zustand" }
      ]
    },
    {
      name: "Backend",
      description: "Server architecture, services, and ORMs",
      skills: [
        { name: "Node.js", highlight: true },
        { name: "Express.js", highlight: true },
        { name: "REST APIs", highlight: true },
        { name: "Mongoose" },
        { name: "Prisma" }
      ]
    },
    {
      name: "Databases",
      description: "Relational, document, and cache storage",
      skills: [
        { name: "MongoDB", highlight: true },
        { name: "PostgreSQL", highlight: true },
        { name: "Redis" }
      ]
    },
    {
      name: "Auth & APIs",
      description: "Identity, authorization, and protocol tooling",
      skills: [
        { name: "JWT (JSON Web Tokens)", highlight: true },
        { name: "OAuth" },
        { name: "GraphQL" },
        { name: "Postman" }
      ]
    },
    {
      name: "Tooling & Cloud",
      description: "Development environment, versioning, and deployment",
      skills: [
        { name: "Git", highlight: true },
        { name: "Docker" },
        { name: "AWS (Amazon Web Services)" },
        { name: "Jest" },
        { name: "VS Code" }
      ]
    },
    {
      name: "Methodologies & AI",
      description: "Engineering practices and emerging workflows",
      skills: [
        { name: "Data Structures & Algorithms" },
        { name: "Agile Development", highlight: true },
        { name: "Prompt Engineering" },
        { name: "Generative AI" }
      ]
    }
  ],
  experience: [
    {
      id: "exp-niftel",
      title: "Customer Support Associate",
      company: "Niftel Communications",
      location: "Lucknow, India",
      period: "August 2025 – Present",
      isCurrent: true,
      platformSupported: "Swiggy Food Delivery & Quick-Commerce",
      summary: "Deliver high-touch technical and customer operations support for Swiggy's high-volume food-delivery and quick-commerce ecosystems. Specialize in structured root-cause analysis, operational handoffs, and process documentation that directly eliminated recurring system tickets.",
      highlights: [
        "Manage 50+ daily customer and operational interactions across chat and voice with strict adherence to first-response and turnaround SLAs.",
        "Perform structured root-cause analysis on multi-step delivery, order-state discrepancies, and platform anomalies to diagnose underlying technical vs. operational issues.",
        "Drove an estimated ~20% reduction in repeat issue tickets by authoring clear troubleshooting workflows and sharing verified solutions across shift handoffs.",
        "Maintain high-fidelity CRM interaction records, detailed issue logs, and technical escalation briefs for cross-functional engineering and operations squads.",
        "Collaborate across 3+ operational shifts to ensure continuity in incident tracking and customer satisfaction during peak service surges."
      ],
      metrics: [
        { label: "Daily Interactions", value: "50+" },
        { label: "Repeat Ticket Reduction", value: "~20%" },
        { label: "SLA Adherence", value: "Strict" },
        { label: "Operational Shifts", value: "3+ Coordinated" }
      ],
      skillsUsed: [
        "Root Cause Analysis",
        "Technical Troubleshooting",
        "CRM Documentation",
        "SLA Management",
        "Cross-functional Coordination",
        "Process Optimization"
      ]
    }
  ],
  projects: [
    {
      id: "proj-portfolio",
      title: "Personal Developer Portfolio & ATS Résumé",
      tagline: "High-performance digital résumé and interactive developer identity",
      category: "Frontend",
      status: "Completed",
      isFeatured: true,
      role: "Lead Frontend Engineer & Designer",
      description: "A responsive, accessible personal portfolio website built with React, TypeScript, and modern component architecture. Features dark/light modes, keyboard-friendly navigation, printable ATS résumé mode, and an intuitive client-side case-study CMS.",
      problemSolved: "Recruiters and hiring managers spend an average of 6–10 seconds evaluating candidate profiles. Standard template portfolios are bloated, difficult to parse for ATS keywords, and lack verified project problem-solution context.",
      solution: "Engineered a lightning-fast, zero-slop web portfolio prioritizing verified resume data, ATS keyword discoverability, printable resume formatting, and direct 1-click recruiter actions for email, LinkedIn, and project case studies.",
      technologies: ["React.js", "TypeScript", "Tailwind CSS", "Motion", "HTML5", "CSS3", "GitHub Pages"],
      keyFeatures: [
        "100% verified resume data representation with zero fabricated statistics",
        "Interactive ATS Keyword Explorer and filterable technical skill matrix",
        "Dedicated printable ATS résumé view with clean printer styles",
        "Built-in Case Study CMS modal for updating and exporting project data",
        "Accessible modal system with keyboard navigation (Esc to close) and ARIA attributes",
        "Social sharing drawer with preformatted sharing links for LinkedIn, WhatsApp, and X"
      ],
      githubUrl: "https://github.com/shivankmaurya",
      liveUrl: "https://ais-pre-myo7dlpp3wzoswvjayfl5m-510071491043.asia-east1.run.app"
    },
    {
      id: "proj-inotebook",
      title: "iNoteBook — Secure Note-Taking Web Application",
      tagline: "Cloud-based encrypted personal note management platform",
      category: "Full Stack",
      status: "Completed",
      isFeatured: true,
      role: "Full Stack Developer",
      description: "A secure cloud-based note-taking web application that allows users to create, read, update, and manage personal notes through an authenticated and protected web interface.",
      problemSolved: "Users needed a lightweight, accessible personal note repository that protects sensitive notes from unauthorized viewing while providing instant synchronization and tagging across sessions.",
      solution: "Developed a full-stack web application featuring user registration, token-based authentication (JWT), secure CRUD RESTful endpoints, and an intuitive note organization dashboard.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "REST APIs"],
      keyFeatures: [
        "Secure user authentication and session management using JSON Web Tokens (JWT)",
        "Full CRUD operations (Create, Read, Update, Delete) for user-owned notes",
        "Tagging and categorization system for fast note retrieval and search",
        "Stateful React interface with responsive card layouts and instant feedback",
        "Security-first API architecture preventing cross-user note leakage"
      ],
      githubUrl: "https://github.com/shivankmaurya",
      liveUrl: "" // Verified: Link coming soon as per prompt guidelines
    }
  ],
  education: [
    {
      id: "edu-bca",
      degree: "Bachelor of Computer Applications (BCA)",
      institution: "Babu Banarasi Das University",
      location: "Lucknow, India",
      period: "2025 – 2028",
      details: "Comprehensive coursework in Computer Science, Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, and Web Application Development."
    },
    {
      id: "edu-inter",
      degree: "12th Standard — Science",
      institution: "S.C.S.A.S.N. Inter College",
      location: "India",
      period: "2023 – 2024",
      details: "Science curriculum emphasizing Mathematics, Physics, Chemistry, and analytical logical problem solving."
    }
  ],
  certifications: [
    {
      id: "cert-mern",
      title: "Node, Express, MongoDB",
      issuer: "Knowledge Gate",
      date: "Verified Certification",
      credentialType: "Course Certification",
      skillsGained: ["Node.js", "Express.js", "MongoDB", "Backend Architecture", "REST APIs"]
    },
    {
      id: "cert-prompt-eng",
      title: "Introduction to Prompt Engineering for Generative AI",
      issuer: "LinkedIn Learning",
      date: "Verified Certification",
      credentialType: "Professional Skill",
      skillsGained: ["Prompt Engineering", "Generative AI", "LLM Workflows", "AI-assisted Development"]
    },
    {
      id: "cert-deloitte-tech",
      title: "Technology Job Simulation",
      issuer: "Deloitte Australia (via Forage)",
      date: "Verified Simulation",
      credentialType: "Job Simulation",
      skillsGained: ["Software Development Life Cycle", "Architecture Planning", "Technical Evaluation"]
    },
    {
      id: "cert-deloitte-cyber",
      title: "Cyber Job Simulation",
      issuer: "Deloitte Australia (via Forage)",
      date: "Verified Simulation",
      credentialType: "Job Simulation",
      skillsGained: ["Cybersecurity Fundamentals", "Threat Assessment", "Secure Design Principles"]
    },
    {
      id: "cert-accenture-data",
      title: "Data Analytics and Visualization Job Simulation",
      issuer: "Accenture North America (via Forage)",
      date: "Verified Simulation",
      credentialType: "Job Simulation",
      skillsGained: ["Data Modeling", "Business Analytics", "Insight Visualization"]
    },
    {
      id: "cert-tata-data",
      title: "Data Visualization: Empowering Business with Effective Insights",
      issuer: "Tata Group (via Forage)",
      date: "Verified Simulation",
      credentialType: "Job Simulation",
      skillsGained: ["Executive Data Storytelling", "Dashboard Interpretation", "Business Impact"]
    }
  ]
};
