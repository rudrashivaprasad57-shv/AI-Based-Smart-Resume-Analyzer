
import React from 'react';

interface ResultSectionProps {
  title: string;
  items: string[];
  iconType: 'summary' | 'strengths' | 'weaknesses' | 'suggestions';
}

const icons = {
  summary: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
  ),
  strengths: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  ),
  weaknesses: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
  ),
  suggestions: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
  ),
};

const iconColors = {
    summary: 'text-blue-400',
    strengths: 'text-green-400',
    weaknesses: 'text-red-400',
    suggestions: 'text-yellow-400',
};


const ResultSection: React.FC<ResultSectionProps> = ({ title, items, iconType }) => {
  return (
    <div>
        <div className="flex items-center gap-3 mb-3">
            <span className={iconColors[iconType]}>{icons[iconType]}</span>
            <h3 className={`text-lg font-semibold ${iconColors[iconType]}`}>{title}</h3>
        </div>
        {iconType === 'summary' ? (
             <p className="text-gray-300 ml-9">{items[0]}</p>
        ) : (
            <ul className="list-disc list-inside space-y-2 text-gray-300 ml-9">
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        )}
    </div>
  );
};

export default ResultSection;
