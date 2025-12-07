
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CourseItem, LessonItem, QuizItem, Personality } from '../../types';
import { PERSONALITY_THEMES, COURSE_CONTENT } from '../../constants';
import { CheckCircle, XCircle, BookOpen, Quote, ArrowRight, ArrowLeft, List, X, Share2, Bookmark, Sparkles, Type, Minus, Plus, AlignJustify } from 'lucide-react';

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
  const [isAppearanceOpen, setAppearanceOpen] = useState(false);

  // Appearance State
  const [textSizeIndex, setTextSizeIndex] = useState(2); // Default text-xl
  const [lineHeightIndex, setLineHeightIndex] = useState(2); // Default leading-loose

  const fontSizes = ['text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl'];
  const lineHeights = ['leading-normal', 'leading-relaxed', 'leading-loose'];

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
    <div className={`flex flex-col items-center w-full max-w-5xl mx-auto z-10 relative ${theme.ui.font}`}>
      
      {/* Floating Action Bar (Top Right) */}
      <div className="absolute -top-12 right-0 flex items-center gap-2 z-50">
        
        {/* Appearance Toggle */}
        <div className="relative">
          <button 
            onClick={() => setAppearanceOpen(!isAppearanceOpen)}
            className={`p-2 rounded-full transition-colors backdrop-blur shadow-sm border ${isAppearanceOpen ? 'bg-white dark:bg-white/20 text-blue-500 border-blue-400' : 'bg-white/50 dark:bg-black/30 hover:bg-white dark:hover:bg-white/10 text-gray-500 border-white/40'}`}
          >
            <Type className="w-4 h-4" />
          </button>
          
          <AnimatePresence>
            {isAppearanceOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-12 right-0 w-64 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-4 z-50"
              >
                 <div className="space-y-4">
                    {/* Font Size Control */}
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-400 mb-2 flex justify-between">
                        <span>Text Size</span>
                        <span>{textSizeIndex + 1}/5</span>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 rounded-lg p-1">
                        <button 
                          onClick={() => setTextSizeIndex(Math.max(0, textSizeIndex - 1))}
                          className="p-2 hover:bg-white dark:hover:bg-white/10 rounded-md shadow-sm transition-all disabled:opacity-30"
                          disabled={textSizeIndex === 0}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="flex-1 text-center font-bold text-sm">Aa</div>
                        <button 
                          onClick={() => setTextSizeIndex(Math.min(fontSizes.length - 1, textSizeIndex + 1))}
                          className="p-2 hover:bg-white dark:hover:bg-white/10 rounded-md shadow-sm transition-all disabled:opacity-30"
                          disabled={textSizeIndex === fontSizes.length - 1}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Line Height Control */}
                    <div>
                       <div className="text-[10px] uppercase font-bold text-gray-400 mb-2">Line Spacing</div>
                       <div className="flex gap-1 bg-gray-100 dark:bg-white/5 rounded-lg p-1">
                          {lineHeights.map((h, i) => (
                             <button
                                key={h}
                                onClick={() => setLineHeightIndex(i)}
                                className={`flex-1 py-2 rounded-md transition-all flex justify-center ${i === lineHeightIndex ? 'bg-white dark:bg-white/20 shadow-sm text-blue-500' : 'hover:bg-gray-200 dark:hover:bg-white/10 text-gray-400'}`}
                             >
                                <AlignJustify className={`w-4 h-4 ${i === 0 ? 'scale-y-75' : i === 1 ? 'scale-y-100' : 'scale-y-125'}`} />
                             </button>
                          ))}
                       </div>
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button className="p-2 rounded-full bg-white/50 dark:bg-black/30 hover:bg-white dark:hover:bg-white/10 transition-colors backdrop-blur text-gray-500 shadow-sm border border-white/40">
           <Bookmark className="w-4 h-4" />
        </button>
        <button className="p-2 rounded-full bg-white/50 dark:bg-black/30 hover:bg-white dark:hover:bg-white/10 transition-colors backdrop-blur text-gray-500 shadow-sm border border-white/40">
           <Share2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => setMenuOpen(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur border border-white/20 shadow-sm text-xs font-bold uppercase tracking-wider transition-transform hover:scale-105`}
        >
          <List className="w-3 h-3" />
          <span>Index</span>
        </button>
      </div>

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
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 rounded-[2.5rem]"
              />
              
              {/* Menu Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: 20 }}
                className={`absolute top-0 right-0 w-80 max-h-[70vh] overflow-y-auto bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl z-50 p-2 scrollbar-thin m-4`}
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/10 mb-2 sticky top-0 bg-transparent z-10">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 font-display">Course Content</span>
                  <button onClick={() => setMenuOpen(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-white/10 rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1 p-2">
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
                        className={`w-full text-left p-3 rounded-xl text-sm transition-colors flex items-start gap-3
                          ${isActive 
                            ? `${theme.colors.highlight} font-bold shadow-sm ring-1 ring-black/5` 
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
                                {contentItem.question.slice(0, 30)}...
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

      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.98 }}
          transition={animationConfig}
          className={`
            w-full bg-white dark:bg-gray-900 
            rounded-[2rem] shadow-2xl shadow-black/5 overflow-hidden 
            border border-white/80 dark:border-white/5 relative
          `}
        >
          {/* Top colored accent bar */}
          <div className={`h-1.5 w-full bg-gradient-to-r ${theme.colors.primaryGradient}`} />

          <div className="p-8 md:p-16 relative">
            {/* Subtle Texture on the "Paper" */}
            <div className="absolute inset-0 bg-texture-noise opacity-50 pointer-events-none mix-blend-multiply dark:mix-blend-overlay"></div>
            
            <div className="relative z-10">
              {item.type === 'lesson' ? (
                <LessonContent 
                  item={item as LessonItem} 
                  theme={theme} 
                  settings={{
                    fontSizeClass: fontSizes[textSizeIndex],
                    lineHeightClass: lineHeights[lineHeightIndex]
                  }}
                />
              ) : (
                <QuizContent 
                  item={item as QuizItem} 
                  theme={theme}
                  selectedOption={selectedOption}
                  showFeedback={showFeedback}
                  onSelect={handleOptionClick}
                />
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between w-full mt-8 px-4 items-center">
        <button 
          onClick={onPrev}
          disabled={!hasPrev}
          className={`
            flex items-center gap-3 px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide
            backdrop-blur-md transition-all 
            bg-white/40 dark:bg-black/40 border border-white/40 
            hover:bg-white/70 dark:hover:bg-white/10
            disabled:opacity-30 disabled:cursor-not-allowed
            shadow-sm hover:shadow-md
          `}
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>
        
        {/* GLOSSY 3D BUTTON - MATCHING "SIMPLIFY WITH AI" */}
        <button 
          onClick={onNext}
          disabled={!hasNext || (item.type === 'quiz' && !showFeedback)}
          className={`
            btn-glossy-3d
            flex items-center gap-3 px-8 py-3.5 
            font-bold text-sm uppercase tracking-wide
            disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none
          `}
        >
          Next Step <Sparkles className="w-4 h-4 text-blue-200" />
        </button>
      </div>
    </div>
  );
};

