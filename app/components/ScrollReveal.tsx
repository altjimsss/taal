"use client";

import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollReveal() {
  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !document.querySelector(".value-section")) return;

    const reveal = (selector: string, vars: gsap.TweenVars) => {
      const els = document.querySelectorAll<HTMLElement>(selector);
      if (!els.length) return;
      gsap.from(els, {
        ...vars,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: els[0],
          start: "top 85%",
          once: true,
        },
      });
    };

    reveal(".headline h2", { y: 22, opacity: 0, duration: 1 });
    reveal(".headline .trust-badges", { y: 12, opacity: 0, duration: 0.85 });
    reveal(".value-section .value-left", { y: 26, opacity: 0, duration: 1 });
    reveal(".value-section .value-right", { y: 26, opacity: 0, duration: 1 });
    reveal(".pick-header > *", { y: 18, opacity: 0, duration: 0.85, stagger: 0.1 });
    reveal(".filter-bar", { y: 14, opacity: 0, duration: 0.75 });
    reveal(".dest-card", { y: 26, opacity: 0, duration: 0.85, stagger: 0.07 });
    reveal(".feature-section .feature-card", { y: 28, opacity: 0, duration: 1 });
    reveal(".steps .step", { y: 24, opacity: 0, duration: 0.9, stagger: 0.1 });
    reveal(".cta-section > *", { y: 20, opacity: 0, duration: 0.9, stagger: 0.1 });
    reveal("footer > *", { y: 14, opacity: 0, duration: 0.85 });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return null;
}
