import React, { useState, useEffect } from "react";
import { getRecommendations } from "../services/gemini"; // Import function to fetch product recommendations
import ProductCard from "./ProductCard"; // Import component to display individual product details
import { Theme } from "@chakra-ui/react";
import Swal from "sweetalert2";

const ChatPage = () => {
  // State variables to manage user input, chat history, loading state, and errors
  const [message, setMessage] = useState(""); // Holds user input message
  const [chatHistory, setChatHistory] = useState([]); // Stores chat messages
  const [isLoading, setIsLoading] = useState(false); // Indicates if a request is in progress
  const [error, setError] = useState(null); // Stores any error messages

  useEffect(() => {
    Swal.fire({
      html: "<div style=\"text-align: left\">Welcome to Cartoo!👋</br><br/> As we're in beta, we're constantly learning and improving to serve you better.</br><br/>We may make mistakes as we help you shop, but we're getting better every day.<br/><br/> We appreciate your understanding as we learn and grow together.</div>",
      confirmButtonText: "I understand",
      confirmButtonColor: "black",
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    if (!message.trim() || isLoading) return; // Prevents sending empty messages or multiple submissions while loading

    // Construct user message object
    const userMessage = {
      role: "user", // Identifies message as user input
      content: message, // Stores user input message
      timestamp: new Date().toISOString(), // Stores timestamp of message
    };

    setIsLoading(true); // Set loading state to true
    setError(null); // Clear any existing errors
    setChatHistory((prev) => [...prev, userMessage]); // Append user message to chat history
    setMessage(""); // Clear input field

    try {
      const response = await getRecommendations(message); // Fetch recommendations based on user input
      console.log("Recommendated AI products:", response); // Log API response for debugging
      if (response.error) {
        throw new Error(response.error); // Handle API errors
      }

      // Construct AI-generated message object
      const aiMessage = {
        role: "assistant", // Identifies message as AI-generated
        content: response.content, // Stores AI response content
        timestamp: new Date().toISOString(), // Stores timestamp of message
        type: response.type, // Determines message type (text or recommendation)
      };

      setChatHistory((prev) => [...prev, aiMessage]); // Append AI response to chat history
    } catch (err) {
      setError(`Failed to get response: ${err.message}`); // Store error message in state
      console.error("Chat error:", err); // Log error to console for debugging
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Function to render chat messages dynamically
  const renderMessage = (chat) => {
    if (chat.type === "recommendation") {
      console.log("Rendered recommendation:", chat.content.products); // Log recommendation for debugging
      return (
        <div className="flex flex-nowrap flex-row overflow-x-auto scrollbar-hide gap-5">
          {chat.content.products.map((product, index) => (
            <div key={index} className="flex-none w-64">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      );
    }

    if (chat.content?.error) {
      return (
        <div
          className="p-4 mb-4 text-sm text-red-800 bg-red-100 rounded-lg"
          role="alert"
        >
          {chat.content.error}
        </div>
      );
    }

    return (
      <p className="break-words whitespace-pre-wrap">{chat.content}</p> // Display regular text messages
    );
  };

  return (
    <Theme appearance="light">
      <div className="min-h-screen bg-white p-4 flex flex-col">
        <div className="w-full max-w-5xl mx-auto flex flex-col">
          <h1 className="text-xl font-semibold mb-6 text-center">
            What is making its way to your cart today?
          </h1>

          {/* Chat Messages Section */}
          <div className="flex-1 overflow-auto mb-6 space-y-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${
                  chat.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {chat.role !== "user" && (
                  <img
                    src="/Cartos_face-removebg-preview.png"
                    alt="Avatar"
                    className="h-8 w-8 rounded-full mr-2 self-end object-contain"
                  />
                )}
                <div
                  className={`${
                    chat.role === "user"
                      ? "bg-[#F5F5F5] text-black max-w-[80%]"
                      : "bg-white text-black w-full"
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
                <div className="bg-gray-100 rounded-lg p-4">Typing...</div>
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

          {/* Input Form Section */}
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
    </Theme>
  );
};

export default ChatPage;
