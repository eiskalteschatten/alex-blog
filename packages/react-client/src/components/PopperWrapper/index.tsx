import React, { forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './PopperWrapper.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ref?: React.ForwardedRef<HTMLDivElement>;
}

const PopperWrapper: React.FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { children, className, ...leftoverProps } = props;

  return (
    <div
      className={clsx(styles.popperWrapper, className)}
      ref={ref}
      {...leftoverProps}
    >
      {children}
    </div>
  );
});

export default PopperWrapper;
