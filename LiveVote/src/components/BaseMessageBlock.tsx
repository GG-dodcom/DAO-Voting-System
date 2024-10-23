import React from 'react';
import { BaseBlock, BaseMessage } from '.';

interface Props {
  level: 'info' | 'warning' | 'warning-red';
  isResponsive?: boolean;
  children: React.ReactNode;
  className?: string;
}

const BaseMessageBlock: React.FC<Props> = ({
  level,
  isResponsive = false,
  children,
  className,
}) => {
  return (
    <BaseBlock
      className={[
        'rounded-xl border text-skin-text',
        level === 'warning' && '!border-skin-text',
        level === 'warning-red' && '!border-red',
        isResponsive && '!rounded-none border-x-0 md:!rounded-xl',
        `${className}`,
      ]
        .filter(Boolean) // Filter out falsy values
        .join(' ')} // Join the classes into a string
    >
      <BaseMessage level={level}>{children}</BaseMessage>
    </BaseBlock>
  );
};

export default BaseMessageBlock;
