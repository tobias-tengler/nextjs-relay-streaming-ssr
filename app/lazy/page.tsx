"use client";

import { page2Query } from "@/app/lazy/__generated__/page2Query.graphql";
import Link from "next/link";
import { graphql, useLazyLoadQuery } from "react-relay";

export default function LazyPage() {
  const data = useLazyLoadQuery<page2Query>(
    graphql`
      query page2Query {
        lazyContent
      }
    `,
    {}
  );
  return (
    <div>
      Slow data: {data.lazyContent}
      <div style={{ marginTop: 20 }}>
        <Link href="/">Go back home</Link>
      </div>
    </div>
  );
}
