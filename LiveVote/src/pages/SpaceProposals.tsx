/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  BaseBlock,
  BaseButtonIcon,
  BaseLink,
  BaseMessageBlock,
  BaseNoResults,
  LoadingRow,
  QRCodeScanner,
  TheLayout,
  TuneButton,
  TuneModal,
  TuneModalTitle,
} from '../components';
import { Proposal, Result } from '../utils/interfaces';
import ProposalsItem from '../components/ProposalsItem';
import { useRestfulAPI } from '../hooks';
import API_PATHS from '../utils/queries';
import { useAppKitAccount } from '@reown/appkit/react';
import { useNavigate } from 'react-router-dom';
import { ISScanqr } from '../assets/icons';
import { useFlashNotification } from '../context';
import { t } from 'i18next';

const SpaceProposals: React.FC = () => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [userVotedProposalIds, setUserVotedProposalIds] = useState<string[]>(
    []
  );
  const [isOpenQrModal, setOpenQrModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { fetchQuery, queryLoading } = useRestfulAPI();
  const { notify } = useFlashNotification();
  const { address, isConnected } = useAppKitAccount();
  const navigate = useNavigate();

  const openQrModal = () => {
    if (isConnected) setOpenQrModal(!isOpenQrModal);
    else notify(['red', 'Please connect wallet before redeem token.']);
  };

  const closeQrModal = () => {
    setOpenQrModal(false);
  };

  const checkTokenRedeem = async (scanned: string) => {
    if (!scanned) return;
    setIsProcessing(true);

    //TODO: check is scanned text able to get token or not
    const isRedeemable: any = await fetchQuery(
      API_PATHS.checkTokenRedeem
      //   {
      //   qrcode: scanned,
      // }
    );

    if (isRedeemable.success) {
      notify(['green', isRedeemable.message]);
    } else {
      notify(['red', isRedeemable.message]);
    }
    closeQrModal();
  };

  const getProposals = async () => {
    try {
      // Fetch proposals data
      const proposalsResponse = await fetchQuery(API_PATHS.fetchProposals);

      let resultsResponse: Result[] = [];

      try {
        // Attempt to fetch results data
        resultsResponse = await fetchQuery(API_PATHS.fetchAllScores);
      } catch (err) {
        console.warn(
          'Results data could not be fetched. Proceeding without results: ',
          err
        );
      }

      // Match results with proposals based on proposalId
      const mergedProposals = proposalsResponse.map((proposal: Proposal) => {
        // Find the matching result by proposalId, or default to undefined
        const matchingResult = resultsResponse.find(
          (result: Result) => result.proposalId === proposal.proposalId
        );

        // Return the proposal with the matched result, or only the proposal if no result
        return { ...proposal, result: matchingResult || undefined };
      });

      // Update the proposals state
      setProposals(mergedProposals);

      console.log('mergedProposals: ', mergedProposals);
    } catch (error) {
      console.error('Error fetching proposals:', error);
    }
  };

  const getUserVotedProposalIds = async (voter: string) => {
    if (!voter) return;

    //TODO:
    const votes = await fetchQuery(
      API_PATHS.fetchUserVotedProposalIds
      //   {
      //   address: voter,
      // }
    );

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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h1 className="lg:block">Proposals</h1>
            {!isAdmin && (
              <BaseButtonIcon onClick={openQrModal}>
                <ISScanqr className="h-[46px] w-[46px]" />
              </BaseButtonIcon>
            )}
          </div>

          {isAdmin && (
            <div className="flex items-center gap-x-3">
              <BaseLink
                link={{ pathname: '/create' }}
                hideExternalIcon
                data-testid="create-proposal-button"
              >
                <TuneButton className="w-full sm:w-auto">
                  New proposal
                </TuneButton>
              </BaseLink>
              <TuneButton onClick={signOut}>Sign Out</TuneButton>
            </div>
          )}
        </div>

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

      <TuneModal open={isOpenQrModal} onClose={closeQrModal}>
        <div className="mx-3">
          <TuneModalTitle className="mt-3 mx-1">
            {t('scanQrLabel.')}
          </TuneModalTitle>

          <div className="space-y-3 text-skin-link">
            <BaseMessageBlock level={'info'}>
              <span>{t('scanQrMessage')}</span>
            </BaseMessageBlock>
          </div>

          <div className="h-[229.5px] mb-3 mt-3 flex gap-x-[12px]">
            <QRCodeScanner
              onScanned={(scanned: string) => {
                if (!isProcessing) checkTokenRedeem(scanned);
              }}
            />
          </div>
        </div>
      </TuneModal>
    </TheLayout>
  );
};

export default SpaceProposals;
