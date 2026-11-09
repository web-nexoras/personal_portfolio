import { routing } from "@/i18n/routing";

const baseUrl = "https://webnexoras.com";

export default function sitemap() {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, `${baseUrl}/${l}`]));
  const entries = routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    alternates: { languages },
  }));
  return entries;
}