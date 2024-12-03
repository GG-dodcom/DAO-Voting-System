import React from "react";
import { Proposal, Vote } from "../utils/interfaces";
import { shorten } from "../utils/utils";
import { AvatarUser, SpaceProposalVotesListItemChoice } from ".";
import Tippy from "@tippyjs/react";

interface Props {
	proposal: Proposal;
	vote: Vote;
	isSmall: boolean;
	className?: string;
}

const SpaceProposalVotesItem: React.FC<Props> = ({
	proposal,
	vote,
	isSmall,
	className,
}) => {
	return (
		<div className={`py-[12px] ${isSmall ? "py-[8px]" : ""} ${className}`}>
			<div className={`flex items-center ${isSmall ? "justify-between" : ""}`}>
				<div
					className={`${
						isSmall
							? "w-[200px] min-w-[200px] text-left pr-2"
							: "w-[390px] min-w-[390px] text-left pr-2"
					} 
            flex flex-nowrap items-center space-x-1`}
				>
					<AvatarUser address={vote.voter} size="20" />
					<Tippy content={vote.voter}>
						<span className={`w-full truncate`}>{vote.voter}</span>
					</Tippy>
				</div>

				{!isSmall && (
					<SpaceProposalVotesListItemChoice proposal={proposal} vote={vote} />
				)}

				<div className="flex w-[130px] min-w-[87px] items-center justify-end whitespace-nowrap text-right text-skin-link">
					<span className="truncate">
						{`${vote.scores} ${shorten(proposal.symbol || "VOTE", "symbol")}`}
					</span>
				</div>
			</div>

			{isSmall && (
				<SpaceProposalVotesListItemChoice
					proposal={proposal}
					vote={vote}
					className="mt-1"
				/>
			)}
		</div>
	);
};

export default SpaceProposalVotesItem;
