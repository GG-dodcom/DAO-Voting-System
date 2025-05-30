// src/hooks/useFormSpaceProposal.ts
import { useState } from "react";
import { useLocalStorage } from "react-use";
import schemas from "../schemas";
import { validateForm } from "./validation";

export interface ProposalForm {
	name: string;
	body: string;
	choices: {
		key: number;
		text: string;
		avatar: { file: File | null; url: string };
	}[];
	start: number;
	end: number;
	type: string;
	numOfQR: number;
	avatar: { file: File | null; url: string };
}

const EMPTY_PROPOSAL: ProposalForm = {
	name: "",
	body: "",
	choices: [
		{ key: 0, text: "", avatar: { file: null, url: "" } },
		{ key: 1, text: "", avatar: { file: null, url: "" } },
	],
	start: parseInt((Date.now() / 1e3).toFixed()),
	end: 0,
	type: "single-choice",
	numOfQR: 0,
	avatar: { file: null, url: "" },
};

const EMPTY_PROPOSAL_DRAFT = {
	name: "",
	body: "",
	isBodySet: false,
	avatar: { file: null, url: "" },
};

export function useFormSpaceProposal(spaceType = "default") {
	const [formDraft, setFormDraft] = useLocalStorage<{
		name: string;
		body: string;
		isBodySet: boolean;
		avatar: { file: File | null; url: string };
	}>(`proposal.draft`, structuredClone(EMPTY_PROPOSAL_DRAFT));
	// const [form, setForm] = useState<ProposalForm>(
	//   formDraft
	//     ? {
	//         name: formDraft.name,
	//         body: formDraft.body,
	//         avatar: EMPTY_PROPOSAL.avatar,
	//         choices: EMPTY_PROPOSAL.choices,
	//         start: EMPTY_PROPOSAL.start,
	//         end: EMPTY_PROPOSAL.end,
	//         type: EMPTY_PROPOSAL.type,
	//         numOfQR: EMPTY_PROPOSAL.numOfQR,
	//       }
	//     : structuredClone(EMPTY_PROPOSAL)
	// );

	const [form, setForm] = useState<ProposalForm>(
		structuredClone(EMPTY_PROPOSAL)
	);

	const [userSelectedDateStart, setUserSelectedDateStart] = useState(false);
	const [userSelectedDateEnd, setUserSelectedDateEnd] = useState(false);

	const resetForm = () => {
		setForm(structuredClone(EMPTY_PROPOSAL));
		setFormDraft(structuredClone(EMPTY_PROPOSAL_DRAFT));
		setUserSelectedDateEnd(false);
		setUserSelectedDateStart(false);
	};

	// Set form state based on formDraft
	// const setFormFromDraft = () => {
	//   if (formDraft) {
	//     setForm({});
	//   }
	// };

	const validationErrors = validateForm(schemas.proposal, form, spaceType);

	const isValid = Object.keys(validationErrors).length === 0;

	// useEffect(() => {
	//   if (formDraft) {
	//     // Set the form to the current draft when it changes
	//     setForm((prevForm) => ({
	//       ...prevForm,
	//       ...formDraft,
	//     }));
	//   }
	// }, [formDraft]);

	return {
		form,
		formDraft,
		userSelectedDateStart,
		setUserSelectedDateStart,
		userSelectedDateEnd,
		setUserSelectedDateEnd,
		validationErrors,
		isValid,
		resetForm,
		setForm,
		setFormDraft,
	};
}
