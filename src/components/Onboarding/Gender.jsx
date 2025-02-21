import { Container, Button } from "@chakra-ui/react";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate } from 'react-router-dom';
import supabaseClient from '../../services/supabaseClient';
import { useState } from 'react';
import { Theme } from "@chakra-ui/react";

function Gender() {

    const { userId, session } = useAuth();
    const navigate = useNavigate();

    const handleGenderSelect = async (gender) => {
        try {
            const { error } = await supabaseClient
                .from('Profiles')
                .upsert(
                    {
                        user_id: userId,
                        gender: gender
                    },
                    {
                        onConflict: 'user_id',
                        returning: true
                    }
                );
 
            if (error) throw error;
            navigate('/dashboard/interest');
            
        } catch (error) {
            console.error('Error updating gender:', error.message);
            alert('Failed to save gender. Please try again.');
        }
    };

    return (<>
       <Theme appearance="light">
       <Container fluid bg={"#F2D478"} className="flex flex-col items-left justify-center h-screen">
            <Container>
                <h1 className="text-5xl font-semibold mb-5">Gender *</h1>
                <h2 className="text-2xl font-semibold mt-5">Help Cartoo describe your gender?</h2>
                <Button onClick={() => handleGenderSelect("male")} className="w-full p-8 bg-[#FFFFFF] bg-opacity-40 text-black font-semibold mt-5 text-2xl hover:bg-white">Male</Button>
                <Button onClick={() => handleGenderSelect("female")} className="w-full p-8 bg-[#FFFFFF] bg-opacity-40 text-black font-semibold mt-5 text-2xl hover:bg-white">Female</Button>
                <Button onClick={() => handleGenderSelect("other")} className="w-full p-8 bg-[#FFFFFF] bg-opacity-40 text-black font-semibold mt-5 text-2xl hover:bg-white">Specify another</Button>

            </Container>
        </Container>
       </Theme>
    </>);
}

export default Gender;