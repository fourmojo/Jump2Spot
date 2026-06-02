import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jump2Spot — GPS Story Atlas",
  description: "Discover what happened where you're standing.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>{children}</body>
    </html>
  );
}
