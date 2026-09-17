"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import type { Product } from "@/data/products";
import FruitArt from "@/components/ui/FruitArt";
import PackageArt from "@/components/ui/PackageArt";
import Button from "@/components/ui/Button";
import { useCart } from "@/store/cart";

export default function ProductQuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const [qty, setQty] = useState(1);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const add = useCart((s) => s.add);

  useEffect(() => {
    if (product) setQty(1);
  }, [product]);

  useEffect(() => {
    if (!overlayRef.current || !panelRef.current) return;
    if (product) {
      document.body.style.overflow = "hidden";
      gsap.set(overlayRef.current, { display: "flex" });
      gsap.fromTo(overlayRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 });
      gsap.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 30, scale: 0.97 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: 0.25,
        onComplete: () => gsap.set(overlayRef.current!, { display: "none" }),
      });
    }
  }, [product]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[110] hidden items-center justify-center bg-black/70 px-4 opacity-0"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      {product && (
        <div
          ref={panelRef}
          className="relative w-full max-w-3xl bg-ink-soft border border-line rounded-3xl overflow-hidden grid md:grid-cols-2"
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-cream text-xl"
          >
            &times;
          </button>

          <div
            className="relative flex items-center justify-center p-10 md:p-14"
            style={{ background: `radial-gradient(circle at 50% 40%, ${product.accent}33, transparent 70%)` }}
          >
            <div className="w-full max-w-[260px]">
              <PackageArt type={product.packageType} eager className="w-full h-auto" />
            </div>
            {product.fruit && (
              <div className="absolute bottom-6 right-6 w-14 h-14 rounded-full bg-ink/70 ring-1 ring-white/15 p-2 backdrop-blur-sm">
                <FruitArt fruit={product.fruit} form="sliced" className="w-full h-full object-contain" />
              </div>
            )}
          </div>

          <div className="p-8 md:p-10 flex flex-col">
            <p className="eyebrow mb-3">{product.origin}</p>
            <h3 className="font-display text-3xl mb-2">{product.name}</h3>
            <p className="text-amber-soft italic font-display mb-4">{product.tagline}</p>
            <p className="text-cream/65 text-sm leading-relaxed mb-6">{product.description}</p>
            <p className="text-cream/40 text-xs uppercase tracking-[0.14em] mb-8">{product.weight}</p>

            <div className="mt-auto space-y-5">
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl">${product.price.toFixed(2)}</span>
                <div className="flex items-center border border-line rounded-full overflow-hidden">
                  <button
                    className="w-9 h-9 hover:bg-white/5"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span className="w-9 text-center">{qty}</span>
                  <button className="w-9 h-9 hover:bg-white/5" onClick={() => setQty((q) => q + 1)}>
                    +
                  </button>
                </div>
              </div>
              <Button
                variant="primary"
                className="w-full"
                onClick={() => {
                  add(product, qty);
                  onClose();
                }}
              >
                Add to Bag — ${(product.price * qty).toFixed(2)}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
