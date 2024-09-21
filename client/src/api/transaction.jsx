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
export const getUserTransactions = async () => {
  try {
    const response = await apiClient.get('/transaction/get-user-transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching :', error);
    throw error;
  }
};
export const getAdminTransactions = async () => {
  try {
    const response = await apiClient.get('/transaction/get-admin-transactions');
    return response.data;
  } catch (error) {
    console.error('Error fetching :', error);
    throw error;
  }
};
