"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { products } from "@/data/products";
import ProductCard from "@/components/ui/ProductCard";
import ProductQuickView from "@/components/ui/ProductQuickView";
import type { Product } from "@/data/products";

export default function Shop() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Product | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".product-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { autoAlpha: 0, y: 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            delay: (i % 4) * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="shop" ref={ref} className="relative w-full bg-ink py-28 md:py-36">
      <div className="container-edit">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="eyebrow mb-4">The Edit</p>
            <h2 className="font-display text-h2 max-w-xl">
              Six pieces. <span className="font-script text-amber-soft">No filler.</span>
            </h2>
          </div>
          <p className="text-cream/55 text-sm max-w-sm">
            Every product in one place — browse, quick-view, and build your
            bag. Free shipping on orders over $50.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onView={setActive} />
          ))}
        </div>
      </div>

      <ProductQuickView product={active} onClose={() => setActive(null)} />
    </section>
  );
}
