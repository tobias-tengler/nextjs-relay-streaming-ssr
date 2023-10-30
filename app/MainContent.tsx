"use client";

import { MainContentQuery } from "@/app/__generated__/MainContentQuery.graphql";
import { Suspense, lazy } from "react";
import { graphql, useLazyLoadQuery } from "react-relay";

const SlowContentLazy = lazy(() => import("@/app/lazy/SlowContent"));

export function MainContent() {
  const data = useLazyLoadQuery<MainContentQuery>(
    graphql`
      query MainContentQuery {
        mainContent
        ...SlowContent @defer
      }
    `,
    {}
  );

  return (
    <>
      <main className="text-xl text-green-500">Main data: {data.mainContent}</main>

      <Suspense fallback={<div className="text-yellow-500">Loading slow data...</div>}>
        <SlowContentLazy queryRef={data} />
      </Suspense>
    </>
  );
}
