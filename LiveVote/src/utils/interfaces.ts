/* eslint-disable @typescript-eslint/no-explicit-any */

export interface Proposal {
	proposalId: string;
	title: string;
	body: string;
	avatar: string; //avatar: File | null | string
	choices: Choices[];
	symbol?: string;
	state: string; //'pending', 'closed', 'active'
	startDate: number;
	endDate: number;
	createDate: number; //the spaces will show new to old
	type: string | null; //'single-choice'
	numOfQR: number; //number of available qr for token redeem.

	result?: Result;
}

export interface Result {
	proposalId?: string;
	scores_state: string; //'final', 'invalid', 'pending'
	scores: number[];
	scoresTotal: number;
}

export interface Choices {
	choiceId: string;
	name: string;
	avatar?: File | string | null;
}

export interface Vote {
	voter: string; //wallet address
	choice: string; //Choices.choiceId
	scores: number;
	reason: string;
	created: number;
}

export interface SingleChoiceVote {
	choice: number;
	balance: number;
	scores: number[];
}

export interface AdminAccount {
	username: string;
	password: string;
}
