
import { GoogleGenAI, Type } from "@google/genai";
import type { AnalysisResult } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const resumeAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    matchScore: {
      type: Type.INTEGER,
      description: "A score from 0 to 100 representing how well the resume matches the job description. Be critical and objective.",
    },
    summary: {
      type: Type.STRING,
      description: "A concise, professional summary (2-3 sentences) of the candidate's suitability for the role, highlighting key qualifications.",
    },
    strengths: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "An array of specific points detailing how the candidate's skills and experience align with the job requirements.",
    },
    weaknesses: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "An array of key skills or qualifications from the job description that are missing or not clearly demonstrated in the resume.",
    },
    suggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.STRING,
      },
      description: "An array of actionable suggestions for the candidate to improve their resume for this specific role (e.g., 'Quantify achievements in past roles with metrics').",
    },
  },
  required: ["matchScore", "summary", "strengths", "weaknesses", "suggestions"],
};

export const analyzeResume = async (resumeText: string, jobDescription: string): Promise<AnalysisResult> => {
  const prompt = `
    You are a highly experienced HR analyst and recruitment expert. Your task is to meticulously analyze the provided resume against the given job description.
    Evaluate the candidate's qualifications, skills, and experience against all requirements of the job.
    Provide your analysis in a structured JSON format. Do not add any text or explanations outside of the JSON object.

    **Resume Text:**
    ---
    ${resumeText}
    ---

    **Job Description:**
    ---
    ${jobDescription}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: resumeAnalysisSchema,
        temperature: 0.2, // Lower temperature for more deterministic, factual output
      },
    });

    const jsonText = response.text.trim();
    // Although schema is enforced, parsing is still a good practice for validation.
    const result = JSON.parse(jsonText); 
    
    // Simple validation
    if (typeof result.matchScore !== 'number' || !Array.isArray(result.strengths)) {
        throw new Error("Received malformed JSON response from API.");
    }

    return result as AnalysisResult;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get analysis from AI: ${error.message}`);
    }
    throw new Error("An unknown error occurred during AI analysis.");
  }
};
