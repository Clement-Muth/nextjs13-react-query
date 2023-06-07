import { UserNotFound } from "./UserNotFound";
import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
};

type ErrorBoundaryState = {
  error: UserNotFound | undefined;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { error: undefined };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    if (error instanceof UserNotFound) return { error };

    throw error;
  }

  render() {
    const { error } = this.state;

    if (error === undefined) return this.props.children;
    if (error instanceof UserNotFound) return this.props.fallback;
  }
}

export default ErrorBoundary;
