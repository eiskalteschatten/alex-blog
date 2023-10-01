import React, { PropsWithChildren } from 'react';
import { Link, Outlet, useMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import { useAppSelector } from '@/store/hooks';
import LogoDarkLight from '@/components/LogoDarkLight';
import Card from '@/components/Card';

import styles from './LoginRegistration.module.scss';

const logoSize = 100;

const LoginRegistration: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation(['account']);
  const { accountError } = useAppSelector(state => state.account);
  const loginMatch = useMatch({ path: '/login', end: true });
  const registrationMatch = useMatch({ path: '/register', end: true });

  return (
    <div className={styles.layout}>
      <Card className={styles.form}>
        <LogoDarkLight width={logoSize} height={logoSize} />

        <div className={styles.tabs}>
          <Link to='/login' className={clsx(styles.tab, {
            [styles.selected]: loginMatch,
          })}>
            {t('account:login')}
          </Link>
          <Link to='/register' className={clsx(styles.tab, {
            [styles.selected]: registrationMatch,
          })}>
            {t('account:registration')}
          </Link>
        </div>

        {accountError && (<div className={styles.error}>{accountError}</div>)}

        {children}
        <Outlet />
      </Card>
    </div>
  );
};

export default LoginRegistration;
