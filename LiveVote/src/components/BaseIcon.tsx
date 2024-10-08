import React from 'react';

interface BaseIconProps {
  name: string;
  size?: string;
}

const BaseIcon: React.FC<BaseIconProps> = ({ name = '', size = '16' }) => {
  const iconStyle = {
    fontSize: `${size}px`,
    lineHeight: `${size}px`,
  };

  return (
    <i
      className={`iconfont icon${name}`}
      style={size ? iconStyle : undefined}
    />
  );
};

export default BaseIcon;
