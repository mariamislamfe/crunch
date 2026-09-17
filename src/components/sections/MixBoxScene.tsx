"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import PackageArt from "@/components/ui/PackageArt";
import FruitArt, { type FruitForm } from "@/components/ui/FruitArt";
import Button from "@/components/ui/Button";
import { getProduct } from "@/data/products";
import { useCart } from "@/store/cart";
import type { FruitKind } from "@/data/products";

const ORBIT: { fruit: FruitKind; form: FruitForm; angle: number; size: string }[] = [
  { fruit: "mango", form: "whole", angle: -90, size: "13vw" },
  { fruit: "strawberry", form: "sliced", angle: -18, size: "10vw" },
  { fruit: "banana", form: "whole", angle: 54, size: "12vw" },
  { fruit: "kiwi", form: "sliced", angle: 126, size: "9vw" },
  { fruit: "peach", form: "whole", angle: 198, size: "11vw" },
];

export default function MixBoxScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const orbitRefs = useRef<(HTMLDivElement | null)[]>([]);
  const product = getProduct("mixed-fruit-box")!;
  const add = useCart((s) => s.add);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(orbitRefs.current, { autoAlpha: 0, scale: 0.2, x: 0, y: 0 });
      gsap.set(".mix-line-1", { autoAlpha: 1 });
      gsap.set(".mix-line-2, .mix-cta", { autoAlpha: 0, y: 24 });
      gsap.set(boxRef.current, { scale: 0.86, rotateY: -8, rotateX: 4 });
      gsap.set(".mix-flash", { autoAlpha: 0 });

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

      tl.to(".mix-line-1", { autoAlpha: 0, y: -20, duration: 0.4, ease: "none" }, 0.15)
        .to(boxRef.current, { rotateY: 0, rotateX: 0, scale: 1.04, duration: 0.7, ease: "power2.out" }, 0.2)
        .to(".mix-flash", { autoAlpha: 0.9, duration: 0.15, ease: "power1.out" }, 0.55)
        .to(".mix-flash", { autoAlpha: 0, duration: 0.4, ease: "power1.in" }, 0.7)
        .to(boxRef.current, { y: 30, scale: 0.9, duration: 0.9, ease: "power2.inOut" }, 0.6)
        .to(
          orbitRefs.current,
          {
            autoAlpha: 1,
            scale: 1,
            x: (i) => Math.cos((ORBIT[i].angle * Math.PI) / 180) * (window.innerWidth * 0.32),
            y: (i) => Math.sin((ORBIT[i].angle * Math.PI) / 180) * (window.innerHeight * 0.24),
            duration: 1.1,
            stagger: 0.05,
            ease: "power2.out",
          },
          0.65
        )
        .to(".mix-line-2", { autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out" }, 1.05)
        .to(orbitRefs.current, {
          rotate: (i) => (i % 2 === 0 ? 14 : -14),
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: 1,
        }, 1.2)
        .to(".mix-line-2", { autoAlpha: 0, y: -20, duration: 0.4, ease: "none" }, 1.95)
        .to(
          orbitRefs.current,
          {
            x: 0,
            y: 0,
            scale: 0.1,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.03,
            ease: "power2.in",
          },
          2.05
        )
        .to(boxRef.current, { y: 0, scale: 1.1, duration: 0.8, ease: "power2.out" }, 2.05)
        .to(".mix-cta", { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, 2.4);
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="mixbox"
      ref={wrapRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
      style={{
        background:
          "radial-gradient(circle at 50% 55%, rgba(205,162,63,0.16), transparent 65%)",
      }}
    >
      <div
        className="mix-flash absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(circle at 50% 50%, rgba(255,244,214,0.35), transparent 60%)" }}
      />

      <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1600px" }}>
        <div ref={boxRef} className="relative" style={{ width: "min(40vw, 320px)" }}>
          <PackageArt
            type="box"
            eager
            className="w-full h-auto drop-shadow-[0_60px_120px_-30px_rgba(0,0,0,0.7)]"
          />
        </div>

        {ORBIT.map((o, i) => (
          <div
            key={o.fruit + o.form}
            ref={(el) => {
              orbitRefs.current[i] = el;
            }}
            className="absolute"
            style={{ width: o.size, maxWidth: "150px" }}
          >
            <FruitArt
              fruit={o.fruit}
              form={o.form}
              className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 h-full w-full flex items-center justify-center pointer-events-none px-6">
        <p className="mix-line-1 font-display text-display text-center max-w-xl text-veil">
          One box. <span className="font-script text-amber-soft">Every origin.</span>
        </p>
        <p className="mix-line-2 absolute font-display text-display text-center max-w-xl text-veil">
          Mango. Strawberry. Banana.
          <br />
          Kiwi. Peach.
        </p>
        <div className="mix-cta absolute flex flex-col items-center gap-5 pointer-events-auto text-center">
          <p className="eyebrow">{product.weight} · The Classic Mix Box</p>
          <h3 className="font-display text-h2">${product.price.toFixed(2)}</h3>
          <Button variant="primary" onClick={() => add(product)}>
            Add the Classic Mix Box
          </Button>
        </div>
      </div>
    </section>
  );
}
