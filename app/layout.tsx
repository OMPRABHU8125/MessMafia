import type { Metadata, Viewport } from "next";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mess Mafia — College Canteen Pre-Order",
  description: "Pre-order your college canteen food before break time and skip the queues.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Mess Mafia",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0f1115",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#0f1115]">
        <SessionProviderWrapper>
          <CartProvider>
            {children}
          </CartProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}


