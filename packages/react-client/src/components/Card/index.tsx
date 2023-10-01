import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './Card.module.scss';

const Card: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, title, children, ...leftoverProps }) => {
  return (
    <div
      className={clsx(styles.card, 'p-5', className)}
      {...leftoverProps}
    >
      {title && (
        <div className={styles.title}>
          {title}
        </div>
      )}

      {children}
    </div>
  );
};

export default Card;
