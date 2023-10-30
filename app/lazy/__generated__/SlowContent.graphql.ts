/**
 * @generated SignedSource<<dfc02de436cb9df456bf21989f506d43>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SlowContent$data = {
  readonly lazyContent: string;
  readonly " $fragmentType": "SlowContent";
};
export type SlowContent$key = {
  readonly " $data"?: SlowContent$data;
  readonly " $fragmentSpreads": FragmentRefs<"SlowContent">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SlowContent",
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

(node as any).hash = "648919c121973187085d816c2a20edce";

export default node;
