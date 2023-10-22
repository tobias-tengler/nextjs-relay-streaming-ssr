import { meros } from "meros/browser";
import { Environment, Network, RecordSource, Store, FetchFunction, Observable, GraphQLResponse, Observer } from "relay-runtime";

const IS_SERVER = typeof window === "undefined";

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

function createRelayEnvironment(observer?: Observer<GraphQLResponse>) {
  const curriedFetchFn: FetchFunction = (...args) => {
    const observable = fetchFn(...args);

    if (observer && "subscribe" in observable) {
      observable.subscribe(observer);
    }

    return observable;
  };

  return new Environment({
    network: Network.create(curriedFetchFn),
    store: new Store(new RecordSource()),
    isServer: IS_SERVER,
  });
}

let relayEnvironment: Environment | undefined;

export function initRelayEnvironment(observer?: Observer<GraphQLResponse>) {
  const environment = relayEnvironment ?? createRelayEnvironment(observer);

  // For SSG and SSR always create a new Relay environment.
  if (IS_SERVER) {
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
