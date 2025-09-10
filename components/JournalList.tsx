
import React from 'react';
import { JournalEntryType } from '../types';
import JournalEntry from './JournalEntry';

interface JournalListProps {
  entries: JournalEntryType[];
  onGetInsights: (entryId: string) => void;
}

const JournalList: React.FC<JournalListProps> = ({ entries, onGetInsights }) => {
  return (
    <div className="space-y-6">
       <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Your Journal</h2>
      {entries.length > 0 ? (
        <div className="space-y-4">
          {entries.map((entry) => (
            <JournalEntry key={entry.id} entry={entry} onGetInsights={onGetInsights} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 px-6 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <p className="text-slate-500 dark:text-slate-400">Your journal is empty.</p>
          <p className="text-slate-400 dark:text-slate-500 text-sm">Start by writing a new entry above.</p>
        </div>
      )}
    </div>
  );
};

export default JournalList;
