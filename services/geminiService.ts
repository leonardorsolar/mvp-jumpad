
import { GoogleGenAI } from "@google/genai";

export async function* streamMessageFromGemini(prompt: string) {
  const API_KEY = process.env.API_KEY || '';
  if (!API_KEY) throw new Error("API Key is missing.");

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  
  try {
    const responseStream = await ai.models.generateContentStream({
      model: 'gemini-3-flash-preview',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "You are Jumpad, a sophisticated AI assistant. You provide clear, concise, and helpful answers. Format your responses with Markdown for clarity. If asked for code, use proper language highlighting. Stay professional but accessible.",
        temperature: 0.7,
      }
    });

    for await (const chunk of responseStream) {
      const text = chunk.text;
      if (text) yield text;
    }
  } catch (error) {
    console.error("Gemini Streaming Error:", error);
    throw error;
  }
}
