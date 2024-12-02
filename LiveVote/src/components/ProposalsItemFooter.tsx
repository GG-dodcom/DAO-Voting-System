import React from 'react';
import capitalize from 'lodash/capitalize';
import { Proposal } from '../utils/interfaces'; // Ensure this path is correct
import Tippy from '@tippyjs/react';
import { useIntl } from '../hooks/useIntl';
import { t } from 'i18next';

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
        content={
          proposal.startDate || proposal.endDate
            ? new Date(
                (proposal.state === 'pending'
                  ? proposal.startDate
                  : proposal.endDate) * 1000
              ).toUTCString()
            : t('votingPeriodNotAvailable') // Default message if no voting data
        }
      >
        <span className="cursor-help">
          {capitalize(
            getRelativeProposalPeriod(
              proposal.state,
              proposal.startDate,
              proposal.endDate
            )
          )}
        </span>
      </Tippy>
    </div>
  );
};

export default ProposalsItemFooter;
