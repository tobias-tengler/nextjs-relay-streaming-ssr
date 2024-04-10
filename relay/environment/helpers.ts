import {
  RequestParameters,
  Variables,
  Observable,
  GraphQLResponse,
} from "relay-runtime";

export function buildQueryId(request: RequestParameters, variables: Variables) {
  const queryId = request.id ?? request.name;

  return `${queryId}:${JSON.stringify(variables)}`;
}

export const RELAY_WINDOW_KEY = `__RELAY`;

export function hasHydrationResponses() {
  return RELAY_WINDOW_KEY in window;
}

export function isRelayObservable(
  obj: any
): obj is Observable<GraphQLResponse> {
  return obj instanceof Observable;
}
