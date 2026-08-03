"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    quote:
      "The best part of Taal was the pace. No rushing, just stories and coffee on a cobblestone lane.",
    by: "Miguel R.",
    role: "Guided heritage walk",
    imgSrc:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop",
  },
  {
    quote:
      "Our guide brought every ancestral house to life. It felt like walking through a living museum.",
    by: "Andrea S.",
    role: "Casa Villavicencio tour",
    imgSrc:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
  },
  {
    quote:
      "Two days, one lake, a hundred stories. We came for the basilica and stayed for the people.",
    by: "Ben & Liza",
    role: "Slow weekend",
    imgSrc:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=600&auto=format&fit=crop",
  },
  {
    quote:
      "The coffee was strong, the stories stronger. Taal slows you down without you noticing.",
    by: "Carlo M.",
    role: "Food walk",
    imgSrc:
      "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=600&auto=format&fit=crop",
  },
  {
    quote:
      "Every street corner feels preserved in time. The best sunrise I have seen in the Philippines.",
    by: "Nica D.",
    role: "Dawn walk",
    imgSrc:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=600&auto=format&fit=crop",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
      setKey((k) => k + 1);
    }, 6000);
    return () => clearInterval(id);
  }, [paused]);

  const go = (dir: number) => {
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
    setKey((k) => k + 1);
  };

  const t = testimonials[index];

  return (
    <div
      className="taal-testimonials border border-border bg-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid md:grid-cols-[1fr_280px]">
        <div className="relative order-2 overflow-hidden md:order-1 md:min-h-[300px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={`img-${key}`}
            src={t.imgSrc}
            alt={t.by}
            className="absolute inset-0 h-full w-full object-cover testi-fade"
          />
        </div>

        <div className="flex min-h-[280px] flex-col p-8 pl-10 md:min-h-[300px] md:p-12 md:pl-16 lg:p-14 lg:pl-20">
          <div
            key={`content-${key}`}
            className="testi-fade flex flex-1 flex-col items-center justify-center text-center"
          >
            <p className="mx-auto max-w-xl px-2 text-xl leading-relaxed text-ink md:px-4 md:text-2xl lg:text-[1.7rem]">
              {t.quote}
            </p>
          </div>

          <div
            className="mt-auto flex w-full flex-wrap items-center justify-center gap-6 border-t border-border md:justify-between"
            style={{ padding: "10px" }}
          >
            <div className="testi-fade flex items-center gap-4" key={`meta-${key}`}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
                {t.by.slice(0, 1)}
              </span>
              <div className="text-left">
                <p className="font-semibold leading-tight text-ink">{t.by}</p>
                <p className="text-sm leading-tight text-stone">{t.role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="flex h-11 w-11 items-center justify-center border border-border bg-background text-ink transition-colors hover:bg-[#60a5fa] hover:text-white"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="flex h-11 w-11 items-center justify-center border border-border bg-background text-ink transition-colors hover:bg-[#60a5fa] hover:text-white"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2 border-t border-border px-8 py-4 md:px-12">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i);
              setKey((k) => k + 1);
            }}
            aria-label={`Go to testimonial ${i + 1}`}
            className={cn(
              "h-1.5 flex-1 transition-colors",
              i === index ? "bg-[#60a5fa]" : "bg-border hover:bg-ink/30",
            )}
          />
        ))}
      </div>
    </div>
  );
}
