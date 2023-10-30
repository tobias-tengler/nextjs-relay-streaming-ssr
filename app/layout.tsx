import type { Metadata } from "next";
import "./globals.css";
import { RelayProvider } from "@/relay/RelayProvider";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Relay Streaming SSR ✨",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="p-10">
        <RelayProvider>{children}</RelayProvider>
      </body>
    </html>
  );
}
