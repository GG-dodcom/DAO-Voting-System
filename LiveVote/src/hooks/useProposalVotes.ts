/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Proposal, Vote } from "../utils/interfaces";
import { useRestfulAPI } from "./useRestfulAPI";
import API_PATHS from "../utils/queries";

export function useProposalVotes(proposal: Proposal) {
	const { fetchQuery } = useRestfulAPI();

	const [loadingVotes, setLoadingVotes] = useState(false);
	const [loadingUserVote, setLoadingUserVote] = useState(false);
	const [votes, setVotes] = useState<Vote[]>([]);
	const [userVote, setUserVote] = useState<Vote | null>(null);

	//TODO:
	// fetch votes based on the proposal and queryParams
	// send to me orderBy: 'timestamp',
	async function loadVotes(voter?: String) {
		if (loadingVotes) return;

		setLoadingVotes(true);
		try {
			const response = await fetchQuery(API_PATHS.loadUserVotes, {
				// proposalId: proposal.proposalId,
				// voter: voter || undefined,
			});
			setVotes(response);
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
			const response: any = await fetchQuery(API_PATHS.loadUserVote, {
				// id: proposal.proposalId,
				// voter: voter,
			});
			console.log("respons", response);
			setUserVote(response);
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
