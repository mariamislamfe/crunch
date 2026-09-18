"use client";

import { useEffect } from "react";
import Link from "next/link";
import clsx from "clsx";
import { useCart } from "@/store/cart";
import Button from "@/components/ui/Button";
import PackageArt from "@/components/ui/PackageArt";

export default function CartDrawer() {
  const { items, isOpen, close, remove, setQuantity, subtotal } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <div
        onClick={close}
        className={clsx(
          "fixed inset-0 bg-black/60 z-[90] transition-opacity duration-500 ease-out",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      />
      <aside
        className={clsx(
          "fixed top-0 right-0 h-full w-full sm:w-[440px] bg-ink-soft border-l border-line z-[95] flex flex-col",
          "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-6 sm:px-8 h-[74px] border-b border-line">
          <span className="eyebrow">Your Bag</span>
          <button
            onClick={close}
            aria-label="Close cart"
            className="text-cream/70 hover:text-cream text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
          {items.length === 0 && (
            <p className="text-cream/50 text-sm pt-10 text-center">
              Your bag is empty — the fruit is waiting.
            </p>
          )}
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4">
              <div className="w-20 h-20 shrink-0">
                <PackageArt type={product.packageType} className="w-full h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-display text-base leading-tight">{product.name}</p>
                  <button
                    onClick={() => remove(product.id)}
                    className="text-cream/40 hover:text-wine-soft text-xs shrink-0"
                  >
                    Remove
                  </button>
                </div>
                <p className="text-cream/50 text-xs mt-1">{product.weight}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-line rounded-full overflow-hidden">
                    <button
                      className="w-7 h-7 text-sm hover:bg-white/5"
                      onClick={() => setQuantity(product.id, quantity - 1)}
                    >
                      −
                    </button>
                    <span className="w-7 text-center text-sm">{quantity}</span>
                    <button
                      className="w-7 h-7 text-sm hover:bg-white/5"
                      onClick={() => setQuantity(product.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-amber-soft">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="px-6 sm:px-8 py-6 border-t border-line space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-cream/60">Subtotal</span>
              <span className="font-display text-lg">${subtotal().toFixed(2)}</span>
            </div>
            <Link href="/checkout" onClick={close}>
              <Button variant="primary" className="w-full">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
