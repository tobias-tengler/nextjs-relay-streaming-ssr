/**
 * @generated SignedSource<<9622115cecfda744912de0d3e76e5626>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type page2Query$variables = Record<PropertyKey, never>;
export type page2Query$data = {
  readonly lazyContent: string;
};
export type page2Query = {
  response: page2Query$data;
  variables: page2Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "lazyContent",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "page2Query",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "page2Query",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "b3464275cdd165fa580a6dc0cb433781",
    "id": null,
    "metadata": {},
    "name": "page2Query",
    "operationKind": "query",
    "text": "query page2Query {\n  lazyContent\n}\n"
  }
};
})();

(node as any).hash = "0ca9ac8ff2105e94a178271a44b62c7a";

export default node;
