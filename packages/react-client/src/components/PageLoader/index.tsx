import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

import { useAppSelector } from '@/store/hooks';

import styles from './PageLoader.module.scss';

const initialWidth = 0;

const PageLoader: React.FC = () => {
  const { isLoading } = useAppSelector(state => state.ui);
  const [widthInterval, setWidthInterval] = useState<NodeJS.Timer>();
  const [width, setWidth] = useState<number>(initialWidth);

  useEffect(() => {
    return () => {
      if (widthInterval) {
        clearInterval(widthInterval);
      }

      setWidth(initialWidth);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      if (widthInterval) {
        clearInterval(widthInterval);
      }

      setWidthInterval(setInterval(() => setWidth(width => width + 50), 1000));
    }
    else if (widthInterval) {
      clearInterval(widthInterval);
      setWidth(initialWidth);
    }
    else {
      setWidth(initialWidth);
    }
  }, [isLoading]);

  useEffect(() => {
    if (widthInterval && width > screen.width) {
      clearInterval(widthInterval);
    }
  }, [width]);

  return (
    <div className={styles.pageLoader}>
      <div
        className={clsx(styles.bar, {
          [styles.loading]: isLoading,
          [styles.hidden]: !isLoading,
        })}
        style={{ width }}
      />
    </div>
  );
};

export default PageLoader;
