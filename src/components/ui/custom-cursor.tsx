"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/lib/hooks";

const HOVER_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor-hover]";

interface TrailPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  time: number;
  size: number;
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  alpha: number;
}

interface ClickWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

/**
 * Premium Comet Cursor
 *
 * Features:
 * - Glowing celestial comet nucleus with bright core and copper/amber halo
 * - Smooth dynamic ion tail that tapers and curves along cursor velocity
 * - Stardust ember particles shed during movement
 * - Energetic shockwave ripples and stardust burst on click
 * - Interactive magnetic focus ring when hovering buttons & links
 * - Palette-matched to Copper (#c47b55), Warm Ivory (#f4f1e8), and Deep Emerald (#2f5c48)
 * - Accessible: respects prefers-reduced-motion and fine-pointer only
 */
export function CustomCursor() {
  const finePointer = useMediaQuery("(pointer: fine)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const enabled = finePointer && !reducedMotion;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const root = document.documentElement;
    root.classList.add("custom-cursor-active");

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Pointer state
    let mouseX = -200;
    let mouseY = -200;
    let prevMouseX = -200;
    let prevMouseY = -200;
    let isVisible = false;
    let isHovering = false;
    let isPressed = false;
    let hoverScale = 1;
    let targetHoverScale = 1;

    // Comet state
    const trail: TrailPoint[] = [];
    const sparkles: Sparkle[] = [];
    const clickWaves: ClickWave[] = [];
    const maxTrailLength = 26;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        prevMouseX = mouseX;
        prevMouseY = mouseY;
        isVisible = true;
      }
    };

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      isHovering = !!target?.closest(HOVER_SELECTOR);
      targetHoverScale = isHovering ? 1.7 : 1;
    };

    const handlePointerDown = (e: PointerEvent) => {
      isPressed = true;
      // Spawn click shockwave
      clickWaves.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 36,
        alpha: 0.85,
      });

      // Spawn click sparkles burst
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.4;
        const speed = 2 + Math.random() * 3.5;
        sparkles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 24 + Math.random() * 14,
          size: 1.5 + Math.random() * 2,
          color: Math.random() > 0.4 ? "#c47b55" : "#f4f1e8",
          alpha: 1,
        });
      }
    };

    const handlePointerUp = () => {
      isPressed = false;
    };

    const handleMouseLeave = () => {
      isVisible = false;
    };

    const handleMouseEnter = () => {
      isVisible = true;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const render = (currentTime: number) => {
      ctx.clearRect(0, 0, width, height);

      // Smooth hover scale transition
      hoverScale += (targetHoverScale - hoverScale) * 0.15;

      const vx = mouseX - prevMouseX;
      const vy = mouseY - prevMouseY;
      const speed = Math.hypot(vx, vy);

      // Only push points if mouse moved or trail needs decay
      if (isVisible && (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1)) {
        trail.unshift({
          x: mouseX,
          y: mouseY,
          vx,
          vy,
          time: currentTime,
          size: Math.min(10 + speed * 0.15, 16) * (isPressed ? 0.7 : 1),
        });

        // Emit comet dust / stardust embers when moving
        if (speed > 2.5 && Math.random() < Math.min(speed * 0.08, 0.75)) {
          const perpAngle = Math.atan2(vy, vx) + (Math.random() > 0.5 ? 1 : -1) * (Math.PI / 2 + (Math.random() - 0.5));
          const sparkSpeed = Math.random() * 1.5;
          sparkles.push({
            x: mouseX - vx * 0.3 + (Math.random() - 0.5) * 4,
            y: mouseY - vy * 0.3 + (Math.random() - 0.5) * 4,
            vx: -vx * 0.15 + Math.cos(perpAngle) * sparkSpeed,
            vy: -vy * 0.15 + Math.sin(perpAngle) * sparkSpeed,
            life: 0,
            maxLife: 20 + Math.random() * 18,
            size: 1.2 + Math.random() * 1.8,
            color: Math.random() > 0.35 ? "#c47b55" : Math.random() > 0.5 ? "#f4f1e8" : "#2f5c48",
            alpha: 0.9,
          });
        }
      }

      prevMouseX = mouseX;
      prevMouseY = mouseY;

      // Limit trail length
      while (trail.length > maxTrailLength) {
        trail.pop();
      }

      ctx.globalCompositeOperation = "screen";

      // 1. Draw Comet Ion Tail
      if (trail.length > 2 && isVisible) {
        for (let i = 0; i < trail.length - 1; i++) {
          const p1 = trail[i];
          const p2 = trail[i + 1];
          const progress = i / trail.length; // 0 at head, 1 at tail end
          const nextProgress = (i + 1) / trail.length;

          const currentWidth = p1.size * (1 - progress * 0.85) * (isHovering ? 1.3 : 1);
          const alpha = (1 - progress) * 0.65;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          // Color gradient along trail:
          // Head: Copper/Ivory (#f4f1e8 -> #c47b55) -> Mid: Copper (#c47b55) -> Tail: Forest (#2f5c48) / fade
          const strokeGradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          if (progress < 0.3) {
            strokeGradient.addColorStop(0, `rgba(244, 241, 232, ${alpha * 0.95})`);
            strokeGradient.addColorStop(1, `rgba(196, 123, 85, ${alpha})`);
          } else if (progress < 0.7) {
            strokeGradient.addColorStop(0, `rgba(196, 123, 85, ${alpha})`);
            strokeGradient.addColorStop(1, `rgba(224, 161, 132, ${alpha * 0.7})`);
          } else {
            strokeGradient.addColorStop(0, `rgba(196, 123, 85, ${alpha * 0.5})`);
            strokeGradient.addColorStop(1, `rgba(47, 92, 72, 0)`);
          }

          ctx.strokeStyle = strokeGradient;
          ctx.lineWidth = Math.max(currentWidth, 1.2);
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.stroke();

          // Core bright spine
          if (progress < 0.5) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - nextProgress * 2) * 0.55})`;
            ctx.lineWidth = Math.max(currentWidth * 0.35, 1);
            ctx.stroke();
          }
        }
      }

      // 2. Draw Stardust Embers
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vx *= 0.94;
        s.vy *= 0.94;
        s.life++;
        const lifeProgress = s.life / s.maxLife;

        if (lifeProgress >= 1) {
          sparkles.splice(i, 1);
          continue;
        }

        const currentAlpha = (1 - lifeProgress) * s.alpha;
        const currentSize = s.size * (1 - lifeProgress * 0.4);

        ctx.beginPath();
        ctx.arc(s.x, s.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;

      // 3. Draw Click Shockwaves
      for (let i = clickWaves.length - 1; i >= 0; i--) {
        const wave = clickWaves[i];
        wave.radius += 2.2;
        wave.alpha *= 0.92;

        if (wave.alpha < 0.02 || wave.radius >= wave.maxRadius) {
          clickWaves.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(196, 123, 85, ${wave.alpha})`;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = "rgba(196, 123, 85, 0.8)";
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 4. Draw Comet Head (Nucleus)
      if (isVisible) {
        const headRadius = (isPressed ? 3.5 : 5.5) * hoverScale;

        // Outer Comet Aura / Corona
        const auraGradient = ctx.createRadialGradient(
          mouseX,
          mouseY,
          1,
          mouseX,
          mouseY,
          headRadius * 3.4
        );
        auraGradient.addColorStop(0, "rgba(196, 123, 85, 0.85)");
        auraGradient.addColorStop(0.4, "rgba(196, 123, 85, 0.35)");
        auraGradient.addColorStop(1, "rgba(196, 123, 85, 0)");

        ctx.beginPath();
        ctx.arc(mouseX, mouseY, headRadius * 3.4, 0, Math.PI * 2);
        ctx.fillStyle = auraGradient;
        ctx.fill();

        // Hover target orbital ring
        if (hoverScale > 1.1) {
          const ringRadius = headRadius * 2.2;
          ctx.beginPath();
          ctx.arc(mouseX, mouseY, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(196, 123, 85, ${0.5 * (hoverScale - 1)})`;
          ctx.lineWidth = 1.2;
          ctx.setLineDash([3, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Mid copper nucleus ring
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, headRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#c47b55";
        ctx.shadowColor = "#c47b55";
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Hot celestial core
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, Math.max(headRadius * 0.45, 1.8), 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      root.classList.remove("custom-cursor-active");
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ willChange: "transform" }}
    />
  );
}

