
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CourseItem, QuizItem, LessonItem } from '../../types';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';

interface KahootViewProps {
  item: CourseItem;
  onNext: () => void;
  onAnswer: (isCorrect: boolean) => void;
}

const KahootView: React.FC<KahootViewProps> = ({ item, onNext, onAnswer }) => {
  const [timeLeft, setTimeLeft] = useState(20);
  const [selected, setSelected] = useState<string | null>(null);
  
  const colors = [
    'bg-red-500 hover:bg-red-600', 
    'bg-blue-500 hover:bg-blue-600', 
    'bg-yellow-500 hover:bg-yellow-600', 
    'bg-green-500 hover:bg-green-600'
  ];
  const shapes = ['▲', '◆', '●', '■'];

  // Type guard
  const isQuiz = item.type === 'quiz';

  useEffect(() => {
    if (!isQuiz || selected !== null) return;
    
    // Reset timer for new question
    setTimeLeft(20);

    const timer = setInterval(() => {
        setTimeLeft(prev => {
            if (prev <= 1) {
                handleSelect(null); // Time out
                return 0;
            }
            return prev - 1;
        });
    }, 1000);
    return () => clearInterval(timer);
  }, [item.id, selected, isQuiz]);

  const handleSelect = (optId: string | null) => {
    if (selected !== null) return;
    setSelected(optId || 'TIMEOUT');
    
    if (isQuiz) {
        // Find if correct
        const quizItem = item as QuizItem;
        const isCorrect = quizItem.options.find(o => o.id === optId)?.correct || false;
        onAnswer(isCorrect);
    }

    // Auto advance after short delay
    setTimeout(() => {
        onNext();
        setSelected(null); // Reset for next slide
    }, 3000);
  };

  // --- RENDER LESSON CARD (If not a quiz) ---
  if (!isQuiz) {
    const lesson = item as LessonItem;
    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 relative z-10">
            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white text-black p-10 rounded-2xl shadow-2xl max-w-4xl w-full text-center border-b-8 border-purple-600"
            >
                <div className="flex justify-center mb-6">
                    <div className="bg-purple-100 p-4 rounded-full">
                        <BookOpen className="w-12 h-12 text-purple-600" />
                    </div>
                </div>
                <h2 className="text-3xl font-black mb-6 uppercase tracking-tight">{lesson.title}</h2>
                <div className="text-lg text-gray-600 mb-8 max-h-[40vh] overflow-y-auto prose mx-auto">
                    <div dangerouslySetInnerHTML={{ __html: lesson.contentHTML }} />
                </div>
                <button 
                    onClick={onNext}
                    className="bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-4 px-12 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3 mx-auto"
                >
                    Continue <ArrowRight className="w-6 h-6" />
                </button>
            </motion.div>
        </div>
    );
  }

  // --- RENDER QUIZ ---
  const quiz = item as QuizItem;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 relative z-10">
      
      {/* Timer Bar */}
      <div className="w-full max-w-4xl bg-gray-800 rounded-full h-4 mb-8 overflow-hidden border-2 border-white/20">
        <motion.div 
            key={item.id} // Reset animation on new item
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / 20) * 100}%` }}
            transition={{ ease: "linear", duration: 1 }}
            className={`h-full ${timeLeft < 5 ? 'bg-red-500 animate-pulse' : 'bg-purple-500'}`}
        />
      </div>

      {/* Question Card */}
      <motion.div 
        key={`q-${item.id}`}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white text-black p-8 rounded-lg shadow-2xl mb-12 max-w-4xl w-full text-center"
      >
        <h2 className="text-3xl md:text-4xl font-black">{quiz.question}</h2>
      </motion.div>

      {/* Grid of Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl">
        {quiz.options.map((opt, idx) => {
            const isSelected = selected === opt.id;
            const isCorrect = opt.correct;
            const showResult = selected !== null;
            
            let opacity = 'opacity-100';
            if (showResult && !isCorrect && !isSelected) opacity = 'opacity-20 grayscale';
            
            return (
                <motion.button
                    key={opt.id}
                    whileHover={{ scale: showResult ? 1 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelect(opt.id)}
                    className={`${colors[idx % 4]} ${opacity} h-32 md:h-48 rounded-lg shadow-lg flex flex-col items-center justify-center p-6 text-white transition-all duration-300 relative overflow-hidden`}
                >
                    <span className="text-2xl md:text-4xl mb-2 opacity-50">{shapes[idx % 4]}</span>
                    <span className="text-xl md:text-2xl font-bold text-shadow-sm">{opt.text}</span>
                    
                    {showResult && (isCorrect ? 
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <span className="text-5xl">✓</span>
                        </div> : 
                        isSelected && 
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <span className="text-5xl">✗</span>
                        </div>
                    )}
                </motion.button>
            )
        })}
      </div>
      
      {/* Feedback Overlay */}
      {selected && (
          <div className="mt-8 text-white font-mono text-xl animate-bounce">
              {selected === 'TIMEOUT' ? "TIME'S UP!" : "Loading next..."}
          </div>
      )}
    </div>
  );
};

export default KahootView;
