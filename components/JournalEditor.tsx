
import React, { useState } from 'react';
import { Mood } from '../types';
import { MOOD_DATA } from '../constants';
import Card from './ui/Card';

interface JournalEditorProps {
  addEntry: (content: string, mood: Mood) => void;
}

const JournalEditor: React.FC<JournalEditorProps> = ({ addEntry }) => {
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<Mood>(Mood.GOOD);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      addEntry(content, selectedMood);
      setContent('');
      setSelectedMood(Mood.GOOD);
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">How are you feeling today?</h2>
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write about your day, your thoughts, your feelings..."
            className="w-full h-36 p-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition"
            required
          />
        </div>
        <div className="space-y-3">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Select your mood:</label>
            <div className="flex justify-around items-center bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
            {Object.values(Mood).map((mood) => {
                const { label, icon: Icon, color } = MOOD_DATA[mood];
                return (
                <button
                    type="button"
                    key={mood}
                    onClick={() => setSelectedMood(mood)}
                    className={`p-2 rounded-full transform transition-transform duration-200 focus:outline-none ${selectedMood === mood ? 'scale-125 bg-blue-100 dark:bg-blue-900' : 'hover:scale-110'}`}
                    title={label}
                >
                    <Icon className={`w-8 h-8 ${color}`} />
                </button>
                );
            })}
            </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:bg-blue-400 disabled:cursor-not-allowed"
          disabled={!content.trim()}
        >
          Save Entry
        </button>
      </form>
    </Card>
  );
};

export default JournalEditor;
