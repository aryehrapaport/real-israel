import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function MediaFrame({
  title,
  caption,
  className,
  children,
}: PropsWithChildren<{ title?: string; caption?: string; className?: string }>) {
  const hasTopContent = Boolean(children);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/70 bg-card/70",
        "shadow-sm shadow-black/5",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-muted/70 via-background/40 to-transparent" />
      <div className="absolute inset-0 opacity-100 [background-image:radial-gradient(800px_circle_at_15%_20%,hsl(var(--primary)/0.16),transparent_55%)]" />

      <div className="relative flex min-h-[260px] flex-col justify-end p-6">
        {children ? <div className="mb-auto">{children}</div> : null}

        {title ? (
          <p className={cn("text-sm font-medium text-foreground", hasTopContent ? "mt-8" : undefined)}>
            {title}
          </p>
        ) : null}
        {caption ? (
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{caption}</p>
        ) : null}
      </div>
    </div>
  );
}
