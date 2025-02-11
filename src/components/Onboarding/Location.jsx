import { Container, Button } from "@chakra-ui/react";
import { useState } from 'react';
import supabaseClient from '../../services/supabaseClient';
import { useAuth } from "@/auth/AuthContext";
import { useNavigate } from 'react-router-dom';

function Location() {
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('Select Country');
    const [selectedLanguage, setSelectedLanguage] = useState('Select Language');

    const { userId, session } = useAuth();

    const countries = [
        "United States", "Canada", "United Kingdom", "Australia",
        "Germany", "France", "Japan", "India", "Brazil", "Nigeria", "South Africa"
        // Add more countries as needed
    ];

    const languages = [
        "English", "Spanish", "French", "German", "Chinese",
        "Japanese", "Korean", "Hindi", "Arabic", "Portuguese"
        // Add more languages as needed
    ];

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setIsCountryOpen(false);
    };

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
        setIsLanguageOpen(false);
    };

    // Close dropdowns when clicking outside
    const handleClickOutside = () => {
        setIsCountryOpen(false);
        setIsLanguageOpen(false);
    };

    const navigate = useNavigate();

    const handleSubmit = async () => {
        // Validate selections
        if (selectedCountry === 'Select Country' || selectedLanguage === 'Select Language') {
            alert('Please select both country and language');
            return;
        }

        try {
            const { data, error } = await supabaseClient
                .from('Profiles')
                .upsert(
                    {
                        user_id: userId,
                        location: selectedCountry,
                        language: selectedLanguage
                    },
                    {
                        onConflict: 'user_id',
                        returning: true
                    }
                );
    
            if (error) throw error;
            
            navigate('/dashboard/name');
            
        } catch (error) {
            console.error('Error updating profile:', error.message);
            alert('Failed to save profile. Please try again.');
        }
    };



    return (
        <Container fluid bg={"#E6F48C"} className="flex flex-col items-left justify-center h-screen">
            <Container>
                <h1 className="text-5xl font-semibold mb-5">Location *</h1>
                <h2 className="text-2xl font-normal">What part of the world are you in?</h2>

                <div className="flex flex-col gap-4 mt-4">
                    {/* Country Dropdown */}
                    <div className="relative w-full">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsCountryOpen(!isCountryOpen);
                                setIsLanguageOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
                        >
                            <span>{selectedCountry}</span>
                            <span
                                className={`transition-transform duration-200 ${isCountryOpen ? 'transform rotate-180' : ''
                                    }`}
                            >
                                ▼
                            </span>
                        </button>

                        {isCountryOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                {countries.map((country, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleCountrySelect(country)}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                    >
                                        {country}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Language Dropdown */}
                    <div className="relative w-full">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsLanguageOpen(!isLanguageOpen);
                                setIsCountryOpen(false);
                            }}
                            className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex justify-between items-center"
                        >
                            <span>{selectedLanguage}</span>
                            <span
                                className={`transition-transform duration-200 ${isLanguageOpen ? 'transform rotate-180' : ''
                                    }`}
                            >
                                ▼
                            </span>
                        </button>

                        {isLanguageOpen && (
                            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                {languages.map((language, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleLanguageSelect(language)}
                                        className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none focus:bg-gray-100"
                                    >
                                        {language}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <Button
                    onClick={handleSubmit}
                    className="bg-white p-6 w-full mt-4 font-semibold hover:bg-black hover:text-white"
                >
                    OK
                </Button>            </Container>
        </Container>
    );
}

export default Location;