import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // Replace with your API's base URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
