import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const locales = [
  "en", "bn", "hi", "ar", "es", "fr", "de", "pt", "ru", "zh", "ja", "tr", "id", "ur",
];

export const defaultLocale = "en";

export const rtlLocales = ["ar", "ur"];

export function isRtl(locale) {
  return rtlLocales.includes(locale);
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = (await requestLocale) || defaultLocale;
  if (!locales.includes(locale)) notFound();
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});