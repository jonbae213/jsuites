import axios from 'axios';

export const fetchAllUsers = () => {
  return axios.get('/api/users');
}

export const fetchUser = (userId) => {
  return axios.get(`/api/users/${userId}`);
}