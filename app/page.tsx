import Link from "next/link";
import { MainContent } from "./MainContent";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div>
      <MainContent />

      <div className="mt-10">
        <Link href="/lazy">Visit (potentially) cached page ➡️</Link>
      </div>
    </div>
  );
}
