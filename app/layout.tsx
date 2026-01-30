import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "aistartupfren - Your AI Founder Fren",
  description: "AI startup tips, SEO guides, and consulting services",
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
