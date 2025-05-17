
import React, { useEffect, useRef } from 'react';

interface Node {
  id: string;
  label: string;
  size: number;
  color: string;
}

interface Edge {
  from: string;
  to: string;
}

interface InterestGraphProps {
  interests: {
    name: string;
    level: number;
    relatedInterests: string[];
  }[];
}

const InterestGraph: React.FC<InterestGraphProps> = ({ interests }) => {
  const graphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!graphRef.current) return;

    // This is a placeholder for graph visualization
    // In a real implementation, we would use a library like vis.js or d3.js
    // For now, we'll just create a simple visual representation of interests

    const graphContainer = graphRef.current;
    graphContainer.innerHTML = '';

    interests.forEach((interest) => {
      const interestEl = document.createElement('div');
      interestEl.className = `inline-block m-2 p-3 rounded-full text-white text-sm font-medium cursor-pointer transition-transform hover:scale-110`;
      interestEl.style.backgroundColor = getRandomColor();
      interestEl.style.fontSize = `${Math.min(16 + interest.level * 2, 24)}px`;
      interestEl.textContent = interest.name;
      
      // Add click event to simulate node interaction
      interestEl.addEventListener('click', () => {
        console.log(`Selected interest: ${interest.name}`);
      });

      graphContainer.appendChild(interestEl);
    });
  }, [interests]);

  // Generate a random warm color for the interest bubbles
  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 60) + 10; // Colors between orange and yellow-orange
    const saturation = Math.floor(Math.random() * 30) + 70; // Fairly saturated
    const lightness = Math.floor(Math.random() * 20) + 50; // Medium to bright
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  return (
    <div className="w-full overflow-hidden p-4 min-h-[200px] bg-white/50 rounded-lg shadow-sm backdrop-blur-sm">
      <h3 className="text-lg font-medium text-brain-dark mb-2">Your Interest Network</h3>
      <p className="text-sm text-muted-foreground mb-4">Tap on interests to explore connections</p>
      <div ref={graphRef} className="flex flex-wrap justify-center items-center gap-2 pt-2">
        {/* Graph visualization will be rendered here */}
      </div>
    </div>
  );
};

export default InterestGraph;
