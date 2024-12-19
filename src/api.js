import axios from 'axios';

const API_URL = 'https://ton-api-gateway-url.amazonaws.com';

export const getItems = () => axios.get(`${API_URL}/items`);
export const getItem = (id) => axios.get(`${API_URL}/items/${id}`);
export const createItem = (data) => axios.post(`${API_URL}/items`, data);
export const updateItem = (id, data) => axios.put(`${API_URL}/items/${id}`, data);
export const deleteItem = (id) => axios.delete(`${API_URL}/items/${id}`);
