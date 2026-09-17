"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import PackageArt from "@/components/ui/PackageArt";
import FruitArt from "@/components/ui/FruitArt";
import Button from "@/components/ui/Button";
import { FRUITS, getProduct } from "@/data/products";
import { useCart } from "@/store/cart";

const SHARDS: { top: string; side: "left" | "right"; offset: string; size: string; rot: number }[] = [
  { top: "8%", side: "left", offset: "2%", size: "72px", rot: -20 },
  { top: "30%", side: "right", offset: "0%", size: "84px", rot: 16 },
  { top: "52%", side: "left", offset: "10%", size: "64px", rot: 26 },
  { top: "70%", side: "right", offset: "12%", size: "70px", rot: -14 },
  { top: "86%", side: "left", offset: "-4%", size: "60px", rot: 10 },
];

export default function FinalCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const product = getProduct("mixed-fruit-box")!;
  const add = useCart((s) => s.add);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".final-box-wrap", { scale: 0.6, autoAlpha: 0, rotate: -4 });
      gsap.set(".final-copy > *", { autoAlpha: 0, y: 30 });
      gsap.set(".final-shard", { autoAlpha: 0, scale: 0.2 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 75%",
          end: "top 15%",
          scrub: 0.8,
        },
      });

      tl.to(
        ".final-shard",
        {
          autoAlpha: 1,
          scale: 1,
          stagger: 0.08,
          ease: "power2.out",
        },
        0
      )
        .to(".final-box-wrap", { scale: 1, autoAlpha: 1, rotate: 0, ease: "back.out(1.5)" }, 0.25)
        .to(".final-copy > *", { autoAlpha: 1, y: 0, stagger: 0.08, ease: "power3.out" }, 0.4);

      gsap.to(".final-shard", {
        y: "-=14",
        rotate: "+=8",
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.3, from: "random" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex items-center overflow-hidden py-28"
      style={{
        background:
          "radial-gradient(circle at 50% 40%, rgba(205,162,63,0.14), transparent 60%), var(--ink)",
      }}
    >
      <div className="container-edit grid md:grid-cols-2 gap-16 items-center w-full">
        <div className="relative flex items-center justify-center order-2 md:order-1 min-h-[380px]">
          <div className="final-box-wrap relative" style={{ width: "min(38vw, 300px)" }}>
            <PackageArt type="box" className="w-full h-auto drop-shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)]" />
          </div>
          {SHARDS.map((s, i) => (
            <div
              key={i}
              className="final-shard absolute drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
              style={{
                width: s.size,
                top: s.top,
                left: s.side === "left" ? s.offset : "auto",
                right: s.side === "right" ? s.offset : "auto",
                transform: `rotate(${s.rot}deg)`,
              }}
            >
              <FruitArt fruit={FRUITS[i % FRUITS.length]} form="sliced" className="w-full h-auto" />
            </div>
          ))}
        </div>

        <div className="final-copy order-1 md:order-2">
          <p className="eyebrow mb-5" style={{ color: "var(--gold)" }}>
            The Full Harvest
          </p>
          <h2 className="font-display text-display mb-6">
            Every fruit. <span className="font-script text-amber-soft">One table.</span>
          </h2>
          <p className="text-cream/65 leading-relaxed max-w-md mb-10">
            One more bite is never enough. Taste the whole range in a single
            box, or build your own bag one fruit at a time — either way, it
            ends the same: crisp, sweet, and gone too fast.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <span className="font-display text-2xl">${product.price.toFixed(2)}</span>
            <Button variant="primary" onClick={() => add(product)}>
              Add the Mix Box
            </Button>
            <a href="#shop">
              <Button variant="outline">Shop the Edit</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
