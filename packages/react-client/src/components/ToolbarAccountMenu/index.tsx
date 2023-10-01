import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePopper } from 'react-popper';
import { Link, useNavigate } from 'react-router-dom';

import PopperWrapper from '@/components/PopperWrapper';
import PopupBase from '@/components/PopupBase';
import Menu from '@/components/Menu';
import MenuItem from '@/components/MenuItem';
import Button from '@/components/Button';
import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/entities/account';

import styles from '../Toolbar/Toolbar.module.scss';

const AccountMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const buttonReference = useRef<HTMLButtonElement>(null);
  const popperReference = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(['account']);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { styles: popperStyles, attributes } = usePopper(
    buttonReference.current,
    popperReference.current,
    {
      placement: 'bottom-end',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 0],
          },
        },
      ],
    }
  );

  const handleLogout = () => {
    dispatch(logout()).then(() => navigate('/login')).catch(console.error);
  };

  return (
    <>
      <Button
        className={styles.toolbarButton}
        iconButton
        onClick={() => setMenuOpen(true)}
        ref={buttonReference}
      >
        <span className='material-icons'>account_circle</span>
      </Button>

      <PopperWrapper
        ref={popperReference}
        style={popperStyles.popper}
        {...attributes.popper}
      >
        <PopupBase
          open={menuOpen}
          handleClose={() => setMenuOpen(false)}
        >
          <Menu>
            <MenuItem>
              <Link to='/account'>
                {t('account:accountSettings')}
              </Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              {t('account:logOut')}
            </MenuItem>
          </Menu>
        </PopupBase>
      </PopperWrapper>
    </>
  );
};

export default AccountMenu;
