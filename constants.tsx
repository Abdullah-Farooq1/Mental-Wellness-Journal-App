
import React from 'react';
import { Mood } from './types';

import { AwesomeIcon, GoodIcon, MehIcon, BadIcon, TerribleIcon } from './components/icons/MoodIcons';

export const MOOD_DATA: Record<Mood, { label: string; icon: React.FC<{className?: string}>; color: string; }> = {
  [Mood.AWESOME]: { label: 'Awesome', icon: AwesomeIcon, color: 'text-awesome' },
  [Mood.GOOD]: { label: 'Good', icon: GoodIcon, color: 'text-good' },
  [Mood.MEH]: { label: 'Meh', icon: MehIcon, color: 'text-meh' },
  [Mood.BAD]: { label: 'Bad', icon: BadIcon, color: 'text-bad' },
  [Mood.TERRIBLE]: { label: 'Terrible', icon: TerribleIcon, color: 'text-terrible' },
};
