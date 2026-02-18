
import { GoogleGenAI } from "@google/genai";

export class AIService {
  async solveDoubt(question: string, context: string) {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          Context: You are an expert tutor on the course titled "${context}". 
          A student is asking a doubt: "${question}".
          Provide a clear, encouraging, and highly technical answer. 
          Use markdown for formatting.
        `,
      });
      return response.text || "I'm sorry, I couldn't process that right now.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I'm having trouble connecting to my brain. Please try again later!";
    }
  }
}

export const aiService = new AIService();
