"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/lib/hooks";

export const ALL_TECH_STACK = [
  "HTML", "CSS", "JavaScript", "TypeScript", "Python", "Java",
  "PHP", "C#", "Go", "Rust", "Ruby", "SQL", "React", "Next.js",
  "Vue.js", "Nuxt", "Angular", "Svelte", "SvelteKit", "Astro",
  "Vite", "Tailwind CSS", "Bootstrap", "Sass", "CSS Modules",
  "Material UI", "shadcn/ui", "Chakra UI", "Mantine", "Radix UI",
  "Node.js", "Express.js", "NestJS", "Fastify", "Hono", "Django",
  "Flask", "FastAPI", "Laravel", "Symfony", "Spring Boot",
  "ASP.NET Core", "Gin", "Fiber", "PostgreSQL", "MySQL",
  "MongoDB", "SQLite", "Redis", "Valkey", "Firebase",
  "Firestore", "Supabase", "DynamoDB", "Couchbase",
  "Microsoft SQL Server", "Oracle Database", "Prisma",
  "Drizzle ORM", "TypeORM", "Sequelize", "Mongoose",
  "SQLAlchemy", "Hibernate", "Entity Framework Core",
  "Redux Toolkit", "Zustand", "Jotai", "TanStack Query",
  "SWR", "Pinia", "React Hook Form", "Formik", "Zod", "Yup",
  "Lucide", "Heroicons", "Tabler Icons", "Font Awesome",
  "Phosphor Icons", "Motion", "GSAP", "Anime.js", "Lottie",
  "Recharts", "Chart.js", "D3.js", "Apache ECharts", "Three.js",
  "React Three Fiber", "Auth.js", "Better Auth", "Clerk", "Auth0",
  "Keycloak", "Supabase Auth", "Firebase Auth", "OAuth 2.0",
  "OpenID Connect", "REST API", "GraphQL", "Apollo", "tRPC",
  "gRPC", "Socket.IO", "WebSockets", "Server-Sent Events",
  "Swagger", "OpenAPI", "Vitest", "Jest", "Playwright", "Cypress",
  "React Testing Library", "Supertest", "pytest", "ESLint",
  "Prettier", "Husky", "lint-staged", "Ruff", "Pylint",
  "SonarQube", "TypeScript Compiler", "mypy", "npm", "pnpm",
  "Yarn", "Bun", "pip", "uv", "Git", "GitHub", "GitLab",
  "Bitbucket", "GitHub Actions", "GitLab CI", "Jenkins",
  "Vercel", "Netlify", "Cloudflare", "Render", "Railway",
  "Fly.io", "DigitalOcean", "AWS", "Google Cloud", "Microsoft Azure",
  "Docker", "Docker Compose", "Kubernetes", "Helm", "Terraform",
  "Ansible", "Nginx", "Linux", "Ubuntu", "Bash", "PowerShell",
  "Sentry", "Datadog", "Grafana", "Prometheus", "OpenTelemetry",
  "Figma", "FigJam", "Penpot", "Adobe Photoshop",
  "Adobe Illustrator", "VS Code", "WebStorm", "IntelliJ IDEA",
  "Visual Studio", "Neovim", "Postman", "Insomnia", "Bruno",
  "Hoppscotch", "TablePlus", "DBeaver", "pgAdmin", "ngrok",
  "Stripe", "PayPal", "Adyen", "Resend", "SendGrid",
  "Nodemailer", "Amazon SES", "Amazon S3", "Cloudinary",
  "UploadThing", "Elasticsearch", "OpenSearch", "Meilisearch",
  "Typesense", "BullMQ", "RabbitMQ", "Apache Kafka", "Amazon SQS",
  "Helmet", "Argon2", "bcrypt", "DOMPurify", "Snyk", "CodeQL",
  "Dependabot", "React Native", "Expo", "Flutter", "Swift",
  "Kotlin", "Jupyter", "pandas", "NumPy", "scikit-learn",
  "LangChain", "LlamaIndex", "OpenAI API", "Anthropic API",
  "Vercel AI SDK", "pgvector", "Mapbox", "Google Maps Platform",
  "HTTP", "HTTPS", "DNS", "TCP/IP", "SEO", "Accessibility",
  "Responsive Design", "Progressive Web Apps", "Server-Side Rendering",
  "Static Site Generation", "Microservices", "Clean Architecture",
  "Domain-Driven Design", "Message Queues", "Caching",
  "Load Balancing", "CDN", "CI/CD", "Infrastructure as Code",
  "Unit Testing", "Integration Testing", "End-to-End Testing",
  "API Testing", "Performance Testing", "Security Testing"
];

// Color palette definitions matching the site design
const PALETTE_COLORS = [
  { r: 196, g: 123, b: 85 },   // Copper accent
  { r: 224, g: 161, b: 132 },  // Warm amber
  { r: 52,  g: 211, b: 153 },  // Emerald
  { r: 244, g: 241, b: 232 },  // Warm ivory
  { r: 156, g: 175, b: 165 },  // Sage muted
];

interface TechParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  swayPhase: number;
  swaySpeed: number;
  text: string;
  color: { r: number; g: number; b: number };
  baseAlpha: number;
  alpha: number;
  size: number;
  targetAlpha: number;
  layer: number;
}

interface CircuitLine {
  x: number;
  y: number;
  length: number;
  vertical: boolean;
  pulsePos: number;
  speed: number;
  color: string;
}

/**
 * Living Tech Universe Background Animation
 *
 * Continuously cycles through the comprehensive 170+ developer technology stack
 * with smooth cosmic motion, interactive cursor reaction, and palette-matched tones.
 */
