import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      useErrorBoundary: true // Force react-query to throw error instead of returning it
    }
  }
});
