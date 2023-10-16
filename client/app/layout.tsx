"use client";

import { useMemo } from "react";
import "./globals.css";
import { initRelayEnvironment } from "@/src/RelayEnvironment";
import { RelayEnvironmentProvider } from "react-relay";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  console.log("render layout");
  const env = useMemo(() => initRelayEnvironment(), []);

  return (
    <html lang="en">
      <RelayEnvironmentProvider environment={env}>
        <body>{children}</body>
      </RelayEnvironmentProvider>
    </html>
  );
}
