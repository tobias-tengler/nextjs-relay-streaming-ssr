/**
 * @generated SignedSource<<f74250aec40794b605d6cd7d1865789c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MainContentQuery$variables = Record<PropertyKey, never>;
export type MainContentQuery$data = {
  readonly mainContent: string;
  readonly " $fragmentSpreads": FragmentRefs<"SlowContent">;
};
export type MainContentQuery = {
  response: MainContentQuery$data;
  variables: MainContentQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mainContent",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MainContentQuery",
    "selections": [
      (v0/*: any*/),
      {
        "kind": "Defer",
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SlowContent"
          }
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MainContentQuery",
    "selections": [
      (v0/*: any*/),
      {
        "if": null,
        "kind": "Defer",
        "label": "MainContentQuery$defer$SlowContent",
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lazyContent",
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "c9a5d781e3f37b3b4090f86fad16286b",
    "id": null,
    "metadata": {},
    "name": "MainContentQuery",
    "operationKind": "query",
    "text": "query MainContentQuery {\n  mainContent\n  ...SlowContent @defer(label: \"MainContentQuery$defer$SlowContent\")\n}\n\nfragment SlowContent on Query {\n  lazyContent\n}\n"
  }
};
})();

(node as any).hash = "f4f5a8a9285bce76c42eef1c51cc5903";

export default node;
