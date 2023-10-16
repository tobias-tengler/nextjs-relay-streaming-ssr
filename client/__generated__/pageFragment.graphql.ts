/**
 * @generated SignedSource<<de7d2a7ad0da3760fee31b539226c9d4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type pageFragment$data = {
  readonly lazyContentd: string;
  readonly " $fragmentType": "pageFragment";
};
export type pageFragment$key = {
  readonly " $data"?: pageFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"pageFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "pageFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lazyContentd",
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "10516fea494004c4db1545d9e6bb783a";

export default node;
