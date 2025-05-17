
import React from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import InterestGraph from '@/components/InterestGraph';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import BlobShape from '@/components/BlobShape';

// Mock data for the profile
const mockInterests = [
  { name: 'Photography', level: 4, relatedInterests: ['Landscape', 'Portrait'] },
  { name: 'Hiking', level: 3, relatedInterests: ['Nature', 'Outdoors'] },
  { name: 'Cooking', level: 5, relatedInterests: ['Italian', 'Baking'] },
  { name: 'Reading', level: 3, relatedInterests: ['Fiction', 'Non-fiction'] },
  { name: 'Painting', level: 2, relatedInterests: ['Watercolor', 'Acrylic'] },
  { name: 'Yoga', level: 4, relatedInterests: ['Meditation', 'Wellness'] },
  { name: 'Gardening', level: 3, relatedInterests: ['Flowers', 'Vegetables'] },
];

const ProfilePage = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <BlobShape className="left-[-150px] top-[-50px]" color="#FF9966" />
      <BlobShape className="right-[-100px] bottom-[20%]" color="#66B2FF" />
      
      <Header />
      
      <main className="flex-grow flex flex-col items-center p-4 pb-20">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 mb-6 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-medium">Your Profile</h2>
              <Link to="/chat">
                <Button variant="outline" size="sm" className="text-brain-blue border-brain-blue hover:bg-brain-blue/10">
                  Update
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-brain-orange text-white rounded-full flex items-center justify-center text-2xl font-bold">
                JD
              </div>
              <div>
                <h3 className="font-medium text-lg">Jane Doe</h3>
                <p className="text-sm text-gray-500">San Francisco, CA</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <InterestGraph interests={mockInterests} />
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md animate-fade-in">
            <h3 className="text-lg font-medium mb-4">Popular Interest Tags</h3>
            <div className="flex flex-wrap gap-2">
              {mockInterests.map(interest => (
                <Link 
                  key={interest.name}
                  to={`/recommendations?interest=${interest.name}`}
                  className="px-3 py-1 bg-brain-light text-brain-dark rounded-full text-sm hover:bg-brain-orange hover:text-white transition-colors"
                >
                  {interest.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link to="/recommendations">
              <Button className="bg-brain-blue hover:bg-brain-blue/90 text-white">
                View My Recommendations
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};

export default ProfilePage;
