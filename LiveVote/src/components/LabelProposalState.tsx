import { t } from 'i18next';
import React from 'react';

interface Props {
  state: string;
  className?: string;
}

const LabelProposalState: React.FC<Props> = ({ state, className }) => {
  const stateClass = () => {
    if (state === 'closed') return 'bg-[#BB6BD9]';
    if (state === 'active') return 'bg-green';
    return 'bg-gray-500';
  };

  return (
    <div
      className={`text-white rounded-full px-[12px] text-sm h-[24px] w-fit leading-[23px] 
        ${stateClass()} 
        ${className}`}
    >
      {t(`proposals.states.${state}`)}
    </div>
  );
};

export default LabelProposalState;
