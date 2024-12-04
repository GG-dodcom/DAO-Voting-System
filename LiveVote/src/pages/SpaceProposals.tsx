/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
	BaseBlock,
	BaseLink,
	BaseNoResults,
	LoadingRow,
	TheLayout,
	TuneButton,
} from "../components";
import { Proposal, Result } from "../utils/interfaces";
import ProposalsItem from "../components/ProposalsItem";
import { useRestfulAPI } from "../hooks";
import API_PATHS from "../utils/queries";
import { useAppKitAccount } from "@reown/appkit/react";
import { useNavigate } from "react-router-dom";

const SpaceProposals: React.FC = () => {
	const isAdmin = localStorage.getItem("isAdmin") === "true";
	const [proposals, setProposals] = useState<Proposal[]>([]);
	const [userVotedProposalIds, setUserVotedProposalIds] = useState<string[]>(
		[]
	);

	const { fetchQuery, queryLoading } = useRestfulAPI();
	const { address } = useAppKitAccount();
	const navigate = useNavigate();

	const getProposals = async () => {
		try {
			// Fetch proposals data
			const proposalsResponse = await fetchQuery(API_PATHS.fetchProposals);

			let resultsResponse: Result[] = [];

			try {
				// Attempt to fetch results data
				resultsResponse = await fetchQuery(API_PATHS.fetchAllScores);
			} catch (err) {
				console.warn(
					"Results data could not be fetched. Proceeding without results: ",
					err
				);
			}

			// Match results with proposals based on proposalId
			const mergedProposals = proposalsResponse.map((proposal: Proposal) => {
				// Find the matching result by proposalId, or default to undefined
				const matchingResult = resultsResponse.find(
					(result: Result) => result.proposalId === proposal.proposalId
				);

				// Return the proposal with the matched result, or only the proposal if no result
				return { ...proposal, result: matchingResult || undefined };
			});

			// Update the proposals state
			setProposals(mergedProposals);

			console.log("mergedProposals: ", mergedProposals);
		} catch (error) {
			console.error("Error fetching proposals:", error);
		}
	};

	const getUserVotedProposalIds = async (voter: string) => {
		if (!voter) return;

		//TODO:
		const votes = await fetchQuery(
			API_PATHS.fetchUserVotedProposalIds
			//   {
			//   address: voter,
			// }
		);

		const proposalIds = votes ?? [];
		setUserVotedProposalIds((prevIds) => [
			...new Set([...prevIds, ...proposalIds]),
		]);
	};

	const signOut = () => {
		localStorage.removeItem("isAdmin");
		navigate("/"); //window.location.reload(); // Reloads the page to reflect the sign-out
	};

	useEffect(() => {
		getProposals();
	}, []);

	useEffect(() => {
		console.log(address);
		if (address) getUserVotedProposalIds(address);
	}, [address]);

	return (
		<TheLayout>
			<div>
				<div className="flex items-center justify-between mb-4">
					<h1 className="lg:block">Proposals</h1>

					{isAdmin && (
						<div className="flex items-center gap-x-3">
							<BaseLink
								link={{ pathname: "/create" }}
								hideExternalIcon
								data-testid="create-proposal-button"
							>
								<TuneButton className="w-full sm:w-auto">
									New proposal
								</TuneButton>
							</BaseLink>
							<TuneButton onClick={signOut}>Sign Out</TuneButton>
						</div>
					)}
				</div>

				{queryLoading && <LoadingRow block />}

				{proposals.length < 1 && <BaseNoResults />}
				<div className="mb-3 space-y-3">
					{proposals.map((proposal, i) => (
						<BaseBlock key={i} slim className="transition-colors">
							<ProposalsItem
								proposal={proposal}
								voted={userVotedProposalIds.includes(proposal.proposalId)}
								to={{
									pathname: `/proposal/${proposal.proposalId}`,
								}}
							/>
						</BaseBlock>
					))}
				</div>
			</div>
		</TheLayout>
	);
};

export default SpaceProposals;
