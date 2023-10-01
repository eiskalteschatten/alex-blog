import React from 'react';
import { useTranslation } from 'react-i18next';

import usePageTitle from '@/lib/usePageTitle';

const NotFound: React.FC = () => {
  const { t } = useTranslation(['errors']);

  usePageTitle('Page not found!');

  return (
    <div>
      {t('errors:pageNotFound')}
    </div>
  );
};

export default NotFound;
