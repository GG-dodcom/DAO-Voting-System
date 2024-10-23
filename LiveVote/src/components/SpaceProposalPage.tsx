/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import {
  BaseBreadcrumbs,
  LabelProposalState,
  TheLayout,
  SpaceProposalHeader,
  SpaceProposalContent,
  SpaceProposalInformation,
  SpaceProposalResults,
  SpaceProposalVote,
  ModalVote,
} from '.';
import { Proposal, Results } from '../utils/interfaces';
import { useRestfulAPI } from '../hooks';
import API_PATHS from '../utils/queries';
import { useAppKitAccount } from '@reown/appkit/react';

interface Props {
  proposal: Proposal;
  onReload: () => void;
}

const SpaceProposalPage: React.FC<Props> = ({ proposal }) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState<any>(null);
  const [loadedResults, setLoadedResults] = useState(false);
  const [results, setResults] = useState<Results>({
    scores_state: '',
    scores: [],
    scoresTotal: 0,
  });

  const { address } = useAppKitAccount();
  const { fetchQuery } = useRestfulAPI();

  const reloadProposal = () => {};

  // const openPostVoteModal = (isWaitingForSigners: boolean) => {
  //   setWaitingForSigners(isWaitingForSigners);
  //   setIsModalPostVoteOpen(true);
  // };

  const loadResults = async () => {
    if (proposal.state == 'closed' && proposal.result?.scores.length === 0) {
      try {
        const result: any = await fetchQuery(
          API_PATHS.fetchScores
          //   {
          //   id: proposal.id,
          // }
        );

        proposal.result.scores_state = result.scores_state;
        proposal.result.scores = result.scores;
        proposal.result.scoresTotal = result.scoresTotal;

        setResults(proposal.result);

        console.log('proposal.result', proposal.result);
      } catch (e) {
        console.error('Error fetching scores', e);
      }
    }
    setLoadedResults(true);
  };

  const clickVote = () => {
    if (address) {
      setModalOpen(true);
    }
  };

  const handleChoiceQuery = () => {
    const searchParams = new URLSearchParams(location.search);
    const choice = searchParams.get('choice');
    if (address && choice && proposal.state === 'active') {
      setSelectedChoices(parseInt(choice));
      clickVote();
    }
  };

  useEffect(() => {
    handleChoiceQuery();
  }, [address]);

  useEffect(() => {
    if (proposal.state == 'closed') loadResults();
  }, [proposal]);

  return (
    <div>
      <BaseBreadcrumbs
        pages={[
          { id: '1', name: 'Home', to: '/', current: false },
          {
            id: '2',
            name: proposal.title,
            to: '/proposal/:id',
            current: true,
          },
        ]}
        className="px-[20px] md:px-4 -mt-1 pb-[16px] lg:pb-[20px]"
      />
      <TheLayout
        className="mt-[20px]"
        contentLeft={
          <div>
            <div className="px-[20px] md:px-0">
              <LabelProposalState
                state={proposal.state}
                className="mb-[12px]"
              />
              <SpaceProposalHeader proposal={proposal} isAdmin={isAdmin} />
              <SpaceProposalContent proposal={proposal} />
            </div>
          </div>
        }
        sidebarRight={
          <div>
            <div className="mt-[20px] lg:space-y-3 space-y-[20px] lg:mt-0 px-[20px] md:px-0">
              <SpaceProposalInformation proposal={proposal} />
              <SpaceProposalResults
                loaded={loadedResults}
                proposal={proposal}
                results={results}
              />
            </div>
          </div>
        }
      />

      <div>
        <div className="px-0 md:px-4 mx-auto max-w-[1012px] mt-[20px]">
          <SpaceProposalVote
            modelValue={selectedChoices}
            proposal={proposal}
            onUpdateModelValue={(choice: any) => setSelectedChoices(choice)}
            onClickVote={clickVote}
          />
          {/* <SpaceProposalVotes space={space} proposal={proposal} /> */}
        </div>
      </div>

      {modalOpen && (
        <ModalVote
          open={modalOpen}
          proposal={proposal}
          selectedChoices={selectedChoices - 1}
          onClose={() => setModalOpen(false)}
          onReload={reloadProposal}
        />
      )}
    </div>
  );
};

export default SpaceProposalPage;
