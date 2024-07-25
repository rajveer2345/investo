import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://catfact.ninja',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, 
});

// Add a request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors
    console.error('API error', error);
    return Promise.reject(error);
  }
);

export default apiClient;
