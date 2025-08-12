/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { createTranscription } from "../services/api";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function TranscriptionForm() {
  const [audioUrl, setAudioUrl] = useState("");
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
      setError(err?.response?.data?.error || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="form-container space-y-2">
      <TextField
        id="outlined-basic"
        label="Enter Audio URL"
        size="small"
        variant="outlined"
        value={audioUrl}
        onChange={(e) => setAudioUrl(e.target.value)}
        className="margin-right-2"
        placeholder="https://example.com/sample.mp3"
      />
      <Button
        variant="contained"
        disabled={loading}
        className="margin-left-2"
        type="submit"
      >
        {loading ? "Submitting..." : "Transcribe"}
      </Button>

      {result && (
        <div className="">Transcription ID: {result}</div>
      )}
      {error && <div className="">Error: {error}</div>}
    </form>
  );
}
