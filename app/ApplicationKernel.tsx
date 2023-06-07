"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "clients/ReactQuery";
import { ReactNode, useEffect, useState } from "react";

interface ApplicationKernelProps {
  children: ReactNode;
  applicationEnvironment: "production" | "test" | "development";
}

const ApplicationKernel = ({
  children,
  applicationEnvironment = process.env.NODE_ENV === "production"
    ? "production"
    : process.env.NODE_ENV === "test"
    ? "test"
    : "development"
}: ApplicationKernelProps) => {
  const [showReactQueryDevTool, setShowReactQueryDevTool] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setShowReactQueryDevTool(true);
    }
  }, [process.env.NODE_ENV]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        {applicationEnvironment === "development" && showReactQueryDevTool ? (
          <ReactQueryDevtools initialIsOpen={false} />
        ) : null}
      </QueryClientProvider>
    </>
  );
};

export default ApplicationKernel;
