
import React from 'react';

interface ResumeUploaderProps {
  onFileChange: (file: File | null) => void;
  resumeText: string;
  onTextChange: (text: string) => void;
}

const ResumeUploader: React.FC<ResumeUploaderProps> = ({ onFileChange, resumeText, onTextChange }) => {
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    onFileChange(file);
  };
  
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-200 mb-4">1. Provide Resume</h2>
      <div className="space-y-4">
        <div>
            <label htmlFor="resume-upload" className="block text-sm font-medium text-gray-400 mb-2">Upload Resume (PDF or DOCX)</label>
            <input
                id="resume-upload"
                type="file"
                accept=".pdf,.docx"
                onChange={handleFile}
                className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-cyan-700 file:text-cyan-50 hover:file:bg-cyan-600 transition-colors"
            />
        </div>
        <div className="flex items-center">
            <div className="flex-grow border-t border-gray-600"></div>
            <span className="flex-shrink mx-4 text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-600"></div>
        </div>
        <div>
            <label htmlFor="resume-text" className="block text-sm font-medium text-gray-400 mb-2">Paste Resume Text</label>
            <textarea
                id="resume-text"
                value={resumeText}
                onChange={(e) => onTextChange(e.target.value)}
                placeholder="Paste the full text of your resume here..."
                rows={10}
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
            />
        </div>
      </div>
    </div>
  );
};

export default ResumeUploader;
