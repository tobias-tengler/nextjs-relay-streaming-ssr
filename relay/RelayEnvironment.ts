import { Environment, Network, RecordSource, Store, FetchFunction, Observable, GraphQLResponse, Observer, RequestParameters, Variables, ReplaySubject } from "relay-runtime";
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment";

// TODO: Errors aren't yet handled correctly

export type QueryResponsePayload = {
  queryId: string;
  response: GraphQLResponse;
};

/**
 * Creates a Relay envirionment, while also re-publishing all the responses
 * received from the network layer to the provided observer.
 *
 * @param observer An observer that receives the incremental GraphQL responses.
 * @returns The server-side Relay environment.
 */
export function createServerSideRelayEnvironment(observer: Observer<QueryResponsePayload>) {
  console.log("create server-side environment");

  const curriedFetchFn: FetchFunction = (request, variables, ...rest) => {
    const queryId = buildQueryId(request, variables);
    const observable = fetchFn(request, variables, ...rest);

    if (isRelayObservable(observable)) {
      return observable.do({
        next(response) {
          observer.next?.({
            queryId,
            response,
          });
        },
      });
    }

    return observable;
  };

  return new Environment({
    network: Network.create(curriedFetchFn),
    store: new Store(new RecordSource()),
    isServer: true,
  });
}

type ResolveReplaySubject = (queryId: string) => ReplaySubject<GraphQLResponse> | null;

let clientSideRelayEnvironment: RelayModernEnvironment | null = null;

/**
 * Creates a Relay Environment, while hydrating the Relay store with the responses
 * that were previously received from the server.
 *
 * @param resolveReplaySubject A function used to produce a ReplaySubject for a given queryId.
 * @returns The client-side Relay environment.
 */
export function createClientSideRelayEnvironment(resolveReplaySubject: ResolveReplaySubject) {
  if (clientSideRelayEnvironment) {
    return clientSideRelayEnvironment;
  }

  console.log("create client-side environment");

  const curriedFetchFn: FetchFunction = (request, variables, ...rest) => {
    const queryId = buildQueryId(request, variables);

    // This returns a ReplaySubject, if responses were added to the window.
    const replaySubject = resolveReplaySubject(queryId);

    if (replaySubject) {
      // Replay all responses to the observable that is returned to Relay.
      return Observable.create<GraphQLResponse>((sink) => replaySubject.subscribe(sink));
    }

    // If we don't have hydration responses, execute the request as usual.
    return fetchFn(request, variables, ...rest);
  };

  clientSideRelayEnvironment = clientSideRelayEnvironment = new Environment({
    network: Network.create(curriedFetchFn),
    store: new Store(new RecordSource()),
    log: (event) => console.log(event),
  });

  return clientSideRelayEnvironment;
}

const fetchFn: FetchFunction = (operation, variables) => {
  return getNetworkObservable(operation, variables);
};

// This simulates that the fragment with the `lazyContent` field was being deferred by the server,
// and is being delivered incrementally.
function getNetworkObservable(operation: RequestParameters, variables: Variables) {
  console.log("execute query", operation.name);

  return Observable.create<GraphQLResponse>((sink) => {
    (async () => {
      if (operation.name === "SlowContentLoaderQuery") {
        await sleep(1500);

        console.log("received lazyContent from Back-End");

        sink.next({
          data: {
            lazyContent: new Date().getTime(),
          },
        });
        sink.complete();
        return;
      }

      await sleep(2000);

      console.log("received mainContent from Back-End");

      // Send the maincontent.
      sink.next({
        data: {
          mainContent: new Date().getTime(),
        },
        // @ts-expect-error
        hasNext: true,
      });

      await sleep(2000);

      console.log("received deferred lazyContent from Back-End");

      // Stream in the lazy content.
      sink.next({
        data: {
          lazyContent: new Date().getTime(),
        },
        path: [],
        label: "MainContentQuery$defer$SlowContent",
        // @ts-expect-error
        hasNext: false,
      });

      sink.complete();
    })();
  });
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildQueryId(request: RequestParameters, variables: Variables) {
  const queryId = request.id ?? request.name;

  return `${queryId}:${JSON.stringify(variables)}`;
}

function isRelayObservable(obj: any): obj is Observable<GraphQLResponse> {
  return obj instanceof Observable;
}
