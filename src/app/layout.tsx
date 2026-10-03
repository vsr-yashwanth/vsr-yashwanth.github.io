import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SystemProvider } from "@/context/SystemContext";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/footer/Footer";
import CommandPalette from "@/components/navigation/CommandPalette";
import CustomCursor from "@/components/ui/CustomCursor";
import DebugOverlay from "@/components/ui/DebugOverlay";
import EntryScreen from "@/components/ui/EntryScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Silver Quill — AI, Software, Research & Experiments",
  description:
    "Personal digital laboratory, engineering archive, and research notebook of Vangala Sreeram Yashwanth (Silver Quill). Dual-degree CS & Data Science @ SRM IST × IIT Madras.",
  keywords: [
    "Silver Quill",
    "Vangala Sreeram Yashwanth",
    "Computer Vision",
    "YOLO26n-Seg",
    "Post-Training Quantization",
    "Kiroshi",
    "Whisp Mesh Network",
    "QuantaFeat",
    "IIT Madras",
    "SRM IST",
    "Deep Learning",
    "Systems Engineering",
  ],
  authors: [{ name: "Vangala Sreeram Yashwanth (Silver Quill)" }],
  creator: "Silver Quill",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vsr-yashwanth.github.io",
    title: "Silver Quill — AI, Software, Research & Experiments",
    description:
      "Interactive digital identity, engineering laboratory, project archive, and research notebook of Vangala Sreeram Yashwanth.",
    siteName: "Silver Quill Digital Lab",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silver Quill — AI, Software, Research & Experiments",
    description:
      "Interactive digital identity, engineering laboratory, project archive, and research notebook of Vangala Sreeram Yashwanth.",
    creator: "@vsryashwanth",
  },
};

export const viewport: Viewport = {
  themeColor: "#07090e",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#07090e] text-[#edf2f7] antialiased selection:bg-[#ff8c37] selection:text-black">
        <SystemProvider>
          <SmoothScroll>
            <CustomCursor />
            <EntryScreen />
            <CommandPalette />
            <DebugOverlay />
            <Navbar />
            <main className="min-h-screen flex flex-col">{children}</main>
            <Footer />
          </SmoothScroll>
        </SystemProvider>
      </body>
    </html>
  );
}
