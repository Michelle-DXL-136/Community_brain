
import React from 'react';
import { Calendar, MapPin, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface RecommendationCardProps {
  title: string;
  type: 'event' | 'group' | 'volunteer';
  description: string;
  location: string;
  date?: string;
  memberCount?: number;
  image?: string;
  tags: string[];
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  title,
  type,
  description,
  location,
  date,
  memberCount,
  image,
  tags
}) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md transition-transform hover:scale-[1.02] mb-4 animate-fade-in">
      {image && (
        <div className="h-36 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-brain-dark">{title}</h3>
          <span className="text-xs font-medium text-white bg-brain-blue px-2 py-1 rounded-full">
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin size={14} className="mr-1" />
          <span>{location}</span>
        </div>
        
        {date && (
          <div className="flex items-center text-sm text-gray-500 mb-2">
            <Calendar size={14} className="mr-1" />
            <span>{date}</span>
          </div>
        )}
        
        {memberCount && (
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Users size={14} className="mr-1" />
            <span>{memberCount} members</span>
          </div>
        )}
        
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.map(tag => (
            <span 
              key={tag}
              className="text-xs bg-brain-light text-brain-dark px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Button className="w-full bg-brain-orange hover:bg-brain-orange/90 text-white">
          Connect
        </Button>
      </div>
    </div>
  );
};

export default RecommendationCard;
