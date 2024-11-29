/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Proposal, Vote } from '../utils/interfaces';
import { useRestfulAPI } from './useRestfulAPI';
import API_PATHS from '../utils/queries';

type QueryParams = {
  voter?: string;
};

export function useProposalVotes(proposal: Proposal, loadBy = 6) {
  const { fetchQuery } = useRestfulAPI();

  const [loadingVotes, setLoadingVotes] = useState(false);
  const [loadingMoreVotes, setLoadingMoreVotes] = useState(false);
  const [loadingUserVote, setLoadingUserVote] = useState(false);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [userVote, setUserVote] = useState<Vote | null>(null);

  // fetch votes based on the proposal and queryParams
  async function _fetchVotes(skip = 0) {
    const response = await fetchQuery(
      API_PATHS.loadUserVotes
      //   {
      //   id: proposal.id,
      //   first: loadBy,
      //   skip,
      //   orderBy: 'timestamp',
      //   voter: queryParams.voter || undefined,
      // }
    );

    console.log(response);
    return response;
  }

  // fetches a single vote based on the voter specified in queryParams
  async function _fetchVote(queryParams: QueryParams) {
    const response = await fetchQuery(API_PATHS.loadUserVote, {
      id: proposal.proposalId,
      voter: queryParams.voter,
    });
    return response;
  }

  // fetches votes for the given proposal based on the provided filter.
  async function loadVotes() {
    if (loadingVotes) return;

    setLoadingVotes(true);
    try {
      const response = await _fetchVotes();
      setVotes(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingVotes(false);
    }
  }

  // loads a specific vote by a user's address.
  async function loadSingleVote(voter: string) {
    setLoadingVotes(true);
    try {
      const response = await _fetchVote({ voter });
      setVotes(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingVotes(false);
    }
  }

  // fetches more votes beyond the initially loaded set, appending them to the existing votes array.
  async function loadMoreVotes() {
    if (loadingMoreVotes || loadingVotes || loadBy > votes.length) return;

    setLoadingMoreVotes(true);
    try {
      const response = await _fetchVotes(votes.length);
      setVotes((prevVotes) => prevVotes.concat(response));
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingMoreVotes(false);
    }
  }

  // fetches and loads the vote of a specific user
  async function loadUserVote(voter: string) {
    if (!voter) return;
    setUserVote(null);

    setLoadingUserVote(true);
    try {
      const response = await _fetchVote({ voter });
      setUserVote(response[0] || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingUserVote(false);
    }
  }

  return {
    votes,
    loadingVotes,
    loadingMoreVotes,
    loadingUserVote,
    userVote,
    loadVotes,
    loadMoreVotes,
    loadSingleVote,
    loadUserVote,
  };
}
