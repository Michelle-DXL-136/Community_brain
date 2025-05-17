
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-transparent py-4 px-4 flex justify-center items-center z-10">
      <div className="w-full max-w-md text-center">
        <Link to="/" className="inline-block">
          <h1 className="text-2xl font-bold text-brain-orange">
            Community<span className="text-brain-blue">Brain</span>
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
