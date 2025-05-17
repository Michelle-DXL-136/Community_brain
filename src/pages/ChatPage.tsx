
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import ElevenLabsChat from '@/components/ElevenLabsChat';
import BlobShape from '@/components/BlobShape';

const ChatPage = () => {
  const navigate = useNavigate();
  
  const handleConversationComplete = () => {
    // Simply navigate to profile page without showing summary
    navigate('/profile');
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
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};

export default ChatPage;
