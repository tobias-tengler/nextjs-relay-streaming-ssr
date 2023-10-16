/**
 * @generated SignedSource<<5faa061fe85279da05566f58abe13614>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type page2Query$variables = {};
export type page2Query$data = {
  readonly lazyContentd: string;
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
    "name": "lazyContentd",
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
    "cacheID": "68d614a972f4e54c2d108b2eccf6bdcb",
    "id": null,
    "metadata": {},
    "name": "page2Query",
    "operationKind": "query",
    "text": "query page2Query {\n  lazyContentd\n}\n"
  }
};
})();

(node as any).hash = "0c227c16c4d73dacdefe1de4b6f9db40";

export default node;
