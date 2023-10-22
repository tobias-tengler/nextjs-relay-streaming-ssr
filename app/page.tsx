"use client";

import { pageFragment$key } from "@/__generated__/pageFragment.graphql";
import { pageQuery } from "@/__generated__/pageQuery.graphql";
import Link from "next/link";
import { Suspense, use } from "react";
import { graphql, useFragment, useLazyLoadQuery } from "react-relay";

export default function Home() {
  return (
    <div>
      <MainContent />
      <div style={{ marginTop: 20 }}>
        <Link href="/lazy">Go to page loading slow data</Link>
      </div>
    </div>
  );
}

function MainContent() {
  const data = useLazyLoadQuery<pageQuery>(
    graphql`
      query pageQuery {
        mainContent
        ...pageFragment @defer
      }
    `,
    {}
  );

  return (
    <>
      <main>Main data: {data.mainContent}</main>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyContent queryRef={data} />
      </Suspense>
    </>
  );
}

function LazyContent({ queryRef }: { queryRef: pageFragment$key }) {
  const data = useFragment(
    graphql`
      fragment pageFragment on Query {
        lazyContent
      }
    `,
    queryRef
  );

  return <div>Slow data: {data.lazyContent}</div>;
}
