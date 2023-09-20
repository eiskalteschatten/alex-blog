import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setMobileSidebarOpen } from '@/store/entities/ui';
import { usePathnameWithoutBookId } from '@/lib/urlHelper';
import LogoDarkLight from '@/components/LogoDarkLight';
import Button from '@/components/Button';

import * as constants from '../../constants';

import styles from './LeftSide.module.scss';
import toolbarStyles from '../Toolbar/Toolbar.module.scss';

const logoSize = 30;

const LeftSide: React.FC = () => {
  const dispatch = useAppDispatch();
  const { bookId } = useParams();
  const navigate = useNavigate();
  const backPathname = usePathnameWithoutBookId();
  const { windowWidth, mobileSidebarOpen } = useAppSelector(state => state.ui);

  return (
    <>
      {windowWidth >= constants.window.WINDOW_WIDTHS.mdMax ? (
        <Link
          to='/'
          className={styles.logo}
        >
          <LogoDarkLight width={logoSize} height={logoSize} />
          <span>Fastify React Blog</span>
        </Link>
      ) : (
        <div className={styles.mobileWrapper}>
          {bookId && windowWidth <= constants.window.WINDOW_WIDTHS.smMax ? (
            <Button
              className={toolbarStyles.toolbarButton}
              iconButton
              onClick={() => navigate(backPathname)}
            >
              <span className='material-icons'>arrow_back</span>
            </Button>
          ) : (
            <Button
              className={toolbarStyles.toolbarButton}
              iconButton
              onClick={() => dispatch(setMobileSidebarOpen(!mobileSidebarOpen))}
            >
              <span className='material-icons'>menu</span>
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default LeftSide;
