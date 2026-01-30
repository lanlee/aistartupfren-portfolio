import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lan 🌊 AI startup fren",
  description: "AI startup tips, SEO/AEO/GEO guides, and startup consulting services",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
