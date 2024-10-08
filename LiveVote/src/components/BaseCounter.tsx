import React from 'react';

interface BaseCounterProps {
  counter?: number | string;
}

const BaseCounter: React.FC<BaseCounterProps> = ({ counter }) => {
  // Number formatting using Intl
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat().format(value);
  };

  // Render only if the counter is valid
  if (
    typeof counter !== 'undefined' &&
    (typeof counter === 'string' || Number(counter) >= 0)
  ) {
    return (
      <div className="h-[20px] min-w-[20px] rounded-full bg-skin-text px-1 text-center text-xs leading-normal text-white">
        {formatNumber(Number(counter))}
      </div>
    );
  }

  return null;
};

export default BaseCounter;
