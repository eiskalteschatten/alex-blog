import React from 'react';

import Spinner from '../Spinner';

import styles from './SuspenseSpinner.module.scss';

const SuspenseSpinner: React.FC = () => {
  return (
    <div className={styles.suspenseSpinner}>
      <Spinner className={styles.spinner} />
    </div>
  );
};

export default SuspenseSpinner;
