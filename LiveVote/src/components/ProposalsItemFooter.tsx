import React from 'react';
import capitalize from 'lodash/capitalize';
import { Proposal } from '../utils/interfaces'; // Ensure this path is correct
import Tippy from '@tippyjs/react';
import { useIntl } from '../hooks/useIntl';

interface ProposalsItemFooterProps {
  proposal: Proposal;
}

const ProposalsItemFooter: React.FC<ProposalsItemFooterProps> = ({
  proposal,
}) => {
  const { getRelativeProposalPeriod } = useIntl();

  return (
    <div className="mt-3">
      <Tippy
        content={new Date(
          (proposal.state === 'pending' ? proposal.start : proposal.end) * 1000
        ).toUTCString()} // Format the tooltip date for display (UTC time)
      >
        <span className="cursor-help">
          {capitalize(
            getRelativeProposalPeriod(
              proposal.state,
              proposal.start,
              proposal.end
            )
          )}
        </span>
      </Tippy>
    </div>
  );
};

export default ProposalsItemFooter;
