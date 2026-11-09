import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { isRtl } from "@/i18n/config";
import { Space_Grotesk, Rajdhani, JetBrains_Mono } from "next/font/google";
import { Noto_Sans, Noto_Sans_Bengali, Noto_Sans_Arabic, Noto_Sans_Devanagari, Noto_Sans_SC, Noto_Sans_JP } from "next/font/google";
import "../globals.css";
import { siteConfig } from "@/lib/site-config";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-space-grotesk", display: "swap" });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-rajdhani", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains-mono", display: "swap" });

const notoSans = Noto_Sans({ subsets: ["latin", "cyrillic", "latin-ext"], weight: ["400", "500", "600", "700"], variable: "--font-noto-sans", display: "swap" });
const notoBengali = Noto_Sans_Bengali({ subsets: ["bengali"], weight: ["400", "500", "600", "700"], variable: "--font-noto-bengali", display: "swap" });
const notoArabic = Noto_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-noto-arabic", display: "swap" });
const notoDevanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], weight: ["400", "500", "600", "700"], variable: "--font-noto-devanagari", display: "swap" });
const notoSC = Noto_Sans_SC({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-noto-sc", display: "swap" });
const notoJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-noto-jp", display: "swap" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "Meta" });
  const title = t("title");
  const description = t("description");
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}`])
  );
  languages["x-default"] = "/en";

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: { default: title, template: `%s | ${siteConfig.brand}` },
    description,
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.siteUrl}/${locale}`,
      siteName: siteConfig.brand,
      locale,
      alternateLocale: routing.locales.filter((l) => l !== locale),
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: siteConfig.brand }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params: { locale } }) {
  if (!routing.locales.includes(locale)) notFound();

  const messages = await getMessages();
  const rtl = isRtl(locale);
  const fontVars = [
    spaceGrotesk.variable,
    rajdhani.variable,
    jetbrainsMono.variable,
    notoSans.variable,
  ];
  if (locale === "bn") fontVars.push(notoBengali.variable);
  if (locale === "ar" || locale === "ur") fontVars.push(notoArabic.variable);
  if (locale === "hi") fontVars.push(notoDevanagari.variable);
  if (locale === "zh") fontVars.push(notoSC.variable);
  if (locale === "ja") fontVars.push(notoJP.variable);
  if (locale === "ru") fontVars.push(notoSans.variable);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.brand,
    url: `${siteConfig.siteUrl}/${locale}`,
    description: messages?.Meta?.description,
    inLanguage: locale,
    availableLanguage: routing.locales,
    email: siteConfig.email,
    telephone: siteConfig.phone,
  };

  return (
    <html lang={locale} dir={rtl ? "rtl" : "ltr"} className={fontVars.join(" ")}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-body antialiased" style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}