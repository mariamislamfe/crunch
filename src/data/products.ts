export type FruitKind = "mango" | "strawberry" | "banana" | "kiwi" | "peach";

export type PackageType = "pouch" | "box";

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  weight: string;
  /** Which real fruit photography this product's flavor is built from. */
  fruit?: FruitKind;
  /** Which real, photographed package this product actually ships in. */
  packageType: PackageType;
  accent: string;
  origin: string;
  badge?: string;
}

export const FRUITS: FruitKind[] = ["mango", "strawberry", "banana", "kiwi", "peach"];

export const products: Product[] = [
  {
    id: "p1",
    slug: "dried-mango",
    name: "Dried Mango",
    tagline: "Sun-ripened, slow-pressed",
    description:
      "Thick-cut Kent mangoes, sun-ripened to peak sweetness and slow-dried for 30 hours until leathery-soft at the edge, tender at the core. No added sugar, no sulphites.",
    price: 9.5,
    weight: "120g",
    fruit: "mango",
    packageType: "pouch",
    accent: "var(--amber)",
    origin: "Alphonso Valley",
  },
  {
    id: "p2",
    slug: "dried-strawberry",
    name: "Dried Strawberry",
    tagline: "Whole-fruit, freeze-pressed",
    description:
      "Whole strawberries, freeze-dried to lock in their color and tart-sweet snap. Shatters like a crisp, blooms like fresh fruit on the tongue.",
    price: 11,
    weight: "80g",
    fruit: "strawberry",
    packageType: "pouch",
    accent: "var(--wine-soft)",
    origin: "Nile Delta",
  },
  {
    id: "p3",
    slug: "dried-banana",
    name: "Dried Banana Chips",
    tagline: "Slow-baked, deeply caramel",
    description:
      "Lady-finger bananas, oven-dried low and slow until deeply caramel and toffee-chewy. No frying, no coconut oil.",
    price: 7.5,
    weight: "130g",
    fruit: "banana",
    packageType: "pouch",
    accent: "var(--gold)",
    origin: "Southern Groves",
  },
  {
    id: "p4",
    slug: "dried-kiwi",
    name: "Dried Kiwi",
    tagline: "Emerald, tangy, whole-sliced",
    description:
      "Hand-sliced kiwi at peak ripeness, dried gently to preserve the emerald core and tiny jet-black seeds.",
    price: 9.5,
    weight: "90g",
    fruit: "kiwi",
    packageType: "pouch",
    accent: "var(--olive)",
    origin: "Highland Orchards",
  },
  {
    id: "p5",
    slug: "dried-peach",
    name: "Dried Peach",
    tagline: "Sun-blushed, honey-soft",
    description:
      "Halved orchard peaches, pit removed and slow-dried until honey-soft with a blushed, sun-kissed rim. Fragrant, floral, deeply sweet.",
    price: 10.5,
    weight: "110g",
    fruit: "peach",
    packageType: "pouch",
    accent: "var(--rust)",
    origin: "Highland Orchards",
  },
  {
    id: "p6",
    slug: "mixed-fruit-box",
    name: "The Classic Mix Box",
    tagline: "Five fruits, one edit",
    description:
      "Our full range in one shareable box — mango, strawberry, banana, kiwi and peach, curated into one crisp, sweet edit. The easiest way to taste everything.",
    price: 26,
    weight: "380g",
    packageType: "box",
    accent: "var(--amber)",
    origin: "The Full Edit",
    badge: "Box Edit",
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
