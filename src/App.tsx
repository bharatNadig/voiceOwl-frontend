import TranscriptionForm from './components/TranscriptionForm';
import TranscriptionList from './components/TranscriptionList';

export default function App() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">VoiceOwl — Demo</h1>
      <div className="mb-6">
        <TranscriptionForm />
      </div>
      <h2 className="text-xl font-semibold mb-2">All transcriptions</h2>
      <TranscriptionList />
    </div>
  );
}