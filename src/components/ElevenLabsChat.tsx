
import React, { useEffect, useState, useRef } from 'react';

// Declare the custom elevenlabs-convai element to fix TypeScript error
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id': string;
      }
    }
  }
}

interface ElevenLabsChatProps {
  onConversationComplete?: () => void;
}

interface Message {
  speaker: 'user' | 'ai';
  text: string;
  timestamp: number;
}

const ElevenLabsChat: React.FC<ElevenLabsChatProps> = ({ onConversationComplete }) => {
  const [transcript, setTranscript] = useState<Message[]>([]);
  const [isTranscriptVisible, setIsTranscriptVisible] = useState(true);
  const transcriptRef = useRef<HTMLDivElement>(null);
  
  // Helper function to add a new message to the transcript
  const addMessage = (speaker: 'user' | 'ai', text: string) => {
    setTranscript(prev => [...prev, {
      speaker,
      text,
      timestamp: Date.now()
    }]);
  };

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [transcript]);

  useEffect(() => {
    // Load ElevenLabs widget script
    const script = document.createElement('script');
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    // Set up event listeners for the ElevenLabs widget
    const handleUserSpeech = (event: CustomEvent) => {
      if (event.detail && event.detail.transcript) {
        addMessage('user', event.detail.transcript);
      }
    };

    const handleAISpeech = (event: CustomEvent) => {
      if (event.detail && event.detail.text) {
        addMessage('ai', event.detail.text);
      }
    };

    // Listen for custom events from the ElevenLabs widget
    document.addEventListener('elevenlabs-user-speech', handleUserSpeech as EventListener);
    document.addEventListener('elevenlabs-ai-speech', handleAISpeech as EventListener);

    return () => {
      // Clean up script and event listeners on unmount
      document.body.removeChild(script);
      document.removeEventListener('elevenlabs-user-speech', handleUserSpeech as EventListener);
      document.removeEventListener('elevenlabs-ai-speech', handleAISpeech as EventListener);
    };
  }, []);

  // Toggle transcript visibility
  const toggleTranscript = () => {
    setIsTranscriptVisible(prev => !prev);
  };

  return (
    <div className="h-full w-full flex flex-col items-center">
      <div className="bg-white rounded-lg p-4 shadow-md w-full max-w-md mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-medium mb-2">Chat with Romy</h2>
          <button 
            onClick={toggleTranscript}
            className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-2 py-1 transition-colors"
          >
            {isTranscriptVisible ? 'Hide Transcript' : 'Show Transcript'}
          </button>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Romy will help discover your interests and find local communities that match them.
        </p>
      </div>

      {/* Responsive layout for mobile-first */}
      <div className="w-full max-w-md flex flex-col lg:flex-row lg:max-w-3xl lg:gap-4">
        {/* ElevenLabs widget container */}
        <div className="elevenlabs-chat-container w-full lg:w-1/2 h-[400px] mb-6 lg:mb-0">
          <elevenlabs-convai agent-id="agent_01jveywkg9fgktmrcbwhw989eb"></elevenlabs-convai>
        </div>

        {/* Live transcript panel */}
        {isTranscriptVisible && (
          <div className="w-full lg:w-1/2 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-md mb-6 lg:mb-0 h-[400px] overflow-hidden flex flex-col">
            <div className="text-sm font-medium mb-2 text-brain-dark">Live Transcript</div>
            <div 
              ref={transcriptRef}
              className="flex-grow overflow-y-auto px-2 space-y-3 pb-4"
              tabIndex={0} 
              aria-label="Conversation transcript"
            >
              {transcript.length > 0 ? (
                transcript.map((msg, index) => (
                  <div 
                    key={index}
                    className={`p-2 rounded-lg max-w-[80%] ${
                      msg.speaker === 'user' 
                        ? 'bg-brain-blue/10 ml-auto' 
                        : 'bg-brain-orange/10'
                    }`}
                  >
                    <div className="text-xs font-medium mb-1">
                      {msg.speaker === 'user' ? 'You:' : 'Romy:'}
                    </div>
                    <div className="text-sm">
                      {msg.text}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 italic text-sm mt-4">
                  Transcript will appear here during your conversation with Romy.
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <button 
        onClick={onConversationComplete}
        className="bg-brain-blue hover:bg-brain-blue/90 text-white font-medium py-2 px-6 rounded-full shadow-md transition-all mt-6"
      >
        Finish Conversation
      </button>
    </div>
  );
};

export default ElevenLabsChat;
