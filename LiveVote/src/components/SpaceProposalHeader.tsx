/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Proposal } from '../utils/interfaces';
import {
  BaseAvatar,
  BaseButtonIcon,
  BaseMessageBlock,
  LoadingList,
  QRCodeScanner,
  TuneModal,
  TuneModalTitle,
} from '.';
import { ISScanqr } from '../assets/icons';
import { t } from 'i18next';
import { useRestfulAPI } from '../hooks';
import API_PATHS from '../utils/queries';
import { useFlashNotification } from '../context';
// import { useNavigate } from 'react-router-dom';
// import { useFormSpaceProposal } from '../hooks/useFormSpaceProposal';
import { useAppKitAccount } from '@reown/appkit/react';

interface Props {
  proposal: Proposal;
  isAdmin: boolean;
}

const SpaceProposalHeader: React.FC<Props> = ({ proposal, isAdmin }) => {
  // const navigate = useNavigate();
  const { notify } = useFlashNotification();
  // const { resetForm } = useFormSpaceProposal();
  const { fetchQuery } = useRestfulAPI();
  const { address, isConnected } = useAppKitAccount();

  const [isOpenQrModal, setOpenQrModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // const threeDotItems = () => {
  //   const items: { text: string; action: string }[] = [];
  //   if (proposal.state === 'pending')
  //     items.push({ text: t('edit'), action: 'edit' });
  //   items.push({ text: t('duplicate'), action: 'duplicate' });
  //   items.push({ text: 'Delete', action: 'delete' });

  //   return items;
  // };

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

    try {
      // Step 1: Validate QR Code
      const validate: any = await fetchQuery(API_PATHS.validQrStatus, {
        proposalId: proposal.proposalId,
        qrCode: scanned,
      });

      console.log('validate', validate);

      if (validate.statusCode === 404) {
        notify(['red', validate.message]); //QR not found
        return;
      }

      // Step 2: Redeem Token
      if (validate.statusCode === 200 && validate.message === 'true') {
        notify(['red', 'Token already redeemed.']);
        return;
      }

      // Step 2: Redeem Token
      const redeemToken: any = await fetchQuery(API_PATHS.redeemToken, {
        roomId: proposal.proposalId,
        userAddress: address,
      });

      console.log('redeemToken', redeemToken);

      if (redeemToken.status === 500) {
        notify(['red', redeemToken.message]);
        return;
      }

      if (address && isConnected) {
        const updateQrStatus: any = await updateQrStatusHandler(
          API_PATHS.updateQrStatus,
          proposal.proposalId,
          address,
          scanned
        );

        // Step 3: Update database status
        if (updateQrStatus) {
          console.log('updateQrStatus', updateQrStatus);

          if (updateQrStatus.status === 500) {
            notify(['red', updateQrStatus.message]);
          } else {
            notify(['green', updateQrStatus.message]);
          }
        } else {
          notify(['red', 'Failed to update QR status.']);
        }
      }
    } finally {
      closeQrModal();
    }
  };

  const updateQrStatusHandler = async (
    api_path: string,
    proposalId: string,
    userWalletAddress: string,
    qrCode: string
  ) => {
    if (!proposalId || !userWalletAddress || !qrCode) {
      notify(['red', 'Missing required fields for updating QR Code status.']);
      return;
    }

    try {
      // Construct the query string for the RequestParam API
      const queryParams = new URLSearchParams({
        proposalId,
        userWalletAddress,
        qrCode,
      });

      // Call the API with query parameters
      const response = await fetch(`${api_path}?${queryParams}`, {
        method: 'POST',
      });

      const updateQrStatus: any = await response.json();

      return updateQrStatus;
    } catch (error) {
      console.error('Error during API call:', error);
      notify(['red', 'Failed to update QR Code status.']);
    }
  };

  useEffect(() => {
    if (isOpenQrModal == true) return;
    const timer = setTimeout(() => {
      setIsProcessing(false);
    }, 1000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [isOpenQrModal]);

  // const deleteProposal = async () => {
  //   const result: any = await postQuery(API_PATHS.deleteProposal, {
  //     id: proposal.proposalId,
  //   });
  //   console.log('Result', result);
  //   if (result.id) {
  //     notify(['green', t('notify.proposalDeleted')]); // Replace with your localization function
  //     navigate('/');
  //   }
  // };

  // const handleSelect = async (e: string) => {
  //   if (!proposal) return;
  //   if (e === 'delete') deleteProposal();
  //   if (e === 'duplicate' || e === 'edit') {
  //     resetForm();
  //     navigate(`/spaceCreate`, {
  //       state: {
  //         key: proposal.proposalId,
  //         editing: e === 'edit' ? 'true' : undefined,
  //       },
  //     });
  //   }
  // };

  return (
    <div className="mb-4 flex">
      <div className="flex items-center space-x-1">
        <div className="flex items-center">
          <BaseAvatar
            src={`http://localhost:8080/${proposal.avatar}`}
            size={'48'}
          />
          <h1
            className="ml-1 group-hover:text-skin-link break-words text-xl leading-8 sm:leading-[44px] sm:text-2xl"
            data-testid="proposal-page-title"
          >
            {proposal.title}
          </h1>
        </div>
      </div>
      <div className="flex grow items-center space-x-3">
        {!isAdmin && (
          <BaseButtonIcon onClick={openQrModal} className="ml-3">
            <ISScanqr className="h-[46px] w-[46px]" />
          </BaseButtonIcon>
        )}

        {/*  {isAdmin ? (
          <BaseMenu
            className="!ml-auto pl-3"
            items={threeDotItems()}
            onSelect={handleSelect}
          >
            {{
              button: (
                <BaseButtonIcon loading={queryLoading} className="!p-0">
                  <IHoDotsHorizontal />
                </BaseButtonIcon>
              ),
              item: (item) => (
                <div className="flex items-center gap-2">
                  {item.action === 'edit' && <IHoPencil />}
                  {item.action === 'duplicate' && <IHoDocumentDuplicate />}
                  {item.action === 'delete' && <IHoTrash />}
                  {item.text}
                </div>
              ),
            }}
          </BaseMenu>
        ) : (
          <></>
        )}  */}
      </div>

      <TuneModal open={isOpenQrModal} onClose={closeQrModal}>
        {!isProcessing ? (
          <div className="mx-3">
            <TuneModalTitle className="mt-3 mx-1">
              {t('scanQrLabel')}
            </TuneModalTitle>

            <div className="space-y-3 text-skin-link">
              <BaseMessageBlock level={'info'}>
                <span>{t('scanQrMessage')}</span>
              </BaseMessageBlock>
            </div>

            <div className="h-[229.5px] mb-3 mt-3 flex gap-x-[12px]">
              <QRCodeScanner
                onScanned={(scanned: string) => {
                  if (!isProcessing) {
                    setIsProcessing(true); // Block further actions
                    checkTokenRedeem(scanned);
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <LoadingList />
        )}
      </TuneModal>
    </div>
  );
};

export default SpaceProposalHeader;
