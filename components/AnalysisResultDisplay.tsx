
import React from 'react';
import type { AnalysisResult } from '../types';
import Spinner from './common/Spinner';
import ResultSection from './common/ResultSection';

interface AnalysisResultDisplayProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
    const circumference = 2 * Math.PI * 52; // 2 * pi * radius
    const offset = circumference - (score / 100) * circumference;

    let strokeColor = 'stroke-green-500';
    if (score < 75) strokeColor = 'stroke-yellow-500';
    if (score < 50) strokeColor = 'stroke-red-500';
    
    return (
        <div className="relative flex items-center justify-center w-32 h-32 md:w-40 md:h-40">
            <svg className="absolute w-full h-full" viewBox="0 0 120 120">
                <circle
                    className="text-gray-700"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                />
                <circle
                    className={`${strokeColor} transition-all duration-1000 ease-out`}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="52"
                    cx="60"
                    cy="60"
                    transform="rotate(-90 60 60)"
                />
            </svg>
            <span className="text-3xl md:text-4xl font-bold text-white">{score}%</span>
        </div>
    );
};


const AnalysisResultDisplay: React.FC<AnalysisResultDisplayProps> = ({ result, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center min-h-[300px]">
        <Spinner />
        <p className="mt-4 text-gray-400">Analyzing your resume, please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg border-2 border-red-500/50 text-center">
        <h3 className="text-xl font-semibold text-red-400">Analysis Error</h3>
        <p className="mt-2 text-red-300">{error}</p>
      </div>
    );
  }
  
  if (!result) {
      return (
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center min-h-[300px]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-400 mt-4">Your Analysis Awaits</h3>
              <p className="text-gray-500 mt-1">Provide a resume and job description, then click "Analyze" to see your results.</p>
          </div>
      );
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-8">
        <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Match Score</h2>
            <ScoreCircle score={result.matchScore} />
        </div>

        <div className="space-y-6">
            <ResultSection title="Summary" items={[result.summary]} iconType="summary" />
            <ResultSection title="Strengths" items={result.strengths} iconType="strengths" />
            <ResultSection title="Weaknesses" items={result.weaknesses} iconType="weaknesses" />
            <ResultSection title="Suggestions for Improvement" items={result.suggestions} iconType="suggestions" />
        </div>
    </div>
  );
};

export default AnalysisResultDisplay;
