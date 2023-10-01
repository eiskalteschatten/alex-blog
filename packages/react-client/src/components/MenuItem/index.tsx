import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

import ButtonBase from '../ButtonBase';

import styles from './MenuItem.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const MenuItem: React.FC<Props> = ({ children, className, ...leftoverProps }) => {
  return (
    <ButtonBase
      className={clsx(styles.menuItem, className)}
      {...leftoverProps}
    >
      {children}
    </ButtonBase>
  );
};

export default MenuItem;
