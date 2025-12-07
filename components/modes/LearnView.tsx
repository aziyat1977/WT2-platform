
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CourseItem, LessonItem, QuizItem, Personality } from '../../types';
import { PERSONALITY_THEMES, COURSE_CONTENT } from '../../constants';
import { CheckCircle, XCircle, BookOpen, Quote, ArrowRight, ArrowLeft, List, X } from 'lucide-react';

interface LearnViewProps {
  item: CourseItem;
  personality: Personality;
  onNext: () => void;
  onPrev: () => void;
  onJumpTo: (index: number) => void;
  onAnswer: (isCorrect: boolean) => void;
  isCompleted: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  currentIndex: number;
}

const LearnView: React.FC<LearnViewProps> = ({ 
  item, 
  personality, 
  onNext, 
  onPrev, 
  onJumpTo, 
  onAnswer, 
  isCompleted, 
  hasPrev, 
  hasNext,
  currentIndex
}) => {
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  // Get current theme
  const theme = PERSONALITY_THEMES[personality];

  // Reset local state when item changes
  React.useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
  }, [item.id]);

  const handleOptionClick = (opt: any) => {
    if (showFeedback) return;
    setSelectedOption(opt.id);
    setShowFeedback(true);
    onAnswer(opt.correct);
  };

  const animationConfig = theme.ui.animation;

  return (
    <div className={`flex flex-col items-center justify-center min-h-[60vh] w-full max-w-4xl mx-auto z-10 relative ${theme.ui.font}`}>
      
      {/* Table of Contents Toggle */}
      <div className="w-full flex justify-end mb-4 relative z-50">
        <button
          onClick={() => setMenuOpen(true)}
          className={`flex items-center gap-2 px-4 py-2 ${theme.ui.roundness} ${theme.colors.buttonSecondary} backdrop-blur-md shadow-sm text-sm font-bold transition-transform hover:scale-105`}
        >
          <List className="w-4 h-4" />
          <span>Course Map</span>
        </button>

        {/* Menu Dropdown/Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
              />
              
              {/* Menu Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className={`absolute top-12 right-0 w-80 max-h-[70vh] overflow-y-auto bg-white dark:bg-dark-surface border border-gray-200 dark:border-gray-800 shadow-2xl ${theme.ui.roundness} z-50 p-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700`}
              >
                <div className="flex items-center justify-between p-3 border-b border-gray-100 dark:border-gray-700 mb-2 sticky top-0 bg-white/95 dark:bg-dark-surface/95 backdrop-blur z-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Course Content</span>
                  <button onClick={() => setMenuOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1">
                  {COURSE_CONTENT.map((contentItem, idx) => {
                    const isActive = idx === currentIndex;
                    const isLesson = contentItem.type === 'lesson';
                    
                    return (
                      <button
                        key={contentItem.id}
                        onClick={() => {
                          onJumpTo(idx);
                          setMenuOpen(false);
                        }}
                        className={`w-full text-left p-3 rounded-lg text-sm transition-colors flex items-start gap-3
                          ${isActive 
                            ? `${theme.colors.highlight} font-bold` 
                            : 'hover:bg-gray-50 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300'}
                        `}
                      >
                        <span className={`text-xs font-mono mt-0.5 opacity-50 min-w-[20px] ${isActive ? 'opacity-100' : ''}`}>
                          {(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <div>
                          <div className={`font-medium ${!isLesson ? 'opacity-80' : ''}`}>
                            {isLesson ? contentItem.title : (
                              <span className="italic flex items-center gap-1">
                                <span className="text-[10px] uppercase border border-current px-1 rounded opacity-60">Quiz</span>
                                {contentItem.question.slice(0, 40)}...
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.95 }}
          transition={animationConfig}
          className={`bg-white dark:bg-dark-surface ${theme.ui.roundness} ${theme.ui.shadow} p-8 md:p-12 w-full border ${theme.ui.border} relative overflow-hidden`}
        >
          {/* Decorative accent for Cullen branding */}
          <div className={`absolute top-0 left-0 w-1.5 h-full ${theme.colors.primary}`} />
          
          {item.type === 'lesson' ? (
            <LessonContent item={item as LessonItem} theme={theme} />
          ) : (
            <QuizContent 
              item={item as QuizItem} 
              theme={theme}
              selectedOption={selectedOption}
              showFeedback={showFeedback}
              onSelect={handleOptionClick}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between w-full mt-8 px-2">
        <button 
          onClick={onPrev}
          disabled={!hasPrev}
          className={`flex items-center gap-2 px-6 py-3 ${theme.ui.roundness} font-semibold backdrop-blur-sm transition-all ${theme.colors.buttonSecondary} disabled:opacity-30 disabled:cursor-not-allowed`}
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>
        <button 
          onClick={onNext}
          disabled={!hasNext || (item.type === 'quiz' && !showFeedback)}
          className={`flex items-center gap-2 px-8 py-3 ${theme.ui.roundness} font-bold text-white transition-all disabled:opacity-50 disabled:shadow-none disabled:translate-y-0 disabled:cursor-not-allowed ${theme.colors.button}`}
        >
          Next Step <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const LessonContent = ({ item, theme }: { item: LessonItem, theme: any }) => (
  <div className="prose prose-lg dark:prose-invert max-w-none">
    <div className={`flex items-center gap-3 mb-6 ${theme.colors.accent} border-b border-gray-100 dark:border-gray-800 pb-4`}>
      <BookOpen className="w-6 h-6" />
      <span className="text-sm font-bold uppercase tracking-widest">Cullen Methodology</span>
    </div>
    
    <h2 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white tracking-tight leading-tight">{item.title}</h2>
    
    <div className={`text-lg leading-relaxed text-gray-700 dark:text-gray-300 space-y-6 [&_strong]:text-current [&_strong]:${theme.colors.accent}`}>
      <div dangerouslySetInnerHTML={{ __html: item.contentHTML }} />
    </div>

    <div className="mt-10 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-sm text-gray-500">
      <span className="font-mono flex items-center gap-2">
        <Quote className="w-4 h-4" />
        {item.citation}
      </span>
      {theme.id !== 'introvert' && (
        <span className={`px-3 py-1 ${theme.colors.secondary} ${theme.colors.accent} rounded-full text-xs font-bold uppercase`}>
          Essential Reading
        </span>
      )}
    </div>
  </div>
);

const QuizContent = ({ item, theme, selectedOption, showFeedback, onSelect }: any) => {
  const isExtrovert = theme.id === 'extrovert';

  return (
    <div>
      <div className={`flex items-center gap-3 mb-8 ${theme.colors.accent} border-b border-gray-100 dark:border-gray-800 pb-4`}>
        <div className={`w-2.5 h-2.5 rounded-full ${theme.colors.primary} ${isExtrovert ? 'animate-ping' : ''}`} />
        <span className="text-sm font-bold uppercase tracking-widest">Pop Quiz</span>
      </div>
      
      <h3 className="text-2xl font-bold mb-8 dark:text-white leading-snug">{item.question}</h3>
      
      <div className="space-y-4">
        {item.options.map((opt: any) => {
          let stateStyles = `border-2 ${theme.ui.border} hover:border-current hover:${theme.colors.secondary} dark:hover:bg-white/5`;
          let icon = null;

          if (showFeedback) {
            if (opt.correct) {
              stateStyles = `${theme.colors.feedbackCorrect} border-current ring-1 ring-current font-semibold`;
              icon = <CheckCircle className="w-6 h-6 shrink-0" />;
            } else if (selectedOption === opt.id) {
              stateStyles = `${theme.colors.feedbackWrong} border-current font-medium`;
              icon = <XCircle className="w-6 h-6 shrink-0" />;
            } else {
              stateStyles = "opacity-50 border-transparent grayscale";
            }
          }

          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt)}
              disabled={showFeedback}
              className={`w-full p-5 ${theme.ui.roundness} text-left transition-all duration-300 flex items-center justify-between group ${stateStyles}`}
            >
              <span className="text-lg pr-4">{opt.text}</span>
              {showFeedback && icon}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <motion.div 
          initial={{ opacity: 0, height: 0, scale: 0.95 }}
          animate={{ opacity: 1, height: 'auto', scale: 1 }}
          className={`mt-8 p-6 ${theme.ui.roundness} ${item.options.find((o: any) => o.id === selectedOption)?.correct ? theme.colors.feedbackCorrect : theme.colors.highlight} border-l-4`}
        >
          <div className="flex items-start gap-3">
            {isExtrovert && item.options.find((o: any) => o.id === selectedOption)?.correct && (
                 <span className="text-2xl">🎉</span>
            )}
            <div>
              <h4 className="font-bold mb-1 opacity-80 uppercase text-xs tracking-wider">{theme.ui.feedbackIntro}</h4>
              <p className="text-lg font-medium">
                {item.options.find((o: any) => o.id === selectedOption)?.feedback || item.options.find((o: any) => o.correct)?.feedback}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default LearnView;
