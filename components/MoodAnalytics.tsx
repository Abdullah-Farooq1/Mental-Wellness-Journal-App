
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { JournalEntryType, Mood } from '../types';
import Card from './ui/Card';

interface MoodAnalyticsProps {
  entries: JournalEntryType[];
}

const moodToValue = (mood: Mood): number => {
  switch (mood) {
    case Mood.TERRIBLE: return 1;
    case Mood.BAD: return 2;
    case Mood.MEH: return 3;
    case Mood.GOOD: return 4;
    case Mood.AWESOME: return 5;
    default: return 0;
  }
};

const MoodAnalytics: React.FC<MoodAnalyticsProps> = ({ entries }) => {
  const data = entries
    .slice() // Create a copy to avoid mutating original
    .reverse() // Entries are newest first, so reverse for chronological order
    .map(entry => ({
      date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      moodValue: moodToValue(entry.mood),
      mood: entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1),
    }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg">
          <p className="label font-semibold">{`${label}`}</p>
          <p className="intro" style={{ color: payload[0].stroke }}>{`Mood: ${payload[0].payload.mood}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Mood Trends</h2>
        {entries.length > 1 ? (
        <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={data}
                margin={{ top: 5, right: 10, left: -25, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(100, 116, 139, 0.3)" />
                <XAxis dataKey="date" tick={{ fill: 'rgb(100 116 139)' }} fontSize={12} />
                <YAxis
                domain={[0, 6]}
                ticks={[1, 2, 3, 4, 5]}
                tickFormatter={(value) => ['Terrible', 'Bad', 'Meh', 'Good', 'Awesome'][value-1]}
                tick={{ fill: 'rgb(100 116 139)' }}
                fontSize={12}
                width={70}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="moodValue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} name="Mood" />
            </LineChart>
            </ResponsiveContainer>
        </div>
        ) : (
            <div className="text-center py-10 px-6 h-72 flex flex-col justify-center">
                <p className="text-slate-500 dark:text-slate-400">Not enough data for a chart yet.</p>
                <p className="text-slate-400 dark:text-slate-500 text-sm">Create at least two entries to see your mood trend.</p>
            </div>
        )}
    </Card>
  );
};

export default MoodAnalytics;
