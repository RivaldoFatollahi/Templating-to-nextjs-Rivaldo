import axios from "axios";

const API_URL = "http://localhost:4000";

// ========================== AUTH ========================== //
export async function login(username: string, password: string) {
  const res = await axios.post(`${API_URL}/login`, { username, password });
  return res.data; // pastikan backend return { token: "..." }
}
export async function register(username: string, password: string) {
  const res = await axios.post(`${API_URL}/register`, { username, password });
  return res.data;
}

// ========================== SARPRAS ========================== //
export async function getSarpras(token: string, page: number, limit: number) {
  const res = await axios.get(
    `${API_URL}/api/sarpras?page=${page}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
}

export async function getSarprasById(token: string, id: number) {
  const res = await axios.get(`${API_URL}/api/sarpras/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function createSarpras(
  token: string,
  body: { name: string; condition: string; quantity: number }
) {
  const res = await axios.post(`${API_URL}/api/sarpras`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function updateSarpras(
  token: string,
  id: number,
  body: { name?: string; condition?: string; quantity?: number }
) {
  const res = await axios.put(`${API_URL}/api/sarpras/${id}`, body, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function deleteSarpras(token: string, id: number) {
  const res = await axios.delete(`${API_URL}/api/sarpras/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
