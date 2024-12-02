const API_BASE_URL = 'http://localhost:8080/api';
//const API_BASE_URL = 'http://localhost:3000/api';
const API_CONTRACT_URL = 'http://localhost:8080/api/voting';

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

  fetchTokenQR: `${API_BASE_URL}/proposals/token-qr`, //?proposalId=...

  deleteProposal: `${API_BASE_URL}/deleteProposal`,

  fetchUserVotedProposalIds: `${API_BASE_URL}/userVotedProposalIds`, //?address=...
  //list of proposal id

  //checkTokenRedeem: `${API_BASE_URL}/checkTokenRedeem`, //?qrcode=...
  checkTokenRedeem: `http://localhost:3000/api/checkTokenRedeem`, //?qrcode=...

  fetchAudiences: `${API_BASE_URL}/audiences`,
  fetchPerformance: `${API_BASE_URL}/performance`,
  //TODO: json look like, contain a list of performances
  // performances: [
  //   // array of performance data
  // ],

  fetchNewestPerformance: `${API_BASE_URL}/newest_performances`,
  //TODO: json look like
  // performances: [
  //   // array of performance data
  // ],
  // total: 100, // total number of performances in database

  fetchSpecificPost: (postId: string) => `${API_BASE_URL}/posts/${postId}`,

  postImangeUpload: `${API_BASE_URL}/image_upload`,
  //TODO: return
  // const receipt = await pin(formData, API_PATHS.postImangeUpload);
  // const uploadedUrl = `ipfs://${receipt.cid}`;

  adminlogin: `${API_BASE_URL}/auth/login`,

  createProposal: `${API_BASE_URL}/proposals/create-proposal`,

  loadUserVotes: `${API_BASE_URL}/loadUserVotes`,
  loadUserVote: `${API_BASE_URL}/loadUserVote`,
};
export default API_PATHS;
