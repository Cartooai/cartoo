function PrivacyPolicyPage() {
    return (
        <div className="container mx-auto p-6 text-black max-w-3xl">
            <h2 className="text-3xl font-bold mb-4 text-justify">Privacy Policy</h2>
            <p className="mb-4 text-justify">Effective Date: 01/04/2025</p>

            <p className="mb-4 text-justify">
                Welcome to Cartoo AI("we," "our," or "us"). Your privacy is important to us, and we are committed
                to protecting the personal information you share with us. This Privacy Policy explains how we collect, use,
                store, and safeguard your data when you use our AI-powered product recommendation and shopping web application.
            </p>

            <h3 className="text-2xl font-semibold mt-6 text-justify">1. Information We Collect</h3>
            <p className="mt-2 text-justify"><strong>Personal Data:</strong> Name, email, and location (if provided).</p>
            <p className="mt-2 text-justify"><strong>Usage Data:</strong> Browsing behavior, search history, and interactions with recommendations.</p>
            <p className="mt-2 text-justify"><strong>Device Data:</strong> IP address, browser type, and device information.</p>

            <h3 className="text-2xl font-semibold mt-6 text-justify">2. How We Use Your Information</h3>
            <ul className="list-disc ml-6 mt-2 text-justify">
                <li>Provide personalized product recommendations.</li>
                <li>Improve the accuracy of our AI shopping assistant.</li>
                <li>Enhance user experience and website functionality.</li>
                <li>Send relevant updates and marketing emails (with user consent).</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 text-justify">3. Purpose of Data Collection</h3>
            <ul className="list-disc ml-6 mt-2 text-justify">
                <li>Offering tailored shopping experiences.</li>
                <li>Analyzing shopping trends and user preferences.</li>
                <li>Ensuring security and preventing fraud.</li>
                <li>Complying with legal and regulatory requirements.</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 text-justify">4. Data Retention</h3>
            <ul className="list-disc ml-6 mt-2 text-justify">
                <li><strong>Personal Data:</strong> Stored as long as your account is active or as required by law.</li>
                <li><strong>Usage & Device Data:</strong> Retained for analytics purposes for up to 12 months.</li>
            </ul>

            <p className="mt-4 text-justify">We do not sell or share your data with third parties without consent, except as required for legal compliance or service improvements.</p>

            <h3 className="text-2xl font-semibold mt-6 text-justify">5. Your Rights & Choices</h3>
            <ul className="list-disc ml-6 mt-2 text-justify">
                <li>Request access to the personal data we store.</li>
                <li>Update or correct your account information.</li>
                <li>Delete your account and associated data upon request.</li>
                <li>Opt-out of marketing emails by clicking "unsubscribe" in any email.</li>
            </ul>

            <h3 className="text-2xl font-semibold mt-6 text-justify">6. Contact Us</h3>
            <p className="mt-2 text-justify">If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
            <p className="font-semibold mt-2 text-justify">📩 [Insert Contact Email]</p>
        </div>
    );
}

export default PrivacyPolicyPage;
