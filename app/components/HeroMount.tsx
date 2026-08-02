"use client";

import dynamic from "next/dynamic";

const HeroSlideshow = dynamic(
  () =>
    import("./HeroSlideshow").then((m) => m.HeroSlideshow),
  { ssr: false },
);

export default function HeroMount() {
  return <HeroSlideshow />;
}