import "@/assets/styles/globals.scss";
import { Providers } from "@/providers";
import type { Metadata } from "next";
import { Inter, Ultra } from "next/font/google";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ultra = Ultra({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-ultra",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Telegram bot App",
  description: "Telegram bot App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${ultra.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
