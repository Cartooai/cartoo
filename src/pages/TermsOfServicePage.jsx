import React, { useState } from 'react';

// Data for the accordion sections (replace content with your actual terms)
const termsSections = [
    {
        title: '1. Introduction',
        content: 'Welcome to Cartoo AI! These Terms of Service ("Terms") govern your access and use of Cartoo AI, an AI-powered shopping assistant that provides product recommendations based on your preferences. By using our services, you agree to these Terms. If you do not agree, please do not use Cartoo AI.'
    },
    {
        title: '2. Your Acceptance of this Agreement',
        content: 'By accessing or using Cartoo AI, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you are using Cartoo AI on behalf of a company or organization, you represent that you have the authority to bind them to these Terms.'
    },
    {
        title: '3. Changes to Terms',
        content: 'Cartoo AI reserves the right to update or modify these Terms at any time. Any changes will be posted on this page, and your continued use of the service after changes take effect constitutes your acceptance of the revised Terms.'
    },
    {
        title: '4. Services Provided',
        content: 'Cartoo AI is a recommendation engine that uses artificial intelligence, including Google Gemini AI, to provide product suggestions. We do not sell products directly but instead connect users with third - party retailers. Our recommendations are based on publicly available data, user preferences, and AI- driven analysis.'
    },
    {
        title: '5. User Accounts & Responsibilities',
        content: 'You may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials. You agree to provide accurate, complete, and up- to - date information. You are responsible for all activities conducted under your account. Cartoo AI reserves the right to suspend or terminate accounts found to be in violation of these Terms.'
    },
    {
        title: '6. Affiliate Disclaimer',
        content: 'Cartoo AI operates under an affiliate marketing model. This means we earn commissions when you make purchases through our recommended links. These commissions do not affect the prices you pay for products. While we strive to provide accurate recommendations, we do not guarantee the availability, pricing, or quality of third-party products.'
    },
    {
        title: '7. Intellectual Property Rights',
        content: 'All content, including text, AI-generated recommendations, graphics, and logos, is the property of Cartoo AI or its licensors. You may not copy, distribute, or modify any part of Cartoo AI without prior written permission. Trademarks and logos displayed on our platform belong to their respective owners.'
    },
    {
        title: '8. Prohibited Activities',
        content: 'You agree not to: Use Cartoo AI for illegal or unauthorized purposes. Attempt to reverse- engineer, hack, or disrupt our AI systems. Upload, share, or transmit harmful or offensive content. Misuse AI - generated recommendations for fraudulent purposes. Engage in activities that violate applicable laws or regulations.'
    },
    {
        title: '9. Privacy Policy & Data Usage',
        content: 'Cartoo AI processes data using Google Gemini AI to provide accurate recommendations. We do not store sensitive user data; however, interactions with our AI may be logged to improve service quality. By using Cartoo AI, you consent to our data processing practices as outlined in our Privacy Policy. For details on how we collect, use, and protect data, please review our Privacy Policy.'
    },
    {
        title: '10. Third-Party Links & Services',
        content: 'Cartoo AI provides links to third-party websites where you can purchase recommended products. We are not responsible for: The availability, security, or content of these external websites. Transactions or disputes between you and third- party retailers. Any data or privacy practices of third - party services.'
    },
    {
        title: '11. Disclaimers & Warranties',
        content: 'Cartoo AI provides recommendations "as is" without warranties of any kind. We do not guarantee the accuracy, availability, or suitability of recommended products. AI - generated recommendations are based on available data and may not always be error- free. We disclaim all liability for third - party products, services, or any transactions made through affiliate links.'
    },
    {
        title: '12. Limitation of Liability',
        content: 'Cartoo AI shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of our services. This includes, but is not limited to, loss of profits, data, or business opportunities. Our total liability, if any, shall not exceed the amount paid by you for using our service(if applicable).'
    },
    {
        title: '13. Indemnification',
        content: 'You agree to indemnify and hold harmless Cartoo AI, its affiliates, and partners from any claims, damages, or legal fees arising from: Your use or misuse of our service. Violations of these Terms. Infringement of intellectual property or other rights of any third party.'
    },
    {
        title: '13. Termination of Service',
        content: 'Cartoo AI reserves the right to suspend or terminate access to our services for any reason, including violations of these Terms. Users may also discontinue use at any time. Any provisions related to intellectual property, liability, and indemnification shall survive termination.'
    },
];

// Accordion Item Component
const AccordionItem = ({ item, index, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <h2>
                <button
                    type="button"
                    className="flex justify-between items-center w-full py-4 px-5 text-left font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    onClick={() => onClick(index)}
                    aria-expanded={isOpen}
                    aria-controls={`accordion-content-${index}`}
                >
                    <span>{item.title}</span>
                    <span className="text-xl text-gray-500 transform transition-transform duration-200">
                        {isOpen ? '-' : '+'}
                    </span>
                </button>
            </h2>
            <div
                id={`accordion-content-${index}`}
                className={`px-5 pt-0 overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`} // Use max-height for smooth transition
                aria-labelledby={`accordion-title-${index}`}
            >
                <div className="py-4 text-gray-600 text-sm">
                    {item.content}
                </div>
            </div>
        </div>
    );
};


// Main Terms of Service Page Component
const TermsOfServicePage = () => {
    const [openIndex, setOpenIndex] = useState(null); // Start with no item open

    const handleToggle = (index) => {
        // If the clicked item is already open, close it. Otherwise, open the clicked item.
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto"> {/* Controls max width and centers */}
                {/* Page Title */}
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
                    Terms of Service
                </h1>

                {/* Accordion Container */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {termsSections.map((section, index) => (
                        <AccordionItem
                            key={index}
                            item={section}
                            index={index}
                            isOpen={openIndex === index}
                            onClick={handleToggle}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TermsOfServicePage;