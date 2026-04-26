import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Catho n Co" },
      { name: "description", content: "The story behind Catho n Co — heavyweight basics built to last." },
      { property: "og:title", content: "About — Catho n Co" },
      { property: "og:description", content: "The story behind Catho n Co." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Our story</p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl leading-tight">
          Made for every day, built for the long haul.
        </h1>
        <div className="mt-10 space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            Catho n Co started with a simple idea: the basics in your wardrobe should feel as
            considered as anything else you own. Heavyweight cotton. Honest cuts. Pieces that
            soften with wear instead of falling apart.
          </p>
          <p>
            We design slow and ship in small drops, so every tee, hat and hoodie gets the same
            attention. No gimmicks. No noise. Just the everyday, done well.
          </p>
        </div>
        <div className="mt-12">
          <Button asChild size="lg" className="rounded-full h-12 px-8">
            <Link to="/">Shop the collection</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}