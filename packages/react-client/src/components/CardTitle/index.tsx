import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';

const CardTitle: React.FC<HTMLAttributes<HTMLHeadElement>> = ({ className, ...leftOverProps }) => {
  return (
    <h3
      className={clsx('text-xl', 'font-semibold', 'mb-6', className)}
      {...leftOverProps}
    />
  );
};

export default CardTitle;
