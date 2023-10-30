/**
 * @generated SignedSource<<925f9c108623180846e887a327863d97>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SlowContentLoaderQuery$variables = Record<PropertyKey, never>;
export type SlowContentLoaderQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SlowContent">;
};
export type SlowContentLoaderQuery = {
  response: SlowContentLoaderQuery$data;
  variables: SlowContentLoaderQuery$variables;
};

const node: ConcreteRequest = {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SlowContentLoaderQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "SlowContent"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SlowContentLoaderQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "lazyContent",
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "70469ef0eefca71291fccb355bda6247",
    "id": null,
    "metadata": {},
    "name": "SlowContentLoaderQuery",
    "operationKind": "query",
    "text": "query SlowContentLoaderQuery {\n  ...SlowContent\n}\n\nfragment SlowContent on Query {\n  lazyContent\n}\n"
  }
};

(node as any).hash = "92535a959475e61d330431119688d878";

export default node;
