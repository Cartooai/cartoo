import { Container, Stack, Box, Image } from "@chakra-ui/react"
import Button from "../Button";
import { Link } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";

function GetStarted() {

    return ( <>
        <Container fluid className="bg-[#F2D478] h-96 flex flex-col items-center justify-center">
            <Stack>
                <Box>
                    <Image src="/Cartos_face-removebg-preview.png" alt="Nature" />
                </Box>
            </Stack>
        </Container>
        <Container className="h-96 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-semibold">Lets Get Started</h1>
            <p className="text-lg font-normal mt-8">Welcome to Cartoo ai! Let&apos;s get you set up.</p>
            
            <Link to="/dashboard/location" className="mt-8 bg-black text-white rounded-lg w-full">
            <Button label="Get Started" />
            </Link>
        </Container>
    </> );
}

export default GetStarted;