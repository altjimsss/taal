"use client";

import { useEffect, useLayoutEffect, useState } from "react";

const CARDS = [
  {
    id: 1,
    place: "Culture",
    desc: "The customs and character of the town",
    tag: "Culture",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    place: "People",
    desc: "The community that calls it home",
    tag: "People",
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    place: "Food",
    desc: "The flavors and ingredients of the town",
    tag: "Food",
    src: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    place: "Tradition",
    desc: "Practice and celebration passed on",
    tag: "Tradition",
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    place: "Architecture",
    desc: "The built heritage of the town",
    tag: "Architecture",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=600&auto=format&fit=crop",
  },
];

const N = CARDS.length;
// Heights by visible slot: 1st (tall), 2nd (medium), 3rd (small).
const HEIGHTS = [320, 240, 168];
// A card sits at a whole-number slot; -1 = leaving (offscreen left), 3 = entering (offscreen right).
const SLOTS = [-1, 0, 1, 2, 3];

function wrap(n: number) {
  return (n + N) % N;
}

export default function ValueCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Preload images
  useLayoutEffect(() => {
    CARDS.forEach((c) => {
      const img = new Image();
      img.src = c.src;
    });
  }, []);

  // Autoplay: advance to the next card automatically.
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % N);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  const currentCard = CARDS[activeIndex];

  return (
    <div className="value-right">
      <div className="value-stage">
        {SLOTS.map((slot) => {
          const card = CARDS[wrap(activeIndex + slot)];
          const visible = slot >= 0 && slot <= 2;
          const height = slot === -1 ? 150 : HEIGHTS[Math.min(slot, 2)];

          return (
            <div
              key={card.id}
              className="value-e-card"
              style={{
                transform: `translateX(calc(${slot * 100}% + ${slot * 16}px + 8px))`,
                height: `${height}px`,
                opacity: visible ? 1 : slot === -1 ? 0 : 0.55,
                zIndex: slot === 0 ? 30 : slot === 1 ? 20 : 10,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.src} alt={card.place} />
              <span className="tag-chip">{card.tag}</span>
            </div>
          );
        })}
      </div>

      <div className="caption-row">
        <div className="caption" key={activeIndex}>
          <div className="place">{currentCard.place}</div>
          <div className="desc">{currentCard.desc}</div>
        </div>

        <div className="nav-controls">
          <button
            type="button"
            className="nav-btn"
            onClick={() => setActiveIndex((i) => (i - 1 + N) % N)}
            aria-label="Previous card"
          >
            ‹
          </button>
          <button
            type="button"
            className="nav-btn"
            onClick={() => setActiveIndex((i) => (i + 1) % N)}
            aria-label="Next card"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}