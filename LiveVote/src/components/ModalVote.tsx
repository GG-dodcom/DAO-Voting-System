/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { t } from 'i18next';
import Tippy from '@tippyjs/react';
import { Proposal } from '../utils/interfaces';
import {
  BaseMessageBlock,
  LoadingSpinner,
  TextareaAutosize,
  TuneButton,
  TuneModal,
  TuneModalTitle,
} from '.';
import { IHoExclamationCircle } from '../assets/icons';
import { useIntl } from '../hooks/useIntl';
import { shorten } from '../utils/utils';
import { useRestfulAPI } from '../hooks';
import API_PATHS from '../utils/queries';
import { useFlashNotification } from '../context';

interface Props {
  open: boolean;
  proposal: Proposal;
  selectedChoices: number;
  onReload: () => void;
  onClose: () => void;
}

const ModalVote: React.FC<Props> = ({
  open,
  proposal,
  selectedChoices,
  onReload,
  onClose,
}) => {
  const [votingPower, setVotingPower] = useState(0);
  const [reason, setReason] = useState<any>('');
  const [hasVotingPowerFailed, setHasVotingPowerFailed] = useState(false);
  const [isValidationAndPowerLoading, setIsValidationAndPowerLoading] =
    useState(false);
  const [isValidationAndPowerLoaded, setIsValidationAndPowerLoaded] =
    useState(false);
  const symbol = proposal.symbol || '';

  const { address } = useAppKitAccount();
  const { formatCompactNumber } = useIntl();
  const { fetchQuery, postQuery, queryLoading } = useRestfulAPI();
  const { notify } = useFlashNotification();

  const handleSubmit = async () => {
    console.log('call smart contract');

    const result: any = null;

    console.log('Result', result);

    if (!result.success) {
      notify(['red', result.result.message]);
    } else {
      await postQuery(API_PATHS.vote, {
        proposalId: proposal.id,
        choice: selectedChoices,
        reason,
      });
      console.log('save vote data');
    }
    onClose();
    // onReload();
  };

  const loadVotingPower = async () => {
    setHasVotingPowerFailed(false);

    // send request to check token balance
    try {
      const powerRes: any = await fetchQuery(
        API_PATHS.fetchTokenBalance
        //   {
        //   voter: address,
        //   proposalId: proposal.id,
        // }
      );
      setVotingPower(powerRes.balance);
    } catch (e) {
      setHasVotingPowerFailed(true);
      console.log(e);
    }
  };

  const loadValidationAndPower = async () => {
    setIsValidationAndPowerLoading(true);
    try {
      await Promise.all([loadVotingPower()]);
    } catch (e) {
      console.log(e);
    } finally {
      setIsValidationAndPowerLoading(false);
      setIsValidationAndPowerLoaded(true);
    }
  };

  useEffect(() => {
    if (!open) return;
    loadValidationAndPower();
  }, [open, address]);

  return (
    <TuneModal open={open} hideClose onClose={onClose}>
      <div className="mx-3">
        <TuneModalTitle className="mt-3 mx-1">
          {t('proposal.castVote')}
        </TuneModalTitle>

        <div className="space-y-3 text-skin-link">
          <div className="mx-1">
            <div className="flex">
              <span className="mr-1 flex-auto text-skin-text">
                {t('choice')}
              </span>
              <Tippy
                content={proposal.choices[selectedChoices].name}
                disabled={proposal.choices[selectedChoices].name.length < 30}
              >
                <span className="ml-4 truncate text-right">
                  {proposal.choices[selectedChoices].name}
                </span>
              </Tippy>
            </div>

            <div className="flex">
              <span className="mr-1 flex-auto text-skin-text">
                {t('votingPower')}
              </span>
              {hasVotingPowerFailed ? (
                <span className="flex items-center gap-1">
                  <IHoExclamationCircle className="text-sm text-red" />
                  {t('failed')}
                </span>
              ) : isValidationAndPowerLoaded && !isValidationAndPowerLoading ? (
                <Tippy
                  content={`${formatCompactNumber(votingPower)} ${symbol}`}
                >
                  <span>
                    {formatCompactNumber(votingPower)}{' '}
                    {shorten(symbol || '', 'symbol')}
                  </span>
                </Tippy>
              ) : (
                <LoadingSpinner />
              )}
            </div>
          </div>

          {isValidationAndPowerLoaded && !isValidationAndPowerLoading && (
            <>
              {
                /* No voting power */
                votingPower === 0 ? (
                  <BaseMessageBlock level={'warning'}>
                    <span>
                      {t('noVotingPower', {
                        performanceName: proposal.title,
                      })}
                    </span>
                  </BaseMessageBlock>
                ) : (
                  /* Reason field */
                  <div>
                    <TextareaAutosize
                      value={reason}
                      maxLength={140}
                      className="s-input !rounded-xl"
                      placeholder={t('comment.placeholder')}
                      onChange={(value) => setReason(value)}
                    />
                  </div>
                )
              }
            </>
          )}
        </div>

        <div className="mb-3 mt-5 flex gap-x-[12px]">
          <TuneButton type="button" className="w-full" onClick={onClose}>
            {t('cancel')}
          </TuneButton>
          <TuneButton
            onClick={handleSubmit}
            disabled={
              votingPower === 0 || queryLoading || isValidationAndPowerLoading
            }
            loading={queryLoading}
            className="w-full"
            primary
            data-testid="confirm-vote-button"
          >
            {t('confirm')}
          </TuneButton>
        </div>
      </div>
    </TuneModal>
  );
};

export default ModalVote;
