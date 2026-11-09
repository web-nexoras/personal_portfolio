export const locales = [
  "en",
  "bn",
  "hi",
  "ar",
  "es",
  "fr",
  "de",
  "pt",
  "ru",
  "zh",
  "ja",
  "tr",
  "id",
  "ur",
];

export const defaultLocale = "en";

export const rtlLocales = ["ar", "ur"];

export function isRtl(locale) {
  return rtlLocales.includes(locale);
}