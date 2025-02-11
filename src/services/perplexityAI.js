// perplexityAI.js
import supabaseClient from "./supabaseClient";

const perplexityAI = async (prompt) => {
  // Validate API key
  const API_KEY = import.meta.env.VITE_AI_API_KEY;
  if (!API_KEY) {
    throw new Error('API key is not configured. Please check your environment variables.');
  }

  // Validate prompt
  if (!prompt || typeof prompt !== 'string') {
    throw new Error('Invalid prompt provided');
  }

  // Get the current session
  const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
  if (sessionError) {
    throw new Error('Failed to get user session: ' + sessionError.message);
  }
  if (!session?.user?.id) {
    throw new Error('No authenticated user found');
  }

  // Fetch user profile from Profiles table
  const { data: profile, error: profileError } = await supabaseClient
    .from('Profiles')
    .select('age, gender, location, interest')
    .eq('user_id', session.user.id)
    .single();

  if (profileError) {
    throw new Error('Failed to fetch user profile: ' + profileError.message);
  }
  if (!profile) {
    throw new Error('User profile not found');
  }

  const requestBody = {
    model: "sonar-reasoning-pro",
    messages: [
      {
        role: "system",
        content: `Be clear and sound simple`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  try {
    console.log('Sending request to Perplexity AI...', {
      url: 'https://api.perplexity.ai/chat/completions',
      prompt,
      timestamp: new Date().toISOString()
    });

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Response Error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`API Error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response:', data);

    // Return the AI's response message
    return {
      data: data.choices[0].message.content
    };

  } catch (error) {
    console.error("Perplexity AI API Error:", {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Network error: Please check your internet connection and API endpoint accessibility');
    }
    throw error;
  }
};

export default perplexityAI;