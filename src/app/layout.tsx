import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { MouseSpotlight } from "@/components/ui/mouse-spotlight";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ProgrammingBackground } from "@/components/ui/programming-background";
import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moniruzzaman Tasrif — Full-Stack Web Developer",
  description:
    "Portfolio of Moniruzzaman Tasrif, a full-stack web developer crafting scalable, high-performance web experiences with Next.js, TypeScript, and Node.js.",
  keywords: [
    "Full-Stack Developer",
    "Next.js",
    "TypeScript",
    "React",
    "Node.js",
    "MongoDB",
    "Portfolio",
  ],
  openGraph: {
    title: "Moniruzzaman Tasrif — Full-Stack Web Developer",
    description:
      "Crafting scalable web experiences built for real-world impact.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <MotionProvider>
            <SmoothScroll>
              <ProgrammingBackground />
              <MouseSpotlight />
              <CustomCursor />
              <Navbar />
              <main className="relative z-10">{children}</main>
              <Footer />
            </SmoothScroll>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
