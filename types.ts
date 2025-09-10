
export enum Mood {
  AWESOME = 'awesome',
  GOOD = 'good',
  MEH = 'meh',
  BAD = 'bad',
  TERRIBLE = 'terrible',
}

export interface AIInsight {
  summary: string;
  positiveTakeaway: string;
  actionableSuggestion: string;
}

export interface JournalEntryType {
  id: string;
  date: string; // ISO string
  mood: Mood;
  content: string;
  insights?: AIInsight;
}
