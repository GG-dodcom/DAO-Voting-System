import React from 'react';
import { TuneIconHint } from '..';

interface TuneLabelInputProps {
  hint?: string;
  sublabel?: string;
  children: React.ReactNode;
}

const TuneLabelInput: React.FC<TuneLabelInputProps> = ({
  hint,
  sublabel,
  children,
}) => {
  return (
    <div className="tune-label-container flex flex-col">
      <div className="tune-label flex items-center gap-1">
        {children}
        <TuneIconHint hint={hint} />
      </div>
      {sublabel && <div className="tune-sublabel">{sublabel}</div>}
    </div>
  );
};

export default TuneLabelInput;
