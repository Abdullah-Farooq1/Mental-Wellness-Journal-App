
import React, { useState } from 'react';
import { JournalEntryType } from '../types';
import { MOOD_DATA } from '../constants';
import Card from './ui/Card';
import { SparklesIcon, LoadingIcon } from './icons/UtilityIcons';
import { LightbulbIcon, CheckCircleIcon, SparkleIcon as InsightSparkleIcon } from './icons/InsightIcons';

interface JournalEntryProps {
  entry: JournalEntryType;
  onGetInsights: (entryId: string) => void;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ entry, onGetInsights }) => {
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const { icon: Icon, color, label } = MOOD_DATA[entry.mood];

  const handleInsightClick = async () => {
    setIsLoadingInsights(true);
    await onGetInsights(entry.id);
    setIsLoadingInsights(false);
  };

  const formattedDate = new Date(entry.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{formattedDate}</p>
          <div className="flex items-center space-x-2 mt-1">
            <Icon className={`w-6 h-6 ${color}`} />
            <span className={`font-semibold ${color}`}>{label}</span>
          </div>
        </div>
        <button
          onClick={handleInsightClick}
          disabled={isLoadingInsights}
          className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-wait"
        >
          {isLoadingInsights ? <LoadingIcon className="w-4 h-4" /> : <SparklesIcon className="w-4 h-4" />}
          <span>{entry.insights ? 'Refresh Insights' : 'Get Insights'}</span>
        </button>
      </div>
      <p className="mt-4 text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{entry.content}</p>

      {entry.insights && (
        <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 space-y-4">
          <h4 className="flex items-center text-lg font-semibold text-slate-800 dark:text-white">
            <InsightSparkleIcon className="w-5 h-5 mr-2 text-purple-500"/>
            AI-Powered Reflection
          </h4>
          {entry.insights.summary === 'Error' ? (
             <p className="text-red-500 dark:text-red-400">{entry.insights.positiveTakeaway} {entry.insights.actionableSuggestion}</p>
          ) : (
            <>
              <div className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 mr-3 mt-1 text-green-500 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-slate-700 dark:text-slate-200">Positive Takeaway</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{entry.insights.positiveTakeaway}</p>
                </div>
              </div>
              <div className="flex items-start">
                <LightbulbIcon className="w-5 h-5 mr-3 mt-1 text-yellow-500 flex-shrink-0" />
                <div>
                  <h5 className="font-semibold text-slate-700 dark:text-slate-200">Actionable Suggestion</h5>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{entry.insights.actionableSuggestion}</p>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </Card>
  );
};

export default JournalEntry;
