import { useEffect } from 'react';

export const usePageTitle = (pageTitle?: string) => {
  const defaultPageTitle = 'Fastify React Blog';

  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ${defaultPageTitle}` : defaultPageTitle;
  }, [pageTitle]);
};

export default usePageTitle;