export function ProgrammingBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId: number;

    let mouseX = -1000;
    let mouseY = -1000;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initElements();
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handlePointerLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("mouseleave", handlePointerLeave);

    const particles: TechParticle[] = [];
    const circuits: CircuitLine[] = [];
    let wordIndex = 0;

    const getNextWord = (): string => {
      const word = ALL_TECH_STACK[wordIndex % ALL_TECH_STACK.length];
      wordIndex++;
      return word;
    };

    const initElements = () => {
      particles.length = 0;
      circuits.length = 0;

      // Particle density suited to screen resolution
      const particleCount = Math.min(Math.max(Math.floor((width * height) / 22000), 45), 90);
      const circuitCount = Math.floor(width / 180);

      // Shuffle start index
      wordIndex = Math.floor(Math.random() * ALL_TECH_STACK.length);

      for (let i = 0; i < particleCount; i++) {
        const layer = Math.random();
        let baseAlpha: number;
        let size: number;
        let speedMultiplier: number;

        if (layer < 0.45) {
          // Far background
          baseAlpha = 0.08 + Math.random() * 0.08;
          size = 11;
          speedMultiplier = 0.6;
        } else if (layer < 0.8) {
          // Mid ground
          baseAlpha = 0.14 + Math.random() * 0.1;
          size = 12.5;
          speedMultiplier = 0.85;
        } else {
          // Foreground accent
          baseAlpha = 0.22 + Math.random() * 0.12;
          size = 14;
          speedMultiplier = 1.15;
        }

        const color = PALETTE_COLORS[Math.floor(Math.random() * PALETTE_COLORS.length)];

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (-0.22 - Math.random() * 0.35) * speedMultiplier,
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: 0.012 + Math.random() * 0.018,
          text: getNextWord(),
          color,
          baseAlpha,
          alpha: baseAlpha,
          size,
          targetAlpha: baseAlpha,
          layer,
        });
      }

      // Background circuit guidelines
      for (let i = 0; i < circuitCount; i++) {
        const vertical = Math.random() > 0.4;
        circuits.push({
          x: vertical ? (i + 0.5) * (width / circuitCount) + (Math.random() - 0.5) * 20 : Math.random() * width,
          y: vertical ? Math.random() * height : (i + 0.5) * (height / circuitCount) + (Math.random() - 0.5) * 20,
          length: 140 + Math.random() * 240,
          vertical,
          pulsePos: Math.random(),
          speed: 0.003 + Math.random() * 0.005,
          color: Math.random() > 0.5 ? "#c47b55" : "#34d399",
        });
      }
    };

    initElements();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render animated circuit lines & traveling light pulses
      for (const circuit of circuits) {
        circuit.pulsePos = (circuit.pulsePos + circuit.speed) % 1;

        const x1 = circuit.x;
        const y1 = circuit.y;
        const x2 = circuit.vertical ? circuit.x : circuit.x + circuit.length;
        const y2 = circuit.vertical ? circuit.y + circuit.length : circuit.y;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "rgba(244, 241, 232, 0.025)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 14]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Pulse packet traveling along circuit
        const px = circuit.vertical ? circuit.x : circuit.x + circuit.length * circuit.pulsePos;
        const py = circuit.vertical ? circuit.y + circuit.length * circuit.pulsePos : circuit.y;

        const pulseGradient = ctx.createRadialGradient(px, py, 0, px, py, 12);
        pulseGradient.addColorStop(0, circuit.color === "#c47b55" ? "rgba(196, 123, 85, 0.4)" : "rgba(52, 211, 153, 0.35)");
        pulseGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.arc(px, py, 12, 0, Math.PI * 2);
        ctx.fillStyle = pulseGradient;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = circuit.color;
        ctx.fill();
      }

      // 2. Render and animate floating tech stack particles
      ctx.textBaseline = "middle";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Smooth floating motion with subtle horizontal sway
        p.swayPhase += p.swaySpeed;
        p.x += p.vx + Math.sin(p.swayPhase) * 0.22;
        p.y += p.vy;

        // Wrap around top/bottom/sides and cycle to next word
        if (p.y < -35) {
          p.y = height + 25;
          p.x = Math.random() * width;
          p.text = getNextWord(); // Pick new tech word from comprehensive stack
        }
        if (p.x < -100) {
          p.x = width + 50;
          p.text = getNextWord();
        }
        if (p.x > width + 100) {
          p.x = -50;
          p.text = getNextWord();
        }

        // Mouse proximity interaction with Comet Cursor
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.hypot(dx, dy);
        const maxDist = 150;

        if (dist < maxDist) {
          const prox = 1 - dist / maxDist;
          // Smoothly illuminate near cursor
          p.targetAlpha = Math.min(p.baseAlpha + prox * 0.45, 0.65);

          // Subtle gentle magnetic repulsion/float
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * prox * 0.4;
          p.y -= Math.sin(angle) * prox * 0.4;

          // Delicate connecting thread from cursor to tech token
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(196, 123, 85, ${(1 - dist / 100) * 0.2})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        } else {
          p.targetAlpha = p.baseAlpha;
        }

        // Smooth alpha interpolation
        p.alpha += (p.targetAlpha - p.alpha) * 0.08;

        // Draw particle text
        ctx.font = `500 ${p.size}px var(--font-mono, ui-monospace, monospace)`;
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.alpha})`;
        ctx.fillText(p.text, p.x, p.y);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[0] opacity-80"
      style={{ willChange: "transform" }}
    />
  );
}
