"use client";

import Link from "next/link";
import {
  useEffect,
  type AnchorHTMLAttributes,
  type FocusEvent,
  type MouseEvent,
} from "react";
import { usePageTransition } from "./usePageTransition";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

function shouldUseNativeNavigation(
  href: string,
  e: MouseEvent<HTMLAnchorElement>,
) {
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  const isModified =
    e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;
  const isHashOnly = href.startsWith("#");

  return !isInternal || isModified || isHashOnly;
}

export default function TransitionLink({
  href,
  onClick,
  onFocus,
  onMouseEnter,
  children,
  ...rest
}: Props) {
  const { navigate, prefetch } = usePageTransition();

  useEffect(() => {
    prefetch(href);
  }, [href, prefetch]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || shouldUseNativeNavigation(href, e)) return;

    e.preventDefault();
    navigate(href);
  };

  const handleFocus = (e: FocusEvent<HTMLAnchorElement>) => {
    onFocus?.(e);
    prefetch(href);
  };

  const handleMouseEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    onMouseEnter?.(e);
    prefetch(href);
  };

  return (
    <Link
      href={href}
      prefetch
      onClick={handleClick}
      onFocus={handleFocus}
      onMouseEnter={handleMouseEnter}
      {...rest}
    >
      {children}
    </Link>
  );
}
