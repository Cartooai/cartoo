import { Button, Container, Input, Theme } from "@chakra-ui/react";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate } from 'react-router-dom';
import supabaseClient from '../../services/supabaseClient';
import { useState } from 'react';

function Name() {

    const { userId, session } = useAuth();
    const [name, setName] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!name.trim()) {
            alert("Name cannot be empty.");
            return;
        }

        try {

            const { data, error } = await supabaseClient
                .from('Profiles')
                .upsert(
                    {
                        user_id: userId,
                        name: name,
                    },
                    {
                        onConflict: 'user_id',
                        returning: true
                    }
                );

            if (error) throw error;

            navigate('/dashboard/age');

        } catch (error) {
            console.error('Error updating profile:', error.message);
            alert('Failed to save profile. Please try again.');
        }
    }

    return (<>
        <Theme appearance="light">
            <Container fluid bg={"#E6F48C"} className="flex flex-col items-left justify-center h-screen">
                <Container>
                    <h1 className="text-5xl font-semibold mb-5">Name *</h1>
                    <h2 className="text-1xl font-normal">Cartoo will like to know your first name.</h2>
                    <Input placeholder="Type your answer here" className="border-b-2 border-black w-full mt-6 p-7" value={name}
                        onChange={(e) => setName(e.target.value)} />
                    <Button onClick={handleSubmit} className="w-full p-7 bg-white text-black font-semibold mt-5 text-2xl hover:bg-[#E6F48C]">OK</Button>
                </Container>
            </Container>
        </Theme>
    </>);
}

export default Name;