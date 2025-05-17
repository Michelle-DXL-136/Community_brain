
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import BlobShape from '@/components/BlobShape';

const Index = () => {
  const navigate = useNavigate();

  const startOnboarding = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <BlobShape className="left-[-100px] top-[20%]" color="#FF9966" />
      <BlobShape className="right-[-100px] top-[50%]" color="#66B2FF" />
      
      <div className="flex-grow flex flex-col items-center justify-center px-6 py-12 text-center relative z-10">
        <div className="max-w-md w-full animate-fade-in">
          <h1 className="text-4xl font-bold mb-6">
            Welcome to <span className="text-brain-orange">Community</span>
            <span className="text-brain-blue">Brain</span>
          </h1>
          
          <p className="text-xl mb-8">
            Discover your local community based on your unique interests
          </p>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-10 shadow-lg">
            <h2 className="text-2xl font-medium mb-4 text-brain-dark">
              How it works
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-brain-orange text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">1</div>
                <p className="text-left">Chat with our AI assistant Romy about your interests and availability</p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brain-orange text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">2</div>
                <p className="text-left">Explore your personalized interest network</p>
              </div>
              
              <div className="flex items-start">
                <div className="bg-brain-orange text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">3</div>
                <p className="text-left">Connect with local groups, events, and volunteer opportunities</p>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={startOnboarding}
            className="bg-brain-orange hover:bg-brain-orange/90 text-white text-lg py-6 px-8 rounded-full w-full max-w-xs mx-auto animate-pulse-slow shadow-lg"
          >
            Start
          </Button>
        </div>
      </div>

      <div className="wave-bottom">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.44,118.92,130.05,111.31,191.45,105.24Z" className="shape-fill"></path>
        </svg>
      </div>
    </div>
  );
};

export default Index;
