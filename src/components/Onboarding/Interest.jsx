import React, { useState } from 'react';
import supabaseClient from '../../services/supabaseClient';
import { useAuth } from "@/auth/AuthContext";
import { useNavigate } from 'react-router-dom';

const Interest = () => {
    const [selectedInterests, setSelectedInterests] = useState([]);
    const { userId, session } = useAuth();
    const navigate = useNavigate();

    const interests = [
      { id: 'neutral', label: 'Neutral', image: '/interests/neutral.png' },
      { id: 'vintage', label: 'Vintage', image: '/interests/vintage.png' },
      { id: 'trendy', label: 'Trendy', image: '/interests/trendy.png' },
      { id: 'timeless', label: 'Timeless', image: '/interests/timeless.png' },
      { id: 'cosy', label: 'Cosy', image: '/interests/cosy.png' },
      { id: 'natural', label: 'Natural', image: '/interests/natural.png' },
      { id: 'bohemian', label: 'Bohemian', image: '/interests/bohemian.png' },
      { id: 'statement_pieces', label: 'Statement Pieces', image: '/interests/statement_pieces.png' },
      { id: 'classic', label: 'Classic', image: '/interests/classic.png' },
      { id: 'sustianable', label: 'Sustainable', image: '/interests/sustainable.png' },
      { id: 'scandinivian', label: 'Scandinivian', image: '/interests/scandinivian.png' },
      { id: 'patterns', label: 'Patterns', image: '/interests/patterns.png' },
      { id: 'bold_colors', label: 'Bold Colors', image: '/interests/bold_colors.png' },
      { id: 'formal', label: 'Formal', image: '/interests/formal.png' },
      { id: 'comfort', label: 'Comfort', image: '/interests/comfort.png' },
      { id: 'eco_friendly', label: 'Eco friendly', image: '/interests/eco_friendly.png' },
  ];

    const toggleInterest = (id) => {
        setSelectedInterests(prev => 
          prev.includes(id) 
            ? prev.filter(item => item !== id)
            : [...prev, id]
        );
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Selected interests:', selectedInterests);

        try {
            const { error } = await supabaseClient
                .from('Profiles')
                .upsert(
                    {
                        user_id: userId,
                        interest: selectedInterests
                    },
                    {
                        onConflict: 'user_id',
                        returning: true
                    }
                );
 
            if (error) throw error;
            navigate('/dashboard');
            
        } catch (error) {
            console.error('Error updating gender:', error.message);
            alert('Failed to save gender. Please try again.');
        }
      };
    
      return (
        <div className="p-4 max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2">Interest *</h1>
          <p className="text-gray-500 mb-6">Choose a style to personalise your shopping</p>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              {interests.map(({ id, label, image }) => (
                <div key={id} className="relative">
                  <input
                    type="checkbox"
                    id={id}
                    checked={selectedInterests.includes(id)}
                    onChange={() => toggleInterest(id)}
                    className="sr-only peer"
                  />
                  <label
                    htmlFor={id}
                    className="block cursor-pointer overflow-hidden rounded-lg transition-transform duration-200 hover:scale-105"
                  >
                    <div className="relative aspect-square">
                      <img
                        src={image}
                        alt={label}
                        className="w-full h-full object-cover transition-transform duration-200 peer-checked:scale-105"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 peer-checked:opacity-100 transition-opacity" />
                      
                      {/* Selection indicator */}
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/0 peer-checked:bg-black transition-all transform scale-0 peer-checked:scale-100 flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      
                      {/* Border effect */}
                      <div className="absolute inset-0 ring-2 ring-transparent peer-checked:ring-black transition-all" />
                      
                      {/* Label container */}
                      <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-2 text-center transform transition-transform peer-checked:bg-black peer-checked:text-white">
                        <span className="text-sm font-medium">{label}</span>
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </div>
            
            <button
              type="submit"
              className="w-full mt-6 bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Continue
            </button>
          </form>
        </div>
      );
    };
    
    export default Interest;