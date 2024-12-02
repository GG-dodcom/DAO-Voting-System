import React from 'react';
import { useTranslation } from 'react-i18next';
import { ISVoted } from '../assets/icons';

const LabelProposalVoted: React.FC = () => {
  const { t } = useTranslation();

  return (
    <span className="absolute inline-flex items-center gap-1 whitespace-nowrap py-[1px] text-sm text-skin-text">
      <ISVoted className="text-green" /> {t('voted')}
    </span>
  );
};

export default LabelProposalVoted;
