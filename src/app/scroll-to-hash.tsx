import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const HEADER_OFFSET_PX = 80;

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET_PX;
  window.scrollTo({ top: Math.max(0, y), left: 0, behavior: "smooth" });
}

export function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;
    const hash = location.hash;
    if (!hash) return;

    const id = hash.replace(/^#/, "");
    if (!id) return;

    // Defer to ensure the target element is in the DOM.
    const t = window.setTimeout(() => scrollToId(id), 0);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  return null;
}
