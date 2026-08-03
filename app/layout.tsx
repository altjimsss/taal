import type { Metadata } from "next";
import { Inter, Playfair } from "next/font/google";
import "./globals.css";
import TransitionProvider from "./components/transitions/TransitionProvider";
import GridLines from "./components/transitions/GridLines";
import NavbarWrapper from "./components/NavbarWrapper";
import TransitionLink from "./components/transitions/TransitionLink";

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
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable} antialiased`}
    >
      <body className="bg-ivory text-ink font-sans">
        <TransitionProvider>
          <GridLines />

          {/* ===== PERSISTENT NAVBAR ===== */}
          <NavbarWrapper>
            <div className="logo-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/taalmapicon.svg"
                alt="Taal map icon"
                className="logo-img"
              />
            </div>
            <div className="brand-name">
              TAAL
            </div>
            <nav className="nav-menu">
              <ul>
                <li><TransitionLink href="/">Home</TransitionLink></li>
                <li><TransitionLink href="/heritage">Heritage</TransitionLink></li>
                <li><TransitionLink href="/attractions">Attractions</TransitionLink></li>
                <li><TransitionLink href="/food">Food</TransitionLink></li>
                <li><TransitionLink href="/visit">Visit</TransitionLink></li>
              </ul>
            </nav>
          </NavbarWrapper>

          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
