import { Link } from "@tanstack/react-router";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <nav className="hidden md:flex items-center gap-8 text-sm">
          <Link to="/" className="uppercase tracking-widest hover:text-accent transition-colors">
            Shop
          </Link>
          <Link to="/about" className="uppercase tracking-widest hover:text-accent transition-colors">
            About
          </Link>
        </nav>
        <Link to="/" className="font-display text-2xl tracking-tight md:absolute md:left-1/2 md:-translate-x-1/2">
          Catho<span className="text-accent">.</span>n.Co
        </Link>
        <div className="flex items-center gap-1">
          <CartDrawer />
        </div>
      </div>
    </header>
  );
}