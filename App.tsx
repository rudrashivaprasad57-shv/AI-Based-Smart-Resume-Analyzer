
import React, { useState, useCallback } from 'react';
import type { AnalysisResult } from './types';
import { analyzeResume } from './services/geminiService';
import Header from './components/Header';
import ResumeUploader from './components/ResumeUploader';
import JobInput from './components/JobInput';
import AnalysisResultDisplay from './components/AnalysisResultDisplay';

// TypeScript declarations for CDN-loaded libraries
declare const pdfjsLib: any;
declare const mammoth: any;

const App: React.FC = () => {
  const [resumeText, setResumeText] = useState<string>('');
  const [jobDescription, setJobDescription] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback(async (file: File | null) => {
    if (!file) {
      setResumeText('');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (!event.target?.result) {
          setError('Failed to read file.');
          setIsLoading(false);
          return;
        }

        const arrayBuffer = event.target.result as ArrayBuffer;
        let text = '';

        if (file.type === 'application/pdf') {
          const typedarray = new Uint8Array(arrayBuffer);
          const pdf = await pdfjsLib.getDocument(typedarray).promise;
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((item: any) => item.str).join(' ');
          }
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          const result = await mammoth.extractRawText({ arrayBuffer });
          text = result.value;
        } else {
            setError('Unsupported file type. Please upload a PDF or DOCX file.');
            setIsLoading(false);
            return;
        }
        setResumeText(text);
        setIsLoading(false);
      };
      reader.onerror = () => {
          setError('Error reading file.');
          setIsLoading(false);
      };
      reader.readAsArrayBuffer(file);
    } catch (e) {
      setError(`Error parsing file: ${e instanceof Error ? e.message : String(e)}`);
      setIsLoading(false);
    }
  }, []);

  const handleAnalyzeClick = async () => {
    if (!resumeText.trim() || !jobDescription.trim()) {
      setError('Please provide both a resume and a job description.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeResume(resumeText, jobDescription);
      setAnalysisResult(result);
    } catch (e) {
      setError(`Analysis failed: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClear = () => {
    setResumeText('');
    setJobDescription('');
    setAnalysisResult(null);
    setError(null);
    setIsLoading(false);
    // This is a bit of a hack to reset the file input visually
    const fileInput = document.getElementById('resume-upload') as HTMLInputElement;
    if (fileInput) {
        fileInput.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-8">
            <ResumeUploader onFileChange={handleFileChange} resumeText={resumeText} onTextChange={setResumeText} />
            <JobInput value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
          </div>
          <div className="lg:sticky lg:top-8 self-start">
            <AnalysisResultDisplay result={analysisResult} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>
      <footer className="sticky bottom-0 bg-gray-900/80 backdrop-blur-sm p-4 border-t border-gray-700">
        <div className="container mx-auto flex justify-center items-center gap-4">
          <button
            onClick={handleAnalyzeClick}
            disabled={isLoading || !resumeText.trim() || !jobDescription.trim()}
            className="w-full max-w-xs bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-900/50 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
           <button
            onClick={handleClear}
            disabled={isLoading}
            className="w-full max-w-xs bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
          >
            Clear
          </button>
        </div>
      </footer>
    </div>
  );
};

export default App;
