const API_BASE_URL = "http://localhost:8080/api";
//const API_BASE_URL = 'http://localhost:3000/api';
const API_CONTRACT_URL = "http://localhost:8080/api/voting";

const API_PATHS = {
	// Blockchain
	fetchTokenBalance: `${API_CONTRACT_URL}/getUserTokenBalance`,

	// data
	vote: `${API_BASE_URL}/vote`,

	//fetchScores: `${API_BASE_URL}/scores`, //?proposalId=...
	fetchScores: `http://localhost:3000/api/scores`,

	//fetchAllScores: `${API_BASE_URL}/all-scores`,
	fetchAllScores: `http://localhost:3000/api/all-scores`,

	fetchProposals: `${API_BASE_URL}/proposals/view-all-proposals`,

	fetchProposalDetails: `${API_BASE_URL}/proposals/view-proposal-details`,

	fetchTokenQR: `${API_BASE_URL}/proposals/get-token-qr`, //?proposalId=...

	fetchUserVotedProposalIds: `${API_BASE_URL}/userVotedProposalIds`, //?address=...
	//list of proposal id

	checkTokenRedeem: `${API_BASE_URL}/voting/distributeTokens`, //?qrcode=...

	adminlogin: `${API_BASE_URL}/auth/login`,

	createProposal: `${API_BASE_URL}/proposals/create-proposal`,

	//loadUserVotes: `${API_BASE_URL}/loadUserVotes`,
	loadUserVotes: `http://localhost:3000/api/loadUserVotes`,

	//loadUserVote: `${API_BASE_URL}/loadUserVote`,
	loadUserVote: `http://localhost:3000/api/loadUserVote`,

	//TODO: not used
	deleteProposal: `${API_BASE_URL}/deleteProposal`,
};
export default API_PATHS;
