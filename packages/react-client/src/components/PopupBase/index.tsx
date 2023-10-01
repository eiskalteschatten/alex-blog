import React, { HTMLAttributes, useEffect, useRef } from 'react';
import clsx from 'clsx';

import styles from './PopupBase.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const PopupBase: React.FC<Props> = ({ open, handleClose, children, className, ...leftoverProps }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (event: any) => {
      if (ref?.current !== event.target && !ref?.current?.contains(event.target)) {
        handleClose();
      }
    };

    if (open) {
      // Debounce adding the even handler so it doesn't fire immediately
      setTimeout(() => document.addEventListener('click', onClick), 100);
    }

    return () => {
      document.removeEventListener('click', onClick);
    };
  }, [ref, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={clsx(styles.popupBase, className)}
      {...leftoverProps}
    >
      {children}
    </div>
  );
};

export default PopupBase;
