import React from 'react';

interface Props {
  name: string;
  size?: string;
  className?: string;
}

const BaseIcon: React.FC<Props> = ({ name = '', size = '16', className }) => {
  return (
    <i
      className={`iconfont icon${name} ${className}`}
      style={
        size ? { fontSize: `${size}px`, lineHeight: `${size}px` } : undefined
      }
    />
  );
};

export default BaseIcon;
