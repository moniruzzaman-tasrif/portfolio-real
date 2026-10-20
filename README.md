# Moniruzzaman Tasrif — Portfolio

A high-end, interactive full-stack developer portfolio built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and Framer Motion.

**Palette:** Forest Black `#101C18` · Forest Green `#1D3028` · Copper `#C47B55` · Warm Ivory `#F4F1E8`

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack, Cache Components)
- **Styling:** Tailwind CSS v4, Lucide React icons
- **Animation:** Framer Motion, Lenis smooth scroll
- **Theme:** next-themes (class strategy, dark default)

## Interactive features

| Feature | Implementation |
| --- | --- |
| Mouse-follow spotlight | `src/components/ui/mouse-spotlight.tsx` — spring-tracked radial gradient (fine pointers + motion-safe only) |
| Ambient hero glow | `src/components/sections/hero.tsx` — drifting blurred orbs + grid overlay |
| Scroll reveal | `src/components/ui/reveal.tsx` — spring fade-up via `whileInView` (`Reveal`, `RevealGroup`, `RevealItem`) |
| Magnetic buttons | `src/components/ui/magnetic-button.tsx` — cursor-pull spring wrapper |
| 3D tilt cards | `src/components/ui/tilt-card.tsx` — perspective tilt + Copper border glow tracking the pointer |
| Infinite marquee | `src/components/ui/marquee.tsx` — CSS `-50%` loop, edge fades, pauses on hover |
| Theme switcher | `src/components/providers/theme-provider.tsx` — smooth background/text color transitions |
| Custom cursor | `src/components/ui/custom-cursor.tsx` — blend-mode inversion cursor with lerp-spring follow, hover/press states, immersive on desktop |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

## Customizing

- **Content:** edit `src/lib/data.ts` (tech stack, skill groups, projects, social links)
- **Colors / theme tokens:** `src/app/globals.css` (`:root, .dark` and `.light` blocks)
- **Contact form:** currently simulates a submit — wire `handleSubmit` in `src/components/sections/contact.tsx` to an API route or form service
- **Social URLs:** update `socialLinks` in `src/lib/data.ts`

## Notes

- Lucide v1 removed brand icons, so GitHub/LinkedIn are custom SVGs in `src/components/icons.tsx`.
- Global CSS `scroll-behavior: smooth` is intentionally omitted — Lenis owns scrolling, and anchor links are handled with a navbar offset (`anchors: { offset: -80 }`).
- All motion respects `prefers-reduced-motion` via `MotionConfig reducedMotion="user"`.
- The custom cursor only hides the native cursor on fine pointers (`pointer: fine`) without reduced motion — touch devices and a11y preferences keep the system cursor, and text inputs keep the caret.
