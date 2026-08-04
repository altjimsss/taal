"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { usePageTransition } from "./transitions/usePageTransition";

export default function NavbarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { isTransitioning } = usePageTransition();
  const pathname = usePathname();
  const prevTransitioning = useRef(isTransitioning);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isHome = pathname === "/";

    const update = () => {
      if (!isHome) {
        // Sub-pages: always show white navbar
        el.classList.add("navbar--scrolled");
        el.classList.remove("navbar--hero");
      } else {
        // Homepage: white only after scrolling past the hero
        const past = window.scrollY >= window.innerHeight - 72;
        el.classList.toggle("navbar--scrolled", past);
        el.classList.toggle("navbar--hero", !past);
      }
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [pathname]);

  useEffect(() => {
    const prev = prevTransitioning.current;
    prevTransitioning.current = isTransitioning;
    if (prev === true && isTransitioning === false) {
      setVisible(false);
      const t = setTimeout(() => setVisible(true), 150);
      return () => clearTimeout(t);
    }
  }, [isTransitioning]);

  return (
    <header ref={ref} className="navbar" style={{ opacity: visible ? 1 : 0 }}>
      {children}
    </header>
  );
}
