import React, { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import { useAppSelector } from '@/store/hooks';
import Toolbar from '@/components/Toolbar';
import SidebarMain from '@/components/SidebarMain';
import OffCanvasMenu from '@/components/OffCanvasMenu';

import * as constants from '@/constants';

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const { windowWidth } = useAppSelector(state => state.ui);

  return (
    <div className='flex flex-col w-full h-full'>
      <Toolbar />

      <div className='w-full h-full flex flex-row'>
        {windowWidth >= constants.window.WINDOW_WIDTHS.lgMin ? (
          <SidebarMain />
        ) : (
          <OffCanvasMenu />
        )}

        <div className='w-full h-full relative overflow-auto py-4'>
          {children}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
