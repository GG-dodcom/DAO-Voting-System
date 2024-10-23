import React from 'react';

interface Props {
  value: number;
}

const BaseProgressBar: React.FC<Props> = ({ value }) => {
  return (
    <div className="relative mt-1 flex h-2 overflow-hidden rounded-full">
      <div className="z-5 absolute h-full w-full bg-[color:var(--border-color)]" />
      <div
        style={{ width: `${value.toFixed(3)}%` }}
        className="z-10 h-full bg-skin-primary opacity-80"
      />
    </div>
  );
};

export default BaseProgressBar;
