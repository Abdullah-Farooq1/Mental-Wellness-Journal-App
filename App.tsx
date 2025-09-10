
import React, { useState, useEffect, useCallback } from 'react';
import { JournalEntryType, Mood } from './types';
import JournalEditor from './components/JournalEditor';
import JournalList from './components/JournalList';
import MoodAnalytics from './components/MoodAnalytics';
import Header from './components/Header';
import Login from './components/Login';
import { getAIInsights } from './services/geminiService';
import { LoadingIcon } from './components/icons/UtilityIcons';

const App: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [user, setUser] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('zenith-journal-user');
    if (savedUser) {
      setUser(savedUser);
      const savedEntries = localStorage.getItem(`zenith-journal-entries-${savedUser}`);
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
    }

    const savedTheme = localStorage.getItem('zenith-journal-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialThemeIsDark = savedTheme ? savedTheme === 'dark' : prefersDark;
    setIsDarkMode(initialThemeIsDark);
    
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`zenith-journal-entries-${user}`, JSON.stringify(entries));
    }
  }, [entries, user]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('zenith-journal-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('zenith-journal-theme', 'light');
    }
  }, [isDarkMode]);

  const handleLogin = (username: string) => {
    if (username.trim()) {
        const sanitizedUser = username.trim();
        setUser(sanitizedUser);
        localStorage.setItem('zenith-journal-user', sanitizedUser);
        const savedEntries = localStorage.getItem(`zenith-journal-entries-${sanitizedUser}`);
        setEntries(savedEntries ? JSON.parse(savedEntries) : []);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setEntries([]);
    localStorage.removeItem('zenith-journal-user');
  };

  const addEntry = (content: string, mood: Mood) => {
    const newEntry: JournalEntryType = {
      id: new Date().toISOString(),
      date: new Date().toISOString(),
      content,
      mood,
    };
    setEntries(prev => [newEntry, ...prev]);
  };
  
  const updateEntryInsights = useCallback((entryId: string, insights: JournalEntryType['insights']) => {
    setEntries(prev => prev.map(e => e.id === entryId ? { ...e, insights } : e));
  }, []);

  const handleGetInsights = async (entryId: string) => {
    const entry = entries.find(e => e.id === entryId);
    if (!entry) return;
    
    updateEntryInsights(entryId, undefined); // To show loading state

    try {
      const insights = await getAIInsights(entry.content);
      updateEntryInsights(entryId, insights);
    } catch (error) {
      console.error(error);
      // Optionally handle error state in UI for that entry
      updateEntryInsights(entryId, { summary: 'Error', positiveTakeaway: 'Could not fetch insights.', actionableSuggestion: 'Please check your connection or API key and try again.' });
    }
  };

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <LoadingIcon className="w-12 h-12 text-blue-500" />
      </div>
    )
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
      <Header user={user} onLogout={handleLogout} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <JournalEditor addEntry={addEntry} />
            <JournalList entries={entries} onGetInsights={handleGetInsights} />
          </div>
          <div className="lg:col-span-1">
            <MoodAnalytics entries={entries} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
