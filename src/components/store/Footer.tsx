export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <p className="font-display text-3xl">Catho<span className="text-accent">.</span>Clothing</p>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs">
              Everyday essentials, made for slow days.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Shop</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>Tees</li>
              <li>Hats</li>
              <li>Hoodies</li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Stay close</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Sign up for first looks and limited drops.
            </p>
          </div>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Catho Clothing. All rights reserved.</p>
          <p>Made with care.</p>
        </div>
      </div>
    </footer>
  );
}