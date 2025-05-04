import { Component, ErrorInfo, ReactNode } from 'react';

import { ErrorElement } from '@/components/molecules/error-element';

interface I_Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface I_State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<I_Props, I_State> {
  constructor(props: I_Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): I_State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorElement error={this.state.error} />;
    }

    return this.props.children;
  }
}
