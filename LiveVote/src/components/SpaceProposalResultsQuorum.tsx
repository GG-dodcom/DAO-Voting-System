/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Proposal, Result } from '../utils/interfaces';
import { useIntl } from '../hooks/useIntl';
import { BaseProgressBar } from '.';
import Tippy from '@tippyjs/react';
import { t } from 'i18next';

interface Props {
  proposal: Proposal;
  results: Result;
}

const SpaceProposalResultsQuorum: React.FC<Props> = ({ proposal, results }) => {
  const { formatCompactNumber, formatPercentNumber } = useIntl();
 
  return (
    <div className="pt-2 text-skin-link">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">{t('voterTurnout')}</div>
       
          <div className="flex gap-2">
            <Tippy content={formatPercentNumber(results.scoresTotal / proposal.numOfQR)}>
              <span>
                {formatCompactNumber(results.scoresTotal)} /{' '}
                {formatCompactNumber(proposal.numOfQR)}
              </span>
            </Tippy>
          </div>
      </div>
      <BaseProgressBar value={(results.scoresTotal / proposal.numOfQR) * 100} />
    </div>
  );
};

export default SpaceProposalResultsQuorum;
