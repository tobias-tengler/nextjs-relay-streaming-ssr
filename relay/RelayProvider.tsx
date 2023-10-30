"use client";

import { QueryResponsePayload, createServerSideRelayEnvironment, createClientSideRelayEnvironment } from "@/relay/RelayEnvironment";
import { useServerInsertedHTML } from "next/navigation";
import { ReactNode, useRef, useMemo } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { GraphQLResponse, ReplaySubject } from "relay-runtime";

const RELAY_WINDOW_PREFIX = `__RELAY`;

interface RelayProviderProps {
  children: ReactNode;
}

export function RelayProvider({ children }: RelayProviderProps) {
  const responseStream = useRef<QueryResponsePayload[]>([]);

  const relayEnvironment = useMemo(() => {
    if (typeof window === "undefined") {
      return createServerSideRelayEnvironment({
        // On the server, we push responses into the response stream.
        next: (response) => responseStream.current.push(response),
      });
    } else {
      return createClientSideRelayEnvironment(resolveReplaySubject);
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
    const responses = responseStream.current;

    if (responses.length === 0) {
      return null;
    }

    const responsesPerQuery = responses.reduce<Record<string, GraphQLResponse[]>>((acc, payload) => {
      acc[payload.queryId] = acc[payload.queryId] || [];
      acc[payload.queryId].push(payload.response);
      return acc;
    }, {});

    const scriptContent: string[] = [];

    for (const queryId in responsesPerQuery) {
      const windowId = buildWindowId(queryId);
      const serializedResponses = responsesPerQuery[queryId].map((payload) => JSON.stringify(payload)).join(",");

      scriptContent.push(`window["${windowId}"] = window["${windowId}"] || [];`);
      scriptContent.push(`window["${windowId}"].push(${serializedResponses});`);
    }

    responses.length = 0;

    return (
      <script
        key={scriptIndex.current++}
        dangerouslySetInnerHTML={{
          __html: scriptContent.join(""),
        }}
      />
    );
  });

  return <RelayEnvironmentProvider environment={relayEnvironment}>{children}</RelayEnvironmentProvider>;
}

function resolveReplaySubject(queryId: string) {
  const win = window as any;
  const windowId = buildWindowId(queryId);

  const responses: GraphQLResponse[] = Array.isArray(win[windowId]) ? win[windowId] : [];

  if (responses.length < 1) {
    return null;
  }

  const replaySubject = new ReplaySubject<GraphQLResponse>();

  function replayResponse(response: GraphQLResponse) {
    console.log("replaying response of", queryId, response);

    replaySubject.next(response);

    if (!("hasNext" in response) || !response.hasNext) {
      console.log("complete replay of", queryId);
      replaySubject.complete();

      delete win[windowId];
    }
  }

  function handlePushResponses(responses: any) {
    if (Array.isArray(responses)) {
      for (const response of responses) {
        replayResponse(response);
      }
    } else {
      replayResponse(responses);
    }
  }

  // Replay the responses we got from the window.
  handlePushResponses(responses);

  // Setup a listener for responses that are pushed onto the window
  // by script tags that are being inserted later.
  win[windowId] = {
    push: handlePushResponses,
  };

  return replaySubject;
}

function buildWindowId(queryId: string) {
  return RELAY_WINDOW_PREFIX + "_" + queryId;
}
