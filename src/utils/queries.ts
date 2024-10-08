const API_BASE_URL = 'http://localhost:3000/api';

const API_PATHS = {
  fetchAudiences: `${API_BASE_URL}/audiences`,
  fetchPerformance: `${API_BASE_URL}/performance`,
  fetchSpecificPost: (postId: string) => `${API_BASE_URL}/posts/${postId}`,
};

export default API_PATHS;
