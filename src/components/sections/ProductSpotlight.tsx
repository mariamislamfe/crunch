"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import type { Product } from "@/data/products";
import FruitArt from "@/components/ui/FruitArt";
import PackageArt from "@/components/ui/PackageArt";
import Button from "@/components/ui/Button";
import { useCart } from "@/store/cart";

const FRAGMENTS = [
  { x: "-16%", y: "-22%", size: "34%", rot: -22, delay: 0 },
  { x: "20%", y: "-10%", size: "28%", rot: 18, delay: 0.08 },
  { x: "-8%", y: "26%", size: "26%", rot: 32, delay: 0.16 },
];

export default function ProductSpotlight({
  product,
  align = "left",
}: {
  product: Product;
  align?: "left" | "right";
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const add = useCart((s) => s.add);
  const fruit = product.fruit ?? "mango";

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".spot-fruit-hero", {
        scale: 0.55,
        rotate: align === "left" ? -35 : 35,
        autoAlpha: 0,
      });
      gsap.set(".spot-frag", { autoAlpha: 0, scale: 0.3 });
      gsap.set(".spot-pack", { autoAlpha: 0, scale: 0.6, y: 16 });
      gsap.set(".spot-copy > *", { autoAlpha: 0, y: 30 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 15%",
            scrub: 0.8,
          },
        })
        .to(".spot-fruit-hero", { scale: 1, rotate: 0, autoAlpha: 1, ease: "power2.out" }, 0)
        .to(
          ".spot-frag",
          {
            autoAlpha: 1,
            scale: 1,
            stagger: 0.08,
            ease: "power2.out",
          },
          0.15
        )
        .to(".spot-pack", { autoAlpha: 1, scale: 1, y: 0, ease: "power2.out" }, 0.55);

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      }).to(".spot-copy > *", {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
      });

      // gentle continuous drift while pinned in view
      gsap.to(".spot-fruit-hero", {
        y: -18,
        rotate: align === "left" ? 6 : -6,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.utils.toArray<HTMLElement>(".spot-frag").forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 === 0 ? -12 : 12,
          rotate: `+=${i % 2 === 0 ? 8 : -8}`,
          duration: 3 + i * 0.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [align]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex items-center overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${align === "left" ? "20%" : "80%"} 50%, ${product.accent}22, transparent 60%)`,
      }}
    >
      <div
        className={`container-edit grid md:grid-cols-2 gap-12 items-center py-24 ${
          align === "right" ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative flex items-center justify-center" style={{ aspectRatio: "1", maxWidth: 460 }}>
          <div
            className="absolute rounded-full blur-3xl opacity-40"
            style={{ width: "60%", aspectRatio: "1", background: product.accent }}
          />

          {FRAGMENTS.map((f, i) => (
            <div
              key={i}
              className="spot-frag absolute"
              style={{
                width: f.size,
                top: f.y,
                left: f.x,
                transform: `rotate(${f.rot}deg)`,
              }}
            >
              <FruitArt fruit={fruit} form="sliced" className="w-full h-auto" />
            </div>
          ))}

          <div className="spot-fruit-hero relative w-[62%] max-w-[340px]">
            <FruitArt
              fruit={fruit}
              form="whole"
              className="w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        <div className="spot-copy">
          <p className="eyebrow mb-4">{product.origin}</p>
          <h3 className="font-display text-h2 mb-4">{product.name}</h3>
          <p className="text-amber-soft italic font-display text-lg mb-5">{product.tagline}</p>
          <p className="text-cream/65 leading-relaxed max-w-md mb-8">{product.description}</p>
          <div className="flex items-center gap-6 flex-wrap">
            <div className="spot-pack w-20 h-20 shrink-0">
              <PackageArt type="pouch" className="w-full h-full object-contain" />
            </div>
            <span className="font-display text-2xl">${product.price.toFixed(2)}</span>
            <Button variant="outline" onClick={() => add(product)}>
              Add to Bag
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
