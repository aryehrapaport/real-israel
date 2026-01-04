import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

type Variant = "home" | "services" | "default";

function pickVariant(pathname: string): Variant {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/services")) return "services";
  return "default";
}

export function SiteBackground() {
  const { pathname } = useLocation();
  const variant = pickVariant(pathname);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-background" />

      <div
        className="absolute inset-0 opacity-100 [background-image:radial-gradient(900px_circle_at_20%_10%,hsl(var(--primary)/0.14),transparent_55%),radial-gradient(900px_circle_at_85%_85%,hsl(var(--foreground)/0.06),transparent_55%)]"
        aria-hidden="true"
      />

      <motion.div
        className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-muted/30 blur-3xl"
        animate={{ y: [0, 14, 0], opacity: [0.22, 0.28, 0.22] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
        animate={{ y: [0, -12, 0], opacity: [0.18, 0.24, 0.18] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />

      {variant === "services" ? (
        <motion.div
          className="absolute left-[18%] top-[55%] h-64 w-64 rounded-full bg-muted/25 blur-3xl"
          animate={{ x: [0, 10, 0], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : null}
    </div>
  );
}
