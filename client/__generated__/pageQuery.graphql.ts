/**
 * @generated SignedSource<<ad28eb9e48a5b12a64a6fcaf8a6101c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type pageQuery$variables = {};
export type pageQuery$data = {
  readonly mainContentd: string;
  readonly " $fragmentSpreads": FragmentRefs<"pageFragment">;
};
export type pageQuery = {
  response: pageQuery$data;
  variables: pageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mainContentd",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "pageQuery",
    "selections": [
      (v0/*: any*/),
      {
        "kind": "Defer",
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "pageFragment"
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
    "name": "pageQuery",
    "selections": [
      (v0/*: any*/),
      {
        "if": null,
        "kind": "Defer",
        "label": "pageQuery$defer$pageFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lazyContentd",
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "e659242cb82d5a2d6d5c51dcfdb44814",
    "id": null,
    "metadata": {},
    "name": "pageQuery",
    "operationKind": "query",
    "text": "query pageQuery {\n  mainContentd\n  ...pageFragment @defer(label: \"pageQuery$defer$pageFragment\")\n}\n\nfragment pageFragment on Query {\n  lazyContentd\n}\n"
  }
};
})();

(node as any).hash = "89478e48b031756a77ab712ff71ec4c8";

export default node;
