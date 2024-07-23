import "@/assets/styles/globals.scss";
import { Providers } from "@/providers";
import type { Metadata } from "next";
import type { Viewport } from "next";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-worksans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Emojinn",
  description: "Emojinn bot App",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  userScalable: false,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${workSans.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
