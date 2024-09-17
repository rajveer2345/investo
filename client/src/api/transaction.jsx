import apiClient from './index';

export const makeTransaction = async (transactionData) => {
  try {
    const response = await apiClient.post('/transaction/admin-add', transactionData);
    return response.data;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};
