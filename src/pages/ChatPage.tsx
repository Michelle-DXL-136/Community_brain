
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import ElevenLabsChat from '@/components/ElevenLabsChat';
import BlobShape from '@/components/BlobShape';
import { Button } from '@/components/ui/button';

// Mock interests data to simulate extraction from conversation
const extractedInterests = [
  { id: '101', name: 'Photography', level: 4, relatedInterests: ['Landscape'] },
  { id: '102', name: 'Gardening', level: 5, relatedInterests: ['Community'] },
  { id: '103', name: 'Book Club', level: 3, relatedInterests: ['Fiction'] }
];

const ChatPage = () => {
  const navigate = useNavigate();
  const [showSummary, setShowSummary] = useState(false);
  
  const handleConversationComplete = () => {
    // In a real implementation, we would process the conversation transcript
    // to extract interests and then navigate to the profile page
    setShowSummary(true);
    
    // Navigate after showing the summary for a moment
    setTimeout(() => {
      navigate('/profile');
    }, 3000);
  };
  
  return (
    <div className="min-h-screen flex flex-col relative">
      <BlobShape className="left-[-150px] top-[-50px]" color="#FF9966" />
      <BlobShape className="right-[-100px] top-[40%]" color="#66B2FF" />
      
      <Header />
      
      <main className="flex-grow flex flex-col items-center p-4 pb-20">
        <div className="w-full max-w-md lg:max-w-3xl relative">
          <h2 className="text-2xl font-medium mb-6 text-center">Let's find your community</h2>
          
          <ElevenLabsChat onConversationComplete={handleConversationComplete} />
          
          {/* Transition animation when conversation completes */}
          {showSummary && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fade-in">
              <div className="bg-white rounded-xl p-6 shadow-lg max-w-md text-center">
                <h3 className="text-xl font-medium mb-4 text-brain-dark">
                  We've mapped your interests!
                </h3>
                <p className="mb-4">
                  Based on your conversation with Romy, we've identified several interests 
                  that might help connect you with local communities.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {extractedInterests.map(interest => (
                    <span 
                      key={interest.id} 
                      className="bg-brain-orange/20 px-3 py-1 rounded-full text-sm"
                    >
                      {interest.name}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 italic">
                  Taking you to your interest network...
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};

export default ChatPage;
