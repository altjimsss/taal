"use client";

import { useContext } from "react";
import { TransitionContext } from "./TransitionProvider";

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within TransitionProvider");
  }
  return ctx;
}