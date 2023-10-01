import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './Menu.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Menu: React.FC<Props> = ({ children, className, ...leftoverProps }) => {
  return (
    <div
      className={clsx(styles.menu, className)}
      {...leftoverProps}
    >
      {children}
    </div>
  );
};

export default Menu;
