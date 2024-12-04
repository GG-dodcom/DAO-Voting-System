/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
	BaseBreadcrumbs,
	LabelProposalState,
	TheLayout,
	SpaceProposalHeader,
	SpaceProposalContent,
	SpaceProposalInformation,
	SpaceProposalVote,
	ModalVote,
	SpaceProposalVotes,
	SpaceProposalVoteResult,
} from ".";
import { Proposal } from "../utils/interfaces";
import { useRestfulAPI } from "../hooks";
import API_PATHS from "../utils/queries";
import { useAppKitAccount } from "@reown/appkit/react";

interface Props {
	proposal: Proposal;
	onReload: () => void;
}

const SpaceProposalPage: React.FC<Props> = ({ proposal, onReload }) => {
	const isAdmin = localStorage.getItem("isAdmin") === "true";
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedChoices, setSelectedChoices] = useState<any>(null);
	const [loadedResults, setLoadedResults] = useState(false);
	const [currentProposal, setCurrentProposal] = useState(proposal);

	const { address } = useAppKitAccount();
	const { fetchQuery } = useRestfulAPI();

	const reloadProposal = () => {
		onReload();
	};

	//TODO:
	const loadResults = async () => {
		if (proposal.state == "active") return;

		const result: any = await fetchQuery(
			API_PATHS.fetchScores
			//   {
			//   proposalId: proposal.id,
			// }
		);

		if (!currentProposal.result) {
			setCurrentProposal({
				...currentProposal,
				result: {
					scores_state: result.scores_state,
					scores: result.scores,
					scoresTotal: result.scoresTotal,
				},
			});
		}

		console.log("currentProposal.result", currentProposal.result);
		setLoadedResults(true);
	};

	const clickVote = () => {
		if (address) {
			setModalOpen(true);
		}
	};

	const handleChoiceQuery = () => {
		const searchParams = new URLSearchParams(location.search);
		const choice = searchParams.get("choice");
		if (address && choice && proposal.state === "active") {
			setSelectedChoices(parseInt(choice));
			clickVote();
		}
	};

	useEffect(() => {
		handleChoiceQuery();
	}, [address]);

	useEffect(() => {
		loadResults();
	}, [proposal]);

	return (
		<div>
			<BaseBreadcrumbs
				pages={[
					{ id: "1", name: "Home", to: "/", current: false },
					{
						id: "2",
						name: proposal.title,
						to: "/proposal/:id",
						current: true,
					},
				]}
				className="px-[20px] md:px-4 -mt-1 pb-[16px] lg:pb-[20px]"
			/>
			<TheLayout
				className="mt-[20px]"
				contentLeft={
					<div>
						<div className="px-[20px] md:px-0">
							<LabelProposalState
								state={proposal.state}
								className="mb-[12px]"
							/>
							<SpaceProposalHeader proposal={proposal} isAdmin={isAdmin} />
							<SpaceProposalContent proposal={proposal} />
						</div>
					</div>
				}
				sidebarRight={
					<div>
						<div className="mt-[20px] lg:space-y-3 space-y-[20px] lg:mt-0 px-[20px] md:px-0">
							<SpaceProposalInformation proposal={proposal} />

							{currentProposal.result && (
								<>
									{/* <SpaceProposalResults
										loaded={loadedResults}
										proposal={currentProposal}
										results={currentProposal.result}
									/> */}
									<SpaceProposalVotes
										proposal={currentProposal}
										results={currentProposal.result}
									/>
								</>
							)}
						</div>
					</div>
				}
			/>

			<div>
				<div className="px-0 md:px-4 mx-auto max-w-[1012px] mt-[20px]">
					{proposal.state == "active" ? (
						<SpaceProposalVote
							modelValue={selectedChoices}
							proposal={proposal}
							onUpdateModelValue={(choice: any) => setSelectedChoices(choice)}
							onClickVote={clickVote}
						/>
					) : (
						currentProposal.result && (
							<SpaceProposalVoteResult
								proposal={proposal}
								results={currentProposal.result}
							/>
						)
					)}
				</div>
			</div>

			{modalOpen && (
				<ModalVote
					open={modalOpen}
					proposal={proposal}
					selectedChoices={selectedChoices - 1}
					onClose={() => setModalOpen(false)}
					onReload={reloadProposal}
				/>
			)}
		</div>
	);
};

export default SpaceProposalPage;
