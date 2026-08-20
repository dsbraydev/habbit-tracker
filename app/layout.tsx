import type { Metadata, Viewport } from "next";
import { Space_Grotesk } from "next/font/google";
import { HabitsProvider } from "@/lib/habits-context";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Habitus",
  description: "Build better habits. Become your best self.",
  appleWebApp: {
    capable: true,
    title: "Habitus",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#090812",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <HabitsProvider>{children}</HabitsProvider>
      </body>
    </html>
  );
}
