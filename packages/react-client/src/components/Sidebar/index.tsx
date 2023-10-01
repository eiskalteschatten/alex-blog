import React, { useState, useEffect, useRef, CSSProperties } from 'react';

import styles from './Sidebar.module.scss';

interface Props {
  children: React.ReactNode;
}

const Sidebar: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.sidebar}>
      {children}
    </div>
  );
};

export default Sidebar;
