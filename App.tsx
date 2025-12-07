
import React, { useState } from 'react';
import { 
  AppMode, 
  AppState, 
  Personality, 
  UserRole 
} from './types';
import { COURSE_CONTENT, MOCK_STATS, PERSONALITY_THEMES } from './constants';
import Background from './components/Background';
import LearnView from './components/modes/LearnView';
import KahootView from './components/modes/KahootView';
import IELTSView from './components/modes/IELTSView';
import { 
  Settings, 
  Moon, 
  Sun, 
  GraduationCap, 
  Gamepad2, 
  FileText, 
  BarChart2, 
  Book,
  User
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    role: UserRole.STUDENT,
    mode: AppMode.LEARN,
    personality: Personality.AMBIVERT, // Default
    darkMode: true,
    currentCourseIndex: 0,
    score: 0,
    completedIds: []
  });

  const [isSidebarOpen, setSidebarOpen] = useState(false);

  React.useEffect(() => {
    if (state.darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [state.darkMode]);

  const currentItem = COURSE_CONTENT[state.currentCourseIndex];
  const currentTheme = PERSONALITY_THEMES[state.personality];

  const handleNext = () => {
    if (state.currentCourseIndex < COURSE_CONTENT.length - 1) {
      setState(prev => ({ ...prev, currentCourseIndex: prev.currentCourseIndex + 1 }));
    }
  };

  const handlePrev = () => {
    if (state.currentCourseIndex > 0) {
      setState(prev => ({ ...prev, currentCourseIndex: prev.currentCourseIndex - 1 }));
    }
  };

  const handleJumpTo = (index: number) => {
    if (index >= 0 && index < COURSE_CONTENT.length) {
      setState(prev => ({ ...prev, currentCourseIndex: index }));
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setState(prev => ({ 
        ...prev, 
        score: prev.score + 10,
        completedIds: [...prev.completedIds, currentItem.id]
      }));
    }
  };

  const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        active 
          ? `${currentTheme.colors.primary} text-white shadow-lg` 
          : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
      }`}
    >
      <Icon className={`w-5 h-5 transition-transform ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className={`min-h-screen w-full relative overflow-hidden flex ${state.mode === AppMode.IELTS ? 'bg-gray-100' : ''}`}>
      
      {/* Background disabled in simulation mode */}
      {state.mode !== AppMode.IELTS && (
        <Background personality={state.personality} darkMode={state.darkMode} />
      )}

      {/* Sidebar Navigation */}
      {state.mode !== AppMode.IELTS && (
        <aside className="fixed left-4 top-4 bottom-4 w-72 bg-white/90 dark:bg-dark-surface/90 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-6 z-40 hidden md:flex flex-col shadow-2xl transition-all duration-300">
          <div className="flex items-center gap-4 px-2 py-2 mb-10">
            <div className={`w-12 h-12 bg-gradient-to-br ${currentTheme.colors.primaryGradient} rounded-xl flex items-center justify-center text-white shadow-lg`}>
              <Book className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 dark:text-white text-lg leading-none mb-1">Cullen.OS</h1>
              <span className={`text-xs ${currentTheme.colors.accent} font-bold uppercase tracking-widest`}>WT2 Mastery</span>
            </div>
          </div>

          <div className="space-y-2 flex-1">
            <div className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Modes</div>
            <SidebarItem 
              icon={GraduationCap} 
              label="The Core Course" 
              active={state.mode === AppMode.LEARN && state.role === UserRole.STUDENT} 
              onClick={() => setState(s => ({ ...s, mode: AppMode.LEARN, role: UserRole.STUDENT }))} 
            />
            <SidebarItem 
              icon={Gamepad2} 
              label="Skill Drill (Kahoot)" 
              active={state.mode === AppMode.KAHOOT} 
              onClick={() => setState(s => ({ ...s, mode: AppMode.KAHOOT }))} 
            />
            <SidebarItem 
              icon={FileText} 
              label="IELTS Exam Sim" 
              active={state.mode === AppMode.IELTS} 
              onClick={() => setState(s => ({ ...s, mode: AppMode.IELTS }))} 
            />
            
            <div className="my-6 h-px bg-gray-200 dark:bg-white/5" />
            
            <div className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Analysis</div>
            <SidebarItem 
              icon={BarChart2} 
              label="Progress Tracker" 
              active={state.role === UserRole.TEACHER} 
              onClick={() => setState(s => ({ ...s, role: UserRole.TEACHER, mode: AppMode.DASHBOARD }))} 
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
             {/* Personality */}
             <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2">Learning Persona</span>
                <div className="bg-gray-100 dark:bg-black/40 p-1.5 rounded-xl flex text-xs">
                    {[Personality.INTROVERT, Personality.AMBIVERT, Personality.EXTROVERT].map(p => {
                      const isActive = state.personality === p;
                      return (
                      <button
                        key={p}
                        onClick={() => setState(s => ({ ...s, personality: p }))}
                        className={`flex-1 py-2 rounded-lg transition-all font-medium ${
                            isActive 
                            ? 'bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white' 
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                        title={PERSONALITY_THEMES[p].description}
                      >
                        {p === Personality.INTROVERT ? 'Focus' : p === Personality.AMBIVERT ? 'Balance' : 'Power'}
                      </button>
                    )})}
                </div>
                <div className="px-2 text-[10px] text-gray-400 text-center">
                  {currentTheme.description}
                </div>
             </div>

             <button 
               onClick={() => setState(s => ({ ...s, darkMode: !s.darkMode }))}
               className="flex items-center justify-between w-full px-4 py-3 bg-gray-50 dark:bg-black/20 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors"
             >
                {state.darkMode ? "Dark Mode" : "Light Mode"}
                {state.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
             </button>
          </div>
        </aside>
      )}

      {/* Main Viewport */}
      <main className={`flex-1 relative transition-all duration-500 ${state.mode === AppMode.IELTS ? 'w-full h-screen p-0' : 'md:ml-80 p-6 md:p-8'}`}>
        
        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-black/80 backdrop-blur-md z-30 flex items-center justify-between px-4 border-b border-gray-200 dark:border-white/10">
           <span className="font-bold text-lg dark:text-white flex items-center gap-2">
             <Book className={`w-5 h-5 ${currentTheme.colors.accent}`} /> Cullen.OS
           </span>
           <button 
             onClick={() => setSidebarOpen(!isSidebarOpen)}
             className="p-2 rounded-lg bg-gray-100 dark:bg-white/10"
           >
             <Settings className="w-5 h-5 dark:text-white" />
           </button>
        </div>

        {/* Content Router */}
        {state.role === UserRole.TEACHER ? (
          <TeacherDashboard state={state} theme={currentTheme} />
        ) : (
          <div className="h-full flex flex-col">
            {state.mode === AppMode.LEARN && (
              <LearnView 
                item={currentItem}
                personality={state.personality}
                onNext={handleNext}
                onPrev={handlePrev}
                onJumpTo={handleJumpTo}
                onAnswer={handleAnswer}
                isCompleted={state.completedIds.includes(currentItem.id)}
                hasPrev={state.currentCourseIndex > 0}
                hasNext={state.currentCourseIndex < COURSE_CONTENT.length - 1}
                currentIndex={state.currentCourseIndex}
              />
            )}
            {state.mode === AppMode.KAHOOT && (
              <KahootView 
                 item={currentItem}
                 onNext={handleNext}
                 onAnswer={handleAnswer}
              />
            )}
            {state.mode === AppMode.IELTS && (
              <IELTSView 
                 item={currentItem}
                 onNext={handleNext}
                 onAnswer={handleAnswer}
                 onJumpTo={handleJumpTo}
                 currentIndex={state.currentCourseIndex}
                 totalItems={COURSE_CONTENT.length}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
};

const TeacherDashboard = ({ state, theme }: { state: AppState, theme: any }) => (
  <div className="p-4 md:p-8 max-w-6xl mx-auto z-10 relative mt-16 md:mt-0">
    <div className="mb-10">
      <h2 className="text-4xl font-extrabold mb-2 dark:text-white">Student Mastery</h2>
      <p className="text-gray-500 dark:text-gray-400">Analysis based on Cullen's Band 7+ Criteria</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div className={`bg-white dark:bg-dark-surface p-8 ${theme.ui.roundness} ${theme.ui.shadow} border border-gray-100 dark:border-dark-border relative overflow-hidden group`}>
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
          <Book className={`w-24 h-24 ${theme.colors.accent}`} />
        </div>
        <h3 className="text-gray-500 font-medium mb-1">Current Band Estimate</h3>
        <div className={`text-5xl font-black ${theme.colors.accent}`}>6.5</div>
        <div className="mt-4 text-sm text-green-500 font-bold bg-green-50 dark:bg-green-900/20 inline-block px-3 py-1 rounded-full">
          +0.5 Improvement
        </div>
      </div>

      <div className={`bg-white dark:bg-dark-surface p-8 ${theme.ui.roundness} ${theme.ui.shadow} border border-gray-100 dark:border-dark-border relative overflow-hidden`}>
        <h3 className="text-gray-500 font-medium mb-1">Task Response</h3>
        <div className="text-5xl font-black text-purple-500">7.0</div>
        <p className="mt-4 text-sm text-gray-400">Strong identification of task.</p>
      </div>

      <div className={`bg-white dark:bg-dark-surface p-8 ${theme.ui.roundness} ${theme.ui.shadow} border border-gray-100 dark:border-dark-border relative overflow-hidden`}>
        <h3 className="text-gray-500 font-medium mb-1">Course Progress</h3>
        <div className="text-5xl font-black text-orange-500">42%</div>
        <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 mt-4 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 w-[42%]" />
        </div>
      </div>
    </div>

    <div className={`bg-white dark:bg-dark-surface p-8 ${theme.ui.roundness} ${theme.ui.shadow} border border-gray-100 dark:border-dark-border h-96`}>
      <h3 className="text-xl font-bold mb-8 dark:text-white flex items-center gap-2">
        <BarChart2 className="w-5 h-5 text-gray-400" />
        Band Score Breakdown
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={MOCK_STATS}>
          <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis domain={[0, 9]} stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ 
              borderRadius: '16px', 
              border: 'none', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              padding: '12px 20px'
            }} 
          />
          <Bar 
            dataKey="score" 
            fill="url(#colorGradient)" 
            radius={[8, 8, 8, 8]} 
            barSize={40} 
          >
          </Bar>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              {theme.id === 'introvert' && (
                <>
                <stop offset="0%" stopColor="#475569" stopOpacity={1}/>
                <stop offset="100%" stopColor="#1e293b" stopOpacity={1}/>
                </>
              )}
              {theme.id === 'extrovert' && (
                <>
                <stop offset="0%" stopColor="#c026d3" stopOpacity={1}/>
                <stop offset="100%" stopColor="#f97316" stopOpacity={1}/>
                </>
              )}
               {theme.id === 'ambivert' && (
                <>
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={1}/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity={1}/>
                </>
              )}
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default App;
