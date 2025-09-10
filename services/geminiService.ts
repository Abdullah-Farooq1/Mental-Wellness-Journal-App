
import { GoogleGenAI, Type } from "@google/genai";
import { AIInsight } from '../types';

if (!process.env.API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this project, we assume the key is set in the environment.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const insightSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: 'A brief, one-sentence summary of the user\'s journal entry.'
    },
    positiveTakeaway: {
      type: Type.STRING,
      description: 'Identify a point of strength, resilience, or a positive aspect from the entry, even if it\'s subtle. Frame it as an encouraging observation.'
    },
    actionableSuggestion: {
      type: Type.STRING,
      description: 'Provide a single, gentle, and actionable suggestion for the user. This could be a mindfulness exercise, a reframing technique, or a small step they could take. Keep it simple and supportive.'
    }
  },
  required: ['summary', 'positiveTakeaway', 'actionableSuggestion']
};

export const getAIInsights = async (entryText: string): Promise<AIInsight> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following journal entry from a user. Your role is to be a compassionate, supportive, and non-judgmental mental wellness companion. Do not give medical advice. Your goal is to help the user reflect and feel understood. \n\nJournal Entry:\n"""\n${entryText}\n"""`,
      config: {
        systemInstruction: "You are an AI-powered mental wellness assistant. Your responses should be empathetic, encouraging, and focused on gentle reflection. Generate insights based on the user's journal entry in the requested JSON format.",
        responseMimeType: "application/json",
        responseSchema: insightSchema,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    const jsonText = response.text.trim();
    const parsedInsight: AIInsight = JSON.parse(jsonText);
    return parsedInsight;
  } catch (error) {
    console.error("Error generating AI insights:", error);
    throw new Error("Failed to get insights from AI. Please try again later.");
  }
};
