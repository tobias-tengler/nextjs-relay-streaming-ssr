import { SlowContentLoader } from "@/app/lazy/SlowContentLoader";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function LazyPage() {
  return (
    <div>
      <SlowContentLoader />

      <div className="mt-10">
        <Link href="/">⬅️ Go back home</Link>
      </div>
    </div>
  );
}
