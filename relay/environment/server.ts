import { fetchFn } from "@/relay/environment/fetchFn";
import { buildQueryId, isRelayObservable } from "@/relay/environment/helpers";
import {
  GraphQLResponse,
  Observer,
  FetchFunction,
  Environment,
  Network,
  Store,
  RecordSource,
} from "relay-runtime";

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
export function createServerSideRelayEnvironment(
  observer: Observer<QueryResponsePayload>
) {
  console.log("create server-side environment");

  const curriedFetchFn: FetchFunction = (request, variables, ...rest) => {
    const observable = fetchFn(request, variables, ...rest);

    if (isRelayObservable(observable)) {
      const queryId = buildQueryId(request, variables);

      // Re-emit the observable responses to the provided observer,
      // while still returning them to Relay itself.
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
