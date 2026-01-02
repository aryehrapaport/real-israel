import type { PropsWithChildren, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Container({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={cn("container", className)}>{children}</div>;
}

export function Section({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <section className={cn("py-14 md:py-20", className)}>{children}</section>;
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
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="text-sm font-medium tracking-wide text-muted-foreground">{eyebrow}</p>
      ) : null}
      <h2 className="mt-2 text-2xl font-semibold leading-tight text-foreground md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Divider() {
  return (
    <div className="py-2">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
