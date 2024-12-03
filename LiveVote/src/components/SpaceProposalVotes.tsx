/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Proposal, Result } from '../utils/interfaces';
import {
  SpaceProposalVotesItem,
  SpaceProposalVotesModal,
  TuneBlock,
  TuneBlockHeader,
} from '.';
import { useProposalVotes } from '../hooks/useProposalVotes';
import { t } from 'i18next';
import { useMediaQuery } from 'react-responsive';

interface Props {
  proposal: Proposal;
  results: Result;
}


const SpaceProposalVotes: React.FC<Props> = ({ proposal, results }) => {
  const breakpoints = {
    xs: '420px',
    sm: '544px',
    md: '768px',
    lg: '1012px',
    xl: '1280px',
    '2xl': '1536px',
  };

  // Use useMediaQuery to check if the screen size is at least 'sm'
  const isSmallScreen = useMediaQuery({
    query: `(max-width: ${breakpoints.sm})`,
  });

  const { votes, loadingVotes, loadVotes } = useProposalVotes(proposal);
  const [modalVotesOpen, setModalVotesOpen] = useState(false);

  const voteCount = results.scoresTotal;

  useEffect(() => {
    const fetchVotes = async () => {
      await loadVotes();
    };
    fetchVotes();
  }, [proposal]);

  return (
    <>
      {voteCount > 0 && (
        <TuneBlock
          loading={loadingVotes}
          header={<TuneBlockHeader title={t('votes')} counter={voteCount} />}
        >
          {votes.map((vote, i) => (
            <SpaceProposalVotesItem
              key={i}
              vote={vote}
              proposal={proposal}
              isSmall={isSmallScreen}
              data-testid={`proposal-votes-list-item-${i}`}
              className="last:pb-0"
            />
          ))}
          <SpaceProposalVotesModal
            proposal={proposal}
            open={modalVotesOpen}
            onClose={() => setModalVotesOpen(false)}
          />
        </TuneBlock>
      )}
    </>
  );
};

export default SpaceProposalVotes;
