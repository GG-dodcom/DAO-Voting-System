import React, { useMemo } from 'react';
import { Proposal, Results } from '../utils/interfaces';
import { SpaceProposalResultsListItem, SpaceProposalResultsQuorum } from '.';

interface Props {
  proposal: Proposal;
  results: Results;
}

const SpaceProposalResultsList: React.FC<Props> = ({ proposal, results }) => {
  // Compute choices and sort based on scores
  const choices = useMemo(
    () =>
      proposal.choices
        .map((choice, i) => ({ i, choice: choice.name }))
        .sort((a, b) => results.scores[b.i] - results.scores[a.i]),
    [proposal.choices, results.scores]
  );

  return (
    <div className="space-y-3">
      {choices.map((choice) => (
        <SpaceProposalResultsListItem
          key={choice.i}
          choice={choice}
          proposal={proposal}
          results={results}
        />
      ))}
      <SpaceProposalResultsQuorum proposal={proposal} results={results} />
    </div>
  );
};

export default SpaceProposalResultsList;
