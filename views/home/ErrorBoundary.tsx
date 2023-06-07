"use client";

import ErrorBoundaryCore from "core/ErrorBoundary";
import { ComponentProps } from "types/next";

const ErrorBoundary = ({ children }: ComponentProps) => {
  return (
    <ErrorBoundaryCore
      fallback={
        <main className="flex min-h-screen flex-col items-center p-24">
          <h1>An error occured!</h1>
        </main>
      }
    >
      {children}
    </ErrorBoundaryCore>
  );
};

export default ErrorBoundary;
