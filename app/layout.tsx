"use client";

import { ReactNode, useEffect, useId, useMemo, useRef } from "react";
import "./globals.css";
import { initRelayEnvironment } from "@/src/RelayEnvironment";
import { RelayEnvironmentProvider } from "react-relay";
import { useServerInsertedHTML } from "next/navigation";
import { GraphQLResponse } from "relay-runtime";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RelayProvider>{children}</RelayProvider>
      </body>
    </html>
  );
}

interface RelayProviderProps {
  children: ReactNode;
}

function RelayProvider({ children }: RelayProviderProps) {
  const payloadStream = useRef<GraphQLResponse[]>([]);

  const env = useMemo(
    () =>
      initRelayEnvironment({
        next: (value) => payloadStream.current.push(value),
      }),
    []
  );

  const id = `__RELAY`;
  const scriptIndex = useRef(0);

  useServerInsertedHTML(() => {
    const payloads = payloadStream.current;

    if (payloads.length === 0) {
      return null;
    }

    console.log("insert payloads in html", payloads);

    const serializedPayloads = payloads.map((payload) => JSON.stringify(payload)).join(",");

    const html: Array<string> = [`window["${id}"] = window["${id}"] || [];`, `window["${id}"].push(${serializedPayloads});`, `console.log('pushed payloads onto window', ${serializedPayloads});`];

    payloads.length = 0;

    return (
      <script
        key={scriptIndex.current++}
        dangerouslySetInnerHTML={{
          __html: html.join(""),
        }}
      />
    );
  });

  useEffect(() => {
    const onPayloadsReceived = (payloads: GraphQLResponse[]) => {
      if (payloads.length < 1) {
        return;
      }

      console.log("read payloads from window", payloads);

      // TODO: Apply to Relay store somehow
    };

    const win = window as any;
    const payloads = win[id] ?? [];

    onPayloadsReceived(payloads);

    win[id] = {
      push: onPayloadsReceived,
    };

    return () => {
      win[id] = [];
    };
  }, [id]);

  return <RelayEnvironmentProvider environment={env}>{children}</RelayEnvironmentProvider>;
}
