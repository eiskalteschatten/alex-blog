import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import clsx from 'clsx';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setMobileSidebarOpen } from '@/store/entities/ui';
import * as constants from '../../constants';

import styles from './SidebarItem.module.scss';

export interface Props {
  path: string;
  ItemIcon: React.FunctionComponent;
  title: string;
  marginBottom?: boolean;
  matchEnd?: boolean;
}

const SidebarItem: React.FC<Props> = ({ ItemIcon, title, path, marginBottom, matchEnd = false }) => {
  const dispatch = useAppDispatch();
  const { windowWidth } = useAppSelector(state => state.ui);
  const resolved = useResolvedPath(path);
  const match = useMatch({ path: resolved.pathname, end: matchEnd });

  if (path !== '/' && path.charAt(path.length - 1) === '/') {
    path = path.slice(0, -1);
  }

  const handleCloseMobileSidebar = () => {
    if (windowWidth < constants.window.WINDOW_WIDTHS.lgMin) {
      dispatch(setMobileSidebarOpen(false));
    }
  };

  return (
    <Link
      to={path}
      className={clsx(styles.sidebarItem, {
        [styles.selected]: match,
        [styles.marginBottom]: marginBottom,
      })}
      onClick={handleCloseMobileSidebar}
    >
      <div className={styles.icon}>
        <ItemIcon />
      </div>

      <span className={styles.text}>{title}</span>
    </Link>
  );
};

export default SidebarItem;
