import React from 'react';

interface Props {
  children: React.ReactNode;
}

const BasePill: React.FC<Props> = ({ children }) => {
  return (
    <span className="rounded-full bg-skin-text px-2 text-center text-xs leading-5 text-white">
      {children}
    </span>
  );
};

export default BasePill;
