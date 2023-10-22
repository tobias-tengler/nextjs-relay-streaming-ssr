/**
 * @generated SignedSource<<01f703e1642c51a8de0295af357ead2d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type pageQuery$variables = Record<PropertyKey, never>;
export type pageQuery$data = {
  readonly mainContent: string;
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
  "name": "mainContent",
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
            "name": "lazyContent",
            "storageKey": null
          }
        ]
      }
    ]
  },
  "params": {
    "cacheID": "325869ac05b5766692ab4fcbad53c121",
    "id": null,
    "metadata": {},
    "name": "pageQuery",
    "operationKind": "query",
    "text": "query pageQuery {\n  mainContent\n  ...pageFragment @defer(label: \"pageQuery$defer$pageFragment\")\n}\n\nfragment pageFragment on Query {\n  lazyContent\n}\n"
  }
};
})();

(node as any).hash = "ff3bfbfcf20b2a33aacb9a521e435b7c";

export default node;
