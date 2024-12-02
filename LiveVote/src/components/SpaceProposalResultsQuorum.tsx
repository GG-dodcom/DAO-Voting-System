/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Proposal, Result } from '../utils/interfaces';
import { useIntl } from '../hooks/useIntl';
import { useRestfulAPI } from '../hooks';
import { BaseProgressBar, LoadingSpinner } from '.';
import Tippy from '@tippyjs/react';
import { t } from 'i18next';
import API_PATHS from '../utils/queries';

interface Props {
  proposal: Proposal;
  results: Result;
}

const SpaceProposalResultsQuorum: React.FC<Props> = ({ proposal, results }) => {
  const { formatCompactNumber, formatPercentNumber } = useIntl();
  const { fetchQuery, queryLoading } = useRestfulAPI();
  const [voter, setVoter] = useState<number>(0);

  const loadVoter = async () => {
    try {
      const result: any = await fetchQuery(
        API_PATHS.fetchTotalVoter
        //   {
        //   id: proposal.id,
        // }
      );

      setVoter(result.voter);

      console.log('total voter', result.voter);
    } catch (e) {
      console.error('Error fetching voter', e);
    }
  };

  useEffect(() => {
    loadVoter();
  }, [proposal, results]);

  return (
    <div className="pt-2 text-skin-link">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">{t('voterTurnout')}</div>
        {queryLoading && <LoadingSpinner className="mr-1" />}
        {!queryLoading && (
          <div className="flex gap-2">
            <Tippy content={formatPercentNumber(voter / proposal.numOfQR)}>
              <span>
                {formatCompactNumber(voter)} /{' '}
                {formatCompactNumber(proposal.numOfQR)}
              </span>
            </Tippy>
          </div>
        )}
      </div>
      <BaseProgressBar value={(voter / proposal.numOfQR) * 100} />
    </div>
  );
};

export default SpaceProposalResultsQuorum;
