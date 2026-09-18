"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";
import PackageArt from "@/components/ui/PackageArt";
import Button from "@/components/ui/Button";

export default function CheckoutPage() {
  const { items, subtotal, setQuantity, remove } = useCart();
  const shipping = items.length === 0 || subtotal() >= 50 ? 0 : 6;

  return (
    <main className="min-h-screen pt-[74px] container-edit py-16 md:py-24">
      <p className="eyebrow mb-4">Checkout</p>
      <h1 className="font-display text-h2 mb-12">Your Bag</h1>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-cream/55 mb-8">Your bag is empty.</p>
          <Link href="/#shop">
            <Button variant="primary">Back to the Edit</Button>
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_380px] gap-16">
          <div className="space-y-6">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex flex-wrap gap-4 border border-line rounded-2xl p-5 items-center"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto sm:flex-1 min-w-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0">
                    <PackageArt type={product.packageType} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-lg">{product.name}</p>
                    <p className="text-cream/45 text-xs mt-1">{product.weight}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 w-full sm:w-auto">
                  <div className="flex items-center border border-line rounded-full overflow-hidden">
                    <button
                      className="w-8 h-8 hover:bg-white/5"
                      onClick={() => setQuantity(product.id, quantity - 1)}
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm">{quantity}</span>
                    <button
                      className="w-8 h-8 hover:bg-white/5"
                      onClick={() => setQuantity(product.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <span className="text-right font-display text-lg">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => remove(product.id)}
                    className="text-cream/40 hover:text-wine-soft text-xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <aside className="border border-line rounded-2xl p-8 h-fit sticky top-24">
            <h2 className="font-display text-xl mb-6">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-cream/65">
                <span>Subtotal</span>
                <span>${subtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-cream/65">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
            </div>
            <div className="hairline my-6" />
            <div className="flex justify-between font-display text-xl mb-8">
              <span>Total</span>
              <span>${(subtotal() + shipping).toFixed(2)}</span>
            </div>
            <Button variant="primary" className="w-full">
              Continue to Payment
            </Button>
            <p className="text-cream/35 text-xs text-center mt-4">
              This is a demo storefront — payment is not yet connected.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
