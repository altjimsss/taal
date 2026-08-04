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

type DotKey = "tl" | "tr" | "bl" | "br";
type DotRefs = Record<DotKey, HTMLDivElement | null>;

type TransitionContextValue = {
  registerLine: (key: keyof LineRefs, el: HTMLDivElement | null) => void;
  registerStroke: (key: keyof LineRefs, el: HTMLDivElement | null) => void;
  registerDot: (key: DotKey, el: HTMLDivElement | null) => void;
  prefetch: (href: string) => void;
  navigate: (href: string) => void;
  openShutter: () => Promise<void>;
  lockCenterCross: () => void;
  isTransitioning: boolean;
};

export const TransitionContext = createContext<TransitionContextValue | null>(
  null,
);

const GRID = 72;
const RISE_DURATION = 0.2;
const CONVERGE_DURATION = 0.6;
const RETREAT_DURATION = 0.5;
const DESCEND_DURATION = 0.2;

function getCenter() {
  if (typeof window === "undefined") return { xL: 0, xR: 0, yT: 0, yB: 0 };
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const xL = Math.round((vw - 1) / 2);
  const xR = vw - xL - 1;
  const yT = Math.round((vh - 1) / 2);
  const yB = vh - yT - 1;
  return { xL, xR, yT, yB };
}

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
  const dotRefs = useRef<DotRefs>({
    tl: null,
    tr: null,
    bl: null,
    br: null,
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

  const registerDot = useCallback((key: DotKey, el: HTMLDivElement | null) => {
    dotRefs.current[key] = el;
  }, []);

  const getDots = useCallback((keys: DotKey[]) => {
    return keys.map((k) => dotRefs.current[k]).filter(Boolean);
  }, []);

  const getLinePair = useCallback((key: keyof LineRefs) => {
    return [lineRefs.current[key], strokeRefs.current[key]].filter(Boolean);
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
    const dots = dotRefs.current;
    const { xL, xR, yT, yB } = getCenter();

    gsap.set(lines.top, { top: yT });
    gsap.set(lines.bottom, { bottom: yB });
    gsap.set(lines.left, { left: xL });
    gsap.set(lines.right, { right: xR });

    gsap.set(strokes.top, { top: yT });
    gsap.set(strokes.bottom, { bottom: yB + 0.5 });
    gsap.set(strokes.left, { left: xL });
    gsap.set(strokes.right, { right: xR + 0.5 });

    gsap.set(dots.tl, { top: yT, left: xL });
    gsap.set(dots.tr, { top: yT, right: xR });
    gsap.set(dots.bl, { bottom: yB, left: xL });
    gsap.set(dots.br, { bottom: yB, right: xR });
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
        gsap.set(getDots(["bl", "br"]), { bottom: -4 });

        const { xL, xR, yT, yB } = getCenter();

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
          getDots(["bl", "br"]),
          {
            bottom: GRID,
            duration: RISE_DURATION,
            ease: "power2.out",
          },
          "<",
        );
        tl.to(
          getLinePair("top"),
          {
            top: yT,
            duration: CONVERGE_DURATION,
            ease: "power2.inOut",
          },
          ">",
        );
        tl.to(
          getLinePair("bottom"),
          {
            bottom: yB,
            duration: CONVERGE_DURATION,
            ease: "power2.inOut",
          },
          "<",
        );
        tl.to(
          getLinePair("left"),
          {
            left: xL,
            duration: CONVERGE_DURATION,
            ease: "power2.inOut",
          },
          "<",
        );
        tl.to(
          getLinePair("right"),
          {
            right: xR,
            duration: CONVERGE_DURATION,
            ease: "power2.inOut",
          },
          "<",
        );
        tl.to(
          getDots(["tl", "tr"]),
          {
            top: yT,
            duration: CONVERGE_DURATION,
            ease: "power2.inOut",
          },
          "<",
        );
        tl.to(
          getDots(["bl", "br"]),
          {
            bottom: yB,
            duration: CONVERGE_DURATION,
            ease: "power2.inOut",
          },
          "<",
        );
        tl.to(
          getDots(["tl", "bl"]),
          {
            left: xL,
            duration: CONVERGE_DURATION,
            ease: "power2.inOut",
          },
          "<",
        );
        tl.to(
          getDots(["tr", "br"]),
          {
            right: xR,
            duration: CONVERGE_DURATION,
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
  }, [getAllLines, getDots, getLinePair, lockCenterCross]);

  const openShutter = useCallback(() => {
    return new Promise<void>((resolve) => {
      try {
        const allLines = getAllLines();
        if (!allLines) return resolve();

        const tl = gsap.timeline({
          onComplete: () => {
            document.documentElement.classList.remove("shutter-active");
            gsap.set(allLines, { clearProps: "top,bottom,left,right" });
            gsap.set(getDots(["tl", "tr", "bl", "br"]), {
              clearProps: "top,bottom,left,right",
            });
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
        tl.to(
          getDots(["tl", "tr"]),
          { top: GRID, duration: RETREAT_DURATION, ease: "power2.out" },
          "<",
        );
        tl.to(
          getDots(["bl", "br"]),
          { bottom: GRID, duration: RETREAT_DURATION, ease: "power2.out" },
          "<",
        );
        tl.to(
          getDots(["tl", "bl"]),
          { left: GRID, duration: RETREAT_DURATION, ease: "power2.out" },
          "<",
        );
        tl.to(
          getDots(["tr", "br"]),
          { right: GRID, duration: RETREAT_DURATION, ease: "power2.out" },
          "<",
        );
        tl.to(getLinePair("bottom"), {
          bottom: -4,
          duration: DESCEND_DURATION,
          ease: "power2.in",
        });
        tl.to(
          getDots(["bl", "br"]),
          {
            bottom: -4,
            duration: DESCEND_DURATION,
            ease: "power2.in",
          },
          "<",
        );
      } catch (err) {
        console.warn("openShutter GSAP error:", err);
        document.documentElement.classList.remove("shutter-active");
        resolve();
      }
    });
  }, [getDots, getAllLines, getLinePair]);

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
        registerDot,
        prefetch,
        navigate,
        openShutter,
        lockCenterCross,
        isTransitioning,
      }}
    >
      {children}
    </TransitionContext.Provider>
  );
}
