/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  BaseAvatar,
  BaseBlock,
  BaseContainer,
  BaseNoResults,
  ExploreSkeletonLoading,
} from '.';
import { shorten } from '../utils/utils';
import { IHoCheck } from '../assets/icons';
import { Proposal } from '../utils/interfaces';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Tippy from '@tippyjs/react';

interface Props {
  proposal: Proposal;
  userChoice: number | null;
  isEditing: boolean;
  onSelectChoice: (choice: number | null) => void;
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
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [proposal]);

  const selectChoice = (i: number) => {
    if (userChoice && !isEditing) return;
    setSelectedChoice(i);
    onSelectChoice(i);
  };

  useEffect(() => {
    console.log(proposal);
    if (!selectedChoice) {
      setSelectedChoice(userChoice);
    }
    onSelectChoice(selectedChoice);
  }, [userChoice, selectedChoice, onSelectChoice]);

  return (
    <div className="relative">
      <BaseContainer slim>
        {loading ? (
          <ExploreSkeletonLoading />
        ) : proposal.choices.length < 1 ? (
          <BaseNoResults />
        ) : (
          <TransitionGroup
            name="fade"
            tag="div"
            className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4"
          >
            {proposal.choices.map((choice, i) => {
              const shouldRender =
                isEditing || userChoice === i + 1 || !userChoice;
              if (!shouldRender) return null;

              return (
                <CSSTransition key={i} timeout={300} classNames="fade">
                  <button
                    className={`tune-button md:rounded-xl md:border mb-0 flex items-center justify-center text-center transition-all
                      ${selectedChoice === i + 1 ? 'border-skin-link' : ''}
                      ${!isEditing ? 'cursor-default' : ''}`}
                    style={{ height: '244px' }}
                    onClick={() => selectChoice(i + 1)} // Adjust as necessary for your logic
                  >
                    <BaseBlock className="!border-0">
                      <div className="relative mb-2 inline-block">
                        <div className="mb-1">
                          <BaseAvatar
                            size="150"
                            src={`http://localhost:8080/${choice.avatar}`}
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-1 truncate">
                        {choice.name.length > 12 ? (
                          <Tippy
                            content={choice.name.length > 12 ? choice.name : ''}
                          >
                            <h3 className="mb-0 mt-0 !h-[32px] overflow-hidden pb-0 text-[22px]">
                              {shorten(choice.name, 12)}
                            </h3>
                          </Tippy>
                        ) : (
                          <h3 className="mb-0 mt-0 !h-[32px] overflow-hidden pb-0 text-[22px]">
                            {shorten(choice.name, 12)}
                          </h3>
                        )}
                        {selectedChoice === i + 1 && <IHoCheck />}
                      </div>
                    </BaseBlock>
                  </button>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        )}
      </BaseContainer>
    </div>
  );
};

export default SpaceProposalVoteSingleChoice;
