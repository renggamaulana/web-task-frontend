import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api/sales";

export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    throw error;
  }
};

export const createItem = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error creating item in ${endpoint}:`, error);
    throw error;
  }
};

export const updateItem = async (endpoint, data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(`Gagal mengubah data ${endpoint}:`, error);
      throw error;
    }
  };

export const deleteItem = async (endpoint, id) => {
  try {
    await axios.delete(`${API_BASE_URL}/${endpoint}/${id}`);
  } catch (error) {
    console.error(`Error deleting item from ${endpoint}:`, error);
    throw error;
  }
};
