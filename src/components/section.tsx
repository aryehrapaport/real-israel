import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("container", className)}>{children}</div>;
}

export function Section({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <section className={cn("relative py-14 sm:py-18 lg:py-24", className)}>{children}</section>;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Divider() {
  return (
    <div className="py-3">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border/80 to-transparent" />
    </div>
  );
}
