// src/components/ProposalItem.tsx
import React from 'react';
import { Proposal } from '../utils/interfaces'; // Ensure the path is correct
import LabelProposalVoted from './LabelProposalVoted'; // Adjust the path if necessary

interface ProposalsItemTitleProps {
  proposal: Proposal;
  voted: boolean;
}

const ProposalsItemTitle: React.FC<ProposalsItemTitleProps> = ({
  proposal,
  voted,
}) => {
  return (
    <div className="relative mb-1 mt-3 break-words pr-[80px] leading-[32px]">
      <h3 className="inline pr-2">{proposal.title}</h3>
      {voted && <LabelProposalVoted />}
    </div>
  );
};

export default ProposalsItemTitle;
