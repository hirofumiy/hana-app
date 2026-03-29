import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hana - 採用前特性テスト",
  description: "外国人スタッフの採用前特性テスト / Pre-hire Aptitude Test for Foreign Staff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50">{children}</body>
    </html>
  );
}
