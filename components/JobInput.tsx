
import React from 'react';

interface JobInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const JobInput: React.FC<JobInputProps> = ({ value, onChange }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-200 mb-4">2. Provide Job Description</h2>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Paste the job description here..."
        rows={10}
        className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
      />
    </div>
  );
};

export default JobInput;
