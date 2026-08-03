"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

type LineRefs = {
  top: HTMLDivElement | null;
  bottom: HTMLDivElement | null;
  left: HTMLDivElement | null;
  right: HTMLDivElement | null;
};

type TransitionContextValue = {
  registerLine: (key: keyof LineRefs, el: HTMLDivElement | null) => void;
  registerStroke: (key: keyof LineRefs, el: HTMLDivElement | null) => void;
  prefetch: (href: string) => void;
  navigate: (href: string) => void;
  isTransitioning: boolean;
};

export const TransitionContext = createContext<TransitionContextValue | null>(
  null,
);

const GRID = 72;
const RISE_DURATION = 0.2;
const CONVERGE_PRIMARY_DURATION = 0.5;
const CONVERGE_SECONDARY_DURATION = 0.42;
const SECONDARY_DELAY =
  CONVERGE_PRIMARY_DURATION - CONVERGE_SECONDARY_DURATION;
const RETREAT_DURATION = 0.5;
const DESCEND_DURATION = 0.2;
const STROKE_WIDTH = 0.5;
const CENTER_STROKE_BOTTOM = `calc(50vh - ${STROKE_WIDTH}px)`;
const CENTER_STROKE_RIGHT = `calc(50vw - ${STROKE_WIDTH}px)`;

function getPathFromHref(href: string) {
  try {
    return new URL(href, window.location.origin).pathname;
  } catch {
    return href.split("#")[0].split("?")[0] || "/";
  }
}

function waitForRoutePaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function isInternalRoute(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export default function TransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const lineRefs = useRef<LineRefs>({
    top: null,
    bottom: null,
    left: null,
    right: null,
  });
  const strokeRefs = useRef<LineRefs>({
    top: null,
    bottom: null,
    left: null,
    right: null,
  });
  const reducedMotionRef = useRef(false);
  const pendingPathRef = useRef<string | null>(null);
  const hasPushedRef = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  const registerLine = useCallback(
    (key: keyof LineRefs, el: HTMLDivElement | null) => {
      lineRefs.current[key] = el;
    },
    [],
  );

  const registerStroke = useCallback(
    (key: keyof LineRefs, el: HTMLDivElement | null) => {
      strokeRefs.current[key] = el;
    },
    [],
  );

  const getLinePair = useCallback((key: keyof LineRefs) => {
    return [lineRefs.current[key], strokeRefs.current[key]].filter(Boolean);
  }, []);

  const getLine = useCallback((key: keyof LineRefs) => {
    return lineRefs.current[key];
  }, []);

  const getStroke = useCallback((key: keyof LineRefs) => {
    return strokeRefs.current[key];
  }, []);

  const getAllLines = useCallback(() => {
    const lines = lineRefs.current;
    const strokes = strokeRefs.current;
    const elements = [
      lines.top,
      lines.bottom,
      lines.left,
      lines.right,
      strokes.top,
      strokes.bottom,
      strokes.left,
      strokes.right,
    ];

    return elements.every(Boolean) ? elements : null;
  }, []);

  const lockCenterCross = useCallback(() => {
    const lines = lineRefs.current;
    const strokes = strokeRefs.current;

    gsap.set(lines.top, { top: "50vh" });
    gsap.set(lines.bottom, { bottom: "50vh" });
    gsap.set(lines.left, { left: "50vw" });
    gsap.set(lines.right, { right: "50vw" });

    gsap.set(strokes.top, { top: "50vh" });
    gsap.set(strokes.bottom, { bottom: CENTER_STROKE_BOTTOM });
    gsap.set(strokes.left, { left: "50vw" });
    gsap.set(strokes.right, { right: CENTER_STROKE_RIGHT });
  }, []);

  const prefetch = useCallback(
    (href: string) => {
      if (!isInternalRoute(href)) return;

      try {
        router.prefetch(href);
      } catch (err) {
        console.warn("router.prefetch transition error:", err);
      }
    },
    [router],
  );

  const closeShutter = useCallback(() => {
    return new Promise<void>((resolve) => {
      try {
        if (!getAllLines()) return resolve();

        document.documentElement.classList.add("shutter-active");
        gsap.set(getLinePair("bottom"), { bottom: -4 });

        const tl = gsap.timeline({
          onComplete: () => {
            lockCenterCross();
            resolve();
          },
        });

        tl.to(getLinePair("bottom"), {
          bottom: GRID,
          duration: RISE_DURATION,
          ease: "power2.out",
        });
        tl.to(
          getLine("bottom"),
          {
            bottom: "50vh",
            duration: CONVERGE_PRIMARY_DURATION,
            ease: "power2.inOut",
          },
          ">",
        );
        tl.to(
          getStroke("bottom"),
          {
            bottom: CENTER_STROKE_BOTTOM,
            duration: CONVERGE_PRIMARY_DURATION,
            ease: "power2.inOut",
          },
          "<",
        );
        tl.to(
          getLinePair("left"),
          {
            left: "50vw",
            duration: CONVERGE_PRIMARY_DURATION,
            ease: "power2.inOut",
          },
          "<",
        );
        tl.to(
          getLinePair("top"),
          {
            top: "50vh",
            duration: CONVERGE_SECONDARY_DURATION,
            ease: "power2.inOut",
          },
          `<${SECONDARY_DELAY}`,
        );
        tl.to(
          getLine("right"),
          {
            right: "50vw",
            duration: CONVERGE_SECONDARY_DURATION,
            ease: "power2.inOut",
          },
          "<",
        );
        tl.to(
          getStroke("right"),
          {
            right: CENTER_STROKE_RIGHT,
            duration: CONVERGE_SECONDARY_DURATION,
            ease: "power2.inOut",
          },
          "<",
        );
      } catch (err) {
        console.warn("closeShutter GSAP error:", err);
        document.documentElement.classList.remove("shutter-active");
        resolve();
      }
    });
  }, [getAllLines, getLine, getLinePair, getStroke, lockCenterCross]);

  const openShutter = useCallback(() => {
    return new Promise<void>((resolve) => {
      try {
        const allLines = getAllLines();
        if (!allLines) return resolve();

        const tl = gsap.timeline({
          onComplete: () => {
            document.documentElement.classList.remove("shutter-active");
            gsap.set(allLines, { clearProps: "top,bottom,left,right" });
            resolve();
          },
        });

        tl.to(getLinePair("top"), {
          top: GRID,
          duration: RETREAT_DURATION,
          ease: "power2.out",
        });
        tl.to(
          getLinePair("bottom"),
          { bottom: GRID, duration: RETREAT_DURATION, ease: "power2.out" },
          "<",
        );
        tl.to(
          getLinePair("left"),
          { left: GRID, duration: RETREAT_DURATION, ease: "power2.out" },
          "<",
        );
        tl.to(
          getLinePair("right"),
          { right: GRID, duration: RETREAT_DURATION, ease: "power2.out" },
          "<",
        );
        tl.to(getLinePair("bottom"), {
          bottom: -4,
          duration: DESCEND_DURATION,
          ease: "power2.in",
        });
      } catch (err) {
        console.warn("openShutter GSAP error:", err);
        document.documentElement.classList.remove("shutter-active");
        resolve();
      }
    });
  }, [getAllLines, getLinePair]);

  useEffect(() => {
    const pendingPath = pendingPathRef.current;
    if (!isTransitioning || !hasPushedRef.current || pathname !== pendingPath) {
      return;
    }

    let cancelled = false;

    waitForRoutePaint().then(() => {
      if (cancelled) return;

      openShutter().then(() => {
        pendingPathRef.current = null;
        hasPushedRef.current = false;
        setIsTransitioning(false);
      });
    });

    return () => {
      cancelled = true;
    };
  }, [isTransitioning, openShutter, pathname]);

  const navigate = useCallback(
    (href: string) => {
      const targetPath = getPathFromHref(href);
      if (isTransitioning || targetPath === pathname) return;
      prefetch(href);

      if (reducedMotionRef.current) {
        router.push(href);
        return;
      }

      pendingPathRef.current = targetPath;
      hasPushedRef.current = false;
      setIsTransitioning(true);

      closeShutter().then(() => {
        try {
          lockCenterCross();
          hasPushedRef.current = true;
          router.push(href);
        } catch (err) {
          console.warn("router.push transition error:", err);
          pendingPathRef.current = null;
          hasPushedRef.current = false;
          openShutter().then(() => setIsTransitioning(false));
        }
      });
    },
    [
      isTransitioning,
      pathname,
      closeShutter,
      openShutter,
      prefetch,
      router,
      lockCenterCross,
    ],
  );

  return (
    <TransitionContext.Provider
      value={{
        registerLine,
        registerStroke,
        prefetch,
        navigate,
        isTransitioning,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}
