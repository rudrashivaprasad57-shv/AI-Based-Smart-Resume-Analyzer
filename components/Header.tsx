
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm p-4 border-b border-gray-700 sticky top-0 z-10">
      <div className="container mx-auto text-center">
        <h1 className="text-2xl md:text-3xl font-bold text-cyan-400">
          AI-Based Smart Resume Analyzer
        </h1>
        <p className="text-sm md:text-base text-gray-400 mt-1">
          Get instant, data-driven insights into your resume's potential.
        </p>
      </div>
    </header>
  );
};

export default Header;
