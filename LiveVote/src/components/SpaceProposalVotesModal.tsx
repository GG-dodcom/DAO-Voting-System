import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Proposal, VoteFilters } from '../utils/interfaces';
import { useProposalVotes } from '../hooks/useProposalVotes';
import {
  BaseCounter,
  BaseNoResults,
  LoadingList,
  LoadingSpinner,
  TuneModal,
  TuneModalTitle,
} from '.';
import { t } from 'i18next';

const VOTES_FILTERS_DEFAULT: VoteFilters = {
  orderDirection: 'desc',
  onlyWithReason: false,
};

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
  const [filterOptions, setFilterOptions] = useState<VoteFilters>(
    VOTES_FILTERS_DEFAULT
  );
  const [searchInput, setSearchInput] = useState<string>('');

  const {
    votes,
    loadingVotes,
    loadingMoreVotes,
    loadVotes,
    loadMoreVotes,
    loadSingleVote,
  } = useProposalVotes(proposal, 20);

  const filters = useMemo(
    () => ({
      orderDirection: filterOptions.orderDirection,
      onlyWithReason: filterOptions.onlyWithReason,
    }),
    [filterOptions]
  );

  const showNoResults = useMemo(
    () =>
      !loadingVotes &&
      votes.length === 0 &&
      (searchInput || filters.onlyWithReason),
    [loadingVotes, votes, searchInput, filters]
  );

  const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
    const hasMoreVotes = proposal.votes > votes.length;
    if (open && entry.isIntersecting && searchInput === '' && hasMoreVotes) {
      loadMoreVotes(filters);
    }
  };

  useIntersectionObserver(votesEndEl, handleIntersection, {
    threshold: 1,
  });

  useEffect(() => {
    if (open) {
      setFilterOptions(VOTES_FILTERS_DEFAULT);
      setSearchInput('');
    }
  }, [open]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchInput) {
        loadSingleVote(searchInput);
      } else if (votes.length < 2) {
        loadVotes(filters);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchInput, votes, filters]);

  useEffect(() => {
    loadVotes(filters);
  }, [filters]);

  return (
    <TuneModal open={open} onClose={onClose}>
      <div className="px-3 pb-3">
        <TuneModalTitle as="h4" className="mt-3 flex items-center gap-1">
          {t('proposal.votesModal.title')}
          <BaseCounter counter={proposal.votes} />
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
            {loadingMoreVotes && (
              <div className="block min-h-[34px] text-center">
                <LoadingSpinner />
              </div>
            )}
          </div>
        ) : null}
      </div>
    </TuneModal>
  );
};

export default SpaceProposalVotesModal;
