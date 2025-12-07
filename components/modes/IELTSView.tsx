
import React, { useState, useEffect, useRef } from 'react';
import { CourseItem, QuizItem } from '../../types';
import { Clock, HelpCircle, EyeOff } from 'lucide-react';

interface IELTSViewProps {
  item: CourseItem;
  onAnswer: (isCorrect: boolean) => void;
  onNext: () => void;
  onJumpTo: (index: number) => void;
  currentIndex: number;
  totalItems: number;
}

const IELTSView: React.FC<IELTSViewProps> = ({ 
  item, 
  onAnswer, 
  onNext, 
  onJumpTo,
  currentIndex,
  totalItems
}) => {
  const [highlight, setHighlight] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(2400); // 40 minutes in seconds
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll active nav item into view
  useEffect(() => {
    if (navRef.current) {
        const activeNode = navRef.current.children[currentIndex] as HTMLElement;
        if (activeNode) {
            activeNode.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }
    // Reset selection on item change
    setSelectedOption(null);
  }, [currentIndex]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Timer visual logic
  const getTimerStatus = () => {
    if (timeLeft > 300) return { color: 'text-emerald-400', bar: 'bg-emerald-400' }; // > 5 mins
    if (timeLeft > 60) return { color: 'text-yellow-400', bar: 'bg-yellow-400' };   // > 1 min
    return { color: 'text-red-500', bar: 'bg-red-500' };                            // < 1 min
  };

  const status = getTimerStatus();
  const isUrgent = timeLeft < 30;
  
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) {
        setHighlight(selection.toString());
    }
  };

  const handleSubmit = (opt: any) => {
    setSelectedOption(opt.id);
    onAnswer(opt.correct);
    // In real test, no feedback. But for learning app, we delay next.
    setTimeout(onNext, 1000); 
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#F0F2F5] text-black font-sans flex flex-col selection:bg-yellow-200 selection:text-black">
      {/* Official-style Top Bar */}
      <header className="relative h-20 bg-[#1D1D1B] text-white flex items-center justify-between px-8 shadow-md shrink-0 overflow-hidden">
        <div className="flex flex-col">
            <span className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">Candidate Name</span>
            <span className="font-bold text-lg tracking-wide">CULLEN, STUDENT (884210)</span>
        </div>
        <div className="flex flex-col items-center z-10">
             <div className={`flex items-center gap-2 text-2xl font-bold font-mono tracking-widest mb-1 transition-colors duration-300 ${status.color} ${isUrgent ? 'animate-pulse' : ''}`}>
                <Clock className="w-5 h-5" />
                {formatTime(timeLeft)}
            </div>
            <span className="text-[10px] text-red-400 uppercase font-bold tracking-widest">Writing Task 2</span>
        </div>
        <div className="flex gap-3">
            <button className="bg-[#444] hover:bg-[#555] text-white px-5 py-2 text-sm font-bold rounded shadow-sm flex items-center gap-2 transition-colors">
                <HelpCircle className="w-4 h-4" /> Help
            </button>
            <button className="bg-[#444] hover:bg-[#555] text-white px-5 py-2 text-sm font-bold rounded shadow-sm flex items-center gap-2 transition-colors">
                <EyeOff className="w-4 h-4" /> Hide
            </button>
        </div>

        {/* Progress Bar at bottom of header */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800">
            <div 
                className={`h-full transition-all duration-1000 ease-linear ${status.bar}`}
                style={{ width: `${(timeLeft / 2400) * 100}%` }}
            />
        </div>
      </header>

      {/* Main Split Screen */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Source Material / Prompt */}
        <div 
          className="w-1/2 p-10 overflow-y-auto ielts-scroll border-r border-gray-300 bg-white" 
          onMouseUp={handleTextSelection}
        >
            <div className="max-w-2xl mx-auto">
                <div className="mb-6 p-6 border border-gray-200 bg-[#F9F9F9] rounded-sm">
                    <h2 className="text-xl font-bold mb-4 text-[#333]">WRITING TASK 2</h2>
                    <p className="mb-4 text-[#444] font-medium">You should spend about 40 minutes on this task.</p>
                    <p className="mb-4 text-[#333]">Write about the following topic:</p>
                    
                    <div className="my-6 p-6 bg-white border border-gray-300 shadow-sm font-serif text-lg leading-relaxed text-black">
                        {item.type === 'lesson' ? (
                            <div dangerouslySetInnerHTML={{ __html: item.contentHTML }} />
                        ) : (
                            <p>{item.question}</p>
                        )}
                    </div>

                    <p className="mb-2 text-[#333]">Give reasons for your answer and include any relevant examples from your own knowledge or experience.</p>
                    <p className="text-[#333]">Write at least 250 words.</p>
                </div>
            </div>
            
            {highlight && (
                <div className="fixed bottom-24 left-10 bg-[#333] text-white px-4 py-2 rounded text-sm shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
                    <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                    Text Highlighted
                </div>
            )}
        </div>

        {/* Right: Answer Area / Questions */}
        <div className="w-1/2 p-10 overflow-y-auto ielts-scroll bg-[#F4F5F7]">
            <div className="max-w-2xl mx-auto h-full flex flex-col">
                <h3 className="text-lg font-bold mb-4 text-[#1D1D1B] flex items-center gap-2">
                    <span className="bg-black text-white px-2 py-0.5 text-sm rounded-sm">Step {currentIndex + 1}</span>
                    {item.type === 'quiz' ? 'Question Analysis' : 'Methodology'}
                </h3>
                
                {item.type === 'quiz' ? (
                    <div className="bg-white border border-gray-300 p-8 shadow-sm flex-1 min-h-[400px]">
                        <p className="mb-8 text-xl font-medium text-gray-800">{item.question}</p>
                        <div className="space-y-4">
                             {(item as QuizItem).options.map((opt) => (
                                <label 
                                  key={opt.id} 
                                  className={`flex items-start gap-4 p-4 cursor-pointer transition-all border rounded-md
                                    ${selectedOption === opt.id 
                                        ? 'bg-[#E6F3FF] border-[#3B82F6]' 
                                        : 'bg-white border-gray-200 hover:border-gray-400 hover:bg-gray-50'}
                                  `}
                                >
                                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5
                                        ${selectedOption === opt.id ? 'border-[#3B82F6] bg-white' : 'border-gray-400 bg-white'}
                                    `}>
                                        {selectedOption === opt.id && <div className="w-3 h-3 bg-[#3B82F6] rounded-full" />}
                                    </div>
                                    <input 
                                        type="radio" 
                                        name="ielts-opt" 
                                        className="hidden" 
                                        onChange={() => handleSubmit(opt)}
                                        disabled={selectedOption !== null}
                                    />
                                    <span className="text-lg text-gray-800 leading-snug">{opt.text}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-300 p-8 shadow-sm h-full flex flex-col items-center justify-center text-center">
                        <div className="mb-4 p-4 bg-yellow-50 text-yellow-800 rounded-full">
                           <EyeOff className="w-12 h-12" />
                        </div>
                        <h4 className="text-xl font-bold mb-2">Study Mode Active</h4>
                        <p className="text-gray-600 mb-6">Read the methodology on the left to understand the concept before attempting the question.</p>
                        <button onClick={onNext} className="bg-[#0078D4] hover:bg-[#0060AA] text-white px-8 py-3 rounded font-bold text-lg shadow-md transition-colors">
                            I Understand - Proceed
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>

      {/* IELTS Footer Navigation */}
      <footer className="h-16 bg-[#E5E5E5] border-t border-gray-400 flex items-center px-6 gap-2 shrink-0">
         <div className="flex items-center gap-2 overflow-x-auto w-full pb-1" ref={navRef}>
            <span className="font-bold text-[#333] mr-4 uppercase text-xs tracking-wider sticky left-0 bg-[#E5E5E5] z-10 py-1">Navigation</span>
            {Array.from({ length: totalItems }).map((_, idx) => (
                <button 
                    key={idx} 
                    onClick={() => onJumpTo(idx)}
                    className={`min-w-[40px] h-[40px] flex items-center justify-center font-bold text-lg cursor-pointer border rounded-sm transition-colors shrink-0
                        ${idx === currentIndex
                            ? 'bg-[#1D1D1B] text-white border-[#1D1D1B]' 
                            : 'bg-white text-[#1D1D1B] border-[#999] hover:bg-[#F0F0F0]'}
                    `}
                >
                    {idx + 1}
                </button>
            ))}
         </div>
      </footer>
    </div>
  );
};

export default IELTSView;
