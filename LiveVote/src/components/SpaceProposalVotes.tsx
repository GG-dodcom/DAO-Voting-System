/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Proposal, Result } from "../utils/interfaces";
import {
	SpaceProposalVotesItem,
	SpaceProposalVotesModal,
	TuneBlock,
	TuneBlockHeader,
	TuneButton,
} from ".";
import { useProposalVotes } from "../hooks/useProposalVotes";
import { t } from "i18next";
import { useMediaQuery } from "react-responsive";

interface Props {
	proposal: Proposal;
	results: Result;
}

const VOTES_LIMIT = 6;

const SpaceProposalVotes: React.FC<Props> = ({ proposal, results }) => {
	const breakpoints = {
		xs: "420px",
		sm: "544px",
		md: "768px",
		lg: "1012px",
		xl: "1280px",
		"2xl": "1536px",
	};

	// Use useMediaQuery to check if the screen size is at least 'sm'
	const isSmallScreenLarge = useMediaQuery({
		query: `(min-width: ${breakpoints.lg})`,
	});
	const isSmallScreenSmall = useMediaQuery({
		query: `(max-width: ${breakpoints.sm})`,
	});
	const isSmallScreen = isSmallScreenLarge || isSmallScreenSmall;

	const { votes, loadingVotes, loadVotes } = useProposalVotes(proposal);
	const [modalVotesOpen, setModalVotesOpen] = useState(false);

	const voteCount = results.scoresTotal;

	useEffect(() => {
		const fetchVotes = async () => {
			await loadVotes();
		};
		fetchVotes();
	}, [proposal]);

	const displayedVotes = votes.slice(0, VOTES_LIMIT);

	return (
		<>
			{voteCount > 0 && (
				<TuneBlock
					loading={loadingVotes}
					header={<TuneBlockHeader title={t("votes")} counter={voteCount} />}
				>
					{displayedVotes.map((vote, i) => (
						<SpaceProposalVotesItem
							key={i}
							vote={vote}
							proposal={proposal}
							isSmall={isSmallScreen}
							data-testid={`proposal-votes-list-item-${i}`}
							className="last:pb-0"
						/>
					))}
					{votes.length > VOTES_LIMIT && (
						<div className="pt-3">
							<TuneButton
								className="w-full"
								onClick={() => setModalVotesOpen(true)}
							>
								View all
							</TuneButton>
						</div>
					)}
					<SpaceProposalVotesModal
						proposal={proposal}
						open={modalVotesOpen}
						onClose={() => setModalVotesOpen(false)}
					/>
				</TuneBlock>
			)}
		</>
	);
};

export default SpaceProposalVotes;
