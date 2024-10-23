/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SpaceProposalResultsList, TuneBlock, TuneBlockHeader } from '.';
import { Proposal, Results } from '../utils/interfaces';
import { t } from 'i18next';

interface Props {
  proposal: Proposal;
  loaded: boolean;
  results: Results;
}

const SpaceProposalResults: React.FC<Props> = ({
  proposal,
  loaded,
  results,
}) => {
  return (
    <TuneBlock
      loading={!loaded}
      header={<TuneBlockHeader title={t('results')} />}
    >
      <SpaceProposalResultsList proposal={proposal} results={results} />
    </TuneBlock>
  );
};

export default SpaceProposalResults;
