import React, { useState } from 'react';
import { getRecommendations } from '../services/gemini';
import ProductCard from './ProductCard';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };

    setIsLoading(true);
    setError(null);
    setChatHistory(prev => [...prev, userMessage]);
    setMessage('');

    try {
      // Get personalized recommendations
      const recommendations = await getRecommendations(message);

      if (recommendations.error) {
        throw new Error(recommendations.error);
      }

      // Create AI response message with recommendations
      const aiMessage = {
        role: 'assistant',
        content: recommendations,
        timestamp: new Date().toISOString(),
        isRecommendation: true // Flag to identify recommendation messages
      };

      setChatHistory(prev => [...prev, aiMessage]);
    } catch (err) {
      setError(`Failed to get recommendations: ${err.message}`);
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (chat) => {
    if (chat.isRecommendation) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chat.content.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      );
    }

    return (
      <p className="break-words">{chat.content}</p>
    );
  };

  return (
    <div className="min-h-screen bg-white p-4 flex flex-col">
      <div className="w-full max-w-5xl mx-auto flex flex-col">
        <h1 className="text-xl font-semibold mb-6 text-center">
          What is making its way to your cart today?
        </h1>
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-auto mb-6 space-y-4">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${
                chat.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`${
                  chat.role === 'user'
                    ? 'bg-blue-500 text-white max-w-[80%]'
                    : 'bg-gray-100 text-black w-full'
                } rounded-lg p-4`}
              >
                {renderMessage(chat)}
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date(chat.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4">
                Finding the perfect products for you...
              </div>
            </div>
          )}
          
          {error && (
            <div className="flex justify-center">
              <div className="bg-red-100 text-red-600 rounded-lg p-4">
                {error}
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="border-2 border-black rounded-lg p-4 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask me about products..."
              disabled={isLoading}
              className="w-full outline-none text-lg placeholder-black min-h-[80px] resize-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !message.trim()}
              className="absolute bottom-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-transparent"
              aria-label="Send message"
            >
              {isLoading ? (
                "..."
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;