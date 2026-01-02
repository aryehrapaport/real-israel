import { Check, X } from "lucide-react";

export function ComparisonBlock() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          With on-the-ground presence
        </p>
        <p className="mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
          Clear decisions, earlier detection
        </p>
        <div className="mt-6 h-px w-full bg-border/70" />
        <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {[
            "Decisions happen with context, not guesswork.",
            "Issues are spotted early—before they become delays.",
            "Updates are concrete: photos, notes, next steps.",
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/60">
                <Check className="h-4 w-4 text-primary" />
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-border/70 bg-background/40 p-6 sm:p-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Without it
        </p>
        <p className="mt-3 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
          Drift, ambiguity, and late surprises
        </p>
        <div className="mt-6 h-px w-full bg-border/70" />
        <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {[
            "Messages travel through layers, and meaning drifts.",
            "Small misses compound into schedule and cost surprises.",
            "Progress is unclear until it’s too late to correct.",
          ].map((t) => (
            <li key={t} className="flex gap-3">
              <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border/70 bg-background/60">
                <X className="h-4 w-4 text-muted-foreground" />
              </span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
