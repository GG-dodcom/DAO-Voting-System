import React from 'react';
import Tippy from '@tippyjs/react';
import { IHoAnnotation } from '../assets/icons';
import { Proposal, Vote } from '../utils/interfaces';
import { getChoiceString } from '../utils/utils';

interface Props {
  proposal: Proposal;
  vote: Vote;
  className?: string;
}

const SpaceProposalVotesListItemChoice: React.FC<Props> = ({
  proposal,
  vote,
  className,
}) => {
  const format = getChoiceString;

  return (
    <div className={`flex-auto truncate text-skin-link ${className}`}>
      <div className="flex items-center gap-1">
        <Tippy content={format(proposal, vote.choice)}>
          <div className="truncate text-skin-link w-fit max-w-full">
            {format(proposal, vote.choice)}
          </div>
        </Tippy>
        {vote.reason !== '' && (
          <Tippy
            content={`Reason: ${vote.reason}`}
            interactive={true}
            theme={'urlified'}
            trigger={'mouseenter focus click'}
            delay={100}
            appendTo={() => document.body}
          >
            <div>
              <button className="cursor-default !p-0 flex justify-center items-center">
                <IHoAnnotation className="text-[16px] " />
              </button>
            </div>
          </Tippy>
        )}
      </div>
    </div>
  );
};

export default SpaceProposalVotesListItemChoice;
