import React, { useMemo } from 'react';
import { constants } from '@alexseifert/frontend-library';

import { useAppSelector } from 'store/hooks';
import { Props as SidebarItemProps } from 'components/elements/SidebarItem';

import SidebarColumn from './components/SidebarColumn';
import MobileSidebar from './components/MobileSidebar';

import styles from './styles.module.scss';

interface Props {
  sidebarItems: SidebarItemProps[];
  children: React.ReactNode;
}

const ThreeColumnLayout: React.FC<Props> = ({ sidebarItems, children }) => {
  const { windowWidth } = useAppSelector(state => state.ui);

  const sidebar = useMemo(() => <SidebarColumn sidebarItems={sidebarItems} />, [sidebarItems]);

  return (
    <>
      {windowWidth >= constants.window.WINDOW_WIDTHS.lgMin
        ? sidebar
        : (
          <MobileSidebar>
            {sidebar}
          </MobileSidebar>
        )
      }

      <div className={styles.rightSide}>
        {children}
      </div>
    </>
  );
};

export default ThreeColumnLayout;
