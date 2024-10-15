import { idText } from 'typescript';

const API_BASE_URL = 'http://localhost:3000/api';

const API_PATHS = {
  fetchProposals: `${API_BASE_URL}/proposals`,
  //TODO: json look like, return array[]
  // id
  // title
  // body,
  // avatar,
  // choices: id, name,
  // state,
  // voting: start, end, type,
  // create,
  // scores,
  // scores_state,
  // scores_total

  fetchProposalDetails: `${API_BASE_URL}/proposalDetails`,
  //return only one
  // id,
  // title,
  // body,
  // avatar,
  // choices: id, name, avatar,

  fetchUserVotedProposalIds: `${API_BASE_URL}/userVotedProposalIds`,
  //list of id

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

  createProposal: `${API_BASE_URL}/createProposal`,
};

export default API_PATHS;
