import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function getJWTHeader(token: string | null): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}
