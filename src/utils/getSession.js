import supabaseClient from "@/services/supabaseClient";

/**
 * Gets the current user session from Supabase
 * @returns {Object} An object containing the user if session exists, or null
 */
export const getSession = async () => {
  try {
    const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
    
    if (sessionError) throw sessionError;
    
    if (!session?.user?.id) {
      return { user: null };
    }
    
    return { 
      user: session.user,
      // For convenience, common properties can be accessed directly
      id: session.user.id,
      email: session.user.email
    };
  } catch (error) {
    console.error('Error getting session:', error.message);
    return { user: null, error };
  }
};