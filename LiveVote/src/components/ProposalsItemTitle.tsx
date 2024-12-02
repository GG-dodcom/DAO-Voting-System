// src/components/ProposalItem.tsx
import React from 'react';
import { Proposal } from '../utils/interfaces'; // Ensure the path is correct
import LabelProposalVoted from './LabelProposalVoted'; // Adjust the path if necessary

interface Props {
  proposal: Proposal;
  voted: boolean;
  className?: string;
}

const ProposalsItemTitle: React.FC<Props> = ({
  proposal,
  voted,
  className,
}) => {
  return (
    <div
      className={`relative mb-1 mt-3 break-words pr-[80px] leading-[32px] ${className}`}
    >
      <h3 className="inline pr-2">{proposal.title}</h3>
      {voted && <LabelProposalVoted />}
    </div>
  );
};

export default ProposalsItemTitle;
