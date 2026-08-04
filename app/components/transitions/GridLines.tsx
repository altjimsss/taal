"use client";

import { usePageTransition } from "./usePageTransition";

export default function GridLines() {
  const { registerLine, registerStroke, registerDot } = usePageTransition();

  return (
    <>
      <div
        ref={(el) => registerDot("tl", el)}
        className="page-frame-dot dot-tl"
        aria-hidden="true"
      />
      <div
        ref={(el) => registerDot("tr", el)}
        className="page-frame-dot dot-tr"
        aria-hidden="true"
      />
      <div
        ref={(el) => registerDot("bl", el)}
        className="page-frame-dot dot-bl"
        aria-hidden="true"
      />
      <div
        ref={(el) => registerDot("br", el)}
        className="page-frame-dot dot-br"
        aria-hidden="true"
      />
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
