import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchProducts } from "./shopify";
import supabaseClient from "./supabaseClient";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const responseSchema = `{
  "type": "array",
  "items": {
    "type": "object",
    "properties": {
      "title": {
        "type": "string",
        "description": "Title of the product"
      },
      "productType": {
        "type": "string",
        "description": "Category or type of the product"
      },
      "variants": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "title": {
              "type": "string",
              "description": "Title or name of the variant"
            },
            "price": {
              "type": "string",
              "description": "Price of the variant"
            }
          },
          "required": ["title", "price"]
        }
      },
      "recommendation": {
        "type": "object",
        "properties": {
          "score": {
            "type": "number",
            "description": "Recommendation score from 0-100"
          },
          "reasoning": {
            "type": "string",
            "description": "Personalized explanation for the recommendation"
          }
        },
        "required": ["score", "reasoning"]
      }
    },
    "required": ["title", "productType", "variants", "recommendation"]
  }
}`;

async function generatePersonalizedRecommendations(userInput, shopifyData, userProfile) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    
    const prompt = `
      You are an expert personal shopping assistant. Analyze the following product data and user profile to provide personalized recommendations.

      Product Data:
      ${JSON.stringify(shopifyData, null, 2)}

      User Profile:
      - Age: ${userProfile.age}
      - Gender: ${userProfile.gender}
      - Location: ${userProfile.location}
      - Interests: ${userProfile.interest}

      User Query: ${userInput}

      Based on the user's profile and query, analyze the products and provide personalized recommendations. Consider:
      1. Age appropriateness
      2. Gender preferences (if relevant)
      3. Location-based factors (climate, cultural preferences)
      4. User interests and how they align with the products
      5. Price points and value proposition

      IMPORTANT: Your response must be a valid JSON array containing product recommendations. 
      Do not include any markdown formatting, code blocks, or explanatory text.
      Only return the raw JSON array that matches this exact structure:
      ${responseSchema}

      If you cannot generate valid recommendations, return an empty array: []
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Clean the response text - remove any markdown code blocks or extra formatting
    const cleanJson = text.replace(/```json\s*|\s*```/g, '').trim();
    
    try {
      const jsonResponse = JSON.parse(cleanJson);
      return jsonResponse;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      console.error("Raw response from Gemini:", text);
      console.error("Cleaned response:", cleanJson);
      return [];
    }
  } catch (error) {
    console.error("Error generating recommendations:", error);
    return { error: error.message };
  }
}

// Example usage
async function getRecommendations(userInput) {
  try {
    // Get user session and profile
    const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
    if (sessionError) throw new Error('Failed to get user session: ' + sessionError.message);
    if (!session?.user?.id) throw new Error('No authenticated user found');

    // Fetch user profile
    const { data: profile, error: profileError } = await supabaseClient
      .from('Profiles')
      .select('age, gender, location, interest')
      .eq('user_id', session.user.id)
      .single();
    
    if (profileError) throw new Error('Failed to fetch profile: ' + profileError.message);

     // Fetch products from Shopify
     const shopifyData = await fetchProducts();

    // Generate personalized recommendations
    const recommendations = await generatePersonalizedRecommendations(
      userInput,
      shopifyData,
      profile
    );

    return recommendations;
  } catch (error) {
    console.error("Error in getRecommendations:", error);
    return { error: error.message };
  }
}

export { getRecommendations };