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
  metadataBase: new URL("https://moniruzzaman.dev"),
  title: "Moniruzzaman Tasrif",
  description:
    "Portfolio of Moniruzzaman Tasrif, a full-stack web developer crafting scalable, high-performance web experiences with Next.js, TypeScript, and Node.js.",
  icons: {
    icon: [
      { url: "/avatar.png", sizes: "32x32" },
      { url: "/avatar.png", sizes: "192x192" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/avatar.png",
    apple: "/avatar.png",
  },
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
    title: "Moniruzzaman Tasrif",
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
              <main className="relative z-10 w-full overflow-x-hidden">{children}</main>
              <Footer />
            </SmoothScroll>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
