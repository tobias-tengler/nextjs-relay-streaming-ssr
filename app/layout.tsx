"use client";

import { ReactNode } from "react";
import "./globals.css";
import { RelayProvider } from "@/relay/RelayProvider";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RelayProvider>{children}</RelayProvider>
      </body>
    </html>
  );
}
