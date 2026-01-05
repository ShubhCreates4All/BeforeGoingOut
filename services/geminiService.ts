import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DashboardData, Timeframe, UserProfile } from "../types";

// NOTE: In a production app, never expose API keys on the client.
// This is for demonstration purposes as requested.
const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const fetchDashboardData = async (
  location: string,
  timeframe: Timeframe,
  profile: UserProfile,
  coords?: { lat: number; lng: number }
): Promise<DashboardData> => {
  
  if (!API_KEY) {
    throw new Error("API Key is missing. Please check your configuration.");
  }

  const locationPrompt = coords 
    ? `Latitude: ${coords.lat}, Longitude: ${coords.lng}` 
    : `City: ${location}`;

  const prompt = `
    Act as a "Smart Weather & Lifestyle Engine". 
    Target Location: ${locationPrompt}
    Target Timeframe: ${timeframe}
    
    User Persona:
    - Gender: ${profile.gender}
    - Age Group: ${profile.ageGroup}
    - Fashion Style: ${profile.style}

    Task:
    1. Estimate/Generate accurate weather data for this location and time.
    2. Generate an "Outfit Algorithm" based on weather rules AND the User Persona.
       - Rules: Rain -> waterproof. >75°F -> breathable. <40°F -> thermal. Wind -> no loose hats.
       - Style: Ensure the items match the "${profile.style}" aesthetic for a ${profile.ageGroup} ${profile.gender}.
    3. Suggest 3 premium affiliate-style products that match this specific outfit and persona.

    Return the data in the specified JSON schema.
  `;

  const schema: Schema = {
    type: Type.OBJECT,
    properties: {
      weather: {
        type: Type.OBJECT,
        properties: {
          temp: { type: Type.NUMBER, description: "Temperature in Fahrenheit" },
          feelsLike: { type: Type.NUMBER, description: "Feels like temperature in Fahrenheit" },
          condition: { type: Type.STRING, description: "Short condition (e.g., Rainy, Sunny, Cloudy)" },
          humidity: { type: Type.NUMBER, description: "Humidity percentage (0-100)" },
          windSpeed: { type: Type.NUMBER, description: "Wind speed in MPH" },
          description: { type: Type.STRING, description: "A short, witty weather summary" },
          isDay: { type: Type.BOOLEAN, description: "True if it is daytime" }
        },
        required: ["temp", "condition", "feelsLike", "humidity", "windSpeed", "description", "isDay"]
      },
      outfit: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, description: "Display Category (e.g., Base Layer)" },
            item: { type: Type.STRING, description: "Specific item name (e.g., Beige Trench Coat)" },
            reason: { type: Type.STRING, description: "Why this item? (e.g., 'Classic look for rain')" },
            iconType: { type: Type.STRING, enum: ["head", "body", "outer", "legs", "feet", "accessory"] }
          },
          required: ["category", "item", "reason", "iconType"]
        }
      },
      shop: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            name: { type: Type.STRING },
            price: { type: Type.STRING },
            imageUrl: { type: Type.STRING, description: "Use a placeholder" }
          },
          required: ["id", "name", "price", "imageUrl"]
        }
      }
    },
    required: ["weather", "outfit", "shop"]
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const text = response.text;
    if (!text) throw new Error("No data returned from AI");

    return JSON.parse(text) as DashboardData;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};