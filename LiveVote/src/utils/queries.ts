const API_BASE_URL = "http://localhost:8080/api";
//const API_BASE_URL = 'http://localhost:3000/api';
const API_CONTRACT_URL = "http://localhost:8080/api/voting";

const API_PATHS = {
	// Blockchain
	fetchTokenBalance: `${API_CONTRACT_URL}/getUserTokenBalance`,

	fetchScores: `${API_BASE_URL}/voting/getRoomResults`, //?proposalId=...

	fetchAllScores: `${API_BASE_URL}/voting/getClosedRoomDetails`,

	fetchProposals: `${API_BASE_URL}/proposals/view-all-proposals`,

	fetchProposalDetails: `${API_BASE_URL}/proposals/view-proposal-details`,

	fetchTokenQR: `${API_BASE_URL}/proposals/get-token-qr`, //?proposalId=...

	fetchUserVotedProposalIds: `${API_BASE_URL}/get-user-voted-proposal`, //?address=...

	validQrStatus: `${API_BASE_URL}/validate-qr-status`,

	updateQrStatus: `${API_BASE_URL}/update-qr-status`,

	redeemToken: `${API_BASE_URL}/voting/distributeTokens`, //?qrcode=...

	adminlogin: `${API_BASE_URL}/auth/login`,

	createProposal: `${API_BASE_URL}/proposals/create-proposal`,

	loadUserVotes: `${API_BASE_URL}/proposals/get-voting-result`,

	// deleteProposal: `${API_BASE_URL}/deleteProposal`,
};
export default API_PATHS;
