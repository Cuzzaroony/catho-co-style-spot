import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { type ShopifyProduct, formatPrice } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const images = p.images.edges.map((e) => e.node);
  const price = p.priceRange.minVariantPrice;
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;
  const current = images[index];

  return (
    <Link
      to="/product/$handle"
      params={{ handle: p.handle }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
        {current && (
          <img
            key={current.url}
            src={current.url}
            alt={current.altText ?? p.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 animate-in fade-in"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        {hasMultiple && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIndex((i) => (i - 1 + images.length) % images.length);
              }}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-background"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIndex((i) => (i + 1) % images.length);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-foreground backdrop-blur opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-background"
            >
              ›
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show image ${i + 1}`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    i === index ? "w-6 bg-foreground" : "w-1.5 bg-foreground/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-lg leading-tight">{p.title}</h3>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
            View product
          </p>
        </div>
        <p className="font-medium text-base whitespace-nowrap">
          {formatPrice(price.amount, price.currencyCode)}
        </p>
      </div>
    </Link>
  );
}