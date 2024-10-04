import apiClient from './index';

export const getAllNews = async () => {
  try {
    const response = await apiClient.get('/news/get-all-news');
    return response.data;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};
export const createNews = async (newNews) => {
  try {
    const response = await apiClient.post('news/create-news', newNews);
    return response.data;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};
export const deleteNews = async (id) => {
  try {
    const response = await apiClient.delete(`/news/delete-news/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};
export const updateNews = async (id,newNews) => {
    try {
      const response = await apiClient.put(`/news/update-news/${id}`, newNews);
      return response.data;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  };