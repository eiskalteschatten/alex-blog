import React from 'react';

import usePageTitle from '@/lib/usePageTitle';

const Dashboard: React.FC = () => {
  usePageTitle();

  return (
    <div className='container mx-auto px-8'>
      Dashboard
    </div>
  );
};

export default Dashboard;
