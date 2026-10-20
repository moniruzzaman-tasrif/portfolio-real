"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  AtSign,
  CircleCheck,
  LoaderCircle,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { socialLinks } from "@/lib/data";
import { cn } from "@/lib/cn";

type FormStatus = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-xl bg-background px-4 py-3.5 text-sm text-foreground ring-1 ring-border transition-all duration-300 placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent";

export function Contact() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    // Simulated submit — wire this to your API route or form service.
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setStatus("success");
    setFormData({ name: "", email: "", message: "" });
  };

  const updateField =
    (field: keyof typeof formData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 border-t border-border bg-surface/40 py-24 sm:py-32"
    >
      {/* Copper glow accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-[110px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          id="contact-heading"
          eyebrow="Get in Touch"
          title="Let's Build Something That Lasts."
          description="Have a project in mind, or just want to talk shop about the modern web stack? My inbox is always open."
          align="center"
        />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          {/* Contact info + socials */}
          <Reveal delay={0.1} className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <a
                href="mailto:hello@moniruzzaman.dev"
                className="group flex items-center gap-4 rounded-2xl bg-background p-5 ring-1 ring-border transition-all duration-300 hover:ring-accent/40"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/25">
                  <Mail size={18} />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs tracking-wide text-muted uppercase">
                    Email
                  </span>
                  <span className="text-sm font-medium group-hover:text-accent">
                    hello@moniruzzaman.dev
                  </span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="ml-auto text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </a>

              <div className="flex items-center gap-4 rounded-2xl bg-background p-5 ring-1 ring-border">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/25">
                  <AtSign size={18} />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs tracking-wide text-muted uppercase">
                    Availability
                  </span>
                  <span className="text-sm font-medium">
                    Open to freelance & full-time
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-background p-5 ring-1 ring-border">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/25">
                  <MapPin size={18} />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs tracking-wide text-muted uppercase">
                    Based in
                  </span>
                  <span className="text-sm font-medium">
                    Bangladesh — working worldwide
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer"
                  aria-label={social.name}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-muted ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:text-accent hover:ring-accent/50 hover:shadow-[0_0_25px_-8px_rgba(196,123,85,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Form card */}
          <Reveal delay={0.2}>
            <div className="rounded-2xl bg-background p-6 ring-1 ring-border sm:p-8">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 120, damping: 16 }}
                    className="flex min-h-[380px] flex-col items-center justify-center gap-4 text-center"
                  >
                    <motion.span
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 12,
                        delay: 0.15,
                      }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent ring-1 ring-accent/30"
                    >
                      <CircleCheck size={30} />
                    </motion.span>
                    <h3 className="text-xl font-semibold">Message sent!</h3>
                    <p className="max-w-xs text-sm leading-relaxed text-muted">
                      Thanks for reaching out. I&apos;ll get back to you within
                      24–48 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-2 rounded-full bg-surface px-5 py-2.5 text-xs font-semibold ring-1 ring-border transition-colors hover:text-accent hover:ring-accent/50"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={false}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col gap-5"
                    noValidate
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="name"
                          className="font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase"
                        >
                          Name
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={updateField("name")}
                          placeholder="Your name"
                          className={cn(inputClasses)}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="email"
                          className="font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={updateField("email")}
                          placeholder="you@example.com"
                          className={cn(inputClasses)}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="message"
                        className="font-mono text-[0.7rem] tracking-[0.2em] text-muted uppercase"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={updateField("message")}
                        placeholder="Tell me about your project..."
                        className={cn(inputClasses, "resize-none")}
                      />
                    </div>

                    <div className="pt-1">
                      <MagneticButton strength={0.2} className="w-full">
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-background transition-all duration-300 hover:shadow-[0_0_35px_-6px_rgba(196,123,85,0.7)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {status === "submitting" ? (
                            <>
                              <LoaderCircle size={16} className="animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              Send Message
                              <Send
                                size={15}
                                className="transition-transform duration-300 group-hover:translate-x-0.5"
                              />
                            </>
                          )}
                        </button>
                      </MagneticButton>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
