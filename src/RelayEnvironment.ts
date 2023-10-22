import { meros } from "meros/browser";
import { Environment, Network, RecordSource, Store, FetchFunction, Observable } from "relay-runtime";

const fetchFn: FetchFunction = (operation, variables) => {
  return Observable.create((sink) => {
    if (operation.name === "page2Query") {
      sink.next({
        data: {
          lazyContent: new Date().getTime(),
        },
      });
      sink.complete();
      return;
    }

    (async () => {
      await sleep(2000);

      sink.next({
        data: {
          mainContent: new Date().getTime(),
        },
        // @ts-expect-error
        hasNext: true,
      });

      await sleep(2000);

      sink.next({
        data: {
          lazyContent: new Date().getTime(),
        },
        path: [],
        label: "pageQuery$defer$pageFragment",
        // @ts-expect-error
        hasNext: false,
      });

      sink.complete();
    })();
  });
};

function createRelayEnvironment() {
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

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
