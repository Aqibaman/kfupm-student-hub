import "./globals.css";
import type { Metadata } from "next";
import { PwaProvider } from "@/components/pwa-provider";
import { appTitle } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: appTitle,
  description: "Prototype student services platform for KFUPM students.",
  manifest: "/manifest.webmanifest",
  applicationName: appTitle,
  icons: {
    icon: "/KFUPM.svg",
    apple: "/KFUPM.svg"
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Student Hub"
  },
  formatDetection: {
    telephone: false
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0d573f"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <PwaProvider />
        {children}
      </body>
    </html>
  );
}
