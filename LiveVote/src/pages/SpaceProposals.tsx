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
import { Proposal } from '../utils/interfaces';
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
  const { address } = useAppKitAccount();
  const navigate = useNavigate();

  const openQrModal = () => {
    setOpenQrModal(!isOpenQrModal);
  };

  const closeQrModal = () => {
    setOpenQrModal(false);
  };

  const checkTokenRedeem = (scanned: string) => {
    if (!scanned) return;
    setIsProcessing(true);

    //TODO: check is scanned text able to get token or not
    const isRedeemable = true; // Replace with actual validation logic

    if (isRedeemable) {
      notify(['green', `Successfully redeemed: ${scanned}`]);
    } else {
      notify(['red', `Cannot redeem: ${scanned}`]);
    }
    closeQrModal();
  };

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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h1 className="lg:block">Proposals</h1>
            <BaseButtonIcon onClick={openQrModal}>
              <ISScanqr className="h-[46px] w-[46px]" />
            </BaseButtonIcon>
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
            Scan Ticket to Vote
            {/* {t('proposal.')} */}
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
