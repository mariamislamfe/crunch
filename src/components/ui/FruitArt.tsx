"use client";

import type { FruitKind } from "@/data/products";

export type FruitForm = "whole" | "sliced";

interface FruitArtProps {
  fruit: FruitKind;
  form?: FruitForm;
  className?: string;
  eager?: boolean;
}

// Intrinsic pixel dimensions of each die-cut PNG. Passed through as the
// img's width/height attributes so the browser can reserve the correct
// aspect ratio before the file downloads — without this, these unsized
// <img>s collapse to 0 height on first paint and every GSAP ScrollTrigger
// pin/scrub distance measured against them (in a useLayoutEffect that runs
// before the network request resolves) ends up wrong, which is what made
// the scroll animations look broken/static after the SVG-to-photo swap.
const SOURCES: Record<FruitKind, Record<FruitForm, { src: string; w: number; h: number }>> = {
  mango: {
    whole: { src: "/images/fruits/mango-whole.png", w: 216, h: 194 },
    sliced: { src: "/images/fruits/mango-sliced.png", w: 141, h: 98 },
  },
  strawberry: {
    whole: { src: "/images/fruits/strawberry-whole.png", w: 191, h: 256 },
    sliced: { src: "/images/fruits/strawberry-sliced.png", w: 240, h: 234 },
  },
  banana: {
    whole: { src: "/images/fruits/banana-whole.png", w: 194, h: 262 },
    sliced: { src: "/images/fruits/banana-sliced.png", w: 94, h: 108 },
  },
  kiwi: {
    whole: { src: "/images/fruits/kiwi-whole.png", w: 146, h: 171 },
    sliced: { src: "/images/fruits/kiwi-sliced.png", w: 94, h: 116 },
  },
  peach: {
    whole: { src: "/images/fruits/peach-whole.png", w: 168, h: 176 },
    sliced: { src: "/images/fruits/peach-sliced.png", w: 124, h: 115 },
  },
};

/** Real fruit photography (die-cut, transparent) used as motion-design elements. */
export default function FruitArt({ fruit, form = "whole", className, eager }: FruitArtProps) {
  const { src, w, h } = SOURCES[fruit][form];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      width={w}
      height={h}
      alt={`${form === "whole" ? "Fresh" : "Sliced"} ${fruit}`}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={className}
    />
  );
}
