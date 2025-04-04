import React, { useState } from 'react';

// Placeholder Icon Components (Replace with your actual SVGs if needed)
const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
);

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6.75Z" />
    </svg>
);

const FaqIcon = ({ isOpen }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);

// FAQ Data
const faqData = [
    {
        question: 'What is Cartoo AI, and how does it work?',
        answer: "Cartoo AI is an AI-powered shopping assistant that helps you find the best products based on your interests, location, and preferences. It uses advanced Natural Language Processing (NLP) to understand your needs and recommend top-rated items from various online stores."
    },
    {
        question: 'How does Cartoo AI make money?',
        answer: 'We currently operate on an affiliate model, which means we earn a commission when you purchase products through our recommendations. This allows us to keep the service free for users while helping you discover great deals.'
    },
    {
        question: 'Can I buy products directly from Cartoo AI?',
        answer: 'Not yet! At the moment, we provide recommendations and direct you to trusted online stores where you can complete your purchase. However, we plan to introduce direct order placement and wallet features soon.'
    },
    {
        question: 'Does Cartoo AI support international shopping?',
        answer: 'Yes! Our AI assistant curates product recommendations from multiple online retailers, including global marketplaces. However, availability may vary based on your location.'
    },
    {
        question: 'Can I customize my recommendations?',
        answer: 'Absolutely! The more you interact with Cartoo AI and provide details about your preferences, the better your recommendations will be. You can specify product categories, price ranges, brands, and more.'
    },
    {
        question: 'Is Cartoo AI free to use',
        answer: 'Yes! Our AI shopping assistant is completely free to use. We earn revenue through affiliate commissions, so there’s no extra cost for you.'
    },
    {
        question: 'What new features are coming soon?',
        answer: 'We are actively working on expanding Cartoo AI’s capabilities. Future updates will include a digital wallet, direct order placements, improved analytics, and personalized shopping experiences.'
    },

];


// FAQ Item Component
const FaqItem = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 py-6">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left focus:outline-none"
            >
                <span className="text-md font-medium text-gray-900">{item.question}</span>
                <FaqIcon isOpen={isOpen} />
            </button>
            {isOpen && (
                <div className="mt-4 pr-10 text-sm text-gray-600">
                    {item.answer}
                </div>
            )}
        </div>
    );
};


// Main Contact Us Component
const ContactUsPage = () => {
    const [openFaqIndex, setOpenFaqIndex] = useState(0); // Default first FAQ open

    const handleFaqClick = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index); // Toggle open/close
    };

    return (
        <div className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto text-center mb-12">
                {/* Placeholder for top icon - could be an SVG */}
                <div className="inline-block p-2 mb-4 border border-gray-200 rounded-full">
                    <div className="inline-block p-1.5 bg-gray-100 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                        </svg>
                    </div>
                </div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Contact our support
                </h1>
                <p className="mt-4 text-lg text-gray-600">
                    Let us know how we can help.
                </p>
            </div>

            {/* Contact Cards Section */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-16">
                {/* Card 1: Chat to sales */}
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <div className="flex justify-center mb-4"> <ChatIcon /> </div>
                    <h3 className="text-lg font-medium text-gray-900">Chat with support</h3>
                    <p className="mt-2 text-sm text-gray-600">Speak to our friendly team.</p>
                    <a href="mailto:hello@cartoo.ai" className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        hello@cartoo.ai
                    </a>
                </div>

                {/* Card 2: Chat to support */}
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <div className="flex justify-center mb-4"> <ChatIcon /> </div>
                    <h3 className="text-lg font-medium text-gray-900">Technical support</h3>
                    <p className="mt-2 text-sm text-gray-600">We're here to help.</p>
                    <a href="mailto:joseph@cartoo.ai" className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        joseph@cartoo.ai
                    </a>
                </div>

                {/* Card 3: Visit us */}
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <div className="flex justify-center mb-4"> <LocationIcon /> </div>
                    <h3 className="text-lg font-medium text-gray-900">Visit us</h3>
                    <p className="mt-2 text-sm text-gray-600">Visit our office HQ.</p>
                    {/* Replace '#' with your actual Google Maps link */}
                    <a href="#" target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        View on Google Maps
                    </a>
                </div>

                {/* Card 4: Call us */}
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                    <div className="flex justify-center mb-4"> <PhoneIcon /> </div>
                    <h3 className="text-lg font-medium text-gray-900">Call us</h3>
                    <p className="mt-2 text-sm text-gray-600">Mon - Fri from 8am to 5pm.</p>
                    <a href="tel:+15550000000" className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        ()
                    </a>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8 sm:text-3xl">
                    Frequently asked questions
                </h2>
                <div>
                    {faqData.map((item, index) => (
                        <FaqItem
                            key={index}
                            item={item}
                            isOpen={openFaqIndex === index}
                            onClick={() => handleFaqClick(index)}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ContactUsPage;