import React from 'react';
import { Proposal } from '../utils/interfaces';
import { shorten } from '../utils/utils';
import { IHoCheck } from '../assets/icons';
import { useIntl } from '../hooks/useIntl';

interface ProposalsItemResultsProps {
  proposal: Proposal;
}

//TODO: FIX ERROR
const ProposalsItemResults: React.FC<ProposalsItemResultsProps> = ({
  proposal,
}) => {
  const { formatCompactNumber, formatPercentNumber } = useIntl();
  // Calculate the winning choice
  const winningChoice = proposal.result?.scores.indexOf(Math.max(...proposal.result?.scores));

  return (
    <div className={`${!proposal.body ? 'mt-3' : ''}`}>
      {proposal.choices?.map((choice, i) => (
        <div key={i} className="relative mt-1 w-full">
          {proposal.choices &&
            (proposal.choices.length <= 3 || i === winningChoice) && (
              <>
                <div className="absolute ml-3 flex items-center leading-[43px] text-skin-link">
                  {i === winningChoice && (
                    <IHoCheck className="-ml-1 mr-2 text-sm" />
                  )}
                  {shorten(choice.name, 32)}
                  <span className="ml-1 text-skin-text">
                    {proposal.result?.scores && formatCompactNumber(proposal.result?.scores[i])}
                    {proposal.symbol}
                  </span>
                </div>
                <div className="absolute right-0 mr-3 leading-[40px] text-skin-link">
                  {proposal.result?.scores &&
                    proposal.result?.scoresTotal &&
                    formatPercentNumber(
                      (1 / proposal.result?.scoresTotal) * proposal.result?.scores[i]
                    )}
                </div>
                <div
                  style={{
                    width: `${
                      proposal.result?.scores &&
                      proposal.result?.scoresTotal &&
                      (100 / proposal.result?.scoresTotal) * proposal.result?.scores[i]
                    }%`,
                  }}
                  className="h-[40px] rounded-md bg-skin-border"
                />
              </>
            )}
        </div>
      ))}
    </div>
  );
};

export default ProposalsItemResults;
