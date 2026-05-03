import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import {
  storefrontApiRequest,
  PRODUCT_BY_HANDLE_QUERY,
  formatPrice,
  type ShopifyProduct,
} from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

export const Route = createFileRoute("/product/$handle")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle} — Catho Clothing` },
      { name: "description", content: "Heavyweight essentials by Catho Clothing." },
    ],
  }),
  component: ProductDetail,
});

function ProductDetail() {
  const { handle } = Route.useParams();
  const [product, setProduct] = useState<ShopifyProduct["node"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);

  useEffect(() => {
    setLoading(true);
    storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle })
      .then((data) => {
        const p = data?.data?.product ?? null;
        setProduct(p);
        if (p?.variants?.edges?.length) {
          setSelectedVariantId(p.variants.edges[0].node.id);
        }
      })
      .finally(() => setLoading(false));
  }, [handle]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-xl px-4 py-32 text-center">
          <h1 className="font-display text-4xl">Not found</h1>
          <p className="mt-2 text-muted-foreground">This product doesn't exist.</p>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/">Back to shop</Link>
          </Button>
        </div>
      </div>
    );
  }

  const images = product.images.edges.map((e) => e.node);
  const image = images[imageIndex] ?? images[0];
  const hasMultipleImages = images.length > 1;
  const isWaveCap = product.handle.includes("wave-cap");
  const selectedVariant =
    product.variants.edges.find((v) => v.node.id === selectedVariantId)?.node ??
    product.variants.edges[0].node;

  const handleAdd = async () => {
    if (!selectedVariant) return;
    await addItem({
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || [],
    });
    toast.success("Added to bag", {
      description: `${product.title} · ${selectedVariant.title}`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </Link>
      </div>
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pb-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary">
          {image && (
            <img
              key={image.url}
              src={image.url}
              alt={image.altText ?? product.title}
              className={`h-full w-full animate-in fade-in ${
                isWaveCap ? "object-contain p-12 sm:p-16" : "object-cover"
              }`}
            />
          )}
          {hasMultipleImages && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() =>
                  setImageIndex((i) => (i - 1 + images.length) % images.length)
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur hover:bg-background"
              >
                ‹
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => setImageIndex((i) => (i + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur hover:bg-background"
              >
                ›
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Show image ${i + 1}`}
                    onClick={() => setImageIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === imageIndex ? "w-6 bg-foreground" : "w-1.5 bg-foreground/40"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Catho Clothing
          </p>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl leading-tight">
            {product.title}
          </h1>
          {isWaveCap && hasMultipleImages && (
            <div className="mt-5 flex gap-2">
              {["White", "Black"].map((label, i) => {
                const active = imageIndex === i;
                return (
                  <button
                    key={label}
                    onClick={() => setImageIndex(i)}
                    className={`rounded-full border px-5 py-2 text-sm transition-colors ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
          <p className="mt-4 text-2xl font-medium">
            {formatPrice(
              selectedVariant.price.amount,
              selectedVariant.price.currencyCode,
            )}
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          {product.options.length > 0 && product.options[0].name !== "Title" && (
            <div className="mt-8">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                {product.options[0].name}
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.edges.map((v) => {
                  const isSelected = v.node.id === selectedVariantId;
                  return (
                    <button
                      key={v.node.id}
                      onClick={() => setSelectedVariantId(v.node.id)}
                      className={`min-w-12 rounded-full border px-4 py-2 text-sm transition-colors ${
                        isSelected
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground"
                      }`}
                    >
                      {v.node.title}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <Button
            onClick={handleAdd}
            disabled={isAdding || !selectedVariant.availableForSale}
            size="lg"
            className="mt-10 rounded-full h-14 text-base"
          >
            {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add to bag"}
          </Button>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 text-sm text-muted-foreground">
            <p>Free shipping over $100</p>
            <p>Easy 30-day returns</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}