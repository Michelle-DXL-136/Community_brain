
import React from 'react';
import { useLocation } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BlobShape from '@/components/BlobShape';

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <BlobShape className="left-[-150px] top-[-50px]" color="#FF9966" />
      <BlobShape className="right-[-100px] bottom-[20%]" color="#66B2FF" />
      
      <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-md w-full relative z-10">
        <h1 className="text-4xl font-bold mb-4 text-brain-dark">404</h1>
        <p className="text-xl text-brain-dark mb-6">Oops! Page not found</p>
        <p className="text-gray-600 mb-8">
          We couldn't find the page "{location.pathname}" you're looking for.
        </p>
        <Link to="/">
          <Button className="bg-brain-orange hover:bg-brain-orange/90 text-white">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
