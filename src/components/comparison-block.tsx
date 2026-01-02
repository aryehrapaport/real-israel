import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ComparisonBlock() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-base">With on-the-ground presence</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Decisions happen with context, not guesswork.</p>
          <p>Issues are spotted early—before they become delays.</p>
          <p>Updates are concrete: photos, notes, next steps.</p>
        </CardContent>
      </Card>

      <Card className="border-border/70">
        <CardHeader>
          <CardTitle className="text-base">Without it</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Messages travel through layers, and meaning drifts.</p>
          <p>Small misses compound into schedule and cost surprises.</p>
          <p>Progress is unclear until it’s too late to correct.</p>
        </CardContent>
      </Card>
    </div>
  );
}
