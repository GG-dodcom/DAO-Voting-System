import React, { useState, useEffect, useMemo } from 'react';
import {
  BaseBreadcrumbs,
  LabelProposalState,
  MessageWarningFlagged,
  TheLayout,
  ExploreProposal,
  SpaceProposalVoteSingleChoice,
} from '.';
import { Proposal } from '../utils/interfaces';

interface Props {
  proposal: Proposal;
}

const SpaceProposalPage: React.FC<Props> = ({ proposal }) => {
  // const { id: proposalId } = useParams<{ id: string }>();
  // const location = useLocation();
  // const { web3, web3Account } = useWeb3();
  // const { modalEmailOpen, setModalEmailOpen } = useModal();
  // const { isMessageVisible, setMessageVisibility } = useFlaggedMessageStatus(
  //   proposalId || ''
  // );

  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedChoices, setSelectedChoices] = useState<any>(null);
  // const [loadedResults, setLoadedResults] = useState(false);
  // const [results, setResults] = useState<Results | null>(null);
  // const [waitingForSigners, setWaitingForSigners] = useState(false);

  // const isAdmin = useMemo(() => {
  //   const admins = (space.admins || []).map((admin) => admin.toLowerCase());
  //   return admins.includes(web3Account?.toLowerCase() || '');
  // }, [space.admins, web3Account]);

  // const isModerator = useMemo(() => {
  //   const moderators = (space.moderators || []).map((moderator) =>
  //     moderator.toLowerCase()
  //   );
  //   return moderators.includes(web3Account?.toLowerCase() || '');
  // }, [space.moderators, web3Account]);

  // const strategies = useMemo(() => {
  //   return proposal?.strategies ?? space.strategies;
  // }, [proposal?.strategies, space.strategies]);

  // const boostEnabled = useMemo(() => {
  //   return (
  //     BOOST_ENABLED_VOTING_TYPES.includes(proposal.type) && space.boost.enabled
  //   );
  // }, [proposal.type, space.boost.enabled]);

  // const { modalAccountOpen, isModalPostVoteOpen, setIsModalPostVoteOpen } =
  //   useModal();
  // const { modalTermsOpen, termsAccepted, acceptTerms } = useTerms(space.id);

  // const clickVote = () => {
  //   if (!web3.account) {
  //     setModalAccountOpen(true);
  //   } else if (!termsAccepted && space.terms) {
  //     setModalTermsOpen(true);
  //   } else {
  //     setModalOpen(true);
  //   }
  // };

  // const reloadProposal = () => {
  //   // Implement reload logic here
  // };

  // const openPostVoteModal = (isWaitingForSigners: boolean) => {
  //   setWaitingForSigners(isWaitingForSigners);
  //   setIsModalPostVoteOpen(true);
  // };

  // const loadResults = async () => {
  //   // Implement loadResults logic here
  //   setLoadedResults(true);
  // };

  // const handleChoiceQuery = () => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const choice = searchParams.get('choice');
  //   if (web3Account && choice && proposal.state === 'active') {
  //     setSelectedChoices(parseInt(choice));
  //     clickVote();
  //   }
  // };

  // useEffect(() => {
  //   handleChoiceQuery();
  // }, [web3Account]);

  // useEffect(() => {
  //   loadResults();
  // }, [proposal]);

  // useEffect(() => {
  //   setMessageVisibility(proposal.flagged);
  // }, []);

  return (
    <>
      <BaseBreadcrumbs
        pages={[
          { id: '1', name: 'Home', to: '/', current: false },
          { id: '2', name: proposal.title, to: '/proposal', current: false },
        ]}
        className="px-[20px] md:px-4 -mt-1 pb-[16px] lg:pb-[20px]"
      />
      <SpaceProposalVoteSingleChoice
        proposal={proposal}
        userChoice={null}
        isEditing={false}
        onSelectChoice={function (choice: number | null): void {
          throw new Error('Function not implemented.');
        }}
      />
      {/* <TheLayout className="mt-[20px]">
        <div className="content-left">
          {isMessageVisible ? (
            <MessageWarningFlagged
              type="proposal"
              responsive
              onForceShow={() => setMessageVisibility(false)}
            />
          ) : (
            <>
              <div className="px-[20px] md:px-0">
                <LabelProposalState
                  state={proposal.state}
                  className="mb-[12px]"
                />
                <SpaceProposalHeader
                  space={space}
                  proposal={proposal}
                  isAdmin={isAdmin}
                  isModerator={isModerator}
                />
                <SpaceProposalContent space={space} proposal={proposal} />
              </div>
              <div className="space-y-[20px] md:space-y-4 px-[20px] md:px-0">
                <SpaceProposalVote
                  selectedChoices={selectedChoices}
                  proposal={proposal}
                  onOpen={() => setModalOpen(true)}
                  onClickVote={clickVote}
                />
                <SpaceProposalVotes space={space} proposal={proposal} />
              </div>
            </>
          )}
        </div>
        <div className="sidebar-right">
          {!isMessageVisible && (
            <div className="mt-[20px] lg:space-y-3 space-y-[20px] lg:mt-0 px-[20px] md:px-0">
              <SpaceProposalInformation
                space={space}
                proposal={proposal}
                strategies={strategies}
              />
              <SpaceProposalResults
                loaded={loadedResults}
                space={space}
                proposal={proposal}
                results={results}
                strategies={strategies}
                isAdmin={isAdmin}
                onReload={reloadProposal}
              />
              {Object.keys(space.plugins).length > 0 &&
                loadedResults &&
                results && (
                  <SpaceProposalPluginsSidebar
                    id={proposalId || ''}
                    space={space}
                    proposal={proposal}
                    results={results}
                    loadedResults={loadedResults}
                    strategies={strategies}
                  />
                )}
            </div>
          )}
        </div>
      </TheLayout>
      <ModalVote
        open={modalOpen}
        space={space}
        proposal={proposal}
        selectedChoices={selectedChoices}
        strategies={strategies}
        onClose={() => setModalOpen(false)}
        onReload={reloadProposal}
        onOpenPostVoteModal={openPostVoteModal}
      />
      <ModalTerms
        open={modalTermsOpen}
        space={space}
        action="Vote"
        onClose={() => setModalTermsOpen(false)}
        onAccept={() => {
          acceptTerms();
          setModalOpen(true);
        }}
      />
      <ModalPostVote
        open={isModalPostVoteOpen}
        space={space}
        proposal={proposal}
        selectedChoices={selectedChoices}
        waitingForSigners={waitingForSigners}
        onClose={() => setIsModalPostVoteOpen(false)}
        onSubscribeEmail={() => setModalEmailOpen(true)}
      /> */}
    </>
  );
};

export default SpaceProposalPage;
