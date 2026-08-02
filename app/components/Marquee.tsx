"use client";

import { useSyncExternalStore } from "react";

const items = [
  "Heritage Town of the Philippines",
  "Founded 1572",
  "Basilica of Saint Martin",
  "100+ ancestral homes",
  "Capiz windows",
  "Balisong",
  "El Asiabat Festival",
  "Kapeng Barako",
];

const QUERY = "(prefers-reduced-motion: reduce)";
const subscribeReduced = (onChange: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

function Row({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden}>
      {items.map((item) => (
        <span
          key={`${item}${ariaHidden ? "-clone" : ""}`}
          className="flex items-center gap-10 pr-10 text-ink/70 md:gap-16 md:pr-16"
        >
          <span className="whitespace-nowrap font-display text-sm tracking-wide md:text-base">
            {item}
          </span>
          <span className="text-rust">✦</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className="overflow-hidden border-y border-hairline bg-ivory py-5">
        <div className="flex flex-wrap justify-center gap-x-10 gap-y-2 px-6">
          {items.map((item) => (
            <span key={item} className="font-display text-sm text-ink/70 md:text-base">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border-y border-hairline bg-ivory py-5">
      <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
        <Row />
        <Row ariaHidden />
      </div>
    </div>
  );
}