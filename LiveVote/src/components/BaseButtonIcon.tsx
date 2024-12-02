import React from 'react';
import classNames from 'classnames';
import { LoadingSpinner } from './index'; // Ensure you have a LoadingSpinner component

interface BaseButtonIconProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  isDisabled?: boolean;
  children?: React.ReactNode;
}

const BaseButtonIcon: React.FC<BaseButtonIconProps> = ({
  loading = false,
  isDisabled = false,
  children,
  ...args
}) => {
  return (
    <button
      type="button"
      disabled={isDisabled}
      className={classNames(
        'flex items-center rounded-full p-[6px] text-md text-skin-text transition-colors duration-200 hover:text-skin-link',
        { '!cursor-not-allowed': isDisabled }
      )}
      {...args}
    >
      {loading ? <LoadingSpinner /> : children}
    </button>
  );
};

export default BaseButtonIcon;
