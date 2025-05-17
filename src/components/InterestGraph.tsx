import React, { useEffect, useRef, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Interest {
  id: string;
  name: string;
  level: number;
  relatedInterests: string[];
}

interface InterestGraphProps {
  interests: Interest[];
  onInterestClick: (interest: Interest) => void;
  onInterestUpdate: (interest: Interest) => void;
  onInterestAdd: (interestName: string) => void;
  onInterestRemove: (interestId: string) => void;
}

const InterestGraph: React.FC<InterestGraphProps> = ({
  interests,
  onInterestClick,
  onInterestUpdate,
  onInterestAdd,
  onInterestRemove
}) => {
  const graphRef = useRef<HTMLDivElement>(null);
  const [selectedInterest, setSelectedInterest] = useState<Interest | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInterestName, setNewInterestName] = useState('');
  const [interestNodes, setInterestNodes] = useState<Record<string, HTMLElement>>({});

  // Get a color based on interest category or level
  const getInterestColor = (interest: Interest): string => {
    const hue = (interest.name.charCodeAt(0) % 60) + 10; // Colors between orange and yellow-orange
    const saturation = Math.min(70 + interest.level * 5, 100);
    const lightness = Math.max(60 - interest.level * 3, 45);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  // Calculate bubble size based on interest level
  const getBubbleSize = (level: number): number => {
    return 60 + (level * 15); // Base size + level multiplier
  };

  useEffect(() => {
    if (!graphRef.current) return;
    
    // Clear current graph
    graphRef.current.innerHTML = '';
    const newInterestNodes: Record<string, HTMLElement> = {};
    
    // Create graph container with physics-like behavior
    const graphContainer = document.createElement('div');
    graphContainer.className = 'relative w-full h-full';
    graphRef.current.appendChild(graphContainer);

    // Create nodes for each interest
    interests.forEach((interest) => {
      const interestEl = document.createElement('div');
      const size = getBubbleSize(interest.level);
      
      interestEl.className = `absolute rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md animate-float`;
      interestEl.style.backgroundColor = getInterestColor(interest);
      interestEl.style.width = `${size}px`;
      interestEl.style.height = `${size}px`;
      interestEl.style.left = `${Math.random() * (graphRef.current!.clientWidth - size)}px`;
      interestEl.style.top = `${Math.random() * (graphRef.current!.clientHeight - size)}px`;
      
      // Inner text element for better readability
      const textEl = document.createElement('span');
      textEl.className = 'text-white font-medium text-center px-2 break-words';
      textEl.style.fontSize = `${Math.min(14 + interest.level, 18)}px`;
      textEl.textContent = interest.name;
      interestEl.appendChild(textEl);
      
      // Add event listeners
      interestEl.addEventListener('click', () => {
        setSelectedInterest(interest);
        onInterestClick(interest);
        
        // Highlight selected node
        Object.values(newInterestNodes).forEach(node => {
          node.classList.remove('ring-4', 'ring-white', 'ring-opacity-70');
        });
        interestEl.classList.add('ring-4', 'ring-white', 'ring-opacity-70');
      });
      
      // Store reference to DOM element
      newInterestNodes[interest.id] = interestEl;
      graphContainer.appendChild(interestEl);
    });
    
    setInterestNodes(newInterestNodes);
    
    // Simple force simulation to prevent overlaps
    const simulateForces = () => {
      const nodeArray = Object.values(newInterestNodes);
      const repulsionForce = 100; // Strength of repulsion
      
      nodeArray.forEach((nodeA) => {
        let fx = 0, fy = 0;
        
        nodeArray.forEach((nodeB) => {
          if (nodeA === nodeB) return;
          
          const rectA = nodeA.getBoundingClientRect();
          const rectB = nodeB.getBoundingClientRect();
          
          const dx = (rectA.left + rectA.width/2) - (rectB.left + rectB.width/2);
          const dy = (rectA.top + rectA.height/2) - (rectB.top + rectB.height/2);
          const distance = Math.sqrt(dx*dx + dy*dy);
          const minDistance = (rectA.width + rectB.width) / 2;
          
          if (distance < minDistance) {
            const force = repulsionForce / (distance || 0.1);
            fx += dx * force / distance;
            fy += dy * force / distance;
          }
        });
        
        // Apply forces
        const currentLeft = parseFloat(nodeA.style.left);
        const currentTop = parseFloat(nodeA.style.top);
        const containerRect = graphRef.current!.getBoundingClientRect();
        const nodeRect = nodeA.getBoundingClientRect();
        
        // Keep nodes within container bounds
        const newLeft = Math.max(0, Math.min(containerRect.width - nodeRect.width, currentLeft + fx));
        const newTop = Math.max(0, Math.min(containerRect.height - nodeRect.height, currentTop + fy));
        
        nodeA.style.left = `${newLeft}px`;
        nodeA.style.top = `${newTop}px`;
      });
    };
    
    // Run force simulation a few times to position nodes
    for (let i = 0; i < 10; i++) {
      simulateForces();
    }
  }, [interests, onInterestClick]);

  const handleLevelChange = (value: number[]) => {
    if (selectedInterest) {
      const updatedInterest = { 
        ...selectedInterest, 
        level: value[0] 
      };
      onInterestUpdate(updatedInterest);
      
      // Update node size visually
      if (interestNodes[selectedInterest.id]) {
        const size = getBubbleSize(value[0]);
        interestNodes[selectedInterest.id].style.width = `${size}px`;
        interestNodes[selectedInterest.id].style.height = `${size}px`;
        interestNodes[selectedInterest.id].style.backgroundColor = getInterestColor({
          ...selectedInterest,
          level: value[0]
        });
      }
    }
  };
  
  const handleAddInterest = () => {
    if (newInterestName.trim()) {
      onInterestAdd(newInterestName.trim());
      setNewInterestName('');
      setShowAddForm(false);
    }
  };
  
  const handleRemoveInterest = () => {
    if (selectedInterest) {
      onInterestRemove(selectedInterest.id);
      setSelectedInterest(null);
    }
  };

  return (
    <div className="w-full bg-white/50 rounded-lg shadow-sm backdrop-blur-sm flex flex-col relative">
      <div className="flex justify-between items-center p-4 border-b border-gray-100">
        <h3 className="text-lg font-medium text-brain-dark">Your Interest Network</h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => setShowAddForm(true)}
        >
          <Plus size={16} />
          <span>Add Interest</span>
        </Button>
      </div>
      
      <div ref={graphRef} className="w-full min-h-[400px] p-4 relative">
        {/* Graph visualization is rendered here */}
      </div>
      
      {/* Interest Controls */}
      {selectedInterest && (
        <div className="p-4 border-t border-gray-100 bg-white/60 rounded-b-lg">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-brain-dark">{selectedInterest.name}</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1 h-8 w-8"
              onClick={handleRemoveInterest}
            >
              <X size={16} />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 w-24">Importance:</span>
            <Slider
              className="flex-1"
              defaultValue={[selectedInterest.level]}
              max={5}
              min={1}
              step={1}
              onValueChange={handleLevelChange}
            />
            <span className="text-sm font-medium w-6">{selectedInterest.level}</span>
          </div>
        </div>
      )}
      
      {/* Add Interest Form */}
      {showAddForm && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center p-6 z-10">
          <h4 className="text-lg font-medium mb-4">Add New Interest</h4>
          <input
            type="text"
            value={newInterestName}
            onChange={(e) => setNewInterestName(e.target.value)}
            placeholder="Enter interest name"
            className="w-full p-2 border border-gray-200 rounded-md mb-4"
            autoFocus
          />
          <div className="flex gap-2">
            <Button onClick={handleAddInterest} className="bg-brain-blue hover:bg-brain-blue/90">
              Add
            </Button>
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestGraph;
