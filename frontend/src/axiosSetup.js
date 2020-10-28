import axios from 'axios';

export const axiosS = axios.create({
  baseURL: 'https://bill-track-api.herokuapp.com/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});