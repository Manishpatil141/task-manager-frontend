import axios from 'axios';

const baseURL = 'http://localhost:8000/api/v1/'; // Update with your backend URL

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});