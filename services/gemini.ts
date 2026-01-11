
import { GoogleGenAI } from "@google/genai";

export async function askGeminiAboutPet(petName: string, breed: string, userQuestion: string) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a helpful animal shelter assistant. A user is asking about a ${breed} named ${petName}. 
                 Question: "${userQuestion}"
                 Provide a friendly, informative response in Chinese.`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "抱歉，我现在无法回答您的问题，请稍后再试。";
  }
}
