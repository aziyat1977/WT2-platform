
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
import LandingPage from './components/LandingPage';
import { 
  Moon, 
  Sun, 
  GraduationCap, 
  Gamepad2, 
  FileText, 
  BarChart2, 
  Book,
  User,
  Search,
  Bell,
  Menu
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const App: React.FC = () => {
  const [showLanding, setShowLanding] = useState(true);
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

  // --- RENDER LANDING PAGE FIRST ---
  if (showLanding) {
    return <LandingPage onEnter={() => setShowLanding(false)} />;
  }

  const SidebarPill = ({ icon: Icon, label, active, onClick, delay }: any) => (
    <button
      onClick={onClick}
      style={{ animationDelay: delay }}
      className={`
        glass-pill w-full flex items-center gap-4 px-5 py-4 transition-all duration-300 group relative
        animate-float
        ${active ? 'scale-105 z-20 ring-2 ring-blue-400 ring-offset-2 ring-offset-transparent' : 'hover:scale-105 opacity-90 hover:opacity-100'}
      `}
    >
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors
        ${active ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md' : 'bg-gray-100 dark:bg-white/10 text-gray-500'}
      `}>
         <Icon className={`w-5 h-5`} />
      </div>
      <div className="flex flex-col items-start">
        <span className={`font-bold font-display tracking-tight text-sm ${active ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
            {label}
        </span>
        <span className="text-[10px] uppercase font-bold text-gray-400">
            {active ? 'Active Now' : 'Tap to open'}
        </span>
      </div>
      {active && (
         <div className="absolute right-4 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
      )}
    </button>
  );

  // --- IELTS MODE: Full Screen, bypasses the "Mockup Window" ---
  if (state.mode === AppMode.IELTS) {
    return (
      <IELTSView 
         item={currentItem}
         onNext={handleNext}
         onAnswer={handleAnswer}
         onJumpTo={handleJumpTo}
         currentIndex={state.currentCourseIndex}
         totalItems={COURSE_CONTENT.length}
      />
    );
  }

  // --- STANDARD MOCKUP VIEW ---
  return (
    <div className={`h-screen w-screen relative flex items-center justify-center p-4 md:p-6 overflow-hidden bg-organic-green transition-all duration-1000`}>
      
      {/* Background Particles */}
      <Background personality={state.personality} darkMode={state.darkMode} />

      {/* FLOATING CONTAINER */}
      <div className="w-full max-w-[1400px] h-[92vh] flex gap-8 relative z-10 animate-in fade-in zoom-in duration-700">
        
        {/* --- LEFT SIDEBAR (FLOATING PILLS) --- */}
        <aside className="hidden lg:flex flex-col w-72 h-full z-20 justify-center gap-5">
           
           {/* Branding Pill */}
           <div className="glass-pill px-6 py-5 flex items-center gap-3 animate-float-delayed mb-4">
             <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentTheme.colors.primaryGradient} flex items-center justify-center text-white shadow-lg`}>
               <Book className="w-5 h-5" />
             </div>
             <div>
               <h1 className="font-extrabold text-lg text-gray-900 dark:text-white font-display leading-none">Cullen.OS</h1>
               <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">WT2 Platform</span>
             </div>
           </div>

           {/* Navigation Pills */}
           <div className="space-y-4">
             <SidebarPill 
               icon={GraduationCap} 
               label="Learning Hub" 
               active={state.mode === AppMode.LEARN && state.role === UserRole.STUDENT} 
               onClick={() => { setState(s => ({ ...s, mode: AppMode.LEARN, role: UserRole.STUDENT })); }} 
               delay="0s"
             />
             <SidebarPill 
               icon={Gamepad2} 
               label="Kahoot Arena" 
               active={state.mode === AppMode.KAHOOT} 
               onClick={() => { setState(s => ({ ...s, mode: AppMode.KAHOOT })); }} 
               delay="0.2s"
             />
             <SidebarPill 
               icon={FileText} 
               label="Exam Simulator" 
               active={state.mode === AppMode.IELTS} 
               onClick={() => { setState(s => ({ ...s, mode: AppMode.IELTS })); }} 
               delay="0.4s"
             />
             <SidebarPill 
               icon={BarChart2} 
               label="Analytics" 
               active={state.role === UserRole.TEACHER} 
               onClick={() => { setState(s => ({ ...s, role: UserRole.TEACHER, mode: AppMode.DASHBOARD })); }} 
               delay="0.6s"
             />
           </div>

           {/* User Control Pill */}
           <div className="glass-pill mt-auto p-4 flex items-center justify-between animate-float">
              <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border border-white">
                      <User className="w-full h-full p-1 text-gray-400" />
                  </div>
                  <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-900 dark:text-white">Student</span>
                      <span className="text-[10px] text-gray-500">{state.personality}</span>
                  </div>
              </div>
              <button 
                  onClick={() => setState(s => ({ ...s, darkMode: !s.darkMode }))}
                  className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                  {state.darkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
           </div>
        </aside>

        {/* --- MAIN WINDOW --- */}
        <main className="flex-1 glass-panel-premium rounded-[3rem] flex flex-col relative overflow-hidden shadow-2xl animate-float-delayed" style={{ animationDuration: '8s' }}>
             
             {/* WINDOW HEADER */}
             <header className="h-20 px-8 flex items-center justify-between border-b border-black/5 dark:border-white/5 bg-white/40 dark:bg-black/20 backdrop-blur-xl z-50">
                <div className="flex items-center gap-4">
                   <div className="md:hidden">
                       <button onClick={() => setSidebarOpen(!isSidebarOpen)}><Menu className="w-6 h-6 text-gray-700" /></button>
                   </div>
                   <div className="flex flex-col">
                      <h2 className="text-lg font-bold text-gray-900 dark:text-white font-display">
                          {state.mode === AppMode.LEARN ? 'Interactive Lesson' : 
                           state.mode === AppMode.KAHOOT ? 'Live Quiz' : 'Teacher Dashboard'}
                      </h2>
                      <span className="text-xs text-gray-500 font-medium">Chapter {state.currentCourseIndex + 1} of {COURSE_CONTENT.length}</span>
                   </div>
                </div>

                <div className="flex items-center gap-4">
                   <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-black/20 rounded-full border border-white/40 shadow-sm text-sm text-gray-600 transition-colors">
                      <Search className="w-4 h-4 opacity-50" />
                      <span>Search...</span>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 border-2 border-white dark:border-white/10 shadow-md flex items-center justify-center">
                      <Bell className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                   </div>
                </div>
             </header>

             {/* CONTENT AREA */}
             <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-10 relative scrollbar-hide">
                 {state.role === UserRole.TEACHER ? (
                    <TeacherDashboard state={state} theme={currentTheme} />
                  ) : (
                    <div className="flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full min-h-[500px]">
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
                    </div>
                  )}
             </div>
        </main>

      </div>
    </div>
  );
};

const TeacherDashboard = ({ state, theme }: { state: AppState, theme: any }) => (
  <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="mb-8 flex items-end justify-between">
      <div>
        <h2 className="text-4xl font-extrabold mb-2 dark:text-white font-display tracking-tight">Student Mastery</h2>
        <p className="text-gray-500 dark:text-gray-400 font-sans text-base">Real-time analysis powered by Cullen.OS</p>
      </div>
      <div className="hidden md:block">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider border border-green-500/20 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Live Analysis
        </span>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Stat Cards with Glass/Clay Mix */}
      {[
        { title: "Band Score", val: "6.5", sub: "+0.5 vs Last Week", color: theme.colors.accent, icon: Book },
        { title: "Task Response", val: "7.0", sub: "Excellent adherence", color: "text-purple-500", icon: FileText },
        { title: "Completion", val: "42%", sub: "12 Lessons Remaining", color: "text-orange-500", icon: BarChart2 }
      ].map((stat, i) => (
         <div key={i} className={`
            relative p-8 rounded-3xl overflow-hidden group
            bg-white dark:bg-white/5 border border-black/5 dark:border-white/10
            shadow-xl shadow-black/5 hover:shadow-2xl transition-all hover:-translate-y-1
         `}>
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <stat.icon className="w-24 h-24" />
             </div>
             <div className="relative z-10">
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">{stat.title}</h3>
                <div className={`text-5xl font-extrabold ${stat.color} font-display mb-4`}>{stat.val}</div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.sub}</p>
             </div>
         </div>
      ))}
    </div>

    <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8 shadow-xl h-96 relative">
      <div className="relative z-10 h-full flex flex-col">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 flex items-center gap-2">
          Performance Metrics
        </h3>
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_STATS} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                stroke="#888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                fontFamily="Plus Jakarta Sans, sans-serif" 
                fontWeight={600}
                dy={15}
              />
              <YAxis 
                domain={[0, 9]} 
                stroke="#888" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                fontFamily="Plus Jakarta Sans, sans-serif" 
              />
              <Tooltip 
                cursor={{ fill: 'transparent' }}
                contentStyle={{ 
                  borderRadius: '16px', 
                  border: 'none', 
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  padding: '12px 16px',
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontSize: '13px',
                  color: '#000'
                }} 
              />
              <Bar 
                dataKey="score" 
                fill="url(#colorGradient)" 
                radius={[8, 8, 8, 8]} 
                barSize={60} 
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={theme.colors.primary.split(' ')[0].replace('bg-', '') || '#3b82f6'} stopOpacity={0.9}/>
                  <stop offset="100%" stopColor={theme.colors.primary.split(' ')[0].replace('bg-', '') || '#06b6d4'} stopOpacity={0.6}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
);

export default App;
