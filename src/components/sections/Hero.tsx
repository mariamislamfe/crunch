"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import FruitArt, { type FruitForm } from "@/components/ui/FruitArt";
import PackageArt from "@/components/ui/PackageArt";
import type { FruitKind } from "@/data/products";
import Button from "@/components/ui/Button";

// Fruit pieces that burst out of the pouch and settle into an orbit around
// it. Offsets are relative to the stage's own centre (a flex-centred
// wrapper), so every piece starts stacked at (0,0) — right where it would
// be "inside" the pack — before animating out.
// the pack's resting tilt — set down at an angle, not straight-on
const PACK_TILT = -9;

const ORBIT: { fruit: FruitKind; form: FruitForm; x: string; y: string; size: string; rot: number }[] = [
  { fruit: "mango", form: "whole", x: "-9vw", y: "-11vh", size: "clamp(90px,15vw,190px)", rot: -10 },
  { fruit: "strawberry", form: "sliced", x: "10vw", y: "-9vh", size: "clamp(70px,12vw,150px)", rot: 18 },
  { fruit: "banana", form: "sliced", x: "-11vw", y: "10vh", size: "clamp(62px,10.5vw,128px)", rot: -16 },
  { fruit: "kiwi", form: "sliced", x: "10vw", y: "11vh", size: "clamp(66px,11vw,144px)", rot: 14 },
  { fruit: "peach", form: "whole", x: "0.5vw", y: "15vh", size: "clamp(72px,12vw,152px)", rot: 8 },
];

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const packRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);
  const orbitRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-word", { yPercent: 110 });
      gsap.set(".hero-sub, .hero-cta, .hero-eyebrow", { autoAlpha: 0, y: 24 });
      gsap.set(packRef.current, { autoAlpha: 0, scale: 0.7, rotate: PACK_TILT - 10 });
      gsap.set(orbitRefs.current, { autoAlpha: 0, scale: 0.2, x: 0, y: 0 });

      // the pack lands alone, tilted, nothing else on stage yet — the fruit
      // only cracks out once the visitor starts scrolling (see scrollTl)
      const tl = gsap.timeline({ delay: 0.2 });
      tl.to(packRef.current, {
        autoAlpha: 1,
        scale: 1,
        rotate: PACK_TILT,
        duration: 1,
        ease: "back.out(1.5)",
      })
        .to(".hero-eyebrow", { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.6")
        .to(
          ".hero-word",
          { yPercent: 0, duration: 1.1, stagger: 0.08, ease: "power4.out" },
          "-=0.45"
        )
        .to(".hero-sub", { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.6")
        .to(".hero-cta", { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.55");

      // idle: the whole orbit turns slowly forever, like a carousel
      gsap.to(spinRef.current, {
        rotate: 360,
        duration: 48,
        ease: "none",
        repeat: -1,
      });
      // each fruit gently counter-bobs so the ring doesn't feel too rigid
      orbitRefs.current.forEach((el, i) => {
        gsap.to(el, {
          scale: "+=0.06",
          duration: 2.4 + i * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1 + i * 0.15,
        });
      });

      // Scroll-driven transformation: the pack is alone until the visitor
      // scrolls — then it starts turning and the fruit cracks out of it in
      // real time with the scrollbar, before the whole stage pushes
      // forward and out as the headline clears the way for the next scene.
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=140%",
          scrub: 0.6,
          pin: true,
          pinSpacing: true,
        },
      });

      scrollTl
        .to(".hero-heading", { scale: 1.3, yPercent: -14, autoAlpha: 0, ease: "power1.in" }, 0)
        .to(".hero-eyebrow, .hero-sub, .hero-cta", { autoAlpha: 0, y: -20, ease: "power1.in" }, 0)
        .to(groupRef.current, { rotate: 150, duration: 1, ease: "none" }, 0)
        .to(
          orbitRefs.current,
          {
            autoAlpha: 1,
            scale: 1,
            x: (i) => ORBIT[i].x,
            y: (i) => ORBIT[i].y,
            rotate: (i) => ORBIT[i].rot,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
          },
          0
        )
        .to(groupRef.current, { scale: 1.35, autoAlpha: 0, duration: 0.5, ease: "power1.in" }, 0.5)
        .to(".hero-bg-glow", { scale: 2.2, autoAlpha: 0, duration: 1, ease: "power1.in" }, 0);

      // subtle mouse parallax on desktop
      const isFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (isFine) {
        const handleMove = (e: MouseEvent) => {
          const { innerWidth, innerHeight } = window;
          const px = (e.clientX / innerWidth - 0.5) * 2;
          const py = (e.clientY / innerHeight - 0.5) * 2;
          gsap.to(groupRef.current, {
            x: px * 14,
            y: py * 14,
            duration: 1.2,
            ease: "power3.out",
            overwrite: "auto",
          });
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      <div
        className="hero-bg-glow absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 22% 28%, rgba(221,143,46,0.32), transparent 48%), radial-gradient(circle at 82% 20%, rgba(196,105,23,0.24), transparent 45%), radial-gradient(circle at 50% 85%, rgba(91,127,52,0.22), transparent 50%), radial-gradient(circle at 85% 80%, rgba(122,42,59,0.18), transparent 45%)",
        }}
      />

      <div className="container-edit relative z-10 grid md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-6 items-center w-full py-28 md:py-0">
        {/* left: the pack, with fruit orbiting out of it */}
        <div className="relative order-1">
          <div
            ref={groupRef}
            className="relative w-full max-w-[500px] aspect-square mx-auto md:mx-0"
          >
            <div ref={packRef} className="absolute inset-0 flex items-center justify-center">
              <PackageArt
                type="pouch"
                eager
                className="w-[78%] h-auto drop-shadow-[0_50px_90px_rgba(33,22,9,0.28)]"
              />
            </div>

            <div ref={spinRef} className="absolute inset-0 flex items-center justify-center">
              {ORBIT.map((o, i) => (
                <div
                  key={o.fruit}
                  ref={(el) => {
                    orbitRefs.current[i] = el;
                  }}
                  className="absolute pointer-events-none drop-shadow-[0_20px_36px_rgba(33,22,9,0.22)]"
                  style={{ width: o.size }}
                >
                  <FruitArt fruit={o.fruit} form={o.form} className="w-full h-auto" eager />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* right: the words — pushed toward the right edge so the stage
            doesn't leave a dead gap between the pack and the copy */}
        <div className="relative order-2 text-left px-2 md:pl-4 md:pr-2">
          <p className="hero-eyebrow eyebrow mb-6">Est. Dried Fruit House</p>
          <h1 className="hero-heading font-display text-hero text-cream">
            <span className="block overflow-hidden">
              <span className="hero-word inline-block">Crisp.</span>
            </span>
            <span className="block overflow-hidden font-script text-amber-soft -ml-3 pl-3">
              <span className="hero-word inline-block">Sweet.</span>
            </span>
          </h1>
          <p className="hero-sub mt-8 max-w-lg text-cream/65 text-base md:text-lg leading-relaxed">
            Single-origin fruit, slow-dried to its truest self — pressed down
            to one satisfying bite. No added sugar, no shortcuts.
          </p>
          <div className="hero-cta mt-10 flex items-center gap-4">
            <a href="#shop">
              <Button variant="primary">Shop the Edit</Button>
            </a>
            <a href="#taste">
              <Button variant="outline">The Taste</Button>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream/40 z-10">
        <span className="text-[0.65rem] uppercase tracking-[0.3em]">Scroll</span>
        <span className="w-px h-10 bg-cream/30" />
      </div>
    </section>
  );
}
