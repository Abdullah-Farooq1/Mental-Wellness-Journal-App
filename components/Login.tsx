
import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(username);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white rounded-2xl shadow-xl dark:bg-slate-800 animate-fade-in">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Welcome to Zenith</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Your personal wellness journal.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="text-sm font-medium text-slate-700 dark:text-slate-300">
              What should we call you?
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your first name"
              className="mt-1 block w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out disabled:bg-blue-400"
            disabled={!username.trim()}
          >
            Begin Journaling
          </button>
        </form>
        <p className="text-xs text-center text-slate-400 dark:text-slate-500">Your data is stored locally in your browser.</p>
      </div>
    </div>
  );
};

export default Login;
