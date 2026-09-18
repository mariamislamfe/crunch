import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import Grain from "@/components/ui/Grain";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  weight: "variable",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Signatra ("Sweetest") — free for personal use; swap for the purchased
// commercial license before public launch.
const signatra = localFont({
  src: "../fonts/Signatra.ttf",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Could Crunch — Crisp. Sweet.",
  description:
    "Could Crunch is a premium dried-fruit house. Single-origin fruit, slow-dried and pressed into an edit of snacking pouches and shareable mix boxes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${signatra.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream overflow-x-hidden">
        <Grain />
        <SmoothScroll>
          <Navbar />
          {children}
          <Footer />
        </SmoothScroll>
        <CartDrawer />
      </body>
    </html>
  );
}
