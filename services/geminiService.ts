import { GoogleGenAI, Type } from "@google/genai";
import { CVData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const cvSchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "Full name of the person." },
    title: { type: Type.STRING, description: "Current job title or professional headline." },
    contact: {
      type: Type.OBJECT,
      properties: {
        location: { type: Type.STRING },
        phone: { type: Type.STRING },
        email: { type: Type.STRING },
        linkedin: { type: Type.STRING },
        portfolio: { type: Type.STRING },
      }
    },
    profile: { type: Type.STRING, description: "A summary or professional profile." },
    skills: { type: Type.ARRAY, items: { type: Type.STRING } },
    workExperience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          role: { type: Type.STRING },
          company: { type: Type.STRING },
          period: { type: Type.STRING },
          location: { type: Type.STRING },
          responsibilities: { type: Type.ARRAY, items: { type: Type.STRING } },
        }
      }
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          degree: { type: Type.STRING },
          institution: { type: Type.STRING },
          year: { type: Type.STRING },
        }
      }
    },
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          description: { type: Type.STRING },
        }
      }
    },
    languages: { type: Type.ARRAY, items: { type: Type.STRING } },
    interests: { type: Type.ARRAY, items: { type: Type.STRING } },
  }
};


const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const parseCV = async (file: File): Promise<CVData> => {
  const imagePart = await fileToGenerativePart(file);
  const prompt = "You are an expert CV parser. Analyze the provided document and extract the user's professional information. Format the output as a JSON object that strictly adheres to the provided schema. If a section is not present in the document, return an empty string or an empty array for that field. Make sure to list responsibilities for each work experience as a list of strings.";

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, { text: prompt }] },
    config: {
      responseMimeType: "application/json",
      responseSchema: cvSchema,
    }
  });

  const parsedJson = JSON.parse(response.text);
  return parsedJson as CVData;
};

const languageMap: { [key: string]: string } = {
  en: 'English',
  vi: 'Vietnamese',
  ja: 'Japanese',
};

export const translateSection = async (sectionKey: keyof CVData, content: any, targetLanguage: string): Promise<any> => {
    const fullLanguageName = languageMap[targetLanguage] || targetLanguage;
    const isSimpleString = typeof content === 'string';

    const systemInstruction = `You are an expert CV translator. Your task is to translate the provided JSON content for the "${sectionKey}" section of a CV into ${fullLanguageName}.
- Translate all textual content.
- If the input is a simple JSON string, return ONLY the translated string as a valid JSON string (e.g., "translated text").
- If the input is a JSON object or array, DO NOT alter the structure or keys. Return the translated version in the same structure.
- Return ONLY the translated JSON content, without any extra explanations, introductory text, or markdown formatting. The output must be valid JSON that can be parsed directly.`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: JSON.stringify(content, null, 2),
        config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
        }
    });
    
    // The Gemini API may return conversational text or markdown around the JSON.
    // This logic robustly extracts the core JSON string before parsing.
    let responseText = response.text.trim();
    
    const firstOpenBracket = responseText.indexOf('[');
    const firstOpenBrace = responseText.indexOf('{');
    
    let startIndex = -1;
    
    if (firstOpenBracket !== -1 && firstOpenBrace !== -1) {
        startIndex = Math.min(firstOpenBracket, firstOpenBrace);
    } else if (firstOpenBracket !== -1) {
        startIndex = firstOpenBracket;
    } else {
        startIndex = firstOpenBrace;
    }

    if (startIndex !== -1) {
        const lastCloseBracket = responseText.lastIndexOf(']');
        const lastCloseBrace = responseText.lastIndexOf('}');
        
        const endIndex = Math.max(lastCloseBracket, lastCloseBrace);

        if (endIndex > startIndex) {
            responseText = responseText.substring(startIndex, endIndex + 1);
        }
    }
    
    let parsedJson;
    try {
        parsedJson = JSON.parse(responseText);
    } catch (error) {
        console.error("Failed to parse JSON from AI response:", responseText);
        // Re-throw the error with more context to help debugging.
        throw new Error(`Failed to parse AI response as JSON. Content: ${responseText}`);
    }
    
    // Safeguard: If we expected a string but got an object, extract the string value.
    // This handles cases where the AI wraps a simple string response in an object.
    if (isSimpleString && typeof parsedJson === 'object' && parsedJson !== null) {
        if (sectionKey in parsedJson && typeof parsedJson[sectionKey] === 'string') {
            return parsedJson[sectionKey];
        }
        const firstStringValue = Object.values(parsedJson).find(v => typeof v === 'string');
        if (firstStringValue) {
            return firstStringValue;
        }
    }

    return parsedJson;
};
