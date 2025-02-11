import { Container, Flex, Heading, Image, HStack, Stack, VStack, Text, Button } from "@chakra-ui/react";
import { TypeAnimation } from 'react-type-animation';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <>
            <Container
                fluid
                className="min-h-screen bg-[#E6F48C] flex items-center justify-center py-8 md:py-12"
            >
                <Flex
                    direction="column"
                    align="center"
                    className="max-w-4xl mx-auto px-4"
                >
                    <img
                        src="/public/cartoo-logo-croped.png"
                        alt="Cart-oo Ai"
                        className="w-80 md:w-72 lg:w-80 mb-[40] md:mb-12"
                    />
                    <TypeAnimation
                        sequence={[
                            'Your Personal Shopping Assistant',
                            100,
                            'Shop Smarter with Our AI-Powered Shopping Assistant',
                            100,
                            'Unlock Personalized Shopping',
                            100
                        ]}
                        repeat={Infinity}
                        className="mt-4 text-xl md:text-3xl lg:text-4xl font-medium text-center leading-tight md:leading-normal" 
                    />
                </Flex>
            </Container>
            <div>
                <img
                    src="/public/onboarding_page_1.jpg"
                    alt="Featured image 1"
                    className="w-full h-[400px] md:h-[600px] object-cover object-right-bottom"
                />
                <div className="flex flex-col space-y-4 justify-center items-center bg-[#FAECAA] h-[400px]">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                        PERSONALISED SHOPPING
                    </h2>
                    <p className="text-lg font-normal text-center">
                        Shop with Personality; Cartoo <br />
                        Curates with Perfect Picks, Just for you!
                    </p>
                    <button className="bg-white px-6 py-4 rounded-lg font-medium shadow-lg hover:bg-[#E6F48C] transition-colors">
                        <Link to="/login">Explore</Link>
                    </button>
                </div>
            </div>
            <div>
                <img
                    src="/public/onboarding_page_2.jpg"
                    alt="Featured image 1"
                    className="w-full h-[400px] md:h-[600px] object-cover object-center"
                />
                <div className="flex flex-col space-y-4 justify-center items-center bg-[#FC864E] h-[400px]">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                        SAVE TIME + MONEY
                    </h2>
                    <p className="text-lg font-normal text-center">
                        Shop smart, save time: Cartoo
                        <br />
                        Unlocks your favourite brands in one place.
                    </p>
                    <button className="bg-white px-6 py-4 rounded-lg font-medium shadow-lg hover:bg-[#E6F48C] transition-colors">
                        <Link to="/login">Save now</Link>
                    </button>
                </div>
            </div>
            <div>
                <img
                    src="/public/onboarding_page_3.png"
                    alt="Featured image 1"
                    className="w-full h-[400px] md:h-[600px] object-cover"
                />
                <div className="flex flex-col space-y-4 justify-center items-center bg-[#97D5EE] h-[400px]">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                        SHOP WITH LOVED ONES
                    </h2>
                    <p className="text-lg font-normal text-center">
                        Shop together, Smile Together: Cartoo <br />
                        Brings Friends and Family together on a cart
                    </p>
                    <button className="bg-white px-6 py-4 rounded-lg font-medium shadow-lg hover:bg-[#E6F48C] transition-colors">
                        <Link to="/login">Try Now</Link>
                    </button>
                </div>
            </div>
        </>
    );
}

export default HomePage;