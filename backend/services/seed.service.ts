import { User } from '../models/User.model.js';
import { Profile } from '../models/Profile.model.js';
import { Project } from '../models/Project.model.js';
import { Skill } from '../models/Skill.model.js';
import { Service } from '../models/Service.model.js';
import { Testimonial } from '../models/Testimonial.model.js';
import { BlogPost } from '../models/BlogPost.model.js';
import { ContactMessage } from '../models/ContactMessage.model.js';
import { SiteSetting } from '../models/SiteSetting.model.js';
import { config } from '../config/env.js';

export async function seedDatabase(): Promise<void> {
  console.log('Checking database seed status...');

  // 1. Seed Admin User
  const existingAdmin = await User.findOne({ email: config.adminEmail.toLowerCase() });
  if (!existingAdmin) {
    console.log(`Seeding initial Admin user (${config.adminEmail})...`);
    await User.create({
      email: config.adminEmail.toLowerCase(),
      password: config.adminPassword,
      name: 'Tajbidul Islam',
      role: 'ADMIN',
      avatar: '/image/ADMIN.png',
    });
  }

  // 2. Seed Profile
  const profileCount = await Profile.countDocuments();
  if (profileCount === 0) {
    console.log('Seeding developer profile...');
    await Profile.create({
      name: 'Tajbidul Islam',
      professionalTitle: 'Principal Full-Stack & Distributed Systems Architect',
      tagline: 'Crafting resilient cloud architectures, real-time distributed systems, and luxury digital interfaces.',
      biography:
        'With 9+ years of experience engineering high-scale web platforms, I specialize in building high-concurrency Node.js/TypeScript systems, resilient MongoDB architectures, and seamless React experiences. I help ambitious technology ventures turn complex engineering challenges into scalable, fault-tolerant products built for speed, reliability, and growth.',
      aboutMarkdown: `### Engineering Philosophy & Architecture

I believe exceptional software engineering requires a relentless focus on both **systemic resilience** and **aesthetic craftsmanship**. High throughput means nothing if the end-user experience is sluggish or fragile; equally, a polished UI collapses without robust, type-safe backend foundations.

My architectural approach focuses on:
- **Clean Separation of Concerns**: Building modular RESTful and event-driven APIs with strictly typed contracts.
- **Data Integrity & Scale**: Leveraging MongoDB Atlas indexing, sharded replication, and optimized aggregation pipelines for sub-millisecond retrieval.
- **Zero-Compromise Security**: Enforcing multi-layer defenses with HTTP-only tokens, strict role-based access control, cryptographic hashing, and automated input sanitization.
- **Predictable Performance**: Optimizing rendering lifecycles, memory footprints, and network payloads across the full client-server spectrum.`,
      profileImage: '/image/ADMIN.png',
      secondaryImage: '/image/ADMIN.png',
      location: 'San Francisco, CA (Open to Worldwide Remote Engagements)',
      availability: 'Available for Select Architecture Advisory & Full-Stack Engagements',
      yearsOfExperience: 9,
      statistics: [
        { label: 'Production Deployments', value: '140+', description: 'Across enterprise and venture-backed SaaS' },
        { label: 'Avg API Latency', value: '< 28ms', description: 'At 99.9th percentile under sustained load' },
        { label: 'Active Monthly Users', value: '4.2M+', description: 'Supported across architected client platforms' },
        { label: 'Uptime SLA Delivered', value: '99.99%', description: 'Achieved with multi-region failover' },
      ],
      experience: [
        {
          company: 'Vanguard Cloud Systems',
          role: 'Principal Systems Architect',
          location: 'San Francisco, CA',
          startDate: '2023',
          endDate: 'Present',
          current: true,
          description: [
            'Lead architectural roadmap for multi-tenant microservices supporting 1.8M active daily users.',
            'Engineered MongoDB Atlas automated sharding strategy reducing database query latency by 44%.',
            'Mentored 18 senior engineers across distributed systems design and high-security compliance audits.',
          ],
          technologies: ['TypeScript', 'Node.js', 'Express', 'MongoDB Atlas', 'Docker', 'Kubernetes', 'AWS'],
        },
        {
          company: 'Apex Data Labs',
          role: 'Lead Full-Stack Engineer',
          location: 'Remote / New York',
          startDate: '2020',
          endDate: '2023',
          current: false,
          description: [
            'Architected real-time analytical workspace using React, Node.js, WebSockets, and Mongoose.',
            'Implemented zero-downtime database migration pipelines processing over 60M daily events.',
            'Spearheaded transition to type-safe end-to-end Zod schemas and automated security gates.',
          ],
          technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Redis', 'Tailwind CSS', 'Docker'],
        },
        {
          company: 'Hyperion Interactive',
          role: 'Senior Backend & Systems Engineer',
          location: 'Austin, TX',
          startDate: '2017',
          endDate: '2020',
          current: false,
          description: [
            'Developed RESTful API core for enterprise fintech dashboard handling $80M+ in quarterly transaction volume.',
            'Formulated secure JWT cookie authentication and role-based access control infrastructure.',
          ],
          technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'REST API', 'GCP'],
        },
      ],
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com', icon: 'Github' },
        { platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'Linkedin' },
        { platform: 'Twitter / X', url: 'https://x.com', icon: 'Twitter' },
        { platform: 'Email', url: 'mailto:alexander.vance.dev@gmail.com', icon: 'Mail' },
      ],
      email: 'siamtazbidul4@gmail.com',
      phone: '+8801730976031',
      resumeUrl: '#resume-download',
    });
  }

  // 3. Seed Projects
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    console.log('Seeding portfolio projects...');
    await Project.insertMany([
      {
        title: 'OmniFlow AI Orchestration Platform',
        slug: 'omniflow-ai-orchestration-platform',
        tagline: 'Enterprise Multi-Agent Workflow Engine with Real-Time Event Streaming',
        shortDescription:
          'A distributed orchestration engine connecting LLM agent graphs, dynamic vector search, and real-time execution pipelines with sub-50ms dispatch latency.',
        fullDescription:
          'OmniFlow is an enterprise-grade AI execution platform designed for complex multi-agent workflows. It provides visual graph topology execution, streaming token inspection, autonomous memory synchronization via MongoDB Atlas vector indices, and strict rate-budgeting policies. Built with an Express/Node.js event loop backed by cluster workers and high-frequency WebSocket streams.',
        problem:
          'Legacy automation tools suffered from fragile serial execution, unmanaged API timeouts when interacting with multimodal models, and lack of deterministic tracing across parallel agent branches.',
        solution:
          'Engineered a state-machine driven scheduler utilizing Mongoose models for state checkpoints, enabling instant crash recovery, persistent execution replay, and granular role-based cost allocation.',
        keyFeatures: [
          'DAG Workflow Compiler with live DAG node inspection',
          'MongoDB Atlas Vector Search integration with cosine similarity ranking',
          'Token rate limiter with tiered tenant budget management',
          'Full-audit logging with cryptographic state verification',
          'Real-time streaming telemetry dashboard via React and Motion',
        ],
        featuredImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
        ],
        technologies: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB Atlas', 'Tailwind CSS', 'Docker'],
        category: 'AI & ML',
        architecture: {
          frontend: 'React 19, Tailwind CSS, Motion, React Hook Form, Custom Canvas DAG Visualizer',
          backend: 'Node.js, Express, TypeScript, Zod, JWT HttpOnly Auth',
          database: 'MongoDB Atlas, Mongoose, Aggregation Pipelines, Vector Indexes',
          infrastructure: 'Docker, Cloud Run, NGINX Reverse Proxy, GitHub Actions CI/CD',
        },
        metrics: ['Sub-45ms average workflow dispatch latency', 'Processed 12M+ token requests/day', '99.99% system availability'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com/omniflow',
        featured: true,
        published: true,
        displayOrder: 1,
      },
      {
        title: 'HyperScale Distributed Data Mesh',
        slug: 'hyperscale-distributed-data-mesh',
        tagline: 'High-Throughput Timeseries & Document Ingestion Pipeline',
        shortDescription:
          'A high-concurrency ingestion service processing 50,000+ telemetry events/sec with automated schema migration, batch indexing, and dynamic querying.',
        fullDescription:
          'HyperScale delivers lightning-fast data aggregation for industrial IoT and real-time observability. Features custom buffer pooling in Node.js memory, bulk write execution against MongoDB Atlas replica sets, and query optimization pipelines that yield instantaneous analytics over billion-row datasets.',
        problem:
          'Existing data ingestion pipelines suffered from thread exhaustion and lock contention during sudden event bursts, resulting in dropped frames and stale analytics.',
        solution:
          'Designed a reactive batching queue in Node.js combined with MongoDB bulkWrite operations and time-to-live (TTL) collection policies to sustain peak write throughput without dropping packets.',
        keyFeatures: [
          'Non-blocking Node.js stream ingestion with backpressure regulation',
          'MongoDB Atlas compound indices optimized for time-range window queries',
          'Interactive React dashboard featuring real-time sparklines and multi-dimensional filtering',
          'Role-based data access controls with column-level masking',
        ],
        featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        ],
        technologies: ['Node.js', 'Express', 'MongoDB Atlas', 'Mongoose', 'React', 'TypeScript', 'Tailwind CSS'],
        category: 'Cloud & Systems',
        architecture: {
          frontend: 'React, Tailwind CSS, Recharts, Virtualized List Rendering',
          backend: 'Express, Node.js Cluster Mode, Stream Processing',
          database: 'MongoDB Atlas Replica Set, Timeseries Collections',
          infrastructure: 'Kubernetes, Prometheus, Grafana, Terraform',
        },
        metrics: ['50,000+ events/sec peak ingestion', '44% reduction in query latency', 'Zero packet loss during stress testing'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com/hyperscale',
        featured: true,
        published: true,
        displayOrder: 2,
      },
      {
        title: 'FinPulse Real-Time Trading Desk',
        slug: 'finpulse-real-time-trading-desk',
        tagline: 'Ultra-Low-Latency Financial Market Terminal with Order Simulation',
        shortDescription:
          'A web-based quantitative trading desk with real-time level-2 order book visualization, risk calculation engines, and paper execution pipelines.',
        fullDescription:
          'FinPulse brings institutional-grade trading mechanics to the browser. Built with a custom binary protocol adapter over WebSockets, optimized React virtual rendering for 60fps ticker updates, and Express server-side risk check validation before committing simulated trades into MongoDB ledger collections.',
        problem:
          'Standard web frontends experience UI jank and severe render bottlenecks when processing hundreds of market price updates per second.',
        solution:
          'Implemented custom web worker buffer offloading on the client combined with server-side batch broadcasting and atomic MongoDB $inc transactions for instant portfolio balance verification.',
        keyFeatures: [
          'Level-2 Order Book with real-time depth chart calculation',
          'Server-side atomic margin validation and position liquidation simulator',
          'Comprehensive trade journal with automated P&L tax reporting',
          'Dark room high-contrast UI tailored for multi-monitor developer setups',
        ],
        featuredImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=1200&q=80',
        ],
        technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
        category: 'Fintech',
        architecture: {
          frontend: 'React, Web Workers, Canvas Charts, Tailwind CSS',
          backend: 'Node.js, Express, WebSocket Cluster, Zod',
          database: 'MongoDB, Mongoose, ACID Transactions',
          infrastructure: 'AWS ECS, Redis Pub/Sub, Cloudflare Workers',
        },
        metrics: ['16ms render refresh cycle', '100% ACID transaction compliance', '$2.4M simulated trading volume tested'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com/finpulse',
        featured: true,
        published: true,
        displayOrder: 3,
      },
      {
        title: 'NexusPay Global Multi-Currency Gateway',
        slug: 'nexuspay-global-multi-currency-gateway',
        tagline: 'PCI-Compliant Payment Infrastructure with Dynamic Routing',
        shortDescription:
          'A resilient payment orchestration microservice supporting multi-currency conversion, idempotent webhook dispatch, and automated fraud scoring.',
        fullDescription:
          'NexusPay orchestrates cross-border transactions across 30+ regional payment rails. The platform uses cryptographic tokenization, distributed idempotency keys in MongoDB, and automated reconciliation daemons to maintain zero discrepancies across settlement batches.',
        problem:
          'Payment drop-offs due to regional banking downtimes and duplicate charge risks during unreliable mobile network disconnects.',
        solution:
          'Engineered a smart retry circuit breaker pattern in Express with strict idempotency locks in MongoDB, guaranteeing zero duplicate transactions under any network partition.',
        keyFeatures: [
          'Distributed idempotency lock layer with automatic TTL release',
          'Dynamic payment rail routing based on real-time gateway health scores',
          'Webhook dispatch system with exponential backoff and signature verification',
          'Interactive Merchant Portal with live dispute resolution workflow',
        ],
        featuredImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&w=1200&q=80',
        ],
        technologies: ['TypeScript', 'Express', 'Node.js', 'MongoDB Atlas', 'React', 'Zod'],
        category: 'Fintech',
        architecture: {
          frontend: 'React, Tailwind CSS, TypeScript, Accessible Forms',
          backend: 'Express, TypeScript, Circuit Breaker Middleware',
          database: 'MongoDB Atlas with Multi-Document Transactions',
          infrastructure: 'Docker, Vault Secrets, GCP Cloud Run',
        },
        metrics: ['0.00% double-charge incidents across 800k test transactions', '99.995% gateway uptime', 'PCI DSS Level 1 Architecture'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com/nexuspay',
        featured: false,
        published: true,
        displayOrder: 4,
      },
      {
        title: 'AetherOS Cloud Micro-Kernel',
        slug: 'aetheros-cloud-micro-kernel',
        tagline: 'WebAssembly Virtual Machine Runtime for Distributed Edge Computing',
        shortDescription:
          'An ultra-lightweight WebAssembly micro-runtime running sandboxed serverless functions with sub-millisecond cold starts and deterministic memory isolation.',
        fullDescription:
          'AetherOS provides instant sandboxed compute capabilities for distributed cloud environments. Functions compile down to WASM modules, executing securely within strict memory boundaries and logging telemetry directly to MongoDB document stores.',
        problem:
          'Traditional containerized microservices suffer from 200ms+ cold starts and excessive memory overhead for lightweight ephemeral tasks.',
        solution:
          'Pioneered an in-process V8/Wasm execution pipeline orchestrated by Express that boots micro-lambdas in < 2ms with complete thread isolation.',
        keyFeatures: [
          'Sub-2ms cold start execution for WASM binaries',
          'Fine-grained memory limits and syscall interception',
          'Developer CLI and browser testing playground',
          'MongoDB logging driver for aggregated invocation analytics',
        ],
        featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
        ],
        technologies: ['TypeScript', 'Node.js', 'WebAssembly', 'Express', 'MongoDB', 'React'],
        category: 'Open Source',
        architecture: {
          frontend: 'React, Monaco Code Editor, Tailwind CSS',
          backend: 'Node.js, Express, Wasmtime V8 bindings',
          database: 'MongoDB Atlas, Mongoose',
          infrastructure: 'Edge Workers, Container Runtime',
        },
        metrics: ['1.8ms median cold start', '6MB baseline memory per isolate', '100% sandboxed execution'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com/aetheros',
        featured: false,
        published: true,
        displayOrder: 5,
      },
      {
        title: 'DevSync Collaborative Engineering Suite',
        slug: 'devsync-collaborative-engineering-suite',
        tagline: 'Real-Time Multiplayer Code Editor and Architectural Whiteboard',
        shortDescription:
          'A seamless collaborative workspace combining CRDT-based concurrent editing, live peer cursor streaming, and persistent document versioning.',
        fullDescription:
          'DevSync enables distributed engineering squads to pair program and sketch system topology diagrams synchronously. Utilizes Conflict-Free Replicated Data Types (CRDTs) to ensure convergence across offline edits, with periodic document state snapshots stored in MongoDB.',
        problem:
          'Remote engineering teams struggle with disjointed tooling between code editors, whiteboard sketches, and pull request review systems.',
        solution:
          'Created a unified canvas and multi-buffer text editor powered by React and Express with persistent state snapshots and atomic lock-free resolution.',
        keyFeatures: [
          'Conflict-free multi-user live code editing with syntax highlighting',
          'Vector whiteboard canvas with custom component stencil library',
          'Version history timeline with instant point-in-time document rollback',
          'Role-based permissions with guest view links and admin audit logs',
        ],
        featuredImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
        galleryImages: [
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
        ],
        technologies: ['React 19', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
        category: 'Full-Stack',
        architecture: {
          frontend: 'React 19, Motion, Tailwind CSS, Canvas API',
          backend: 'Node.js, Express, WebSocket Hub, Zod Validation',
          database: 'MongoDB Atlas, Mongoose, Version Snapshots',
          infrastructure: 'Docker, AWS CloudFront, Redis Store',
        },
        metrics: ['Zero merge conflicts across 100,000+ edit events', '30ms peer synchronization latency', '99.98% session reliability'],
        githubUrl: 'https://github.com',
        liveUrl: 'https://example.com/devsync',
        featured: true,
        published: true,
        displayOrder: 6,
      },
    ]);
  }

  // 4. Seed Skills
  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    console.log('Seeding skills matrix...');
    await Skill.insertMany([
      // Frontend
      { name: 'React.js (v18/v19)', category: 'Frontend', proficiency: 98, icon: 'Atom', experienceYears: 8, highlightText: 'Concurrent Mode, Suspense, Custom Hooks & State Machines', displayOrder: 1, status: 'active' },
      { name: 'TypeScript', category: 'Frontend', proficiency: 96, icon: 'FileCode', experienceYears: 8, highlightText: 'Advanced Generics, Type Narrowing, AST Transformation', displayOrder: 2, status: 'active' },
      { name: 'Tailwind CSS', category: 'Frontend', proficiency: 95, icon: 'Palette', experienceYears: 6, highlightText: 'Design Systems, Custom Utility Themes, Responsive Grids', displayOrder: 3, status: 'active' },
      { name: 'Motion / Framer', category: 'Frontend', proficiency: 92, icon: 'Sparkles', experienceYears: 5, highlightText: 'Spring Physics, Gesture Animations & Layout Shifts', displayOrder: 4, status: 'active' },
      { name: 'Vite & Webpack', category: 'Frontend', proficiency: 90, icon: 'Zap', experienceYears: 7, highlightText: 'Module Federation, Rollup Plugins, Tree-Shaking', displayOrder: 5, status: 'active' },

      // Backend
      { name: 'Node.js Runtime', category: 'Backend', proficiency: 96, icon: 'Server', experienceYears: 9, highlightText: 'Event Loop Optimization, Cluster Workers, Streams', displayOrder: 6, status: 'active' },
      { name: 'Express.js', category: 'Backend', proficiency: 95, icon: 'Layers', experienceYears: 9, highlightText: 'RESTful API Architecture, Middleware Chains, Security', displayOrder: 7, status: 'active' },
      { name: 'REST & GraphQL APIs', category: 'Backend', proficiency: 94, icon: 'Network', experienceYears: 8, highlightText: 'Contract-First API Design, OpenAPI / Swagger Specs', displayOrder: 8, status: 'active' },
      { name: 'Authentication & Security', category: 'Backend', proficiency: 93, icon: 'ShieldCheck', experienceYears: 8, highlightText: 'JWT, HTTP-Only Cookies, OAuth2, RBAC, Rate Limiting', displayOrder: 9, status: 'active' },

      // Database
      { name: 'MongoDB & Atlas', category: 'Database', proficiency: 96, icon: 'Database', experienceYears: 8, highlightText: 'Sharded Clusters, Aggregation Pipelines, Vector Search', displayOrder: 10, status: 'active' },
      { name: 'Mongoose ODM', category: 'Database', proficiency: 95, icon: 'Cpu', experienceYears: 8, highlightText: 'Schema Hooks, Index Optimization, ACID Transactions', displayOrder: 11, status: 'active' },
      { name: 'Redis Cache & Pub/Sub', category: 'Database', proficiency: 88, icon: 'Flame', experienceYears: 6, highlightText: 'Distributed Locks, Rate Limiting & Ephemeral Buffers', displayOrder: 12, status: 'active' },

      // DevOps
      { name: 'Docker & Containers', category: 'DevOps', proficiency: 91, icon: 'Box', experienceYears: 7, highlightText: 'Multi-stage Builds, Distroless Images, Compose Orchestration', displayOrder: 13, status: 'active' },
      { name: 'CI/CD Pipelines', category: 'DevOps', proficiency: 89, icon: 'GitBranch', experienceYears: 7, highlightText: 'GitHub Actions, Automated Security Audits, Semantic Releases', displayOrder: 14, status: 'active' },
      { name: 'Cloud Run & AWS', category: 'DevOps', proficiency: 88, icon: 'Cloud', experienceYears: 6, highlightText: 'Serverless Scale-to-Zero, Ingress Proxying, IAM Policies', displayOrder: 15, status: 'active' },

      // Tools
      { name: 'Zod & Schema Validation', category: 'Tools', proficiency: 96, icon: 'CheckCircle2', experienceYears: 5, highlightText: 'Runtime Boundary Validation, Type Inference', displayOrder: 16, status: 'active' },
      { name: 'Git & Trunk Workflow', category: 'Tools', proficiency: 95, icon: 'GitMerge', experienceYears: 9, highlightText: 'Interactive Rebase, Monorepo Versioning, Code Reviews', displayOrder: 17, status: 'active' },
    ]);
  }

  // 5. Seed Services
  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    console.log('Seeding engineering services...');
    await Service.insertMany([
      {
        title: 'Full-Stack Web Architecture & Delivery',
        subtitle: 'Production-Grade React + Express + MongoDB Systems',
        description:
          'End-to-end design and implementation of modern, high-performance web platforms. From architectural blueprint and database schema modeling to fluid UI implementation and production deployment.',
        icon: 'Layers',
        features: [
          'TypeScript React frontend with luxury UI/UX and dark/light theming',
          'Modular Express RESTful API with strict Zod validation',
          'MongoDB Atlas database architecture with index optimization',
          'Secure authentication with HTTP-only JWTs and Role-Based Access Control',
          'Complete SEO, OpenGraph, and accessible semantic layouts',
        ],
        deliverables: [
          'Full-stack source repository with CI/CD configuration',
          'Comprehensive architectural documentation and API specs',
          'Production build pipeline and deployment automation',
        ],
        idealFor: 'Startups and growth-stage companies launching flagship web products requiring uncompromising speed and stability.',
        priceRange: '$12,000 – $35,000 / Engagement',
        timeline: '3 – 6 Weeks Delivery',
        displayOrder: 1,
        status: 'published',
      },
      {
        title: 'Cloud-Native Backend & Microservices',
        subtitle: 'Scalable Node.js & Distributed Systems',
        description:
          'Architecting resilient, event-driven backends capable of sustaining massive concurrency. Specializing in Node.js cluster optimization, distributed caching, and zero-downtime database migrations.',
        icon: 'Server',
        features: [
          'High-throughput Express/Node.js API servers with non-blocking I/O',
          'MongoDB aggregation pipelines and sharding strategies',
          'Multi-layer rate limiting, DDoS defense, and security hardening',
          'Comprehensive automated testing and error telemetry',
        ],
        deliverables: [
          'Robust backend microservices containerized with Docker',
          'Comprehensive performance benchmark and stress test reports',
          'Automated database migration scripts and backup policies',
        ],
        idealFor: 'Platforms experiencing traffic scaling bottlenecks or requiring clean backend rewrites with zero downtime.',
        priceRange: '$10,000 – $28,000 / Engagement',
        timeline: '2 – 5 Weeks Delivery',
        displayOrder: 2,
        status: 'published',
      },
      {
        title: 'Database Architecture & Atlas Optimization',
        subtitle: 'MongoDB Performance, Indexing & Vector Search',
        description:
          'Deep database profiling and architectural restructuring. We eliminate slow queries, configure optimal compound indexes, model complex data relationships, and integrate Atlas Vector Search for AI workloads.',
        icon: 'Database',
        features: [
          'Query execution plan analysis (explain plans) and bottleneck diagnosis',
          'Index optimization, compound key tuning, and TTL configurations',
          'MongoDB Atlas Vector Search setup and similarity indexing',
          'Data normalization vs embedding trade-off optimization',
        ],
        deliverables: [
          'Database optimization audit report with before/after metrics',
          'Optimized Mongoose schemas and query service helpers',
          'Index management and automated maintenance runbooks',
        ],
        idealFor: 'Engineering teams with slow database queries, ballooning Atlas costs, or newly introduced AI vector search needs.',
        priceRange: '$6,000 – $18,000 / Engagement',
        timeline: '1 – 3 Weeks Delivery',
        displayOrder: 3,
        status: 'published',
      },
      {
        title: 'Technical Due Diligence & Architecture Audits',
        subtitle: 'Independent Codebase, Security & Scalability Reviews',
        description:
          'Thorough architectural and security reviews of full-stack TypeScript/Node/MongoDB stacks for technical founders, CTOs, and investment syndicates.',
        icon: 'ShieldCheck',
        features: [
          'OWASP security vulnerability assessment (NoSQL injection, XSS, CSRF, IDOR)',
          'Code quality, modularity, and technical debt quantification',
          'Scalability ceiling estimation and infrastructure cost review',
          'Actionable remediation roadmap prioritized by business impact',
        ],
        deliverables: [
          'Executive summary presentation and deep-dive technical report',
          'Prioritized remediation backlog with code examples',
          'Live 90-minute architecture Q&A session with leadership',
        ],
        idealFor: 'Founders preparing for scale or investment rounds, and leadership seeking an independent technical audit.',
        priceRange: '$5,000 – $15,000 / Audit',
        timeline: '1 – 2 Weeks Turnaround',
        displayOrder: 4,
        status: 'published',
      },
    ]);
  }

  // 6. Seed Testimonials
  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    console.log('Seeding client testimonials...');
    await Testimonial.insertMany([
      {
        name: 'Marcus Sterling',
        role: 'Chief Technology Officer',
        company: 'Vanguard Cloud Infrastructure',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        testimonial:
          'Alexander is a masterclass in full-stack systems engineering. He redesigned our core MongoDB Atlas data layer and API routing, dropping our p99 query latency from 320ms to under 28ms while dramatically lowering operational costs. His attention to detail across the entire stack is extraordinary.',
        rating: 5,
        projectRelation: 'OmniFlow AI Orchestration Platform',
        featured: true,
        displayOrder: 1,
        status: 'published',
      },
      {
        name: 'Elena Rostova',
        role: 'VP of Engineering',
        company: 'Apex Data Labs',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
        testimonial:
          'Working with Alexander gave our team an unfair competitive advantage. He delivered a flawless React and Node.js architecture that our engineering squad continues to build upon with immense confidence. Every endpoint was typed, validated, and rock-solid.',
        rating: 5,
        projectRelation: 'HyperScale Data Mesh',
        featured: true,
        displayOrder: 2,
        status: 'published',
      },
      {
        name: 'David Chen',
        role: 'Founder & CEO',
        company: 'FinPulse Systems',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
        testimonial:
          'Rarely do you encounter a senior engineer who excels equally at distributed backend scaling and luxury, modern UI design. Alexander took our trading terminal from concept to production-ready launch ahead of our investor deadline.',
        rating: 5,
        projectRelation: 'FinPulse Real-Time Trading Desk',
        featured: true,
        displayOrder: 3,
        status: 'published',
      },
      {
        name: 'Sophia Laurent',
        role: 'Head of Product',
        company: 'Nexus Digital Group',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
        testimonial:
          'The security and reliability standards Alexander instituted for our payment gateway gave our institutional partners absolute confidence. He does not cut corners—everything is crafted to last.',
        rating: 5,
        projectRelation: 'NexusPay Multi-Currency Gateway',
        featured: false,
        displayOrder: 4,
        status: 'published',
      },
    ]);
  }

  // 7. Seed Blog Posts
  const blogCount = await BlogPost.countDocuments();
  if (blogCount === 0) {
    console.log('Seeding engineering articles...');
    await BlogPost.insertMany([
      {
        title: 'Architecting High-Throughput Node.js Backends with MongoDB Atlas',
        slug: 'architecting-high-throughput-nodejs-mongodb-atlas',
        excerpt:
          'A deep dive into compound indexing, connection pool reuse, aggregation pipelines, and avoiding common Mongoose memory bottlenecks under high concurrency.',
        content: `## The Modern Full-Stack Reality

When building enterprise applications on the **React + Node.js + Express + MongoDB** stack, bottlenecks rarely arise from the Express routing layer itself. Instead, they almost universally stem from sub-optimal database querying patterns, connection pooling mismanagement, and unindexed document lookups.

### 1. Connection Pool Optimization in Production
One of the most frequent anti-patterns is re-instantiating Mongoose connections or using un-tuned pool sizes. In high-concurrency Node runtimes:

\`\`\`typescript
await mongoose.connect(MONGODB_URI, {
  maxPoolSize: 50, // Maintain up to 50 socket connections
  minPoolSize: 10, // Pre-warm connections
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
\`\`\`

By pre-allocating minimum pool sizes, Node avoid handshake latency spikes when burst traffic hits.

### 2. Compound Indexing & Prefix Matching
MongoDB indexes are B-tree structures. A compound index on \`{ category: 1, published: 1, createdAt: -1 }\` can fulfill queries sorting by creation date within published categories with zero memory sort overhead.

Always run \`.explain('executionStats')\` during development to ensure \`totalDocsExamined\` closely matches \`nReturned\`.

### 3. Lean Queries for Read-Heavy Endpoints
When returning data to public React views where Mongoose document methods are unnecessary, always utilize \`.lean()\`. This skips hydrating heavy Mongoose document wrappers, reducing memory allocation by up to 60%.`,
        coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
        category: 'Architecture',
        tags: ['MongoDB', 'Node.js', 'Performance', 'Backend', 'TypeScript'],
        author: {
          name: 'Tajbidul Islam',
          role: 'Principal Systems Architect',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        },
        readingTime: '7 min read',
        status: 'published',
        seoTitle: 'Architecting High-Throughput Node.js & MongoDB Atlas Backends',
        seoDescription: 'Learn proven architectural patterns for scaling Node.js, Express, and MongoDB Atlas with sub-millisecond query performance.',
        featured: true,
        views: 1420,
      },
      {
        title: 'Zero-Trust Authentication: Securing Full-Stack Apps with JWT & HTTP-Only Cookies',
        slug: 'zero-trust-authentication-jwt-httponly-cookies',
        excerpt:
          'Why storing JWTs in browser localStorage is an unacceptable security hazard, and how to implement airtight cookie-based session authorization in Express.',
        content: `## The LocalStorage Vulnerability

Storing authentication tokens in browser \`localStorage\` or \`sessionStorage\` exposes every user session to Cross-Site Scripting (XSS) extraction. Any compromised third-party npm package or rogue script tag can execute \`localStorage.getItem('token')\` and exfiltrate user credentials.

### The Solution: Secure HTTP-Only Cookies
By configuring authentication tokens inside **HTTP-only, SameSite cookies**, the browser manages token transmission on every API request without JavaScript ever having read access to the underlying secret.

\`\`\`typescript
res.cookie('portfolio_admin_token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});
\`\`\`

### Defense in Depth: Role-Based Authorization
Authentication proves identity; authorization verifies privilege. All sensitive operations must enforce server-side role validation using strongly typed enums (\`ADMIN\`, \`EDITOR\`) rather than relying on client state claims.`,
        coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
        category: 'Security',
        tags: ['Security', 'JWT', 'Authentication', 'Express', 'DevSecOps'],
        author: {
          name: 'Tajbidul Islam',
          role: 'Principal Systems Architect',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        },
        readingTime: '6 min read',
        status: 'published',
        seoTitle: 'Zero-Trust Authentication with JWT & HTTP-Only Cookies',
        seoDescription: 'Master modern full-stack web security with HTTP-only cookies, SameSite policies, and server-side role verification.',
        featured: true,
        views: 980,
      },
      {
        title: 'Type-Safe End-to-End Contracts with Zod and TypeScript',
        slug: 'type-safe-end-to-end-contracts-zod-typescript',
        excerpt:
          'Eliminating runtime errors and malicious payloads by sharing structural schemas between client validation and server-side Express controllers.',
        content: `## The Fallacy of Compile-Time Types Alone

TypeScript provides magnificent developer ergonomics during development, but compile-time type assertions vanish completely once JavaScript code executes at runtime. An API controller that blindly casts \`req.body as ProjectInput\` offers zero guarantee that the incoming payload actually satisfies the contract.

### Runtime Boundary Validation with Zod
Zod bridges this gap by providing runtime validation schemas that simultaneously infer TypeScript types:

\`\`\`typescript
export const ProjectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  technologies: z.array(z.string()).min(1),
  published: z.boolean().default(true),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
\`\`\`

By validating every incoming request at the controller gate, invalid payloads are rejected with clear \`422 Unprocessable Entity\` feedback before touching database layers.`,
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
        category: 'TypeScript',
        tags: ['TypeScript', 'Zod', 'Validation', 'Architecture', 'CleanCode'],
        author: {
          name: 'Tajbidul Islam',
          role: 'Principal Systems Architect',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        },
        readingTime: '5 min read',
        status: 'published',
        seoTitle: 'Type-Safe Full-Stack Contracts with Zod and TypeScript',
        seoDescription: 'How to achieve end-to-end type safety across client and server boundaries with Zod validation schemas.',
        featured: false,
        views: 740,
      },
      {
        title: 'Building Luxury UI Experiences: Micro-Interactions without Performance Bloat',
        slug: 'building-luxury-ui-experiences-micro-interactions',
        excerpt:
          'How to engineer refined typography, tasteful spring physics, dark mode depth, and 60fps animations without overburdening client devices.',
        content: `## The Difference Between AI Slop and Craftsmanship

A luxury user interface does not shout with aggressive purple gradients or dizzying full-screen bounces. True high-end digital design exhibits restraint: mathematically calculated padding, intentional typographic hierarchies, subtle border accents, and optical alignment.

### Key Principles of Luxury Interface Craft:
1. **Mathematical Spacing**: Always ensure outer container padding equals or exceeds inner component padding.
2. **Subtle Depth**: Rather than thick shadows, use layered 1px translucent borders (\`border-neutral-800/80\`) over rich dark backdrops (\`#0a0a0a\`).
3. **Intentional Dark Mode**: Dark mode is not an inverted white screen; it is an obsidian and slate canvas with warm undertones and high-contrast text.
4. **Performance First**: Animate transform and opacity properties only, offloading interpolation to GPU compositors.`,
        coverImage: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
        category: 'Frontend & UI',
        tags: ['UI/UX', 'Tailwind', 'DesignSystems', 'CSS', 'Motion'],
        author: {
          name: 'Tajbidul Islam',
          role: 'Principal Systems Architect',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        },
        readingTime: '6 min read',
        status: 'published',
        seoTitle: 'Building Luxury UI Experiences: Refinement & Micro-Interactions',
        seoDescription: 'Design principles for crafting luxury, minimal developer interfaces that feel responsive, refined, and fast.',
        featured: false,
        views: 890,
      },
    ]);
  }

  // 8. Seed Site Settings
  const settingCount = await SiteSetting.countDocuments();
  if (settingCount === 0) {
    console.log('Seeding site settings...');
    await SiteSetting.create({
      siteTitle: 'Tajbidul Islam — Principal Systems & Full-Stack Architect',
      siteDescription:
        'Luxury full-stack portfolio & secure Admin CMS showcasing distributed systems, high-concurrency Node.js/React architectures, and MongoDB Atlas database engineering.',
      tagline: 'Designing resilient full-stack systems and luxury digital interfaces.',
      contactEmail: 'siamtazbidul4@gmail.com',
      phone: '+8801730976031',
      location: 'San Francisco, CA / Remote Worldwide',
      timezone: 'UTC-8 (PST / PDT)',
      availabilityBanner: 'Available for Select Architecture Advisory & Lead Full-Stack Engagements',
      githubUrl: 'https://github.com',
      linkedinUrl: 'https://linkedin.com',
      twitterUrl: 'https://x.com',
      discordUrl: 'https://discord.com',
      resumePdfUrl: '#download-resume',
      seoKeywords: [
        'Full-Stack Developer',
        'Systems Architect',
        'Node.js Expert',
        'MongoDB Atlas',
        'React Engineer',
        'TypeScript',
        'Distributed Systems',
      ],
    });
  }

  // 9. Seed Sample Contact Messages
  const messageCount = await ContactMessage.countDocuments();
  if (messageCount === 0) {
    console.log('Seeding sample contact messages...');
    await ContactMessage.insertMany([
      {
        name: 'Julian Montgomery',
        email: 'julian.m@solaris-capital.com',
        subject: 'Architecture Advisory for Series-A Fintech Platform',
        message:
          'Hi Alexander, we are leading an investment syndicate for an algorithmic FX routing engine. We need a principal architect to review the distributed MongoDB Atlas schema and recommend high-throughput clustering strategies. Are you available for a 4-week engagement?',
        projectBudget: '$25,000+',
        timeline: 'Immediate (Next 2 Weeks)',
        isRead: false,
        isArchived: false,
      },
      {
        name: 'Claire Beauchamp',
        email: 'c.beauchamp@strata-ai.io',
        subject: 'Lead Full-Stack Role / Technical Partnership',
        message:
          'Alexander, thoroughly impressed by your OmniFlow AI and HyperScale case studies. We are building an enterprise agent orchestration studio and would love to discuss a retained technical leadership advisory role.',
        projectBudget: '$30,000+',
        timeline: 'Q3 / Q4 2026',
        isRead: true,
        isArchived: false,
      },
    ]);
  }

  console.log('Database verification and seed completed successfully.');
}
