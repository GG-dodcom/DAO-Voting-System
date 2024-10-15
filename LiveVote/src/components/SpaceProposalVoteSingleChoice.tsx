/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Proposal } from '../utils/interfaces';
import {
  BaseAvatar,
  BaseBlock,
  BaseContainer,
  BaseNoResults,
  ExploreSkeletonLoading,
  TuneButton,
} from '.';
import { shorten } from '../utils/utils';
import { IHoCheck } from '../assets/icons';
import { t } from 'i18next';

interface Props {
  proposal: Proposal;
  userChoice: number | null;
  isEditing: boolean;
  onSelectChoice: (choice: number | null) => void; // Emit function to handle choice selection
}

const SpaceProposalVoteSingleChoice: React.FC<Props> = ({
  proposal,
  userChoice,
  isEditing,
  onSelectChoice,
}) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (proposal) {
      // Simulate a delay for showing loading (e.g., fetching additional data)
      const timer = setTimeout(() => {
        setLoading(false); // Stop loading once data is available
      }, 1000);

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [proposal]);

  const selectChoice = (i: number) => {
    if (userChoice && !isEditing) return;
    setSelectedChoice(i);
    onSelectChoice(i);
  };

  useEffect(() => {
    if (!selectedChoice) {
      setSelectedChoice(userChoice);
    }
    onSelectChoice(selectedChoice);
  }, [userChoice, selectedChoice, onSelectChoice]);

  return (
    <div>
      <div className="mb-4 flex flex-col flex-wrap items-center xs:flex-row md:flex-nowrap">
        <BaseContainer>
          {proposal.choices && (
            <div className="mt-2 whitespace-nowrap text-right text-skin-text xs:ml-auto xs:mt-0">
              {t('choicesCount', {
                0: proposal.choices.length,
              })}
            </div>
          )}
        </BaseContainer>
      </div>

      <BaseContainer slim>
        {loading ? (
          <ExploreSkeletonLoading />
        ) : proposal.length < 1 ? (
          <BaseNoResults />
        ) : (
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {proposal.choices.map((choice, i) => {
              const shouldRender =
                isEditing || userChoice === i + 1 || !userChoice;
              if (!shouldRender) return null;

              return (
                <>
                  <div
                    className="mb-0 flex items-center justify-center text-center transition-all hover:border-skin-text"
                    style={{ height: '266px' }}
                  >
                    <BaseBlock>
                      <div className="relative mb-2 inline-block">
                        <div className="mb-1">
                          <BaseAvatar
                            size="82"
                            src={
                              typeof choice.avatar === 'string'
                                ? choice.avatar
                                : ''
                            }
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-1 truncate">
                        <h3 className="mb-0 mt-0 !h-[32px] overflow-hidden pb-0 text-[22px]">
                          {shorten(choice.name, 32)}
                        </h3>
                      </div>
                      <TuneButton
                        key={i}
                        className={`relative mb-2 last:mb-0 block w-full text-left ${
                          selectedChoice === i + 1 ? 'border-skin-link' : ''
                        } ${!isEditing ? 'cursor-default' : ''}`}
                        data-testid={`sc-choice-button-${i}`}
                        onClick={() => selectChoice(i + 1)}
                      >
                        <BaseAvatar src={'https://ibb.co/s1qwbgJ'} />
                        {selectedChoice === i + 1 && (
                          <IHoCheck className="absolute right-[20px]" />
                        )}
                        {shorten(choice.name, 32)}
                      </TuneButton>
                    </BaseBlock>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </BaseContainer>
    </div>
  );
};

export default SpaceProposalVoteSingleChoice;
