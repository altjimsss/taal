"use client";

import { useEffect, useRef } from "react";

export default function NavbarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const past = window.scrollY >= window.innerHeight - 72;
      el.classList.toggle("navbar--scrolled", past);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header ref={ref} className="navbar">
      {children}
    </header>
  );
}
