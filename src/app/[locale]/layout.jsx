import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
import { siteConfig } from "@/lib/site-config";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: "Meta" });
  const title = t("title");
  const description = t("description");

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title: { default: title, template: `%s | ${siteConfig.brand}` },
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title,
      description,
      url: siteConfig.siteUrl,
      siteName: siteConfig.brand,
      locale: "en_US",
      type: "website",
      images: [{ url: "/assets/profile.jpg", width: 1200, height: 630, alt: siteConfig.brand }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/profile.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({ children, params: { locale } }) {
  if (!routing.locales.includes(locale)) notFound();

  const messages = await getMessages();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.brand,
    url: siteConfig.siteUrl,
    description: messages?.Meta?.description,
    inLanguage: "en",
    email: siteConfig.email,
    telephone: siteConfig.phone,
  };

  return (
    <html lang="en" dir="ltr">
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
