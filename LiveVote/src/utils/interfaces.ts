/* eslint-disable @typescript-eslint/no-explicit-any */
// export interface Audience {
//   id: string; //PK, UUID
//   qr_code: string;
//   wallet_address: string;
//   token_claimed: boolean; //default: false
//   proposal_id: string;
// }

//Performances
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
  //num_ofqr: number; //number of available qr for token redeem.

  //TODO: remove this
  votes_num: number; //number of available qr for token redeem.

  result?: Result;
}

export interface Result {
  proposalId: string;
  scores_state: string; //'final', 'invalid', 'pending'
  scores: number[];
  scoresTotal: number;
}

export type Choice = number;

export interface Choices {
  // id: string; //PK, UUID
  name: string;
  avatar?: File | string | null;
  // score?: number; //toal votes has received

  //Data Table
  // id: string; //PK, UUID
  // proposal_id: string; //FK
  // name: string;
  // photo: string;
  // votes: number; //toal votes the team has received
}

//---------------------------------------NOt Used-----------------------
export interface SingleChoiceVote {
  choice: number;
  balance: number;
  scores: number[];
}

export interface Vote {
  voter: string; //wallet address
  choice: Choice;
  scores: number;
  reason: string;
  created: number;
}

export interface Sponsorship {
  id: string; //PK, UUID: Unique identifier for each sponsor.
  name: string; //Name of the sponsor paying the gas fees.
  wallet: string; //Wallet address of the sponsor to cover gas fees.
}

export interface Tokens {
  id: string; //PK, UUID: Unique identifier for each token.
  audience_id: string; //FK: Reference to the user who owns the token.
  performance_id: string; //FK: Reference to the performance the token is linked to.
  token_status: boolean; //Whether the token has been used to vote (default: false).
}

export interface FormError {
  message: string;
  push?: boolean;
}

export interface AdminAccount {
  username: string;
  password: string;
}

export interface Image {
  name?: string;
  type?: string; //'image/jpeg', 'image/jpg', 'image/png'
  url?: string;
}
