import React from 'react';
import clsx from 'clsx';

import LeftSide from '../ToolbarLeftSide';
import AccountMenu from '../ToolbarAccountMenu';

import styles from './Toolbar.module.scss';

const Toolbar: React.FC = () => {
  return (
    <div className={clsx(styles.toolbar, 'p-2')}>
      <LeftSide />
      <AccountMenu />
    </div>
  );
};

export default Toolbar;