const LessonContent = ({ item, theme, settings }: { item: LessonItem, theme: any, settings: any }) => (
  <article className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-display prose-p:font-serif">
    {/* Header Section */}
    <header className="mb-12 border-b border-gray-100 dark:border-gray-800 pb-8">
      <div className={`inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full ${theme.colors.highlight} text-xs font-bold uppercase tracking-widest`}>
        <BookOpen className="w-3 h-3" />
        <span>Cullen Methodology</span>
      </div>
      
      <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white tracking-tight leading-[1.1] font-display">
        {item.title}
      </h2>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 font-medium font-display">
        <span className="flex items-center gap-2">
           <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700" />
           Pauline Cullen
        </span>
        <span className="w-1 h-1 rounded-full bg-gray-300" />
        <span>5 min read</span>
      </div>
    </header>
    
    {/* Body Content with enhanced typography & dynamic settings */}
    <div className={`
        ${settings.fontSizeClass} text-gray-700 dark:text-gray-300 font-serif
        first-letter:text-7xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-gray-900 dark:first-letter:text-white first-letter:font-display
        [&_strong]:text-gray-900 [&_strong]:dark:text-white [&_strong]:font-bold
        [&_blockquote]:border-l-4 [&_blockquote]:border-current [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-8 [&_blockquote]:${theme.colors.accent}
        [&_p]:!${settings.fontSizeClass} [&_p]:!${settings.lineHeightClass} [&_p]:mb-6
        [&_li]:!${settings.fontSizeClass} [&_li]:!${settings.lineHeightClass}
    `}>
      <div dangerouslySetInnerHTML={{ __html: item.contentHTML }} />
    </div>

    {/* Footer Citation */}
    <div className="mt-16 pt-8 border-t-2 border-dashed border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs font-mono text-gray-400 uppercase tracking-widest">
      <div className="flex items-center gap-2">
        <Quote className="w-4 h-4" />
        {item.citation}
      </div>
      <span>WT2 // Module</span>
    </div>
  </article>
);

