/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from 'react';
import {
  BaseMessage,
  SpaceProposalVoteSingleChoice,
  TuneBlock,
  TuneBlockHeader,
  TuneButton,
} from '.';
import Tippy from '@tippyjs/react';
import { IHoLockClosed } from '../assets/icons';
import { t } from 'i18next';
import { Proposal } from '../utils/interfaces';
import { useProposalVotes } from '../hooks/useProposalVotes';
import { useAppKitAccount } from '@reown/appkit/react';
import SingleChoiceVoting from '../hooks/singleChoice';

interface Props {
  proposal: Proposal;
  modelValue: number | null;
  onUpdateModelValue: (choice: number | null) => void;
  onClickVote: () => void;
}

const SpaceProposalVote: React.FC<Props> = ({
  proposal,
  modelValue,
  onUpdateModelValue,
  onClickVote,
}) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const { address, isConnected } = useAppKitAccount();
  const { userVote, loadUserVote, loadingUserVote } =
    useProposalVotes(proposal);
  const [isEditing, setIsEditing] = useState(false);

  // Validate user choice
  const validatedUserChoice = useMemo(() => {
    // Check if there are selected choices
    if (modelValue && typeof modelValue === 'number') {
      return SingleChoiceVoting.isValidChoice(
        modelValue,
        proposal.choices.map((choice) => choice.name)
      )
        ? modelValue
        : null;
    }

    // Check userVote and validate it
    if (!userVote?.choice) return null;
    const userVoteChoice =
      proposal.choices.findIndex(
        (choice) => choice.choiceId === userVote.choice
      ) + 1;

    if (
      SingleChoiceVoting.isValidChoice(
        userVoteChoice,
        proposal.choices.map((choice) => choice.name)
      )
    )
      return userVoteChoice as any;

    return null;
  }, [modelValue, userVote]);

  // Tooltip for button
  const buttonTooltip = useMemo(() => {
    if (isAdmin) return 'Admin unable to vote';

    if (!address) return 'Please connect wallet';

    if (
      proposal.type === 'single-choice' &&
      (modelValue == null || modelValue == 0)
    )
      return 'Please select one choices';

    return null;
  }, [modelValue]);

  /* When the Web3 account changes, reset any ongoing actions related to the 
  previous user (e.g., editing votes) and load the votes specific to the newly 
  connected user. */
  useEffect(() => {
    setIsEditing(false);
    loadUserVote(address || '');
  }, [address, isConnected]);

  /* When the user is viewing or voting on a different proposal, reset
  any ongoing vote editing and reload the vote data for the new proposal. */
  useEffect(() => {
    setIsEditing(false);
    loadUserVote(address || '');
  }, [proposal, address]);

  const handleChoiceChange = (choice: number | null) => {
    onUpdateModelValue(choice);
  };

  return (
    <>
      {!loadingUserVote && (userVote || proposal.state === 'active') && (
        <TuneBlock
          className={''}
          header={
            <TuneBlockHeader
              title={
                proposal.state == 'active' && isEditing
                  ? 'Change your vote'
                  : proposal.state == 'active' && userVote
                  ? 'Your vote'
                  : 'Cast your vote'
              }
            >
              {/* {!isEditing && userVote && proposal.state === "active" && (
								<Tippy content={"Change your vote"} delay={100}>
									<BaseButtonIcon
										className="!p-0 !pr-1"
										onClick={() => setIsEditing(true)}
									>
										<IHoPencil className="text-sm" />
									</BaseButtonIcon>
								</Tippy>
							)} */}
            </TuneBlockHeader>
          }
        >
          <div>
            {!isEditing && userVote && proposal.state != 'closed' && (
              <div className="border px-3 py-[12px] rounded-xl bg-[--border-color-subtle]">
                <IHoLockClosed className="inline-block text-sm" />
                Your vote is encrypted until the proposal ends and the final
                score is calculated.
              </div>
            )}
            {userVote && !validatedUserChoice && !isEditing && (
              <BaseMessage
                level="info"
                className="border px-3 py-[12px] rounded-xl bg-[--border-color-subtle]"
              >
                Oops, we were unable to validate your vote. Please try voting
                again.
              </BaseMessage>
            )}
            <div>
              {proposal.type === 'single-choice' && (
                <SpaceProposalVoteSingleChoice
                  proposal={proposal}
                  userChoice={validatedUserChoice}
                  isEditing={isEditing || !userVote}
                  onSelectChoice={handleChoiceChange}
                />
              )}
            </div>
            {(!userVote || isEditing) && proposal.state == 'active' && (
              // (buttonTooltip ? (
              <Tippy content={buttonTooltip} disabled={!buttonTooltip}>
                <div className="pt-4">
                  <TuneButton
                    disabled={!isConnected || buttonTooltip != null}
                    className="block w-full"
                    primary
                    data-testid="proposal-vote-button"
                    onClick={onClickVote}
                  >
                    {t('proposal.vote')}
                  </TuneButton>
                </div>
              </Tippy>
            )}
          </div>
        </TuneBlock>
      )}
    </>
  );
};

export default SpaceProposalVote;
