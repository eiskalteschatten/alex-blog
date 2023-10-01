import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

const PageTitle: React.FC<HTMLAttributes<HTMLHeadElement>> = ({ className, ...leftOverProps }) => {
  return (
    <h1
      className={clsx('text-2xl', 'font-semibold', 'mb-10', className)}
      {...leftOverProps}
    />
  );
};

export default PageTitle;
