const API_BASE_URL = 'http://localhost:8080/api';
// const API_CONTRACT_URL = 'http://localhost:8080/api/voting';

const API_PATHS = {
  // Blockchain
  fetchTokenBalance: `${API_BASE_URL}/voting/getUserTokenBalance`,

  fetchScores: `${API_BASE_URL}/voting/getRoomResults`, //?proposalId=...

  fetchAllScores: `${API_BASE_URL}/voting/getClosedRoomDetails`,

  redeemToken: `${API_BASE_URL}/voting/distributeTokens`, //?qrcode=...

  // Backend
  adminlogin: `${API_BASE_URL}/auth/login`,

  fetchProposals: `${API_BASE_URL}/proposals/view-all-proposals`,

  fetchProposalDetails: `${API_BASE_URL}/proposals/view-proposal-details`,

  fetchTokenQR: `${API_BASE_URL}/proposals/get-token-qr`, //?proposalId=...

  fetchUserVotedProposalIds: `${API_BASE_URL}/proposals/get-user-voted-proposal`, //?address=...

  validQrStatus: `${API_BASE_URL}/proposals/validate-qr-status`,

  updateQrStatus: `${API_BASE_URL}/proposals/update-qr-status`,

  createProposal: `${API_BASE_URL}/proposals/create-proposal`,

  loadUserVotes: `${API_BASE_URL}/proposals/get-voting-result`,

  // deleteProposal: `${API_BASE_URL}/deleteProposal`,
};
export default API_PATHS;
