import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
};

function upsertMetaTag(name: string, content: string) {
  const existing = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (existing) {
    existing.content = content;
    return;
  }

  const meta = document.createElement("meta");
  meta.name = name;
  meta.content = content;
  document.head.appendChild(meta);
}

export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    document.title = title;
    upsertMetaTag("description", description);
  }, [title, description]);

  return null;
}
