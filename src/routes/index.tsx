import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { ProductCard } from "@/components/store/ProductCard";
import { Button } from "@/components/ui/button";
import { storefrontApiRequest, STOREFRONT_QUERY, type ShopifyProduct } from "@/lib/shopify";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Catho Clothing — Everyday essentials" },
      {
        name: "description",
        content: "Heavyweight tees, caps and hoodies from Catho Clothing. Made for slow days.",
      },
      { property: "og:title", content: "Catho Clothing — Everyday essentials" },
      { property: "og:description", content: "Heavyweight tees, caps and hoodies." },
      { property: "og:image", content: heroImage },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: Index,
});

function Index() {
  const [products, setProducts] = useState<ShopifyProduct[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    storefrontApiRequest(STOREFRONT_QUERY, { first: 12 })
      .then((data) => {
        if (cancelled) return;
        const edges: ShopifyProduct[] = data?.data?.products?.edges ?? [];
        const order = [
          "essential-tee-cream", // Catho Hill Bay Tee — White
          "catho-jetty-tee", // Catho Jetty Tee
        ];
        const sorted = [...edges].sort((a, b) => {
          const ai = order.indexOf(a.node.handle);
          const bi = order.indexOf(b.node.handle);
          if (ai === -1 && bi === -1) return 0;
          if (ai === -1) return 1;
          if (bi === -1) return -1;
          return ai - bi;
        });
        setProducts(sorted);
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setProducts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24 lg:px-8">
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <p className="text-xs uppercase tracking-[0.3em] text-accent"> drop · 01</p>
            <h1 className="mt-4 font-display text-5xl leading-[0.95] sm:text-7xl lg:text-8xl">
              Made for
              <br />
              <span className="italic text-accent">slow days.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Casual wear made for everyday life by the coast.
              Welcome to Catho Clothing.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full h-12 px-8">
                <a
                  href="#shop"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById("shop")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Shop the drop
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full h-12 px-8 border-foreground">
                <a href="/about">Our story</a>
              </Button>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-secondary shadow-[var(--shadow-elegant)]">
              <img
                src={heroImage}
                alt="Catherine Hill Bay jetty stretching over turquoise water on a clear day"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden md:block rounded-full border border-border bg-background px-4 py-2 text-xs uppercase tracking-widest shadow-[var(--shadow-soft)]">
              New · Drop 01
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-y border-border bg-ink text-paper py-4 overflow-hidden">
        <div className="flex gap-12 whitespace-nowrap animate-[marquee_30s_linear_infinite] font-display text-2xl">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              Catho Clothing <span className="text-accent">✦</span> Made for slow days{" "}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="shop" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">The collection</p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl">Shop everything</h2>
          </div>
        </div>

        {products === null && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/5] rounded-lg bg-secondary" />
                <div className="mt-4 h-4 w-2/3 rounded bg-secondary" />
                <div className="mt-2 h-4 w-1/3 rounded bg-secondary" />
              </div>
            ))}
          </div>
        )}

        {products !== null && products.length === 0 && (
          <div className="rounded-lg border border-dashed border-border p-12 text-center">
            <p className="font-display text-2xl">No products found</p>
            <p className="mt-2 text-muted-foreground">
              Tell the chat what product to add and we'll get i live.
            </p>
          </div>
        )}

        {products !== null && products.length > 0 && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <Footer />

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
