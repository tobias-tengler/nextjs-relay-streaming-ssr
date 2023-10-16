import { meros } from "meros/browser";
import { Environment, Network, RecordSource, Store, FetchFunction, Observable } from "relay-runtime";

const HTTP_ENDPOINT = "http://localhost:5095/graphql";

const fetchFn: FetchFunction = (operation, variables) => {
  return Observable.create((sink) => {
    const body = {
      id: operation.id ?? undefined,
      query: operation.text ?? undefined,
      variables,
    };

    const init: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/graphql-response+json;charset=utf-8, multipart/mixed;charset=utf-8",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    };

    (async () => {
      const request = new Request(HTTP_ENDPOINT, init);

      try {
        const response = await fetch(request);

        // Status code in range 200-299 inclusive (2xx).
        if (response.ok) {
          try {
            const parts = await meros<object>(response);

            if (isAsyncIterable(parts)) {
              for await (const part of parts) {
                if (!part.json) {
                  sink.error(new Error("Response contained a non-JSON part. This is not supported. Please ensure that the server is configured to return JSON responses."));
                  break;
                }

                // If any exceptions occurred when processing the request,
                // throw an error to indicate to the developer what went wrong.
                if ("errors" in part.body) {
                  sink.error(new Error("Initial response contained errors"));
                  break;
                }

                console.log("received part", part.body);

                if ("data" in part.body) {
                  sink.next(part.body);
                }

                if ("incremental" in part.body) {
                  for (const chunk of part.body.incremental) {
                    if ("data" in chunk) {
                      sink.next({
                        ...chunk,
                        hasNext: part.body.hasNext,
                      });
                    } else {
                      if (chunk.items) {
                        // All but the non-final path segments refers to the location
                        // of the list field containing the `@stream` directive.
                        // The final segment of the path list is an integer.
                        //
                        // Note: We must "copy" to avoid mutations.
                        const location = chunk.path.slice(0, -1);
                        let index = chunk.path.at(-1);

                        for (const item of chunk.items) {
                          sink.next({
                            ...chunk,
                            path: location.concat(index++),
                            data: item,
                            hasNext: part.body.hasNext,
                          });
                        }
                      } else {
                        sink.next({
                          ...chunk,
                          data: chunk.items,
                          hasNext: part.body.hasNext,
                        });
                      }
                    }
                  }
                }
              }
            } else {
              const json = await response.json();

              // If any exceptions occurred when processing the request,
              // throw an error to indicate to the developer what went wrong.
              if ("errors" in json) {
                sink.error(new Error("There were errors"));
              } else {
                // DEMO: delay response
                // await pause(2_000);

                sink.next(json);
              }
            }

            sink.complete();
          } catch (err) {
            sink.error(new Error("Uncaught error"), true);
          }
        } else {
          sink.error(new Error("error during fetch"));
        }
      } catch (err) {
        sink.error(new Error("Faield to fetch"), true);
      }
    })();
  });
};

function createRelayEnvironment() {
  console.log("create env");
  return new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
    isServer: typeof window === "undefined",
  });
}

let relayEnvironment: Environment | undefined;

export function initRelayEnvironment() {
  const environment = relayEnvironment ?? createRelayEnvironment();

  // For SSG and SSR always create a new Relay environment.
  if (typeof window === "undefined") {
    return environment;
  }

  // Create the Relay environment once in the client
  // and then reuse it.
  if (!relayEnvironment) {
    relayEnvironment = environment;
  }

  return relayEnvironment;
}

function isAsyncIterable(input: unknown): input is AsyncIterable<unknown> {
  return (
    typeof input === "object" &&
    input !== null &&
    // Some browsers still don't have Symbol.asyncIterator implemented (iOS Safari)
    // That means every custom AsyncIterable must be built using a AsyncGeneratorFunction (async function * () {})
    ((input as any)[Symbol.toStringTag] === "AsyncGenerator" || Symbol.asyncIterator in input)
  );
}
