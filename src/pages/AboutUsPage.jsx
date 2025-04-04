import React from 'react';

const AboutUsPage = () => {
    return (
        <div>
            {/* Section 1: Dark Background */}
            <section className="bg-black text-white py-20 px-6"> {/* Adjusted background color and padding */}
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Helping you <span className="text-teal-300">shop</span> smarter with AI. {/* Highlight "simplify" if desired */}
                    </h1>
                    <p className="text-lg md:text-xl text-teal-100"> {/* Slightly lighter text for subheading */}
                        At Cartoo AI, we believe shopping should be effortless and personalized. Cartoo simplifies product discovery by using advanced AI to recommend the best deals tailored to your needs.
                    </p>
                </div>
            </section>

            {/* Section 2: White Background - Two Columns */}
            <section className="bg-white py-20 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center"> {/* Increased max-width and gap */}

                    {/* Left Column */}
                    <div className="text-gray-900">
                        <span className="text-sm font-semibold uppercase text-gray-500 mb-2 block"> {/* Label styling */}
                            About us
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold leading-tight"> {/* Adjusted heading size */}
                            Powered by AI, <br />
                            Designed for You
                        </h2>
                    </div>

                    {/* Right Column */}
                    <div className="text-gray-700 space-y-4 text-base md:text-lg"> {/* Added spacing between paragraphs and adjusted text size */}
                        <p>
                            Finding the right product online can be overwhelming with thousands of options available. We created Cartoo AI to take the guesswork out of shopping—whether you're looking for the best price, top-rated items, or personalized suggestions based on your interests.
                        </p>
                        <p>
                            Cartoo AI is built using advance AI, ensuring accurate and intelligent recommendations that evolve with your preferences. Our system continuously learns from user interactions to provide better product suggestions over time.
                        </p>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default AboutUsPage;