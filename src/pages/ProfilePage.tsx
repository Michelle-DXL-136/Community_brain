
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import InterestGraph from '@/components/InterestGraph';
import BlobShape from '@/components/BlobShape';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

// Mock data for the profile initial state
const initialInterests = [
  { id: '1', name: 'Photography', level: 4, relatedInterests: ['Landscape', 'Portrait'] },
  { id: '2', name: 'Hiking', level: 3, relatedInterests: ['Nature', 'Outdoors'] },
  { id: '3', name: 'Cooking', level: 5, relatedInterests: ['Italian', 'Baking'] },
  { id: '4', name: 'Reading', level: 3, relatedInterests: ['Fiction', 'Non-fiction'] },
  { id: '5', name: 'Painting', level: 2, relatedInterests: ['Watercolor', 'Acrylic'] },
  { id: '6', name: 'Yoga', level: 4, relatedInterests: ['Meditation', 'Wellness'] },
  { id: '7', name: 'Gardening', level: 3, relatedInterests: ['Flowers', 'Vegetables'] },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState(initialInterests);
  
  // Handler for clicking on an interest node
  const handleInterestClick = useCallback((interest) => {
    navigate(`/recommendations?interest=${encodeURIComponent(interest.name)}`);
  }, [navigate]);
  
  // Handler for updating an interest's level
  const handleInterestUpdate = useCallback((updatedInterest) => {
    setInterests(currentInterests => 
      currentInterests.map(interest => 
        interest.id === updatedInterest.id ? updatedInterest : interest
      )
    );
  }, []);
  
  // Handler for adding a new interest
  const handleInterestAdd = useCallback((interestName) => {
    setInterests(currentInterests => [
      ...currentInterests,
      {
        id: Date.now().toString(), // Simple ID generation
        name: interestName,
        level: 3, // Default level
        relatedInterests: []
      }
    ]);
  }, []);
  
  // Handler for removing an interest
  const handleInterestRemove = useCallback((interestId) => {
    setInterests(currentInterests => 
      currentInterests.filter(interest => interest.id !== interestId)
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <BlobShape className="left-[-150px] top-[-50px]" color="#FF9966" />
      <BlobShape className="right-[-100px] bottom-[20%]" color="#66B2FF" />
      
      <Header />
      
      <main className="flex-grow flex flex-col items-center p-4 pb-20">
        <div className="w-full max-w-md relative animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-md">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-medium">Your Interests</h2>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-brain-blue border-brain-blue hover:bg-brain-blue/10 gap-2"
                onClick={() => navigate('/chat')}
              >
                <MessageCircle size={16} />
                Update with Chat
              </Button>
            </div>
          </div>
          
          <div className="mb-6">
            <InterestGraph 
              interests={interests}
              onInterestClick={handleInterestClick}
              onInterestUpdate={handleInterestUpdate}
              onInterestAdd={handleInterestAdd}
              onInterestRemove={handleInterestRemove}
            />
          </div>
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};

export default ProfilePage;
