export default function Footer() {
  return (
    <footer className="relative bg-ink border-t border-line">
      <div className="container-edit py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <p className="font-display text-2xl mb-3">Could Crunch</p>
          <p className="text-cream/55 text-sm max-w-xs leading-relaxed">
            Fruit, slow-dried and pressed into an edit worth savouring. No
            added sugar, no sulphites, no shortcuts.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Shop</p>
          <ul className="space-y-2 text-sm text-cream/60">
            <li><a href="#shop" className="hover:text-cream transition-colors">All Products</a></li>
            <li><a href="#mixbox" className="hover:text-cream transition-colors">The Mixed Box</a></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Could Crunch</p>
          <ul className="space-y-2 text-sm text-cream/60">
            <li><a href="#taste" className="hover:text-cream transition-colors">The Taste</a></li>
            <li><a href="#top" className="hover:text-cream transition-colors">Journal</a></li>
            <li><a href="#top" className="hover:text-cream transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="container-edit py-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-cream/40">
        <span>&copy; {new Date().getFullYear()} Could Crunch. All rights reserved.</span>
        <span>Grown slow. Dried honest.</span>
      </div>
    </footer>
  );
}
