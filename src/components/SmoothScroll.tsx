"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.1,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Pinned/scrubbed sections are measured as soon as each component
    // mounts, before late-loading fruit/package photos and web fonts have
    // settled. Re-measure once everything is actually in so those
    // distances (and therefore the scroll-jacked animations) are correct.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready?.then(refresh);
    const imgs = Array.from(document.images);
    Promise.all(
      imgs.map((img) =>
        img.complete ? Promise.resolve() : new Promise((res) => img.addEventListener("load", res, { once: true }))
      )
    ).then(refresh);

    return () => {
      window.removeEventListener("load", refresh);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as unknown as (time: number) => void);
    };
  }, []);

  return <>{children}</>;
}
