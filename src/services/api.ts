import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export async function createTranscription(audioUrl: string) {
  const res = await axios.post(`${API_BASE}/transcription`, { audioUrl });
  return res.data; // { id }
}

export async function listTranscriptions() {
  const res = await axios.get(`${API_BASE}/transcriptions`);
  return res.data;
}