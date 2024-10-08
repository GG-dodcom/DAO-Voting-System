export interface Audience {
  id: string; //PK, UUID
  qr_code: string;
  wallet_address: string;
  token_claimed: boolean; //default: false
  performance_id: string; //FK Performance table
}

export interface Performances {
  //Proposal
  id: string; //PK, UUID
  name: string;
  description: string;
  start: Date;
  end: Date;
  created: Date; //the spaces will show new to old
  votes_num: number; //for create how many QR
}

export interface Teams {
  //Performers
  id: string; //PK, UUID
  performance_id: string; //FK performance
  name: string;
  photo: string;
  votes: number; //toal votes the team has received
}

export interface Votes {
  id: string; //PK, UUID: Unique identifier for each vote.
  audience_id: string; //FK: Reference to the user who cast the vote.
  team_id: string; //FK: Reference to the team being voted for.
  vote_timestamp: Date; //Timestamp when the vote was cast.
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

export interface Proposal {
  id: string;
  name: string;
  token: string;
  network: string;
  strategies: SpaceStrategy[];
  delegationPortal: DelegatesConfig;
  about: string;
  avatar: string;
  skin: string;
  domain: string | null;
  website: string | null;
  terms: string | null;
  coingecko: string | null;
  github: string | null;
  twitter: string | null;
  followersCount: number;
  private: boolean;
  admins: string[];
  moderators: string[];
  members: string[];
  categories: string[];
  parent: ExtendedSpace | null;
  children: ExtendedSpace[];
  filters: { minScore: number; onlyMembers: boolean };
  plugins: Record<string, any>;
  validation: SpaceValidation;
  voteValidation: VoteValidation;
  treasuries: TreasuryWallet[];
  template: string;
  guidelines: string;
  verified: boolean;
  flagged: boolean;
  hibernated: boolean;
  turbo: boolean;
  boost: {
    enabled: boolean;
    bribeEnabled: boolean;
  };
  voting: {
    delay: number | null;
    hideAbstain: boolean;
    period: number | null;
    quorum: number | null;
    quorumType: 'default' | 'rejection';
    type: string | null;
    privacy: string | null;
  };
}
