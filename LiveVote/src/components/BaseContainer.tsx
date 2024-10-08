import React from 'react';

interface BaseContainerProps {
  slim?: boolean;
  children: React.ReactNode; // Children prop to hold nested elements
}

const BaseContainer: React.FC<BaseContainerProps> = ({ slim, children }) => {
  return (
    <div className={`${slim ? 'px-0 md:px-4' : 'px-4'} mx-auto max-w-[1012px]`}>
      {children}
    </div>
  );
};

export default BaseContainer;
