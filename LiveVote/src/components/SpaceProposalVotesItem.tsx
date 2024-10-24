import React, { useMemo, useRef } from 'react';
import { Proposal, Vote } from '../utils/interfaces';
import { shorten } from '../utils/utils';

interface Props {
  proposal: Proposal;
  vote: Vote;
  isSmall: boolean;
  onOpenReceiptModal: () => void;
}

const SpaceProposalVotesListItem: React.FC<Props> = ({
  proposal,
  vote,
  isSmall,
  onOpenReceiptModal,
}) => {
  const titles = useMemo(() => {
    return proposal.strategies.map((strategy) => strategy.params.symbol || '');
  }, [proposal.strategies]);

  const { formatCompactNumber } = useIntl();

  const balanceFormatted = useMemo(() => {
    const balance = formatCompactNumber(vote.balance);
    return balance.length >= 8 ? shorten(balance) : balance;
  }, [vote.balance, formatCompactNumber]);

  const handleOpenReceiptModal = () => {
    onOpenReceiptModal();
  };

  return (
    <div className={`py-[12px] ${isSmall ? 'py-[8px]' : ''}`}>
      <div
        className={`flex items-center gap-4 ${
          isSmall ? '' : 'justify-between'
        }`}
      >
        {!isSmall && (
          <SpaceProposalVotesListItemChoice proposal={proposal} vote={vote} />
        )}

        <div className="flex w-[130px] min-w-[130px] items-center justify-end whitespace-nowrap text-right text-skin-link">
          <span className="truncate">
            {`${balanceFormatted} ${shorten(
              proposal.symbol || 'VOTE',
              'symbol'
            )}`}
          </span>
        </div>
      </div>

      {isSmall && (
        <SpaceProposalVotesListItemChoice
          proposal={proposal}
          vote={vote}
          className="mt-1"
        />
      )}
    </div>
  );
};

export default SpaceProposalVotesListItem;
