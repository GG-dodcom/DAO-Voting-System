import React, { useEffect, useRef, useState } from "react";
import { Proposal, Result } from "../utils/interfaces";
import Tippy from "@tippyjs/react";
import { IHoLockClosed } from "../assets/icons";
import { t } from "i18next";
import { SpaceProposalResultsProgressBar } from ".";
import { useIntl } from "../hooks/useIntl";
import { shorten } from "../utils/utils";

interface Props {
	choice: { i: number; choice: string };
	proposal: Proposal;
	results: Result;
}

const SpaceProposalResultsListItem: React.FC<Props> = ({
	choice,
	proposal,
	results,
}) => {
	const [isTruncated, setIsTruncated] = useState(false);
	const choiceStringRef = useRef<HTMLSpanElement | null>(null);

	const { formatCompactNumber, formatPercentNumber, formatNumber } = useIntl();

	const getPercentage = (n: number, max: number) =>
		max ? ((100 / max) * n) / 1e2 : 0;

	const choicePercentage = (() => {
		return getPercentage(results.scores[choice.i], results.scoresTotal);
	})();

	useEffect(() => {
		if (choiceStringRef.current) {
			setIsTruncated(
				choiceStringRef.current.scrollWidth >
					choiceStringRef.current.clientWidth
			);
		}
	}, [choice.choice]);

	return (
		<div>
			<div className="mb-1 flex justify-between text-skin-link">
				<div className="flex overflow-hidden">
					{isTruncated ? (
						<Tippy content={choice.choice}>
							<span ref={choiceStringRef} className="mr-1 truncate">
								{choice.choice}
							</span>
						</Tippy>
					) : (
						<span ref={choiceStringRef} className="mr-1 truncate">
							{choice.choice}
						</span>
					)}
				</div>
				<div className="flex justify-end">
					{results.scores_state !== "final" ? (
						<Tippy content={t("privacy")}>
							<span>
								<IHoLockClosed className="mx-auto" />
							</span>
						</Tippy>
					) : (
						<div className="space-x-2">
							<Tippy
								content={`${formatNumber(results.scores[choice.i])} ${
									proposal.symbol
								}`}
							>
								<span className="whitespace-nowrap">
									{formatCompactNumber(results.scores[choice.i])}{" "}
									{shorten(proposal.symbol || "VOTE", "symbol")}
								</span>
							</Tippy>
							<span>{formatPercentNumber(choicePercentage)}</span>
						</div>
					)}
				</div>
			</div>
			<SpaceProposalResultsProgressBar
				value={results.scores[choice.i]}
				max={results.scoresTotal}
			/>
		</div>
	);
};

export default SpaceProposalResultsListItem;
