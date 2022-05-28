import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean',
  timeout: 5000,
});

export const getQuestions = () => axiosInstance.get('');
