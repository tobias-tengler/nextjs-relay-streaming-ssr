This Next.js 14 application showcases a proof-of-concept where React.js' streaming SSR infrastructure (Fizz) is being used in conjunction with GraphQL's `@defer` and the Relay.js GraphQL client to stream deferred GraphQL responses and the components rendering them to a client, all while hydrating Relay.js' store correctly.

## How it works

- All components using Relay are client components and the pages are using `export const dynamic = "force-dynamic";` to disable Next.js' caching. (If this example were to use an actual network layer, the fetch call inside of it would also have to have `{ cache: "no-store" }` to disable Next.js' `fetch` cache)
- During SSR we record (incremental) GraphQL responses that are being consumed through the Relay environment.
- We use Next.js' `useServerInsertedHTML` to insert script tags into the streamed HTML as Suspense boundaries unsuspend.
- The JavaScript inside these script tags contains the serialized GraphQL responses we recorded and pushes them into an array on the `window` object (scoped per query).
- During hydration Relay re-executes the queries that were already executed on the server.
- For each query we (synchronously without suspending) check if there are responses meant for hydration stored on the `window` object.
- If there aren't we execute the query as we normally would.
- If there are we create a `ReplaySubject`, return that from the Relay `FetchFunction` and write all the responses on the `window` object to that ReplaySubject.
- This will synchronously commit the responses into the Relay store, without suspending the initial queries.
- We also patch the `push` method on the window's array and for each `push` publish the pushed response through the `ReplaySubject`.
- If a GraphQL response has no `hasNext` property or it is false, we complete the `ReplaySubject` and cleanup the resources on the `window` object.

All relevant pieces can be found in the [/relay](./relay) directory.

## How to run

1. `yarn`
2. `yarn dev`
