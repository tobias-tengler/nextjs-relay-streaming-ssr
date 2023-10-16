"use client";

import { page2Query } from "@/__generated__/page2Query.graphql";
import Link from "next/link";
import { graphql, useLazyLoadQuery } from "react-relay";

export default function LazyPage() {
  const data = useLazyLoadQuery<page2Query>(
    graphql`
      query page2Query {
        lazyContentd
      }
    `,
    {}
  );
  return (
    <div>
      Page: {data.lazyContentd}
      <div>
        <Link href="/">Home</Link>
      </div>
    </div>
  );
}
