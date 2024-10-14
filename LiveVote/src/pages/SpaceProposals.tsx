// src/components/Proposals.tsx

import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BoostSubgraph, ExtendedSpace, Proposal } from '../utils/interfaces';

interface SpaceProposalsProps {
  space: ExtendedSpace;
}

const SpaceProposals: React.FC<SpaceProposalsProps> = ({ space }) => {
  const [loading, setLoading] = useState(false);
  const [boosts, setBoosts] = useState<BoostSubgraph[]>([]);
  const [spaceProposals, setSpaceProposals] = useState<Proposal[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const { loadBy, loadingMore, stopLoadingMore, loadMore } =
    useInfiniteLoader(); // Create a custom loader for proposals
  const { emitUpdateLastSeenProposal } = useUnseenProposals();
  const { profiles, loadProfiles } = useProfiles();
  const { apolloQuery } = useApolloQuery();
  const { web3Account } = useWeb3();
  const { isFollowing } = useFollowSpace(space.id);
  const { sanitizeBoosts } = useBoost(); // Ensure you have a valid useBoost hook

  useEffect(() => {
    document.title = `Proposals for ${space.name}`; // Set meta title
  }, [space.name]);

  const spaceMembers = [...space.members, ...space.moderators, ...space.admins];
  const subSpaces =
    space.children?.map((space) => space.id.toLowerCase()) ?? [];

  const fetchProposals = async (skip = 0) => {
    const response = await apolloQuery({
      query: PROPOSALS_QUERY,
      variables: {
        first: loadBy,
        skip,
        space_in: [space.id, ...subSpaces],
        // Add your other filters here
      },
    });
    return response?.proposals || [];
  };

  const loadMoreProposals = async (skip: number) => {
    if (skip === 0) return;
    const proposals = await fetchProposals(skip);
    stopLoadingMore = proposals.length < loadBy;
    setSpaceProposals((prev) => [...prev, ...proposals]);
  };

  useInfiniteScroll(
    document,
    () => {
      if (loadingMore || spaceProposals.length < 6) return;
      loadMore(() => loadMoreProposals(spaceProposals.length));
    },
    { distance: 400 }
  );

  useEffect(() => {
    const loadInitialProposals = async () => {
      setLoading(true);
      const proposals = await fetchProposals();
      setSpaceProposals(proposals);
      setLoading(false);
    };

    loadInitialProposals();
  }, [space.id]);

  useEffect(() => {
    if (web3Account) {
      emitUpdateLastSeenProposal(space.id);
    }
  }, [web3Account]);

  return (
    <TheLayout>
      <div>
        <h1 className="hidden lg:mb-3 lg:block">Proposals</h1>

        <div className="mb-4 flex flex-col justify-between gap-x-3 gap-y-[10px] px-[20px] sm:flex-row md:px-0">
          <BaseLink
            link={{ name: 'spaceCreate' }}
            data-testid="create-proposal-button"
          >
            <TuneButton primary={isFollowing} className="w-full sm:w-auto">
              New proposal
            </TuneButton>
          </BaseLink>
        </div>

        {loading && <LoadingRow block />}
        {spaceProposals.length < 1 && <BaseNoResults />}
        <div className="mb-3 space-y-3">
          {spaceProposals.map((proposal, i) => (
            <BaseBlock key={i} slim className="transition-colors">
              <ProposalsItem
                proposal={proposal}
                profiles={profiles}
                space={space}
                voted={userVotedProposalIds.includes(proposal.id)}
                hideSpaceAvatar={proposal.space.id === space.id}
                to={{
                  name: 'spaceProposal',
                  params: { id: proposal.id, key: proposal.space.id },
                }}
                boosts={boosts}
              />
            </BaseBlock>
          ))}
        </div>
        {loadingMore && !loading && <LoadingRow block />}
      </div>
    </TheLayout>
  );
};

export default SpaceProposals;

