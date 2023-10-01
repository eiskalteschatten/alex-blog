import React, { Component, ErrorInfo, ReactNode } from 'react';
import { t } from 'i18next';
import { Trans } from 'react-i18next';

import LogoDarkLight from '@/components/LogoDarkLight';

import styles from './GlobalErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorPage}>
          <LogoDarkLight className={styles.logo} />

          <div>
            <h1>{t<string>('errors:oopsThereWasAnError')}</h1>
            <p>{t<string>('errors:pleaseReloadThePageAndTryAgain')}</p>
            <p>
              <Trans key='tryHomePageFirst'>
                If that doesn't work, try going back to the <a href='/'>homepage</a> first
              </Trans>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
