import React from 'react';
import { IconInformationTooltip } from '.'; // Make sure you have this component

interface LabelInputProps {
  information?: string;
  children?: React.ReactNode;
}

const LabelInput: React.FC<LabelInputProps> = ({ information, children }) => {
  return (
    <span className="mb-[2px] flex items-center gap-1 text-skin-text">
      {children}
      <IconInformationTooltip information={information} />
    </span>
  );
};

export default LabelInput;