const QuizContent = ({ item, theme, selectedOption, showFeedback, onSelect }: any) => {
  const isExtrovert = theme.id === 'extrovert';

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-center mb-8">
         <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.colors.secondary} ${theme.colors.accent} text-xs font-bold uppercase tracking-widest shadow-inner`}>
            <div className={`w-2 h-2 rounded-full ${theme.colors.primary} ${isExtrovert ? 'animate-ping' : ''}`} />
            Knowledge Check
         </div>
      </div>
      
      <h3 className="text-3xl md:text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-white leading-tight font-display">
        {item.question}
      </h3>
      
      <div className="space-y-4">
        {item.options.map((opt: any) => {
          let stateStyles = `
            bg-white dark:bg-white/5 border-2 border-gray-100 dark:border-gray-800 
            hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg hover:-translate-y-0.5
          `;
          let icon = null;

          if (showFeedback) {
            if (opt.correct) {
              stateStyles = `${theme.colors.feedbackCorrect} border-current ring-1 ring-current shadow-lg scale-[1.02] z-10`;
              icon = <CheckCircle className="w-6 h-6 shrink-0" />;
            } else if (selectedOption === opt.id) {
              stateStyles = `${theme.colors.feedbackWrong} border-current opacity-60 grayscale`;
              icon = <XCircle className="w-6 h-6 shrink-0" />;
            } else {
              stateStyles = "opacity-30 border-transparent grayscale scale-95";
            }
          } else if (selectedOption === opt.id) {
             stateStyles = "border-gray-900 dark:border-white shadow-md";
          }

          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt)}
              disabled={showFeedback}
              className={`
                w-full p-6 rounded-2xl text-left transition-all duration-300 flex items-center justify-between group 
                ${stateStyles}
              `}
            >
              <div className="flex items-center gap-4">
                 <span className={`
                    w-8 h-8 rounded-full border border-current flex items-center justify-center text-sm font-bold opacity-50
                    ${showFeedback && opt.correct ? 'bg-current text-white border-transparent' : ''}
                 `}>
                    {opt.id.toUpperCase()}
                 </span>
                 <span className="text-xl font-medium font-display tracking-tight">{opt.text}</span>
              </div>
              {showFeedback && icon}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showFeedback && (
            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-10 p-8 rounded-3xl ${item.options.find((o: any) => o.id === selectedOption)?.correct ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-900 dark:text-emerald-100' : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100'}`}
            >
            <div className="flex items-start gap-4">
                <div className="p-3 bg-white dark:bg-black/20 rounded-xl shrink-0">
                   {item.options.find((o: any) => o.id === selectedOption)?.correct ? <CheckCircle className="w-6 h-6" /> : <BookOpen className="w-6 h-6" />}
                </div>
                <div>
                <h4 className="font-bold mb-2 uppercase text-xs tracking-widest opacity-60 font-display">Analysis</h4>
                <p className="text-lg leading-relaxed font-serif">
                    {item.options.find((o: any) => o.id === selectedOption)?.feedback || item.options.find((o: any) => o.correct)?.feedback}
                </p>
                </div>
            </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LearnView;
