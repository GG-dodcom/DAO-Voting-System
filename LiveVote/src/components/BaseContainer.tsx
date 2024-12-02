import React from 'react';

interface Props {
  slim?: boolean;
  children: React.ReactNode; // Children prop to hold nested elements
  className?: string;
}

const BaseContainer: React.FC<Props> = ({ slim, children, className }) => {
  return (
    <div
      className={`${
        slim ? 'px-0 md:px-4' : 'px-4'
      } mx-auto max-w-[1012px] ${className}`}
    >
      {children}
    </div>
  );
};

export default BaseContainer;
