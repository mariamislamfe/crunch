import Hero from "@/components/sections/Hero";
import ScrollStory from "@/components/sections/ScrollStory";
import ProductSpotlight from "@/components/sections/ProductSpotlight";
import MixBoxScene from "@/components/sections/MixBoxScene";
import Shop from "@/components/sections/Shop";
import FinalCTA from "@/components/sections/FinalCTA";
import { getProduct } from "@/data/products";

export default function Home() {
  const strawberry = getProduct("dried-strawberry")!;
  const peach = getProduct("dried-peach")!;

  return (
    <main className="relative">
      <Hero />
      <ScrollStory />
      <ProductSpotlight product={strawberry} align="left" />
      <ProductSpotlight product={peach} align="right" />
      <MixBoxScene />
      <Shop />
      <FinalCTA />
    </main>
  );
}
