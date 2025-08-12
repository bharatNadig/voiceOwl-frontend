import TranscriptionForm from './components/TranscriptionForm';
import TranscriptionList from './components/TranscriptionList';

export default function App() {
  return (
    <div className="width-full">
      <h1 className="text-2xl font-bold mb-4">VoiceOwl — Demo</h1>
      <div className="mb-6">
        <TranscriptionForm />
      </div>
      <TranscriptionList />
    </div>
  );
}