
import { GoogleGenAI } from "@google/genai";

export class AIService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async solveDoubt(question: string, context: string) {
    try {
      const response = await this.ai.models.generateContent({
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
