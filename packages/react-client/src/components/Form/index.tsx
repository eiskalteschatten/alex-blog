import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

const Form: React.FC<HTMLAttributes<HTMLFormElement>> = ({ className, ...leftOverProps }) => {
  return (
    <form
      className={clsx('flex', 'flex-col', 'gap-5', 'w-full', className)}
      {...leftOverProps}
    />
  );
};

export default Form;
