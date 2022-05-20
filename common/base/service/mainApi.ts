import axios from 'axios';

const defaultApi = axios.create({
  baseURL: 'https://localhost:5001/api/v1/',
});

// defaultApi.interceptors.request.use((request) => {
//   const token = sessionStorage.getItem('token');
//   request.headers.authorization = `Bearer ${token}`;
//   return request;
// });

// defaultApi.interceptors.response.use((response) => response, (error) => {
//   if (error.response.status === 401) {
//     sessionStorage.clear();
//   }

//   return Promise.reject(error);
// });

export default defaultApi;
