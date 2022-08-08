import { useTranslation } from 'react-i18next';

import { Props as NavItemProp } from './components/NavItem';

const useItemsTop = (): NavItemProp[] => {
  const { t } = useTranslation(['nav']);

  return [
    {
      path: '/books/all',
      ItemIcon: () => <span className='material-icons'>menu_book</span>,
      title: t('books'),
      selectedPath: '/books',
    },
    {
      path: '/lists',
      ItemIcon: () => <span className='material-icons'>format_list_bulleted</span>,
      title: t('lists'),
      selectedPath: '/lists',
    },
    // {
    //   path: '/statistics',
    //   ItemIcon: () => <span className='material-icons'>insights</span>,
    //   title: t('statistics'),
    // },
  ];
};

export default useItemsTop;
