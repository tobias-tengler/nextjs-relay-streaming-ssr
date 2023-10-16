"use client";

import { pageFragment$key } from "@/__generated__/pageFragment.graphql";
import { pageQuery } from "@/__generated__/pageQuery.graphql";
import Link from "next/link";
import { Suspense, use } from "react";
import { graphql, useFragment, useLazyLoadQuery } from "react-relay";

export default function Home() {
  console.log("render home");
  return (
    <div>
      <MainContent />
      <div>
        <Link href="/lazy">Lazy</Link>
      </div>
    </div>
  );
}

function MainContent() {
  console.log("render main content");
  const data = useLazyLoadQuery<pageQuery>(
    graphql`
      query pageQuery {
        mainContentd
        ...pageFragment @defer
      }
    `,
    {}
  );

  return (
    <>
      <main>{data.mainContentd}</main>
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
        lazyContentd
      }
    `,
    queryRef
  );

  return <div>{data.lazyContentd}</div>;
}
