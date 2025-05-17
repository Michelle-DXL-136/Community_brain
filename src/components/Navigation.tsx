
import { useState } from 'react';
import { Home, MessageCircle, User, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [activeTab, setActiveTab] = useState<string>(window.location.pathname);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Chat', path: '/chat', icon: MessageCircle },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Events', path: '/recommendations', icon: Calendar },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 py-2 px-4 shadow-lg z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center p-2 rounded-lg transition-all ${
              activeTab === item.path
                ? 'text-brain-orange translate-y-[-4px]'
                : 'text-gray-500 hover:text-brain-blue'
            }`}
            onClick={() => setActiveTab(item.path)}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
