import axios from 'axios';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.accessToken = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  REGISTER: '/api/users',
  LOGIN: '/api/users/login',
  AUTH_CHECK: '/api/users/authCheck',
  
  // Posts
  POSTS: '/api/posts',
  POST_BY_ID: (id) => `/api/posts/byId/${id}`,
  SIMILAR_POSTS: (id) => `/api/posts/similar/${id}`,
  POST_REACTIONS: '/api/posts/reacts',
  
  // Comments
  COMMENTS: '/api/comments',
  COMMENTS_BY_POST: (postId) => `/api/comments/${postId}`,
  
  // Reactions
  LIKES: '/api/likes',
  DISLIKES: '/api/dislikes',
  
  // User
  USER_INFO: (id) => `/api/users/info/${id}`,
};

export default apiClient; 