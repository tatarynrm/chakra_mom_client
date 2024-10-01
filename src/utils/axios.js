import axios from "axios";

// export const API_URL = `http://localhost:8800`;
export const API_URL = `https://api.logistic-mira.space`;

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  
  // Якщо токен існує, додаємо його до заголовків
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  // Обробка помилок, якщо потрібно
  console.log('ERRROR AXIOS INTERCEPTOR',error);
  
  return Promise.reject(error);
});

export default instance;