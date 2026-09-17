"use client";

import type { Product } from "@/data/products";
import FruitArt from "@/components/ui/FruitArt";
import PackageArt from "@/components/ui/PackageArt";
import { useCart } from "@/store/cart";

export default function ProductCard({
  product,
  onView,
}: {
  product: Product;
  onView: (product: Product) => void;
}) {
  const add = useCart((s) => s.add);

  return (
    <div className="product-card group relative rounded-2xl border border-line overflow-hidden bg-ink-soft/60 hover:border-line-strong transition-colors">
      <button
        onClick={() => onView(product)}
        className="block w-full text-left"
        aria-label={`View ${product.name}`}
      >
        <div
          className="relative aspect-[4/5] flex items-center justify-center overflow-hidden"
          style={{ background: `radial-gradient(circle at 50% 40%, ${product.accent}2e, transparent 70%)` }}
        >
          <div className="w-[58%] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-3">
            <PackageArt type={product.packageType} className="w-full h-auto" />
          </div>
          {product.fruit && (
            <div className="absolute bottom-4 right-4 w-11 h-11 rounded-full bg-ink/70 ring-1 ring-white/15 p-1.5 backdrop-blur-sm">
              <FruitArt fruit={product.fruit} form="sliced" className="w-full h-full object-contain" />
            </div>
          )}
          {product.badge && (
            <span className="absolute top-4 left-4 eyebrow" style={{ color: "var(--gold)" }}>
              {product.badge}
            </span>
          )}
        </div>
      </button>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h4 className="font-display text-lg leading-tight truncate">{product.name}</h4>
            <p className="text-cream/45 text-xs mt-1">{product.weight}</p>
          </div>
          <span className="font-display text-lg text-amber-soft shrink-0">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={() => onView(product)}
            className="flex-1 text-[0.68rem] uppercase tracking-[0.14em] border border-line-strong rounded-full py-2.5 hover:bg-white/5 transition-colors"
          >
            View
          </button>
          <button
            onClick={() => add(product)}
            className="flex-1 text-[0.68rem] uppercase tracking-[0.14em] rounded-full py-2.5 bg-cream text-ink hover:bg-amber transition-colors"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
