import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
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

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const nav = useMemo(
    () =>
      [
        { to: "/about", label: "About" },
        { to: "/why-presence", label: "Why Presence" },
        { to: "/services", label: "Services" },
        { to: "/contact", label: "Contact" },
      ] as const,
    [],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-sm font-semibold tracking-tight text-foreground"
            aria-label="Home"
          >
            Real Israel
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                    isActive ? "text-foreground" : undefined,
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
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
            <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-4 w-4" />
                </Button>
              </DialogTrigger>

              <DialogContent
                className={cn(
                  "left-auto top-0 right-0 h-dvh w-[88vw] max-w-sm translate-x-0 translate-y-0",
                  "rounded-none border-l border-border/60 sm:rounded-none",
                  "p-6",
                  "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right",
                )}
              >
                <DialogHeader className="text-left">
                  <DialogTitle className="text-base">Menu</DialogTitle>
                </DialogHeader>

                <nav className="mt-2 grid gap-1" aria-label="Mobile primary">
                  {nav.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          "rounded-xl border border-transparent px-3 py-3 text-sm",
                          "text-muted-foreground transition-colors hover:text-foreground",
                          "hover:border-border/70 hover:bg-muted/20",
                          isActive ? "border-border/70 bg-muted/20 text-foreground" : undefined,
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </nav>

                <div className="mt-6 grid gap-3">
                  <Button
                    asChild
                    variant="premium"
                    className="w-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Link to="/contact" state={{ from: location.pathname }}>
                      Request a Consultation
                    </Link>
                  </Button>

                  <p className="text-xs leading-relaxed text-muted-foreground">
                    Discreet, presence based coordination for international clients.
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Button asChild variant="premium" className="hidden md:inline-flex">
            <Link to="/contact" state={{ from: location.pathname }}>
              Request a Consultation
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
