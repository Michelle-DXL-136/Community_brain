
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import RecommendationCard from '@/components/RecommendationCard';
import BlobShape from '@/components/BlobShape';
import { Button } from '@/components/ui/button';

// Mock data for recommendations
const mockRecommendations = [
  {
    id: 1,
    title: "Local Photography Club",
    type: "group",
    description: "Join fellow photography enthusiasts for weekly meetups, photo walks, and critique sessions.",
    location: "Downtown Community Center",
    memberCount: 42,
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["Photography", "Art", "Learning"]
  },
  {
    id: 2,
    title: "Weekend Hiking Expedition",
    type: "event",
    description: "Explore the beautiful trails of Twin Peaks with an experienced guide. All skill levels welcome!",
    location: "Twin Peaks Trailhead",
    date: "Next Saturday, 9:00 AM",
    image: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["Hiking", "Nature", "Outdoors"]
  },
  {
    id: 3,
    title: "Italian Cooking Workshop",
    type: "event",
    description: "Learn to make authentic pasta from scratch with Chef Maria. Ingredients provided.",
    location: "Culinary Arts Center",
    date: "Next Thursday, 6:00 PM",
    image: "https://images.unsplash.com/photo-1556910103-254954d8a3e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["Cooking", "Italian", "Workshop"]
  },
  {
    id: 4,
    title: "Community Garden Volunteers",
    type: "volunteer",
    description: "Help maintain our community garden and learn about sustainable gardening practices.",
    location: "Sunset Community Garden",
    memberCount: 24,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["Gardening", "Volunteering", "Outdoors"]
  },
  {
    id: 5,
    title: "Book Club: Monthly Fiction",
    type: "group",
    description: "Join our monthly discussions of contemporary and classic fiction. New members welcome!",
    location: "City Library, Room 3B",
    memberCount: 18,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    tags: ["Reading", "Fiction", "Discussion"]
  }
];

const RecommendationsPage = () => {
  const [searchParams] = useSearchParams();
  const interestFilter = searchParams.get('interest');
  const [filteredRecommendations, setFilteredRecommendations] = useState(mockRecommendations);
  const [activeFilter, setActiveFilter] = useState('all');

  // Filter recommendations based on URL parameter
  useEffect(() => {
    if (interestFilter) {
      const filtered = mockRecommendations.filter(rec => 
        rec.tags.some(tag => tag.toLowerCase() === interestFilter.toLowerCase())
      );
      setFilteredRecommendations(filtered.length > 0 ? filtered : mockRecommendations);
    } else {
      setFilteredRecommendations(mockRecommendations);
    }
  }, [interestFilter]);

  // Filter by recommendation type
  const filterByType = (type: string) => {
    setActiveFilter(type);
    if (type === 'all') {
      setFilteredRecommendations(mockRecommendations);
    } else {
      const filtered = mockRecommendations.filter(rec => rec.type === type);
      setFilteredRecommendations(filtered);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <BlobShape className="left-[-150px] top-[-50px]" color="#FF9966" />
      <BlobShape className="right-[-100px] bottom-[20%]" color="#66B2FF" />
      
      <Header />
      
      <main className="flex-grow flex flex-col items-center p-4 pb-20">
        <div className="w-full max-w-md">
          <div className="flex flex-col mb-6">
            <h2 className="text-2xl font-medium mb-2">
              {interestFilter 
                ? `Recommendations for ${interestFilter}`
                : "Recommended for You"
              }
            </h2>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
              <Button 
                variant={activeFilter === 'all' ? 'default' : 'outline'} 
                size="sm" 
                className={activeFilter === 'all' ? 'bg-brain-blue hover:bg-brain-blue/90' : ''}
                onClick={() => filterByType('all')}
              >
                All
              </Button>
              <Button 
                variant={activeFilter === 'group' ? 'default' : 'outline'} 
                size="sm"
                className={activeFilter === 'group' ? 'bg-brain-blue hover:bg-brain-blue/90' : ''}
                onClick={() => filterByType('group')}
              >
                Groups
              </Button>
              <Button 
                variant={activeFilter === 'event' ? 'default' : 'outline'} 
                size="sm"
                className={activeFilter === 'event' ? 'bg-brain-blue hover:bg-brain-blue/90' : ''}
                onClick={() => filterByType('event')}
              >
                Events
              </Button>
              <Button 
                variant={activeFilter === 'volunteer' ? 'default' : 'outline'} 
                size="sm"
                className={activeFilter === 'volunteer' ? 'bg-brain-blue hover:bg-brain-blue/90' : ''}
                onClick={() => filterByType('volunteer')}
              >
                Volunteer
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredRecommendations.map(recommendation => (
              <RecommendationCard 
                key={recommendation.id}
                title={recommendation.title}
                type={recommendation.type as 'event' | 'group' | 'volunteer'}
                description={recommendation.description}
                location={recommendation.location}
                date={recommendation.date}
                memberCount={recommendation.memberCount}
                image={recommendation.image}
                tags={recommendation.tags}
              />
            ))}
          </div>
          
          {filteredRecommendations.length === 0 && (
            <div className="text-center p-8">
              <p className="text-gray-500">No recommendations found. Try updating your interests in your profile.</p>
            </div>
          )}
        </div>
      </main>
      
      <Navigation />
    </div>
  );
};

export default RecommendationsPage;
