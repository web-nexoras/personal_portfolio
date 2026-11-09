import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { isRtl } from "@/i18n/config";
import { Space_Grotesk, Rajdhani, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { siteConfig } from "@/lib/site-config";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-space-grotesk", display: "swap" });
const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-rajdhani", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains-mono", display: "swap" });

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
  const fontVars = [spaceGrotesk.variable, rajdhani.variable, jetbrainsMono.variable];

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