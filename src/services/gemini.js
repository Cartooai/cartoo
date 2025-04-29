import { GoogleGenerativeAI } from "@google/generative-ai";
import fetchProducts from "./shopify";
import supabaseClient from "./supabaseClient";
import { isProductQuery } from "@/utils/messageUtils";
import extractProducts from "./extractProducts";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const responseSchema = `{
  "products": [
    {
      "title": "string",
      "imageLink": "string",
      "brand": "string",
      "targetCountry": "string",
      "serviceableAreas": ["string"],
      "description": "string",
      "price": {
        "amount": 0,
        "currency": "string"
      },
      "link": "string",
      "linkCode": {
        "clickUrl": "string",
        "imageUrl": "string"
      }
    }
  ]
}`;

const errorResponseSchema = `{
  "error": "string"
}`;

async function generatePersonalizedRecommendations(
  userInput,
  shopifyData,
  userProfile
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    console.log("Shopify Data:", shopifyData);

    const prompt = `
      You are an expert personal shopping assistant. Analyze the following product data and user profile to provide personalized product recommendations.

      Product Data:
      ${JSON.stringify(shopifyData, null, 2)}

      User Profile:
      - Age: ${userProfile.age}
      - Gender: ${userProfile.gender}
      - Location: ${userProfile.location}
      - Interests: ${userProfile.interest}

      User Query: ${userInput}

      Your task:
      Evaluate all products based on their relevance to the user's profile and query. Do NOT filter out any products. Instead, rank them in order of relevance based on the following criteria:
      1. Age appropriateness
      2. Gender preferences (if relevant)
      3. Location-based suitability (climate, cultural relevance, availability)
      4. Alignment with stated interests
      5. Price points and overall value for the user

      Important Instructions:
      - Always return a valid JSON array of **all products**, ranked by their relevance to the user.
      - Include a relevance score (0–100) for each product, with 100 being the most relevant.
      - If no relevance can be determined for a product, assign a low score but still include it.
      - Do not exclude any product from the output array.

      Format:
      Return the output as a valid JSON array that strictly matches the following structure:
      ${responseSchema}

      Do not include any markdown, code blocks, or explanation.

      Error Handling:
      Only return an error if:
      1. The input product data is missing or malformed.
      2. The model encounters an internal failure.

      If an error occurs, return the following structure exactly:
      ${errorResponseSchema}
      `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Clean the response text - remove any markdown code blocks or extra formatting
    const cleanJson = text.replace(/```json\s*|\s*```/g, "").trim();

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
async function getRecommendations(message) {
  try {
    //Get user profile
    const {
      data: { session },
      error: sessionError,
    } = await supabaseClient.auth.getSession();
    if (sessionError)
      throw new Error("Failed to get user session: " + sessionError.message);
    if (!session?.user?.id) throw new Error("No authenticated user found");

    const { data: profile, error: profileError } = await supabaseClient
      .from("Profiles")
      .select("age, gender, location, interest")
      .eq("user_id", session.user.id)
      .single();

    if (profileError)
      throw new Error("Failed to fetch profile: " + profileError.message);

    // If it's not a product query, use Gemini for normal conversation
    if (!isProductQuery(message)) {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const promptPrefix = `You are a friendly and helpful shopping assistant. Your name is Cartoo.  Answer user questions about products, availability, and recommendations. If you don't know, say you don't know. Be concise. Do not respond with lists or long texts.

      This is the user profile information. Use it in your responses.

      User Profile:
      - Age: ${profile.age}
      - Gender: ${profile.gender}
      - Location: ${profile.location}
      - Interests: ${profile.interest}

      `;

      const fullPrompt = promptPrefix + " User: " + message;

      const result = await model.generateContent(fullPrompt);
      return {
        type: "conversation",
        content: result.response.text(),
      };
    }

    // Product recommendation logic

    //const shopifyData = await fetchProducts();
    const queryProducts = await extractProducts(message); // Extract product keywords from the message

    console.log("Extracted product keywords:", queryProducts);

    const shopifyData = await fetchProducts(queryProducts); // Fetch products based on the extracted keywords

    const recommendations = await generatePersonalizedRecommendations(
      message,
      shopifyData,
      profile
    );

    return {
      type: "recommendation",
      content: recommendations,
    };
  } catch (error) {
    console.error("Error in getRecommendations:", error);
    return { error: error.message };
  }
}

export { getRecommendations };
