import {
  FetchFunction,
  RequestParameters,
  Variables,
  Observable,
  GraphQLResponse,
} from "relay-runtime";
import { Sink } from "relay-runtime/lib/network/RelayObservable";

export const fetchFn: FetchFunction = (operation, variables) => {
  return Observable.create<GraphQLResponse>((sink) => {
    (async () => {
      console.log("execute query", operation.name);

      await __simulateDeferredResponse(operation, variables, sink);
    })();
  });
};

async function __simulateDeferredResponse(
  operation: RequestParameters,
  variables: Variables,
  sink: Sink<GraphQLResponse>
) {
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
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
