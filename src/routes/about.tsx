import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/store/Header";
import { Footer } from "@/components/store/Footer";
import { Button } from "@/components/ui/button";
import bayImage from "@/assets/catherine-hill-bay.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Catho n Co" },
      { name: "description", content: "A merch brand born from a love of Catherine Hill Bay, NSW — the oldest village on Lake Macquarie." },
      { property: "og:title", content: "Our Story — Catho n Co" },
      { property: "og:description", content: "A merch brand born from a love of Catherine Hill Bay, NSW." },
      { property: "og:image", content: bayImage },
      { name: "twitter:image", content: bayImage },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="mx-auto max-w-3xl px-4 pt-24 pb-12 sm:px-6 lg:px-8">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">Our story</p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl leading-tight">
          For the love of Catho.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Catho n Co is a merch brand dedicated to one place: <span className="text-foreground">Catherine Hill Bay, NSW</span> —
          the sleepy coastal village south of Swansea where the jetty meets the Pacific and time
          slows down. We grew up here, surfed here, watched the sun come up over the headland here.
          This brand is our love letter to it.
        </p>
      </section>

      <figure className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <img
          src={bayImage}
          alt="The historic timber jetty at Catherine Hill Bay beach, NSW Australia"
          width={1600}
          height={1200}
          loading="lazy"
          className="w-full rounded-2xl object-cover shadow-[var(--shadow-elegant)]"
        />
        <figcaption className="mt-3 text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Catherine Hill Bay, NSW — the old coal jetty
        </figcaption>
      </figure>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl sm:text-4xl">A bit of history</h2>
        <div className="mt-6 space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            The land belongs first to the <span className="text-foreground">Awabakal people</span>, the traditional custodians
            of this stretch of coast. Catherine Hill Bay is the oldest continuous settlement in the
            City of Lake Macquarie — a village shaped by the sea long before anyone put a name on a map.
          </p>
          <p>
            The town as we know it grew up around coal. From the 1860s, miners worked the seams in the
            cliffs above the bay and shipped the coal out from a long timber jetty that still stands
            today, weathered and salt-bitten, reaching out into the Pacific. The miners' cottages,
            the pub on the hill, and the heritage-listed jetty are all still there — frozen in a
            quieter Australia.
          </p>
          <p>
            Today Catho is a protected coastal village: golden sand, sandstone headlands at either
            end, clean water, and almost no development. It's the kind of place you drive an hour
            out of your way for. We made this brand so people who know it have something to wear,
            and people who don't have a reason to ask.
          </p>
        </div>

        <div className="mt-12 flex flex-wrap gap-4">
          <Button asChild size="lg" className="rounded-full h-12 px-8">
            <Link to="/">Shop the collection</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full h-12 px-8">
            <a href="https://en.wikipedia.org/wiki/Catherine_Hill_Bay" target="_blank" rel="noopener noreferrer">
              Learn more about Catho
            </a>
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}