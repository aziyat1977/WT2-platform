
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, CheckCircle, Play, Star, BookOpen, ChevronRight, TrendingUp, Users, Target, Shield, Zap, Award } from 'lucide-react';

const LandingPage: React.FC<{ onEnter: () => void }> = ({ onEnter }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { width, height, left, top } = containerRef.current.getBoundingClientRect();
    // Calculate normalized mouse position (-1 to 1)
    const x = (e.clientX - left - width / 2) / (width / 2);
    const y = (e.clientY - top - height / 2) / (height / 2);
    setMousePosition({ x, y });
  };

  return (
    <div 
      className="relative w-screen h-screen overflow-x-hidden overflow-y-auto bg-[#030304] font-sans text-white selection:bg-orange-500/30"
      onMouseMove={handleMouseMove}
    >
      {/* --- CINEMATIC LIGHTING & ATMOSPHERE --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
         {/* Main Spotlight - Follows mouse slowly */}
         <div 
            className="absolute top-[-20%] right-[-10%] w-[1200px] h-[1200px] bg-gradient-to-b from-orange-500/10 to-transparent rounded-full blur-[150px] mix-blend-screen transition-transform duration-[2000ms] ease-out"
            style={{ transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)` }}
         />
         {/* Deep Space Fill */}
         <div className="absolute bottom-[-10%] left-[-20%] w-[1000px] h-[1000px] bg-indigo-950/30 rounded-full blur-[180px] mix-blend-screen" />
         
         {/* Cinematic Noise & Grain */}
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay" />
         
         {/* Horizon Grid */}
         <div className="absolute bottom-0 left-0 w-full h-[60vh] bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none transform perspective-[1000px] rotateX(60deg) origin-top" />
      </div>

      {/* --- HERO SECTION --- */}
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 pt-6 md:pt-12 min-h-screen flex flex-col md:flex-row items-center">
        
        {/* LEFT: CONTENT */}
        <div className="w-full md:w-5/12 flex flex-col gap-8 z-20 md:pr-12 pt-10 md:pt-0">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl shadow-lg shadow-orange-500/5 group cursor-default hover:bg-white/10 transition-colors">
                    <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75 duration-1000"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors">Cohort 5 Now Enrolling</span>
                </div>

                <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight leading-[1.05] mb-8 font-display">
                    The Ascent <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-100 via-orange-300 to-orange-500">
                        To Band 9.
                    </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed font-light border-l-2 border-orange-500/30 pl-6">
                    We've deconstructed the <span className="text-white font-medium">Cambridge Marking Criteria</span> into a step-by-step ladder. Stop jumping. Start climbing.
                </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
                <button 
                    onClick={onEnter}
                    className="relative overflow-hidden px-8 py-5 bg-orange-500 text-white font-bold text-lg rounded-2xl shadow-[0_0_50px_-10px_rgba(249,115,22,0.4)] transition-all transform hover:scale-[1.02] hover:shadow-[0_0_80px_-15px_rgba(249,115,22,0.6)] active:scale-[0.98] flex items-center justify-center gap-3 group"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 translate-x-[-150%] group-hover:animate-shine transition-all duration-1000" />
                    Start The Climb
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="px-8 py-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold text-lg rounded-2xl backdrop-blur-md transition-all flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 fill-current" /> Watch Trailer
                </button>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1.5, delay: 0.8 }}
               className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5"
            >
                <div className="flex flex-col gap-1">
                    <span className="text-3xl font-bold text-white">45,000+</span>
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Students Upgraded</span>
                </div>
                 <div className="flex flex-col gap-1">
                    <span className="text-3xl font-bold text-orange-400">8.0</span>
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Average Graduate Score</span>
                </div>
            </motion.div>
        </div>

        {/* RIGHT: THE 3D ASCENT VISUALIZATION */}
        <div className="w-full md:w-7/12 h-[700px] md:h-[1000px] relative perspective-container flex items-center justify-center pointer-events-none" ref={containerRef}>
            
            {/* 3D Scene Container */}
            <motion.div 
                className="relative preserve-3d transition-transform duration-1000 ease-out will-change-transform"
                style={{
                    transform: `rotateX(${10 - mousePosition.y * 2}deg) rotateY(${-20 + mousePosition.x * 2}deg)`
                }}
            >
                {/* The Central Pillar of Light */}
                <div className="absolute top-1/2 left-1/2 w-[2px] h-[1200px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-orange-400 via-orange-500/20 to-transparent blur-[1px]" />
                <div className="absolute top-1/2 left-1/2 w-[100px] h-[1200px] -translate-x-1/2 -translate-y-1/2 bg-orange-500/5 blur-[40px]" />

                {/* --- HELIX STRUCTURE & STEPS --- */}
                <HelixSteps />

                {/* --- FLOATING BAND MARKERS (5.5 to 9.0) --- */}
                {/* Y coordinates map to the helix height (-400 to 400 range approx) */}
                <BandMarker level="5.5" y={400} delay={0.1} color="text-gray-500" />
                <BandMarker level="6.0" y={300} delay={0.2} color="text-gray-400" />
                <BandMarker level="6.5" y={200} delay={0.3} color="text-blue-300" />
                <BandMarker level="7.0" y={100} delay={0.4} color="text-indigo-300" glow="shadow-indigo-500/20" />
                <BandMarker level="7.5" y={0} delay={0.5} color="text-purple-300" glow="shadow-purple-500/20" />
                <BandMarker level="8.0" y={-100} delay={0.6} color="text-orange-300" glow="shadow-orange-500/30" />
                <BandMarker level="8.5" y={-200} delay={0.7} color="text-orange-400" glow="shadow-orange-500/40" />
                <BandMarker level="9.0" y={-300} delay={0.8} color="text-yellow-400" glow="shadow-yellow-500/50" isSummit />

                {/* --- CLIMBING AVATAR --- */}
                <ClimbingAvatar />

            </motion.div>

            {/* Foreground Mist for Depth */}
            <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-[#030304] via-[#030304]/80 to-transparent z-20 pointer-events-none" />
        </div>
      </div>

      {/* --- FEATURE SECTION (Glass Cards) --- */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pb-24">
         <div className="mb-16 flex items-end justify-between">
            <div>
                <h2 className="text-4xl font-bold font-display tracking-tight text-white">Why the climb works.</h2>
                <p className="text-gray-500 mt-2 text-lg">Most students plateau at 6.5. Here is how we break the ceiling.</p>
            </div>
            <div className="hidden md:block h-[1px] flex-1 bg-white/10 ml-12 mb-4" />
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <BentoCard 
                title="Cognitive Mapping"
                subtitle="We don't teach 'phrases'. We teach logic patterns."
                icon={<Zap className="w-5 h-5 text-yellow-400" />}
                visual={<LogicMapVisual />}
                delay={0.1}
            />
            <BentoCard 
                title="Surgical Feedback"
                subtitle="AI identifies the exact sentence costing you 0.5 marks."
                icon={<Target className="w-5 h-5 text-red-400" />}
                visual={<FeedbackVisual />}
                delay={0.2}
            />
            <BentoCard 
                title="The Band 9 Library"
                subtitle="Access 50+ essays that actually scored 9.0 in real tests."
                icon={<BookOpen className="w-5 h-5 text-blue-400" />}
                visual={<LibraryVisual />}
                delay={0.3}
            />
         </div>
      </div>
    </div>
  );
};

// --- 3D COMPONENTS ---

const HelixSteps = () => {
    // We want to cover bands 5.5 to 9.0.
    // Let's create enough steps to span Y=450 down to Y=-350.
    // Total Height Range = 800px.
    // 64 steps gives us a dense, smooth spiral.
    const steps = Array.from({ length: 72 });
    const radius = 260; // Wider spiral
    const heightRange = 800;
    const startY = 400; // Bottom
    
    // Slower rotation per step
    const rotationPerStep = 20; 

    return (
        <motion.div
            animate={{ rotateY: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }} // ULTRA SLOW ROTATION
            className="absolute top-0 left-0 w-full h-full preserve-3d"
        >
            {steps.map((_, i) => {
                const y = startY - (i * (heightRange / steps.length));
                const rotateY = i * rotationPerStep;
                
                // Determine step color based on height (Band level)
                let stepColor = "bg-white/5 border-white/5";
                let glow = "";
                let width = "w-24";
                
                // Band 8.0+ Zone (Top)
                if (y < -80) {
                    stepColor = "bg-orange-500/30 border-orange-400/50";
                    glow = "shadow-[0_0_30px_rgba(249,115,22,0.2)]";
                    width = "w-32";
                } 
                // Band 7.0-7.5 Zone (Middle)
                else if (y < 120) {
                    stepColor = "bg-indigo-500/20 border-indigo-400/40";
                    glow = "shadow-[0_0_20px_rgba(99,102,241,0.1)]";
                    width = "w-28";
                }
                // Band 5.5-6.5 (Bottom)
                else {
                    stepColor = "bg-gray-500/10 border-gray-500/20";
                }

                return (
                    <div
                        key={i}
                        className="absolute top-1/2 left-1/2 preserve-3d flex items-center"
                        style={{
                            transform: `translateY(${y}px) rotateY(${rotateY}deg) translateZ(${radius}px)`
                        }}
                    >
                        {/* THE STEP BLOCK */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.02, duration: 0.8 }}
                            className={`
                                relative h-3 rounded-sm backdrop-blur-md border ${stepColor} ${glow} ${width}
                                transform -translate-y-1/2 origin-left transition-all duration-500
                                hover:bg-white/40
                            `}
                        >
                             {/* Gloss Shine */}
                             <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-50" />
                        </motion.div>

                        {/* Connection Line to Axis */}
                        <div className="absolute right-full top-1/2 h-[1px] w-[20px] bg-gradient-to-l from-white/10 to-transparent origin-right" />
                    </div>
                );
            })}
        </motion.div>
    );
};

const BandMarker = ({ level, y, color, glow, delay, isSummit }: any) => {
    return (
        <motion.div
            className="absolute top-1/2 left-1/2 preserve-3d flex items-center gap-6"
            // The marker sits OUTSIDE the rotating helix, but moves slightly for parallax
            style={{ transform: `translateY(${y}px) translateZ(340px)` }} 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: delay + 0.5, duration: 1, type: "spring" }}
        >
            {/* The Floating Label Plate */}
            <div className={`
                relative px-6 py-3 rounded-xl bg-[#030304]/80 backdrop-blur-xl border border-white/10 
                ${glow} shadow-2xl flex items-center gap-4 group cursor-pointer hover:border-white/30 transition-colors
            `}>
                <div className={`text-2xl font-black font-display tracking-tight ${color} group-hover:scale-110 transition-transform`}>{level}</div>
                
                {isSummit ? (
                     <div className="p-1.5 bg-yellow-500/20 rounded-full border border-yellow-500/50">
                        <Award className="w-5 h-5 text-yellow-400 fill-yellow-400 animate-pulse" />
                     </div>
                ) : (
                    <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white/50 transition-colors" />
                )}
                
                {/* Connecting Line Visual */}
                <div className="absolute top-1/2 right-full w-16 h-[1px] bg-gradient-to-r from-transparent to-white/20" />
            </div>
        </motion.div>
    );
};

const ClimbingAvatar = () => {
    return (
        <motion.div
            className="absolute top-1/2 left-1/2 preserve-3d"
            animate={{ rotateY: [0, -360] }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }} // Match Helix rotation speed but inverse direction relative to camera to seem like climbing? No, just match rotation.
        >
             <motion.div
                className="absolute w-0 h-0 preserve-3d"
                style={{ 
                    transform: 'translateZ(260px)' // Match helix radius
                }}
                animate={{ 
                    y: [400, -300], // Start 5.5, End 9.0
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }} // 30s to climb the mountain
            >
                {/* The Character */}
                <div className="relative -top-8 -left-4 group">
                     {/* Glow Aura */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-orange-500/20 rounded-full blur-xl animate-pulse" />
                     
                     {/* Body */}
                     <div className="relative w-8 h-12 bg-gradient-to-b from-white to-gray-200 rounded-full shadow-[0_0_25px_rgba(255,255,255,0.6)] flex items-center justify-center border border-white transition-transform group-hover:scale-110">
                        <div className="w-5 h-5 bg-orange-500 rounded-full mt-[-26px] shadow-sm border-2 border-white" /> {/* Head */}
                        {/* Backpack */}
                        <div className="absolute -right-2 top-2 w-4 h-6 bg-blue-500 rounded-md" />
                     </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- BENTO GRID COMPONENTS ---

const BentoCard = ({ title, subtitle, icon, visual, delay }: any) => (
    <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8, ease: "easeOut" }}
        className="group relative h-80 rounded-[2rem] bg-white/5 border border-white/5 overflow-hidden hover:border-white/10 hover:bg-white/[0.07] transition-all duration-500"
    >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-10" />
        
        {/* Content Top */}
        <div className="relative z-20 p-8">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 backdrop-blur-md shadow-lg group-hover:scale-110 transition-transform duration-500">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 font-display">{title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-[90%]">{subtitle}</p>
        </div>

        {/* Visual Bottom */}
        <div className="absolute inset-0 z-0 pt-24 group-hover:scale-105 transition-transform duration-700">
             {visual}
        </div>
    </motion.div>
);

const LogicMapVisual = () => (
    <div className="w-full h-full flex items-center justify-center opacity-40 group-hover:opacity-80 transition-opacity duration-500">
        <svg viewBox="0 0 200 150" className="w-full h-full drop-shadow-2xl">
            <defs>
                <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#F97316" />
                </linearGradient>
            </defs>
            <path d="M20,75 Q50,20 100,75 T180,75" fill="none" stroke="url(#gradient-line)" strokeWidth="3" strokeDasharray="6 4" className="animate-dash" />
            <circle cx="20" cy="75" r="6" fill="#60A5FA" stroke="#fff" strokeWidth="2" />
            <circle cx="100" cy="75" r="6" fill="#FBBF24" stroke="#fff" strokeWidth="2" />
            <circle cx="180" cy="75" r="6" fill="#F97316" stroke="#fff" strokeWidth="2" />
            
            {/* Logic Nodes */}
            <rect x="80" y="40" width="40" height="20" rx="4" fill="#FBBF24" fillOpacity="0.2" stroke="#FBBF24" />
            <rect x="150" y="90" width="40" height="20" rx="4" fill="#F97316" fillOpacity="0.2" stroke="#F97316" />
        </svg>
    </div>
);

const FeedbackVisual = () => (
    <div className="w-full h-full p-8 pt-24 relative">
        <div className="space-y-4 opacity-50 group-hover:opacity-90 transition-opacity duration-500">
            <div className="h-3 bg-gray-600 rounded-full w-full" />
            <div className="h-3 bg-gray-600 rounded-full w-5/6" />
            <div className="h-3 bg-red-500/50 rounded-full w-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]" /> {/* Error line */}
            <div className="h-3 bg-gray-600 rounded-full w-4/6" />
        </div>
        {/* Popover */}
        <div className="absolute top-32 right-8 bg-red-500 text-white text-xs font-bold p-3 rounded-xl shadow-2xl animate-bounce border border-white/20">
            Logic Gap Detected
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-red-500" />
        </div>
    </div>
);

const LibraryVisual = () => (
    <div className="w-full h-full flex gap-4 px-8 pt-12 transform perspective-500 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
         <div className="w-1/3 h-48 bg-blue-500/10 border border-blue-500/30 rounded-t-xl transform rotateX(10deg) translate-y-6" />
         <div className="w-1/3 h-48 bg-white/10 border border-white/30 rounded-t-xl transform rotateX(10deg) -translate-y-2 z-10 shadow-2xl relative group-hover:-translate-y-6 transition-transform duration-500">
             <div className="absolute top-3 right-3 w-6 h-6 bg-orange-500 rounded-full text-[10px] flex items-center justify-center font-bold text-black shadow-lg">9.0</div>
             <div className="absolute bottom-4 left-3 w-12 h-1 bg-white/30 rounded-full" />
             <div className="absolute bottom-7 left-3 w-8 h-1 bg-white/30 rounded-full" />
         </div>
         <div className="w-1/3 h-48 bg-blue-500/10 border border-blue-500/30 rounded-t-xl transform rotateX(10deg) translate-y-6" />
    </div>
);

export default LandingPage;
