"use client";

import { usePageTransition } from "./usePageTransition";

export default function GridLines() {
  const { registerLine, registerStroke } = usePageTransition();

  return (
    <>
      <div
        ref={(el) => registerLine("left", el)}
        className="page-frame-line line-left"
        aria-hidden="true"
      />
      <div
        ref={(el) => registerStroke("left", el)}
        className="page-frame-stroke line-left"
        aria-hidden="true"
      />
      <div
        ref={(el) => registerLine("right", el)}
        className="page-frame-line line-right"
        aria-hidden="true"
      />
      <div
        ref={(el) => registerStroke("right", el)}
        className="page-frame-stroke line-right"
        aria-hidden="true"
      />
      <div
        ref={(el) => registerLine("top", el)}
        className="page-frame-line line-top"
        aria-hidden="true"
      />
      <div
        ref={(el) => registerStroke("top", el)}
        className="page-frame-stroke line-top"
        aria-hidden="true"
      />
      <div
        ref={(el) => registerLine("bottom", el)}
        className="page-frame-line line-bottom"
        aria-hidden="true"
      />
      <div
        ref={(el) => registerStroke("bottom", el)}
        className="page-frame-stroke line-bottom"
        aria-hidden="true"
      />
    </>
  );
}
