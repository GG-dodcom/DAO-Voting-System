import React, { FC, ReactNode } from 'react';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
  size?: string;
  children: ReactNode;
}

const BaseButtonRound: FC<Props> = ({
  isDisabled = false,
  size = '46px',
  children,
  ...args
}) => {
  return (
    <button
      disabled={isDisabled}
      className={`flex cursor-pointer select-none items-center justify-center rounded-full border hover:border-skin-text 
        ${isDisabled ? '!cursor-not-allowed' : ''}`}
      style={{ width: size, height: size }}
      {...args}
    >
      {children}
    </button>
  );
};

export default BaseButtonRound;
