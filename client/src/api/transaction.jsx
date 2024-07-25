import apiClient from './index';

export const getUserProfile = async () => {
  try {
    const response = await apiClient.get('/fact');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};
