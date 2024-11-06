/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  BaseBlock,
  BaseLink,
  BaseNoResults,
  LoadingRow,
  TheLayout,
  TuneButton,
} from '../components';
import { Proposal } from '../utils/interfaces';
import ProposalsItem from '../components/ProposalsItem';
import { useRestfulAPI } from '../hooks';
import API_PATHS from '../utils/queries';
import { useAppKitAccount } from '@reown/appkit/react';
import { useNavigate } from 'react-router-dom';

const SpaceProposals: React.FC = () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [userVotedProposalIds, setUserVotedProposalIds] = useState<string[]>(
    []
  );

  const { fetchQuery, queryLoading } = useRestfulAPI();
  const { address } = useAppKitAccount();
  const navigate = useNavigate();

  const getProposals = async () => {
    try {
      const response = await fetchQuery(API_PATHS.fetchProposals);
      setProposals(response);
    } catch (error) {
      console.error('Error fetching proposals:', error);
    }
  };

  const getUserVotedProposalIds = async (voter: string) => {
    if (!voter) return;

    const votes = await fetchQuery(API_PATHS.fetchUserVotedProposalIds, {
      address: voter,
    });

    const proposalIds = votes ?? [];
    setUserVotedProposalIds((prevIds) => [
      ...new Set([...prevIds, ...proposalIds]),
    ]);
  };

  const signOut = () => {
    localStorage.removeItem('isAdmin');
    navigate('/'); //window.location.reload(); // Reloads the page to reflect the sign-out
  };

  useEffect(() => {
    getProposals();
  }, []);

  useEffect(() => {
    console.log(address);
    if (address) getUserVotedProposalIds(address);
  }, [address]);

  return (
    <TheLayout>
      <div>
        <h1 className="hidden lg:mb-3 lg:block">Proposals</h1>

        {isAdmin && (
          <div className="mb-4 flex flex-col justify-end gap-x-3 gap-y-[10px] px-[20px] sm:flex-row md:px-0">
            <BaseLink
              link={{ pathname: '/create' }}
              hideExternalIcon
              data-testid="create-proposal-button"
            >
              <TuneButton className="w-full sm:w-auto">New proposal</TuneButton>
            </BaseLink>
            <TuneButton onClick={signOut}>Sign Out</TuneButton>
          </div>
        )}

        {queryLoading && <LoadingRow block />}

        {proposals.length < 1 && <BaseNoResults />}
        <div className="mb-3 space-y-3">
          {proposals.map((proposal, i) => (
            <BaseBlock key={i} slim className="transition-colors">
              <ProposalsItem
                proposal={proposal}
                voted={userVotedProposalIds.includes(proposal.proposalId)}
                to={{
                  pathname: `/proposal/${proposal.proposalId}`,
                }}
              />
            </BaseBlock>
          ))}
        </div>
      </div>
    </TheLayout>
  );
};

export default SpaceProposals;
