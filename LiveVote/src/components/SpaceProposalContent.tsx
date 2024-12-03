import React, { useEffect, useState } from "react";
import { Proposal } from "../utils/interfaces";
import { BaseMarkdown, TuneButton } from ".";
import { IHoArrowSmDown, IHoArrowSmUp } from "../assets/icons";

interface Props {
	proposal: Proposal;
}

const SpaceProposalContent: React.FC<Props> = ({ proposal }) => {
	const [showFullMarkdownBody, setShowFullMarkdownBody] = useState(false);
	const [markdownBodyHeight, setMarkdownBodyHeight] = useState(0);

	// Ref to store the div element for markdown body
	const [markdownBodyElement, setMarkdownBodyElement] =
		useState<HTMLDivElement | null>(null);

	// Detect if the proposal body is too long and should be shortened
	const truncateMarkdownBody = () => {
		return markdownBodyHeight > 580;
	};

	// Update the height whenever the markdown body element or content changes
	useEffect(() => {
		if (markdownBodyElement) {
			setMarkdownBodyHeight(markdownBodyElement.clientHeight);
		}
	}, [markdownBodyElement, proposal.body]);

	return (
		<div className={proposal.body.length ? "relative" : "hidden"}>
			{/* Background gradient when truncated */}
			{!showFullMarkdownBody && truncateMarkdownBody() && (
				<div className="absolute bottom-0 h-[80px] w-full bg-gradient-to-t from-skin-bg" />
			)}

			{/* Toggle button for expanding/collapsing the markdown body */}
			{truncateMarkdownBody() && (
				<div
					className={`absolute flex w-full justify-center ${
						showFullMarkdownBody ? "-bottom-[64px]" : "-bottom-[14px]"
					}`}
				>
					<TuneButton
						className="z-10 !bg-skin-bg flex items-center gap-2 !pr-[18px]"
						onClick={() => setShowFullMarkdownBody((prev) => !prev)}
					>
						{showFullMarkdownBody ? "View less" : "View more"}
						{showFullMarkdownBody ? <IHoArrowSmUp /> : <IHoArrowSmDown />}
					</TuneButton>
				</div>
			)}

			{/* Markdown body container */}
			<div
				className={`overflow-hidden ${
					!showFullMarkdownBody && truncateMarkdownBody() ? "h-[430px]" : ""
				} ${showFullMarkdownBody ? "mb-[92px]" : "mb-[56px]"}`}
			>
				<div ref={setMarkdownBodyElement}>
					<BaseMarkdown
						body={proposal.body}
						data-testid="proposal-page-content"
					/>
				</div>
			</div>
		</div>
	);
};

export default SpaceProposalContent;
