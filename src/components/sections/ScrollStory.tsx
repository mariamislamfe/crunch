"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import FruitArt, { type FruitForm } from "@/components/ui/FruitArt";
import PackageArt from "@/components/ui/PackageArt";
import type { FruitKind } from "@/data/products";

const CAST: { fruit: FruitKind; form: FruitForm; x: string; y: string; size: string; rot: number }[] = [
  { fruit: "strawberry", form: "sliced", x: "-34vw", y: "-8vh", size: "16vw", rot: -18 },
  { fruit: "banana", form: "whole", x: "30vw", y: "-14vh", size: "18vw", rot: 14 },
  { fruit: "kiwi", form: "sliced", x: "-30vw", y: "16vh", size: "13vw", rot: 10 },
  { fruit: "peach", form: "whole", x: "32vw", y: "14vh", size: "15vw", rot: -12 },
];

export default function ScrollStory() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const castRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(castRefs.current, { autoAlpha: 0, scale: 0.2 });
      gsap.set(".story-line-2, .story-line-3", { autoAlpha: 0 });
      gsap.set(".story-line-2", { yPercent: 40 });
      gsap.set(".story-line-3", { yPercent: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top top",
          end: "+=320%",
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Beat 1 -> 2: hero fruit settles, rotates, cracks toward the camera
      tl.to(".story-hero-fruit", { rotate: 24, scale: 1.15, duration: 1, ease: "none" }, 0)
        .to(".story-line-1", { autoAlpha: 0, yPercent: -30, duration: 0.6, ease: "none" }, 0.55)

        // Beat 2 -> 3: cast enters, fragments scatter across the scene
        .to(".story-hero-fruit", { scale: 0.62, x: "0vw", duration: 1, ease: "none" }, 0.6)
        .to(
          castRefs.current,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 1.1,
            stagger: 0.06,
            ease: "power2.out",
          },
          0.75
        )
        .to(".story-line-2", { autoAlpha: 1, yPercent: 0, duration: 0.6, ease: "power2.out" }, 0.85)
        .to(castRefs.current, {
          rotate: "+=12",
          duration: 1.4,
          ease: "sine.inOut",
          stagger: { each: 0.08, from: "random" },
        }, 1.0)
        .to(".story-line-2", { autoAlpha: 0, yPercent: -30, duration: 0.5, ease: "none" }, 1.6)

        // Beat 3 -> 4: everything converges toward centre / shrinks -> box
        .to(
          [...castRefs.current, ".story-hero-fruit"],
          {
            x: 0,
            y: 0,
            scale: 0.05,
            autoAlpha: 0,
            duration: 1,
            stagger: 0.03,
            ease: "power2.in",
          },
          1.9
        )
        .fromTo(
          ".story-box",
          { autoAlpha: 0, scale: 0.4, rotate: -6 },
          { autoAlpha: 1, scale: 1, rotate: 0, duration: 1, ease: "back.out(1.4)" },
          2.15
        )
        .to(".story-line-3", { autoAlpha: 1, yPercent: 0, duration: 0.7, ease: "power2.out" }, 2.3)
        // clear the scene before unpinning so nothing clips under the nav
        .to(".story-line-3", { autoAlpha: 0, duration: 0.4, ease: "power1.in" }, 3.2)
        .to(".story-box", { autoAlpha: 0, scale: 0.7, duration: 0.4, ease: "power1.in" }, 3.2);
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="taste" ref={wrapRef} className="relative h-screen w-full overflow-hidden bg-ink">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="story-hero-fruit relative drop-shadow-[0_40px_70px_rgba(0,0,0,0.5)]"
          style={{ width: "min(48vw, 380px)" }}
        >
          <FruitArt fruit="mango" form="whole" className="w-full h-auto" />
        </div>

        {CAST.map((c, i) => (
          <div
            key={c.fruit + c.form}
            ref={(el) => {
              castRefs.current[i] = el;
            }}
            className="absolute"
            style={{
              width: c.size,
              transform: `translate(${c.x}, ${c.y}) rotate(${c.rot}deg)`,
            }}
          >
            <FruitArt
              fruit={c.fruit}
              form={c.form}
              className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
            />
          </div>
        ))}

        <div className="story-box absolute" style={{ width: "min(26vw, 200px)" }}>
          <PackageArt type="box" className="w-full h-auto drop-shadow-[0_50px_100px_rgba(0,0,0,0.6)]" />
        </div>
      </div>

      <div className="relative z-10 h-full flex items-center justify-center pointer-events-none px-6">
        <p className="story-line-1 font-display text-display text-center max-w-2xl text-cream text-veil">
          It starts with <span className="font-script text-amber-soft">one fruit.</span>
        </p>
        <p className="story-line-2 absolute font-display text-display text-center max-w-2xl text-cream text-veil">
          Five fruits. <span className="font-script text-amber-soft">One harvest.</span>
        </p>
        <p className="story-line-3 absolute font-display text-display text-center max-w-2xl text-cream text-veil">
          Pressed into <span className="font-script text-amber-soft">one box.</span>
        </p>
      </div>
    </section>
  );
}
