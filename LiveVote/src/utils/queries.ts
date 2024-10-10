const API_BASE_URL = 'http://localhost:3000/api';

const API_PATHS = {
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
};

export default API_PATHS;
