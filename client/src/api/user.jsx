import apiClient from './index';

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/user/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const checkReferralId = async (id) => {
  try {
    const response = await apiClient.get(`/user/exists/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};



export const updateUserProfile = async (userData) => {
  try {
    const response = await apiClient.put('/user/profile', userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await apiClient.post('/user/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const signup = async (details) => {
  try {
    const response = await apiClient.post('/user/signup', details);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await apiClient.get(`/user/verifyemail/${token}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const getUserData = async () => {
  try {
    const response = await apiClient.get(`/user/getuserdata`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};