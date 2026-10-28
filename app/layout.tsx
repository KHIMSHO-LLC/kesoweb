import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://keso-rooms-within.vercel.app"),
  title: "Rooms Within — Keso | A Collection of Inner Worlds",
  description:
    "An artistic sanctuary and portfolio by Danish/Georgian visual artist Keso. Featuring paintings, visual poetry, notebook sketches, and exhibitions at Barnab Gallery.",
  keywords: [
    "Keso",
    "Rooms Within",
    "Barnab Gallery",
    "Kutaisi art",
    "Danish Georgian artist",
    "Contemporary painting",
    "Art posters",
  ],
  authors: [{ name: "Keso" }],
  openGraph: {
    title: "Rooms Within — Keso | A Collection of Inner Worlds",
    description:
      "Step inside the inner worlds of Keso. Contemporary paintings, sketches, and exhibitions.",
    images: ["/paintings/edge-of-the-universe.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Inter:wght@300;400;500;600&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0a0f1d] text-[#F5F2EB] antialiased selection:bg-amber-300 selection:text-stone-950">
        {children}
      </body>
    </html>
  );
}
