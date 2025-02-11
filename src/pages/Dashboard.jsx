import { useEffect, useState } from 'react';
import { Container, Image, Stack, Box, Button } from "@chakra-ui/react";
import { useNavigate, Link } from 'react-router-dom';
import supabaseClient from '../services/supabaseClient';

function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserProfile = async () => {
      try {
        // Get current session
        const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (!session?.user?.id) {
          navigate('/login'); // Redirect to login if no session
          return;
        }

        // Check if user exists in Profiles table
        const { data: profile, error: profileError } = await supabaseClient
          .from('Profiles')
          .select('user_id')
          .eq('user_id', session.user.id)
          .single();

        if (profileError && profileError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
          throw profileError;
        }

        // If no profile found, redirect to get-started
        if (!profile) {
          navigate('/dashboard/get-started');
          return;
        }

        setIsLoading(false);

      } catch (error) {
        console.error('Error checking user profile:', error);
        // Handle error appropriately
      }
    };

    checkUserProfile();
  }, []); // Empty dependency array means this runs once on mount

  if (isLoading) {
    return (
      <Container className="h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </Container>
    );
  }

  return (
    <>
      <Container fluid bg="#F2D478" className="flex flex-col items-center justify-center h-[50vh]">
        <Stack>
          <Box>
            <Image src="../../../public/Cartos_face-removebg-preview.png" alt="Nature" />
          </Box>
        </Stack>
      </Container>
      <Container className="h-[50vh] flex flex-col mt-10 w-[80vw]">
        <h2 className="text-black text-4xl font-semibold text-center">Welcome back!</h2>
        <div className="w-full flex flex-col text-left mt-4">
          <Link to='/dashboard/chat' className="text-2xl font-semibold text-black">
          <Button className="bg-[#FDDD6F] p-7 w-full font-semibold text-2xl shadow-md hover:bg-black hover:text-white">
            Chat with Cartoo
          </Button>
          </Link>
          <Button className="bg-[#FDDD6F] p-7 w-full font-semibold text-2xl shadow-md hover:bg-black hover:text-white mt-4">
            + Friends
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Dashboard;