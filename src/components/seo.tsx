import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
};

function upsertMetaNameTag(name: string, content: string) {
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

function upsertMetaPropertyTag(property: string, content: string) {
  const existing = document.querySelector(
    `meta[property="${property}"]`,
  ) as HTMLMetaElement | null;
  if (existing) {
    existing.content = content;
    return;
  }

  const meta = document.createElement("meta");
  meta.setAttribute("property", property);
  meta.content = content;
  document.head.appendChild(meta);
}

function upsertLinkTag(rel: string, href: string) {
  const existing = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (existing) {
    existing.href = href;
    return;
  }

  const link = document.createElement("link");
  link.rel = rel;
  link.href = href;
  document.head.appendChild(link);
}

export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    const siteName = "BridgePoint Israel";
    const baseUrl = "https://bridgepointisrael.com";

    document.title = title;
    upsertMetaNameTag("description", description);

    const canonicalUrl = (() => {
      try {
        return new URL(window.location.pathname + window.location.search, baseUrl).toString();
      } catch {
        return baseUrl;
      }
    })();

    upsertLinkTag("canonical", canonicalUrl);

    upsertMetaPropertyTag("og:type", "website");
    upsertMetaPropertyTag("og:site_name", siteName);
    upsertMetaPropertyTag("og:title", title);
    upsertMetaPropertyTag("og:description", description);
    upsertMetaPropertyTag("og:url", canonicalUrl);

    upsertMetaNameTag("twitter:card", "summary_large_image");
    upsertMetaNameTag("twitter:title", title);
    upsertMetaNameTag("twitter:description", description);
  }, [title, description]);

  return null;
}
