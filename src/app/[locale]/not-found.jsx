import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("Common");
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>404</h1>
      <p>{t("error")}</p>
    </div>
  );
}