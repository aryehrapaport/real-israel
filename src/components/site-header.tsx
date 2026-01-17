import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

export function SiteHeader() {
  const location = useLocation();
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return getInitialTheme();
    } catch {
      return "light";
    }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mobileListVariants = useMemo(
    () => ({
      open: {
        transition: {
          staggerChildren: 0.045,
          delayChildren: 0.06,
        },
      },
      closed: {
        transition: {
          staggerChildren: 0.03,
          staggerDirection: -1,
        },
      },
    }),
    [],
  );

  const mobileItemVariants = useMemo(
    () => ({
      open: {
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.22,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
      },
      closed: {
        opacity: 0,
        x: 14,
        transition: {
          duration: 0.12,
          ease: [0.4, 0, 1, 1] as [number, number, number, number],
        },
      },
    }),
    [],
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const nav = useMemo(
    () =>
      [
        { to: "/#home", label: "Home" },
        { to: "/#why-us", label: "Why Choose Us" },
        { to: "/#services", label: "Services" },
        { to: "/#contact", label: "Contact" },
      ] as const,
    [],
  );

  const activeHash = location.pathname === "/" ? location.hash || "#home" : "";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/#home"
            className="text-sm font-semibold tracking-tight text-foreground"
            aria-label="Home"
          >
            BridgePoint Israel
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {nav.map((item) => {
              const hash = item.to.includes("#") ? item.to.slice(item.to.indexOf("#")) : "";
              const isActive = Boolean(hash) && hash === activeHash;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                    isActive ? "text-foreground" : undefined,
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                >
                  {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className={cn(
                  "p-6",
                  "data-[state=open]:duration-300 data-[state=closed]:duration-200",
                )}
              >
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <motion.nav
                  className="mt-3 grid gap-1"
                  aria-label="Mobile primary"
                  initial="closed"
                  animate="open"
                  variants={mobileListVariants}
                >
                  {nav.map((item) => (
                    <motion.div key={item.to} variants={mobileItemVariants}>
                      <Link
                        to={item.to}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span
                          className={cn(
                            "block rounded-xl border border-transparent px-3 py-3 text-sm",
                            "text-muted-foreground transition-colors hover:text-foreground",
                            "hover:border-border/70 hover:bg-muted/20",
                            (() => {
                              const hash = item.to.includes("#") ? item.to.slice(item.to.indexOf("#")) : "";
                              const isActive = Boolean(hash) && hash === activeHash;
                              return isActive ? "border-border/70 bg-muted/20 text-foreground" : undefined;
                            })(),
                          )}
                        >
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>

                <motion.div
                  className="mt-6 grid gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.28,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                    delay: 0.08,
                  }}
                >
                  <Button
                    asChild
                    variant="premium"
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/#contact" state={{ from: location.pathname }}>
                      Request a Consultation
                    </Link>
                  </Button>

                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Discreet, presence based coordination for international clients.
                  </p>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>

          <Button asChild variant="premium" className="hidden md:inline-flex">
            <Link to="/#contact" state={{ from: location.pathname }}>
              Request a Consultation
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
