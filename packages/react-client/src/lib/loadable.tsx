import React, { Suspense } from 'react';

import PageLoader from '@/components/PageLoader';

export const loadable = (Component: React.LazyExoticComponent<React.FC>) => (props: any) => (
  <Suspense fallback={<PageLoader />}>
    <Component {...props} />
  </Suspense>
);

export default loadable;
