import { cn } from "@/lib/utils";

export function HeroVisual({
  src = "/images/hero-architecture.svg",
  alt = "Abstract architectural texture",
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/70 bg-card/70",
        "shadow-sm shadow-black/5",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="eager"
        decoding="async"
        referrerPolicy="no-referrer"
        crossOrigin="anonymous"
      />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <div className="rounded-xl border border-border/60 bg-background/55 px-4 py-3 backdrop-blur-sm">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Presence reporting
          </p>
          <p className="mt-1 text-sm text-foreground">
            Calm, documented updates.
          </p>
        </div>
      </div>
    </div>
  );
}
