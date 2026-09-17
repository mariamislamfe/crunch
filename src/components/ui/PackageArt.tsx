"use client";

import { forwardRef } from "react";
import type { PackageType } from "@/data/products";

interface PackageArtProps {
  type: PackageType;
  className?: string;
  eager?: boolean;
}

const SOURCES: Record<PackageType, { src: string; alt: string; w: number; h: number }> = {
  pouch: { src: "/images/package/pouch.png", alt: "Dried fruit pouch", w: 181, h: 227 },
  box: { src: "/images/package/box.png", alt: "Mixed fruit box", w: 192, h: 197 },
};

/** The two real, photographed packages the store actually ships. */
const PackageArt = forwardRef<HTMLImageElement, PackageArtProps>(function PackageArt(
  { type, className, eager },
  ref
) {
  const { src, alt, w, h } = SOURCES[type];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      width={w}
      height={h}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={className}
    />
  );
});

export default PackageArt;
