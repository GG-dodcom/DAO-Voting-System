/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from "react";
import {
	BaseAvatar,
	BaseBlock,
	BaseContainer,
	BaseNoResults,
	ExploreSkeletonLoading,
	SpaceProposalResultsListItem,
	SpaceProposalResultsQuorum,
	TuneBlock,
	TuneBlockHeader,
} from ".";
import { Proposal, Result } from "../utils/interfaces";
import { useProposalVotes } from "../hooks/useProposalVotes";
import { useAppKitAccount } from "@reown/appkit/react";
import Tippy from "@tippyjs/react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { IHoCheck } from "../assets/icons";
import { shorten } from "../utils/utils";

interface Props {
	proposal: Proposal;
	results: Result;
}

const SpaceProposalVoteResult: React.FC<Props> = ({ proposal, results }) => {
	const { address, isConnected } = useAppKitAccount();
	const { userVote, loadUserVote, loadingUserVote } =
		useProposalVotes(proposal);

	const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (proposal) {
			const timer = setTimeout(() => {
				setLoading(false);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [proposal]);

	/* When the Web3 account changes, reset any ongoing actions related to the 
  previous user (e.g., votes result) and load the votes specific to the newly 
  connected user. */
	useEffect(() => {
		// if (!address) return;
		const address = "rtetr";
		loadUserVote(address);
		console.log("userVote", userVote);

		console.log("select choice", userVote?.choice);
	}, [address, isConnected]);

	useEffect(() => {
		console.log("userVote", userVote);
		if (userVote) setSelectedChoice(userVote?.choice);
	}, [userVote]);

	return (
		<>
			{!loadingUserVote && (
				<TuneBlock
					className={""}
					header={
						<TuneBlockHeader
							title={
								proposal.state == "pending"
									? "Voting Pending"
									: proposal.state == "closed"
									? "Voting Closed"
									: "Unknown State"
							}
						></TuneBlockHeader>
					}
				>
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
										return (
											<CSSTransition key={i} timeout={300} classNames="fade">
												<div className="flex-col">
													<div
														className={`tune-button rounded-xl md:border mb-0 flex items-center justify-center text-center transition-all
													${selectedChoice === choice.choiceId ? "border-skin-link" : ""}`}
														style={{ height: "244px" }}
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
																		content={
																			choice.name.length > 12 ? choice.name : ""
																		}
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
																{selectedChoice === choice.choiceId && (
																	<IHoCheck className="text-green" />
																)}
															</div>
														</BaseBlock>
													</div>
													<div className="w-full mt-2">
														<SpaceProposalResultsListItem
															key={i}
															choice={{ i, choice: choice.name }}
															proposal={proposal}
															results={results}
														/>
													</div>
												</div>
											</CSSTransition>
										);
									})}
								</TransitionGroup>
							)}
							<div className="mt-4">
								<SpaceProposalResultsQuorum
									proposal={proposal}
									results={results}
								/>
							</div>
						</BaseContainer>
					</div>
				</TuneBlock>
			)}
		</>
	);
};

export default SpaceProposalVoteResult;
