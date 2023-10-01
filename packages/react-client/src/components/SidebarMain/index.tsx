import React from 'react';
import { useTranslation } from 'react-i18next';

import Sidebar from '@/components/Sidebar';
import SidebarItem from '@/components/SidebarItem';

const SidebarMain: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Sidebar>
      <SidebarItem
        path='/'
        title={t('nav:dashboard')}
        ItemIcon={() => <span className='material-icons'>dashboard</span>}
        matchEnd
      />
    </Sidebar>
  );
};

export default SidebarMain;
