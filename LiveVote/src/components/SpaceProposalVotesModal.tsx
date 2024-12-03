/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useMemo } from 'react';
import { Proposal } from '../utils/interfaces';
import { useProposalVotes } from '../hooks/useProposalVotes';
import {
  BaseCounter,
  BaseNoResults,
  LoadingList,
  SpaceProposalVotesItem,
  TuneModal,
  TuneModalTitle,
} from '.';
import { t } from 'i18next';

interface Props {
  proposal: Proposal;
  open: boolean;
  onClose: () => void;
}

const SpaceProposalVotesModal: React.FC<Props> = ({
  proposal,
  open,
  onClose,
}) => {
  const votesEndEl = useRef<HTMLDivElement | null>(null);
  const { votes, loadingVotes, loadVotes } =
    useProposalVotes(proposal);

  const showNoResults = useMemo(
    () => !loadingVotes && votes.length === 0,
    [loadingVotes, votes]
  );

  useEffect(() => {
    if (open) loadVotes();
  }, [open]);

  return (
    <TuneModal open={open} onClose={onClose}>
      <div className="px-3 pb-3">
        <TuneModalTitle as="h4" className="mt-3 flex items-center gap-1">
          {t('proposal.votesModal.title')}
          <BaseCounter counter={proposal.result?.scoresTotal} />
        </TuneModalTitle>
      </div>

      <div className="max-h-[calc(100vh-130px)] md:max-h-[400px] overflow-y-auto">
        {loadingVotes ? (
          <div className="block p-3">
            <LoadingList />
          </div>
        ) : showNoResults ? (
          <BaseNoResults />
        ) : votes.length > 0 ? (
          <div className="flex h-full min-h-full flex-col overflow-auto px-[16px] py-2">
            {votes.map((vote, i) => (
              <SpaceProposalVotesItem
                key={i}
                vote={vote}
                proposal={proposal}
                isSmall
                data-testid={`proposal-votes-list-item-${i}`}
              />
            ))}
            <div ref={votesEndEl} />
          </div>
        ) : null}
      </div>
    </TuneModal>
  );
};

export default SpaceProposalVotesModal;
