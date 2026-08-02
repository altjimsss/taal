import type { Metadata } from "next";
import { Inter, Playfair } from "next/font/google";
import "./globals.css";

const playfair = Playfair({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Taal — Heritage Town of the Philippines",
  description:
    "Preserved through time. Walk the ancestral streets and the grand Basilica. Some places are worth slowing down for.",
  openGraph: {
    title: "Taal — Heritage Town of the Philippines",
    description:
      "Preserved through time. Walk the ancestral streets and the grand Basilica. Some places are worth slowing down for.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="bg-ivory text-ink font-sans">
        {children}
      </body>
    </html>
  );
}