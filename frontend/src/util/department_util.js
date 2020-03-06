import axios from 'axios';

export const fetchAllDepartments = () => {
  return axios.get('/api/departments')
}

export const fetchDepartment = (deptId) => {
  return axios.get(`/api/departments/${deptId}`);
}