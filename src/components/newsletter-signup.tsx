import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const schema = z.object({
  email: z.string().email(),
});

export function NewsletterSignup({
  title = "Occasional notes",
  description = "A short, low-frequency update when something changes that affects overseas projects.",
}: {
  title?: string;
  description?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="rounded-xl border border-border/70 bg-card p-5">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="mt-4">
        {status === "success" ? (
          <p className="text-sm text-muted-foreground">Thanks. You’re on the list.</p>
        ) : (
          <form
            className="flex flex-col gap-3 sm:flex-row sm:items-end"
            onSubmit={(e) => {
              e.preventDefault();
              const result = schema.safeParse({ email });
              if (!result.success) {
                setError("Please enter a valid email.");
                return;
              }
              setError(null);
              setStatus("success");
            }}
          >
            <div className="flex-1">
              <Label htmlFor="newsletter-email" className="text-xs text-muted-foreground">
                Email
              </Label>
              <Input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
              {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
            </div>
            <Button type="submit" className="sm:shrink-0">
              Subscribe
            </Button>
          </form>
        )}

        <p className="mt-3 text-xs text-muted-foreground">
          Privacy: your email is used only for this list.
        </p>
      </div>
    </div>
  );
}
