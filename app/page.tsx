import Users from "components/table";
import TablePlaceholder from "components/table-placeholder";
import Image from "next/image";
import { Suspense } from "react";
import ErrorBoundary from "views/home/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <main className="flex min-h-screen flex-col items-center p-24">
        <div className="relative place-items-center">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
            src="/next.svg"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
        <div className="mt-10 w-full">
          <Suspense fallback={<TablePlaceholder />}>
            {/* @ts-expect-error Async Server Component */}
            <Users />
          </Suspense>
        </div>
      </main>
    </ErrorBoundary>
  );
}
