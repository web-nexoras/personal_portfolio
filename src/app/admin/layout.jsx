import "../globals.css";

export const metadata = {
  robots: { index: false, follow: false },
  title: "Admin — Web_Nexoras",
};

export default function AdminRootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <body
        className="font-body antialiased"
        style={{ background: "hsl(var(--background))", color: "hsl(var(--foreground))", margin: 0 }}
      >
        {children}
      </body>
    </html>
  );
}
