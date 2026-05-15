import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook, Mail } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Social Media Section */}
        <div className="mb-20 text-center">
          <h2 className="font-display text-4xl sm:text-6xl mb-8">Join the community</h2>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 transition-transform hover:scale-110"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-paper/20 bg-paper/5 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                <Instagram className="h-8 w-8" />
              </div>
              <span className="text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100">Instagram</span>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-4 transition-transform hover:scale-110"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-paper/20 bg-paper/5 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
              </div>
              <span className="text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100">TikTok</span>
            </a>
            <a
              href="mailto:hello@cathoclothing.com"
              className="group flex flex-col items-center gap-4 transition-transform hover:scale-110"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-paper/20 bg-paper/5 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
                <Mail className="h-8 w-8" />
              </div>
              <span className="text-xs uppercase tracking-widest opacity-60 group-hover:opacity-100">Email</span>
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 gap-12 border-t border-paper/10 pt-16 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="font-display text-3xl tracking-tight">
              Catho<span className="text-accent">.</span>Clothing
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed opacity-60">
              Everyday essentials made for slow days by the coast. 
              Designed with quality and simplicity in mind.
            </p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">Shop</h3>
            <ul className="space-y-4 text-sm opacity-60">
              <li><Link to="/" className="hover:text-accent transition-colors">All Products</Link></li>
              <li><Link to="/" className="hover:text-accent transition-colors">New Arrivals</Link></li>
              <li><Link to="/" className="hover:text-accent transition-colors">Best Sellers</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-semibold mb-6">Support</h3>
            <ul className="space-y-4 text-sm opacity-60">
              <li><Link to="/about" className="hover:text-accent transition-colors">Our Story</Link></li>
              <li><Link to="/" className="hover:text-accent transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/" className="hover:text-accent transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-20 border-t border-paper/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest opacity-40">
          <p>© {currentYear} Catho Clothing. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
