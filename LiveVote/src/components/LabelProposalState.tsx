import React from 'react';
import { useTranslation } from 'react-i18next';

interface LabelProposalStateProps {
  state: string;
}

const LabelProposalState: React.FC<LabelProposalStateProps> = ({ state }) => {
  const { t } = useTranslation(); // Using react-i18next for translations

  const stateClass = () => {
    if (state === 'closed') return 'bg-[#BB6BD9]';
    if (state === 'active') return 'bg-green';
    return 'bg-gray-500';
  };

  return (
    <div
      className={`text-white rounded-full px-[12px] text-sm h-[24px] w-fit leading-[23px] ${stateClass()}`}
    >
      {t(`proposals.states.${state}`)}
    </div>
  );
};

export default LabelProposalState;
