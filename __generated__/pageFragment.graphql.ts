/**
 * @generated SignedSource<<17af70e6a9f8f2c76768b68dee46c577>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type pageFragment$data = {
  readonly lazyContent: string;
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
      "name": "lazyContent",
      "storageKey": null
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "f3b399fb26166df660e70975d174fbca";

export default node;
