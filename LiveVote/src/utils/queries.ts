const API_BASE_URL = 'http://localhost:3000/api';

const API_PATHS = {
  fetchAudiences: `${API_BASE_URL}/audiences`,
  fetchPerformance: `${API_BASE_URL}/performance`,
  //TODO: json look like, contain a list of performances
  // performances: [
  //   // array of performance data
  // ],

  fetchNewestPerformance: `${API_BASE_URL}/newest-performances`,
  //TODO: json look like
  // performances: [
  //   // array of performance data
  // ],
  // total: 100, // total number of performances in database

  fetchSpecificPost: (postId: string) => `${API_BASE_URL}/posts/${postId}`,
};

export default API_PATHS;
