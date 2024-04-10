"use client";

import {
  createServerSideRelayEnvironment,
  createClientSideRelayEnvironment,
} from "@/relay/environment";
import { useStream } from "@/relay/useStream";
import { useServerInsertedHTML } from "next/navigation";
import { ReactNode, useRef, useMemo } from "react";
import { RelayEnvironmentProvider } from "react-relay";

interface RelayProviderProps {
  children: ReactNode;
}

export function RelayProvider({ children }: RelayProviderProps) {
  const { observer, buildHydrationScript } = useStream();

  const relayEnvironment = useMemo(() => {
    if (typeof window === "undefined") {
      return createServerSideRelayEnvironment(observer);
    } else {
      return createClientSideRelayEnvironment();
    }
  }, []);

  const scriptIndex = useRef(0);

  // This hook comes from Next.js and will execute the callback everytime,
  // something unsuspends, BUT before the piece that unsuspends is streamed to the client.
  // Whatever the callback returns will be inserted as HTML into the response stream.
  //
  // Our approach here is to insert script tags into the HTML that will push the GraphQL responses
  // we received on the server onto the global window object.
  // When the client is re-executing a query during hydration, it can then read the responses
  // belonging to a particular query form the window object and replay them into the Relay store.
  useServerInsertedHTML(() => {
    const hydrationScript = buildHydrationScript();

    if (!hydrationScript) {
      return null;
    }

    return (
      <script
        key={scriptIndex.current++}
        dangerouslySetInnerHTML={{
          __html: hydrationScript,
        }}
      />
    );
  });

  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      {children}
    </RelayEnvironmentProvider>
  );
}
