/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { createTranscription } from '../services/api';

export default function TranscriptionForm() {
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const data = await createTranscription(audioUrl);
      setResult(data.id);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-2">
      <input
        value={audioUrl}
        onChange={(e) => setAudioUrl(e.target.value)}
        className="border p-2 w-full"
        placeholder="https://example.com/sample.mp3"
      />
      <button className="px-4 py-2 bg-slate-800 text-white" disabled={loading}>
        {loading ? 'Submitting...' : 'Transcribe'}
      </button>

      {result && <div className="mt-2 p-2 bg-green-100">Transcription ID: {result}</div>}
      {error && <div className="mt-2 p-2 bg-red-100">Error: {error}</div>}
    </form>
  );
}