/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { LoadingSpinner, SpaceProposalPage } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import { Proposal } from '../utils/interfaces';
import { useRestfulAPI } from '../hooks';
import API_PATHS from '../utils/queries';

const SpaceProposal: React.FC = () => {
  const proposalId = useParams<{ id: string }>();
  const [loadingProposal, setLoadingProposal] = useState(false);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const { fetchQuery } = useRestfulAPI();
  const navigate = useNavigate();

  // Load proposal details
  const loadProposal = async () => {
    console.log('proposalId', proposalId);

    const fetchedProposal: any = await fetchQuery(
      API_PATHS.fetchProposalDetails + '/' + proposalId.id
    );
    if (!fetchedProposal) return navigate('/');

    const initializedProposal = {
      ...fetchedProposal,
      type: 'single-choice',
    };

    setProposal(initializedProposal);
  };

  // On component mount, load the proposal
  useEffect(() => {
    setLoadingProposal(true);
    loadProposal().finally(() => setLoadingProposal(false));
  }, [proposalId]);

  return (
    <div>
      {loadingProposal ? (
        <LoadingSpinner className="overlay big" />
      ) : (
        proposal && (
          <SpaceProposalPage proposal={proposal} onReload={loadProposal} />
        )
      )}
    </div>
  );
};

export default SpaceProposal;
