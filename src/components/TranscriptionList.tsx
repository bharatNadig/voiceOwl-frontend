/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { listTranscriptions } from "../services/api";

export default function TranscriptionList() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await listTranscriptions();
        setItems(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-2">
      {items.map((it) => (
        <div key={it._id} className="p-2 border rounded">
          <div>
            <strong>_id:</strong> {it._id}
          </div>
          <div>
            <strong>audioUrl:</strong> {it.audioUrl}
          </div>
          <div>
            <strong>transcription:</strong> {it.transcription}
          </div>
          <div>
            <small>{new Date(it.createdAt).toLocaleString()}</small>
          </div>
        </div>
      ))}
      {!items.length && <div>No transcriptions yet.</div>}
    </div>
  );
}
