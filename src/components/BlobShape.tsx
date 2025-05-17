
import React from 'react';

interface BlobShapeProps {
  className?: string;
  color?: string;
}

const BlobShape: React.FC<BlobShapeProps> = ({ className = "", color = "#FF9966" }) => {
  return (
    <div 
      className={`absolute -z-10 opacity-30 blob-shape animate-float ${className}`}
      style={{ 
        backgroundColor: color,
        width: '300px',
        height: '300px',
      }}
    />
  );
};

export default BlobShape;
