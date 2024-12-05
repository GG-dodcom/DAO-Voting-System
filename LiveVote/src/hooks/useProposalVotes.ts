/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Proposal, Vote } from '../utils/interfaces';
import { useRestfulAPI } from './useRestfulAPI';
import API_PATHS from '../utils/queries';

export function useProposalVotes(proposal: Proposal) {
  const { fetchQuery } = useRestfulAPI();

  const [loadingVotes, setLoadingVotes] = useState(false);
  const [loadingUserVote, setLoadingUserVote] = useState(false);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [userVote, setUserVote] = useState<Vote | null>(null);

  //TODO:
  // fetch votes based on the proposal and queryParams
  // send to me orderBy: 'timestamp',
  async function loadVotes() {
    if (loadingVotes) return;

    setLoadingVotes(true);
    try {
      const response: any[] = await fetchQuery(API_PATHS.loadUserVotes, {
        proposalId: proposal.proposalId,
      });

      // Map response to the desired format for UserVote
      const mappedVotes: Vote[] = response.map((vote) => ({
        voter: vote.userWalletAddress,
        choice: vote.choiceId,
        scores: 1, // Assuming scores is a constant value; adjust as needed
        created: vote.voteTimestamp,
      }));

      // Update UserVote state
      setVotes(mappedVotes);

      console.error('mappedVotes', mappedVotes);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingVotes(false);
    }
  }

  //TODO:
  // fetches and loads the vote of a specific user
  async function loadUserVote(voter: string) {
    if (!voter) return;
    setUserVote(null);

    setLoadingUserVote(true);
    try {
      const response: any[] = await fetchQuery(API_PATHS.loadUserVotes, {
        proposalId: proposal.proposalId,
        userWalletAddress: voter,
      });

      setUserVote({
        voter: response[0].userWalletAddress,
        choice: response[0].choiceId,
        scores: 1,
        created: response[0].voteTimestamp,
      });

      console.error('single user vote', response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingUserVote(false);
    }
  }

  return {
    votes,
    loadingVotes,
    loadingUserVote,
    userVote,
    loadVotes,
    loadUserVote,
  };
}
