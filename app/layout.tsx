import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lan 🌊 AI startup fren",
  description: "AI startup tips, SEO/AEO/GEO guides, and startup consulting services",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
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
