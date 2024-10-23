/* eslint-disable @typescript-eslint/no-explicit-any */
import { SingleChoiceVote } from '../utils/interfaces';

export default class SingleChoiceVoting {
  proposal: { choices: string[] };
  votes: SingleChoiceVote[];
  selected: number;

  constructor(
    proposal: { choices: string[] },
    votes: SingleChoiceVote[],
    selected: number
  ) {
    this.proposal = proposal;
    this.votes = votes;
    this.selected = selected;
  }

  static isValidChoice(
    voteChoice: number | any,
    proposalChoices: string[]
  ): boolean {
    return (
      typeof voteChoice === 'number' &&
      proposalChoices?.[voteChoice - 1] !== undefined
    );
  }

  getValidVotes(): SingleChoiceVote[] {
    return this.votes.filter((vote) =>
      SingleChoiceVoting.isValidChoice(vote.choice, this.proposal.choices)
    );
  }

  getScores(): number[] {
    return this.proposal.choices.map((choice, i) => {
      const votes = this.getValidVotes().filter(
        (vote) => vote.choice === i + 1
      );
      const balanceSum = votes.reduce((a, b) => a + b.balance, 0);
      return balanceSum;
    });
  }

  getScoresTotal(): number {
    return this.votes.reduce((a, b) => a + b.balance, 0);
  }

  getChoiceString(): string {
    return this.proposal.choices[this.selected - 1];
  }
}
