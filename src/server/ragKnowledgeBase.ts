/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface KnowledgeChunk {
  id: string;
  source: string;
  document: string;
  section: string;
  contentType: 'profile' | 'experience' | 'skills' | 'projects' | 'education' | 'certifications' | 'operations';
  text: string;
  tags: string[];
  embedding?: number[];
}

export const initialKnowledgeBase: KnowledgeChunk[] = [
  {
    id: "chunk-profile-01",
    source: "Verified Resume & LinkedIn",
    document: "resume.pdf",
    section: "Professional Identity",
    contentType: "profile",
    text: "Shivank Maurya is a FullStack MERN Developer and Technical Support Associate based in Lucknow, India. Primary positioning: FullStack MERN Developer. Secondary positioning: Full Stack Developer, MERN Stack Developer, Frontend Developer, Web Developer, JavaScript Developer, and Technical Support / SaaS Support. Email: codewithshivank@gmail.com. LinkedIn: https://www.linkedin.com/in/shivank-maurya-21257a303/. GitHub: https://github.com/shivankmaurya.",
    tags: ["shivank", "maurya", "fullstack mern developer", "mern stack", "full stack developer", "lucknow", "india", "email", "linkedin", "contact"]
  },
  {
    id: "chunk-summary-02",
    source: "Verified Resume",
    document: "resume.pdf",
    section: "Professional Summary",
    contentType: "profile",
    text: "Shivank Maurya bridges modern full-stack MERN web engineering across the JavaScript and TypeScript ecosystem (MongoDB, Express.js, React.js, Node.js, Next.js, PostgreSQL) with high-volume technical customer operations. He emphasizes writing clean, maintainable code that solves real customer problems with disciplined root-cause troubleshooting.",
    tags: ["summary", "fullstack mern", "mern stack", "full stack", "javascript", "typescript", "react", "next.js", "node.js", "mongodb", "postgresql", "problem solving"]
  },
  {
    id: "chunk-skills-lang-03",
    source: "Verified Resume",
    document: "resume.pdf",
    section: "Technical Skills - Languages",
    contentType: "skills",
    text: "Core programming and markup languages: JavaScript (ES6+), TypeScript, HTML5, and CSS3. Strong focus on modern ESNext patterns, asynchronous programming, typed interfaces, and semantic HTML.",
    tags: ["javascript", "typescript", "html5", "css3", "es6", "languages"]
  },
  {
    id: "chunk-skills-frontend-04",
    source: "Verified Resume",
    document: "resume.pdf",
    section: "Technical Skills - Frontend",
    contentType: "skills",
    text: "Frontend engineering proficiencies: React.js, Next.js, Tailwind CSS, Material UI, Ant Design, React Hook Form, React Query, and Zustand state management. Experienced in building responsive component hierarchies, client-side routing, accessible UI forms, and performance optimization.",
    tags: ["react", "react.js", "next.js", "tailwind css", "material ui", "ant design", "react hook form", "react query", "zustand", "frontend"]
  },
  {
    id: "chunk-skills-backend-05",
    source: "Verified Resume",
    document: "resume.pdf",
    section: "Technical Skills - Backend & APIs",
    contentType: "skills",
    text: "Backend and API technologies: Node.js, Express.js, RESTful API design, Mongoose, and Prisma ORM. Authentication and protocols: JSON Web Tokens (JWT), OAuth, GraphQL, and Postman for API testing and documentation.",
    tags: ["node.js", "express.js", "rest api", "mongoose", "prisma", "jwt", "oauth", "graphql", "postman", "backend"]
  },
  {
    id: "chunk-skills-db-06",
    source: "Verified Resume",
    document: "resume.pdf",
    section: "Technical Skills - Databases",
    contentType: "skills",
    text: "Databases and caching: MongoDB (document store with Mongoose schemas), PostgreSQL (relational SQL data modeling), and Redis (in-memory caching and session key-value storage).",
    tags: ["mongodb", "postgresql", "postgres", "redis", "database", "sql", "nosql"]
  },
  {
    id: "chunk-skills-tools-07",
    source: "Verified Resume",
    document: "resume.pdf",
    section: "Technical Skills - Tooling & Infrastructure",
    contentType: "skills",
    text: "Developer tooling, cloud, and testing: Git version control, Docker containerization, Amazon Web Services (AWS), Jest unit testing, and Visual Studio Code. Additional competencies: Data Structures & Algorithms, Agile Development, Prompt Engineering, and Generative AI workflows.",
    tags: ["git", "docker", "aws", "jest", "vs code", "data structures", "algorithms", "agile", "prompt engineering", "generative ai"]
  },
  {
    id: "chunk-exp-niftel-08",
    source: "Verified Resume & Employment Records",
    document: "resume.pdf",
    section: "Work Experience - Niftel Communications",
    contentType: "experience",
    text: "Current role: Customer Support Associate at Niftel Communications in Lucknow, India (August 2025 – Present). Supported platform: Swiggy food-delivery and quick-commerce platform operations. Responsibilities: Handling 50+ daily customer and operational interactions across chat and voice with strict SLA adherence. Performing structured root-cause analysis on multi-step order and delivery states. Achieving approximately 20% reduction in repeat issue tickets through documented troubleshooting guides and proactive solution dissemination. Maintaining detailed CRM interaction logs, technical escalation notes, and coordinating across 3+ operational shifts.",
    tags: ["niftel communications", "customer support associate", "swiggy", "lucknow", "sla", "root cause analysis", "crm", "food delivery", "quick commerce", "repeat tickets"]
  },
  {
    id: "chunk-proj-portfolio-09",
    source: "Verified Resume & Projects",
    document: "resume.pdf",
    section: "Projects - Portfolio Website",
    contentType: "projects",
    text: "Project: Personal Developer Portfolio & Digital Résumé. Built with React.js, TypeScript, Tailwind CSS, Motion, HTML5, and CSS3, deployed on GitHub Pages / Cloud Run. Features: Responsive component architecture, dark/light theme persistence, ATS keyword discovery strip, printable 1-page ATS résumé generator, built-in case study Content Management System (CMS), and WCAG-accessible dialogs.",
    tags: ["portfolio", "portfolio website", "react.js", "typescript", "tailwind css", "github pages", "ats resume"]
  },
  {
    id: "chunk-proj-inotebook-10",
    source: "Verified Resume & Projects",
    document: "resume.pdf",
    section: "Projects - iNoteBook",
    contentType: "projects",
    text: "Project: iNoteBook — Secure Note-Taking Web Application. Architecture: MERN stack (React.js, Node.js, Express.js, MongoDB, Mongoose). Solved problem: Protecting user notes with secure cloud-based authentication. Features: User registration and login with JSON Web Tokens (JWT), full CRUD operations for personal notes, tag-based categorization and search, and security-focused API endpoints preventing cross-user data leakage.",
    tags: ["inotebook", "secure note taking", "react.js", "node.js", "express.js", "mongodb", "jwt", "mern", "crud", "security"]
  },
  {
    id: "chunk-edu-bbdu-11",
    source: "Verified Resume",
    document: "resume.pdf",
    section: "Education - BCA",
    contentType: "education",
    text: "Degree: Bachelor of Computer Applications (BCA) at Babu Banarasi Das University in Lucknow, India. Enrollment period: 2025 – 2028. Coursework includes Computer Science, Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, and Web Application Development.",
    tags: ["bca", "babu banarasi das university", "bbdu", "lucknow", "computer applications", "education", "degree"]
  },
  {
    id: "chunk-edu-inter-12",
    source: "Verified Resume",
    document: "resume.pdf",
    section: "Education - 12th Standard",
    contentType: "education",
    text: "Education: 12th Standard — Science at S.C.S.A.S.N. Inter College (2023 – 2024). Focused on Mathematics, Physics, Chemistry, and analytical logical problem solving.",
    tags: ["12th standard", "science", "scsasn inter college", "high school", "intermediate", "education"]
  },
  {
    id: "chunk-cert-forage-13",
    source: "Verified Resume & Credentials",
    document: "resume.pdf",
    section: "Certifications - Industry Job Simulations",
    contentType: "certifications",
    text: "Corporate job simulations completed via Forage: 1) Deloitte Australia — Technology Job Simulation (SDLC, architecture planning). 2) Deloitte Australia — Cyber Job Simulation (cybersecurity fundamentals, threat assessment, secure design). 3) Accenture North America — Data Analytics and Visualization Job Simulation (data modeling, business analytics). 4) Tata Group — Data Visualization: Empowering Business with Effective Insights (executive data storytelling, dashboard metrics).",
    tags: ["deloitte", "forage", "accenture", "tata group", "job simulation", "cyber", "technology", "data analytics", "data visualization"]
  },
  {
    id: "chunk-cert-tech-14",
    source: "Verified Resume & Credentials",
    document: "resume.pdf",
    section: "Certifications - Technical Courses",
    contentType: "certifications",
    text: "Technical certifications: 1) Node, Express, MongoDB certified by Knowledge Gate (covering backend architecture, REST API design, MongoDB integration). 2) Introduction to Prompt Engineering for Generative AI certified by LinkedIn Learning (LLM interaction patterns, prompt structure, AI-assisted development).",
    tags: ["knowledge gate", "linkedin learning", "node", "express", "mongodb", "prompt engineering", "generative ai", "certifications"]
  }
];
