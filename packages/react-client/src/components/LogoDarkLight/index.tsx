import React, { HTMLAttributes } from 'react';

import WhiteLogo from '@/assets/images/icon-monotone-white.svg';
import BlackLogo from '@/assets/images/icon-monotone-black.svg';

interface Props extends HTMLAttributes<HTMLPictureElement> {
  width?: number;
  height?: number;
}

const LogoDarkLight: React.FC<Props> = ({ className, width, height, ...leftoverProps }) => {
  return (
    <picture {...leftoverProps}>
      <source srcSet={WhiteLogo} media='(prefers-color-scheme: dark)' />
      <img src={BlackLogo} width={width} height={height} className={className} />
    </picture>
  );
};

export default LogoDarkLight;
