import { GoogleGenAI, Type } from "@google/genai";
import { ViralAnalysis, GeneratedContent } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const MAX_RETRIES = 3;
const BACKOFF_BASE_MS = 800;
const RETRYABLE_ERROR_PATTERN = /(overloaded|retry|503|UNAVAILABLE|rate limit)/i;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const isRetryableError = (error: unknown) => {
  if (!error) return false;
  const message =
    typeof error === "string"
      ? error
      : typeof error === "object" && error !== null
        ? "message" in error && typeof (error as any).message === "string"
          ? (error as any).message
          : ""
        : "";
  return RETRYABLE_ERROR_PATTERN.test(message);
};

const executeWithRetry = async <T>(fn: () => Promise<T>) => {
  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const shouldRetry =
        attempt < MAX_RETRIES - 1 && isRetryableError(error);
      if (!shouldRetry) {
        throw error;
      }
      await sleep(BACKOFF_BASE_MS * (attempt + 1));
    }
  }
  throw new Error("Retry loop exited unexpectedly.");
};

const parseJsonResponse = <T>(raw: string): T => {
  let cleaned = raw.trim();

  if (cleaned.startsWith("```")) {
    const firstNewline = cleaned.indexOf("\n");
    if (firstNewline !== -1) {
      cleaned = cleaned.slice(firstNewline + 1);
    }
    if (cleaned.endsWith("```")) {
      cleaned = cleaned.slice(0, -3);
    }
    cleaned = cleaned.trim();
  }

  try {
    return JSON.parse(cleaned) as T;
  } catch (error) {
    console.error("Failed to parse Gemini response", { raw, cleaned, error });
    throw new Error("The AI response was not valid JSON.");
  }
};

export const analyzePost = async (referenceContent: string): Promise<ViralAnalysis> => {
  const prompt = `
    Act as a world-class LinkedIn Viral Strategist.
    
    Analyze the styles, patterns, and structure of the following "Reference Post Content". 
    Identify the hook type (e.g., "Contrarian", "Storytelling", "Listicle"), the specific formatting tricks used (e.g., "One-line paragraphs", "Slide-in visuals"), the tone, and the specific keywords that drive engagement. 
    Estimate a "Virality Score" from 0-100 based on how well it captures attention.

    Reference Post Content:
    """${referenceContent}"""
  `;

  const response = await executeWithRetry(() =>
    ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert social media algorithm analyst.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hookStrategy: { type: Type.STRING, description: "The specific type of hook used (e.g., 'The Bait-and-Switch')" },
            tone: { type: Type.STRING, description: "The emotional tone (e.g., 'Vulnerable yet authoritative')" },
            formattingFeatures: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of formatting styles (e.g., 'Single sentence paragraphs', 'Bullet points with emojis')"
            },
            viralityScore: { type: Type.INTEGER, description: "Score from 0-100" },
            keywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Keywords found in reference that aid discovery"
            },
            emotionalArc: { type: Type.STRING, description: "How the post moves the reader emotionally" }
          },
          required: ["hookStrategy", "tone", "formattingFeatures", "viralityScore", "keywords", "emotionalArc"]
        }
      }
    })
  );

  if (!response.text) {
    throw new Error("Failed to analyze content");
  }

  const analysis = parseJsonResponse<ViralAnalysis>(response.text);

  // Merge the analysis with the original content so we can use it for generation later
  return {
    ...analysis,
    originalContent: referenceContent
  } as ViralAnalysis;
};

export const generatePost = async (
  analysis: ViralAnalysis,
  topic: string
): Promise<GeneratedContent> => {
  const currentDateTime = new Date().toLocaleString();

  // We include the original content in the prompt to ensure the model mimics the style EXACTLY.
  const prompt = `
    Act as a world-class LinkedIn Ghostwriter.
    
    I want you to write a new LinkedIn post about a "Target Topic".
    However, you must STRICTLY mimic the style, structure, spacing, and tone of the "Reference Post" provided below.

    REFERENCE POST (The Template to Mimic):
    """
    ${analysis.originalContent}
    """

    ANALYSIS OF REFERENCE (For Context):
    - Hook Strategy: ${analysis.hookStrategy}
    - Tone: ${analysis.tone}
    - Formatting: ${analysis.formattingFeatures.join(', ')}
    
    TASK:
    Write a NEW LinkedIn post about the "Target Topic" below.
    
    CRITICAL INSTRUCTIONS:
    1. **Visual Mimicry**: If the reference uses one-line paragraphs, you must too. If it uses a specific list style, copy it exactly.
    2. **Hook Replication**: Open with a hook that mirrors the psychological trigger and sentence structure of the reference hook, but for the new topic.
    3. **Formatting**: Use the exact same formatting (bolding, emojis, spacing) as the reference.
    4. **Length**: Keep the word count and pacing very similar to the reference.
    
    TARGET TOPIC:
    """${topic}"""

    CONTEXT:
    Current Date/Time: ${currentDateTime}
    
    Provide specific advice on why this new post works and the best time to post it.
  `;

  const response = await executeWithRetry(() =>
    ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert ghostwriter who mimics styles perfectly. You never add your own flair, you only mirror the reference.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            postContent: { type: Type.STRING, description: "The newly generated post text" },
            whyItWorks: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Explain how specific hooks, patterns, and storytelling elements were transferred from the reference to this new post."
            },
            postingAdvice: {
              type: Type.OBJECT,
              properties: {
                bestTime: { type: Type.STRING, description: "Suggested time day/hour relative to now" },
                reason: { type: Type.STRING, description: "Why this time works for this content" }
              },
              required: ["bestTime", "reason"]
            }
          },
          required: ["postContent", "whyItWorks", "postingAdvice"]
        }
      }
    })
  );

  if (!response.text) {
    throw new Error("Failed to generate post");
  }

  return parseJsonResponse<GeneratedContent>(response.text);
};
