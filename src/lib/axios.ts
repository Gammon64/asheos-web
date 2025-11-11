import axios from "axios";

// Este 'api' é para uso NO SERVIDOR (RSC, Route Handlers)
export const api = axios.create({
  baseURL: process.env.BACKEND_API_URL,
});
