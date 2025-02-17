import { Container, Button } from "@chakra-ui/react";
import { useAuth } from "@/auth/AuthContext";
import { useNavigate } from 'react-router-dom';
import supabaseClient from '../../services/supabaseClient';
import { useState } from 'react';


function Age() {

   const { userId, session } = useAuth();
   
   const navigate = useNavigate();

   const handleAgeSelect = async (ageRange) => {
       try {
           const { error } = await supabaseClient
               .from('Profiles')
               .upsert(
                   {
                       user_id: userId,
                       age: ageRange
                   },
                   {
                       onConflict: 'user_id',
                       returning: true
                   }
               );

           if (error) throw error;
           navigate('/dashboard/gender');
           
       } catch (error) {
           console.error('Error updating age:', error.message);
           alert('Failed to save age. Please try again.');
       }
   };

    return (<>

        <Container fluid bg={"#FC864E"} className="flex flex-col items-left justify-center h-screen">
            <Container>
                <h1 className="text-5xl font-semibold mb-5">Age *</h1>
                <h2 className="text-1xl font-normal">Help Cartoo curate age appropriate finds</h2>
                <Button onClick={() => handleAgeSelect("18-24")} className="w-full p-8 bg-[#FFFFFF] bg-opacity-40 text-black font-semibold mt-5 text-2xl hover:bg-white">18-24</Button>
               <Button onClick={() => handleAgeSelect("25-39")} className="w-full p-8 bg-[#FFFFFF] bg-opacity-40 text-black font-semibold mt-5 text-2xl hover:bg-white">25-39</Button>
               <Button onClick={() => handleAgeSelect("40-54")} className="w-full p-8 bg-[#FFFFFF] bg-opacity-40 text-black font-semibold mt-5 text-2xl hover:bg-white">40-54</Button>
               <Button onClick={() => handleAgeSelect("55-64")} className="w-full p-8 bg-[#FFFFFF] bg-opacity-40 text-black font-semibold mt-5 text-2xl hover:bg-white">55-64</Button>
               <Button onClick={() => handleAgeSelect("65+")} className="w-full p-8 bg-[#FFFFFF] bg-opacity-40 text-black font-semibold mt-5 text-2xl hover:bg-white">65+</Button>
            </Container>
        </Container>
    </>);
}

export default Age;