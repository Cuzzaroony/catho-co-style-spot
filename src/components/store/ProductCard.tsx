import { Link } from "@tanstack/react-router";
import { type ShopifyProduct, formatPrice } from "@/lib/shopify";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const image = p.images.edges[0]?.node;
  const price = p.priceRange.minVariantPrice;

  return (
    <Link
      to="/product/$handle"
      params={{ handle: p.handle }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-secondary">
        {image && (
          <img
            src={image.url}
            alt={image.altText ?? p.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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