"use client";

import { useEffect } from "react";
import { usePageTransition } from "./transitions/usePageTransition";

const GRID = 72;

export default function IntroScreen() {
  const { lockCenterCross, openShutter } = usePageTransition();

  useEffect(() => {
    // Instantly snap lines to center (shutter fully closed), then open
    document.documentElement.classList.add("shutter-active");
    lockCenterCross();

    // One frame to let the browser paint the closed state, then open
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        openShutter();
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
