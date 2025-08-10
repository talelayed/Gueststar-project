import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || 'https://gueststar-project.onrender.com/api';

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
