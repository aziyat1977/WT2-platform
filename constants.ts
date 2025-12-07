
import { CourseItem, Personality } from './types';

export const PERSONALITY_THEMES = {
  [Personality.INTROVERT]: {
    id: 'introvert',
    label: "Focus Mode",
    description: "Minimalist. Calm. Deep work.",
    colors: {
      primary: "bg-slate-700",
      primaryGradient: "from-slate-700 to-slate-800",
      secondary: "bg-slate-50 dark:bg-slate-900/50",
      accent: "text-slate-500 dark:text-slate-400",
      button: "bg-slate-800 hover:bg-slate-700 text-white shadow-sm",
      buttonSecondary: "bg-transparent border border-slate-300 text-slate-600 hover:bg-slate-50",
      highlight: "bg-indigo-50 text-indigo-900 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-200 dark:border-indigo-800",
      feedbackCorrect: "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300",
      feedbackWrong: "bg-slate-50 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300"
    },
    ui: {
      roundness: "rounded-md",
      shadow: "shadow-sm",
      border: "border-gray-200 dark:border-gray-800",
      animation: { duration: 0.8, ease: "easeInOut" },
      feedbackIntro: "Analysis:",
      font: "font-mono"
    },
    particles: { count: 25, speed: 0.1, connect: false, opacity: 0.15, size: 1.5 }
  },
  [Personality.EXTROVERT]: {
    id: 'extrovert',
    label: "Power Mode",
    description: "High energy. Gamified. Social.",
    colors: {
      primary: "bg-fuchsia-600",
      primaryGradient: "from-fuchsia-600 to-orange-500",
      secondary: "bg-fuchsia-50 dark:bg-fuchsia-900/10",
      accent: "text-fuchsia-600 dark:text-fuchsia-400",
      button: "bg-gradient-to-r from-fuchsia-600 to-orange-500 hover:scale-105 text-white shadow-lg shadow-fuchsia-500/30",
      buttonSecondary: "bg-white text-fuchsia-600 border-2 border-fuchsia-100 hover:border-fuchsia-300",
      highlight: "bg-orange-50 text-orange-900 border-orange-200 dark:bg-orange-900/30 dark:text-orange-200",
      feedbackCorrect: "bg-green-100 text-green-900 border-green-400 dark:bg-green-900/40 dark:text-green-100 dark:border-green-600",
      feedbackWrong: "bg-red-100 text-red-900 border-red-400 dark:bg-red-900/40 dark:text-red-100 dark:border-red-600"
    },
    ui: {
      roundness: "rounded-3xl",
      shadow: "shadow-2xl",
      border: "border-transparent",
      animation: { type: "spring", stiffness: 300, damping: 15 },
      feedbackIntro: "Boom! 🎯",
      font: "font-sans"
    },
    particles: { count: 120, speed: 1.8, connect: true, connectDist: 180, opacity: 0.6, size: 3 }
  },
  [Personality.AMBIVERT]: {
    id: 'ambivert',
    label: "Balanced",
    description: "Professional. Structured. Clear.",
    colors: {
      primary: "bg-cyan-600",
      primaryGradient: "from-cyan-600 to-blue-600",
      secondary: "bg-cyan-50 dark:bg-cyan-900/10",
      accent: "text-cyan-600 dark:text-cyan-400",
      button: "bg-cyan-600 hover:bg-cyan-500 text-white shadow-md",
      buttonSecondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50",
      highlight: "bg-cyan-50 text-cyan-900 border-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-200 dark:border-cyan-800",
      feedbackCorrect: "bg-teal-50 text-teal-800 border-teal-200 dark:bg-teal-900/20 dark:text-teal-300",
      feedbackWrong: "bg-rose-50 text-rose-800 border-rose-200 dark:bg-rose-900/20 dark:text-rose-300"
    },
    ui: {
      roundness: "rounded-2xl",
      shadow: "shadow-xl",
      border: "border-gray-100 dark:border-gray-800",
      animation: { duration: 0.4, ease: "easeOut" },
      feedbackIntro: "Feedback:",
      font: "font-sans"
    },
    particles: { count: 60, speed: 0.5, connect: true, connectDist: 100, opacity: 0.3, size: 2 }
  }
};

export const COURSE_CONTENT: CourseItem[] = [
  // --- EXISTING INTRO (CONTEXT) ---
  {
    id: 'l1',
    type: 'lesson',
    title: "The 'Gap' in Your Writing",
    contentHTML: `
      <p class="mb-4 text-lg"><strong>The Problem:</strong> Most candidates have a "knowledge" of English that far exceeds their "skill" in using it. You know complex words, but you cannot use them precisely in an argument.</p>
      <p class="mb-4 text-lg"><strong>Pauline's Rule:</strong> <em>"It is impossible for anyone to begin to learn that which he thinks he already knows."</em></p>
      <div class="my-6 p-4 rounded-r-lg border-l-4 border-current opacity-90 italic">
        "If you are stuck at Band 6.5, it is not because you need 'better ideas'. It is because your message is not getting through clearly. You are forcing the examiner to do the work."
      </div>
    `,
    citation: "The Key to IELTS Success"
  },
  
  // --- LESSON 2: REASONING ---
  {
    id: 'l_2_2',
    type: 'lesson',
    title: "2.2 What makes a conclusion or an idea unclear?",
    contentHTML: `
      <h3 class="text-xl font-bold mb-4">Reasoning problems</h3>
      <p class="mb-4">An argument or idea can remain unclear even if the language used is accurate – although the language is clear, the reasoning is not.</p>
      <div class="bg-yellow-100 dark:bg-yellow-900/30 p-4 mb-4 border-l-4 border-yellow-400 text-gray-800 dark:text-gray-200 italic font-medium">
        The government should encourage everyone to eat more fruit.
      </div>
      <p class="mb-4">The reader needs to know <em>how</em> you know this or <em>why</em> you believe it. Avoid "invented facts" like BBC documentaries that don't explain the <em>reason</em>.</p>
    `,
    citation: "Page 1, Cullen Education"
  },

  // --- DRILLS ---
  {
    id: 'q_drill_1',
    type: 'quiz',
    question: "Analyze: 'It is very cloudy, so there could be a storm soon.' Is this valid?",
    options: [
      { id: 'a', text: "Valid Argument", correct: true, feedback: "Correct. The reason (very cloudy) supports the conclusion (storm soon)." },
      { id: 'b', text: "Invalid / Unclear", correct: false, feedback: "Incorrect. This is a clear, logical deduction." }
    ]
  },
  // ... (Previous lessons 3-16 assumed preserved) ...

  // --- LESSON 17: GUIDED TEST PRACTICE 5 ---
  {
    id: 'l_17_intro',
    type: 'lesson',
    title: "Lesson 17: Guided Test Practice 5",
    contentHTML: `
      <div class="bg-yellow-100 dark:bg-yellow-900/30 p-4 mb-4 border-l-4 border-yellow-500 font-serif">
        <strong>The Question:</strong><br/>
        Some people say that the best way to improve public health is by increasing the number of sports facilities. Others, however, say that this would have little effect on public health and that other measures are required.<br/>
        Discuss both views and give your own opinion.
      </div>

      <h3 class="text-xl font-bold mb-2">17.1 Thinking and planning</h3>
      <p class="mb-4">Higher level candidates are flexible enough to adapt their approach. Look at the key phrases:</p>
      <ul class="list-disc pl-5 mb-4 text-sm">
        <li>'the <strong>best</strong> way' (to deal with a problem)</li>
        <li>whether it would have '<strong>little effect</strong>'</li>
        <li>whether '<strong>other measures</strong>' are needed.</li>
      </ul>
      <p>Essentially, you are evaluating a proposed solution (Sports Facilities) vs Alternative Solutions.</p>
    `,
    citation: "Lesson 17, Page 7, Cullen Education"
  },

  // --- 17 PLANNER ---
  {
    id: 'l_17_planner',
    type: 'lesson',
    title: "Lesson 17 Planner",
    contentHTML: `
      <div class="border border-gray-300 bg-white dark:bg-gray-800 text-xs p-2 mb-4">
        <div class="mb-2 pb-2 border-b">
           <strong>Introduction:</strong> Public health needs to be improved (obesity?)<br/>
           <strong>Issue:</strong> Will adding sports facilities help? Is something else needed?<br/>
           <strong>My Position:</strong> Yes and Yes (Balanced).
        </div>
        <div class="grid grid-cols-2 gap-0 border border-gray-400 text-center">
            <div class="p-2 border-r border-gray-400 bg-red-50 dark:bg-red-900/10 text-left">
              <strong>Side A: Will sports facilities help?</strong><br/>
              1) Public health = many unhealthy (assumption: lack of facilities = cause)<br/>
              2) Adding more = help? No BEC people can exercise without special equipment.<br/>
              3) ∴ Lack of access is not the cause.
              <div class="mt-2 text-blue-600 font-bold border-t pt-1">Link: Will not solve problem alone</div>
            </div>
            <div class="p-2 bg-green-50 dark:bg-green-900/10 text-left">
              <strong>Side B: Other measures required?</strong><br/>
              1) Cause of problem? Unhealthy diet + stress + no time.<br/>
              2) ∴ Need to change attitude to work / diet.<br/>
              3) BUT not everyone can miss out on work.
              <div class="mt-2 text-blue-600 font-bold border-t pt-1">Link: There is no simple solution</div>
            </div>
        </div>
      </div>
    `,
    citation: "Page 9, Cullen Education"
  },

  // --- LESSON 17.2: CAUSE & EFFECT LANGUAGE ---
  {
    id: 'l_17_2_exercise',
    type: 'lesson',
    title: "17.2 Exercise: Connecting Ideas",
    contentHTML: `
      <p class="mb-4"><strong>Task:</strong> Select the correct extract to complete the paragraph. This tests your logic and coherence.</p>
      
      <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg text-sm font-serif leading-relaxed mb-6">
        "Adding sports facilities would certainly be an attractive idea to some. However, <strong>(1)</strong> _______. In reality, <strong>(2)</strong> _______. Among other key factors <strong>(3)</strong> _______. Furthermore, <strong>(4)</strong> _______. Thus, <strong>(5)</strong> _______."
      </div>

      <div class="grid grid-cols-1 gap-2 text-sm">
        <div class="p-2 border border-gray-300 rounded"><strong>A.</strong> sophisticated equipment is not essential for getting fit</div>
        <div class="p-2 border border-gray-300 rounded"><strong>B.</strong> if a lack of facilities is not responsible... simply adding more will not solve them.</div>
        <div class="p-2 border border-gray-300 rounded"><strong>C.</strong> many public health issues occur due to a combination of factors...</div>
        <div class="p-2 border border-gray-300 rounded"><strong>D.</strong> this proposal does assume that the main reason people are unhealthy is that they lack access...</div>
        <div class="p-2 border border-gray-300 rounded"><strong>E.</strong> are poor diet, work stress, and a lack of time...</div>
      </div>
      <p class="mt-4 italic text-sm">Review the logic carefully. See the Model Answer next for the solution.</p>
    `,
    citation: "Page 1-2, Cullen Education"
  },

  // --- LESSON 17 MODEL ANSWER ---
  {
    id: 'l_17_model',
    type: 'lesson',
    title: "Lesson 17 Model Answer (Public Health)",
    contentHTML: `
      <div class="bg-white dark:bg-gray-800 p-6 shadow-md border-l-4 border-blue-600 leading-relaxed text-gray-800 dark:text-gray-200 text-sm font-serif">
        <p class="mb-4">Public health is a growing concern, with many countries reporting increasing levels of obesity. Some believe the problem can be addressed by adding more sports facilities, while others think this may not be enough. A closer look at the problem will help in assessing these views.</p>
        
        <p class="mb-4">Adding sports facilities would certainly be an attractive idea to some. However, <strong>(D) this proposal does assume that the main reason people are unhealthy is that they lack access to such facilities</strong>. In reality, <strong>(A) sophisticated equipment is not essential for getting fit; walking or running in the streets would also achieve this</strong>. Thus, <strong>(B) if a lack of facilities is not responsible for current health problems, simply adding more will not solve them</strong>.</p>
        
        <p class="mb-4">Clearly, other measures are required to improve public health. If people lack the time to take care of themselves, then we need to find a way to address this. The issue of diet can be tackled by persuading people to cook nutritious meals themselves rather than choosing a faster alternative. Nevertheless, these solutions will take time and, for those who cannot reduce their working hours, are likely to be ineffective. Seemingly, when it comes to solving complex health problems, there is no simple solution.</p>
        
        <p class="mb-4">In conclusion, in my view, giving time-poor people greater access to sports facilities will not be effective and is too simplistic a solution. Other measures are clearly required, but any action taken to improve public health requires a change in lifestyle, and this needs the cooperation of everyone involved. (337 words)</p>
      </div>
    `,
    citation: "Page 3, Cullen Education"
  },

  // --- 17.3 POSITIVE OR NEGATIVE ---
  {
    id: 'l_17_3',
    type: 'lesson',
    title: "17.3 Variation: Positive or Negative?",
    contentHTML: `
      <div class="bg-yellow-100 dark:bg-yellow-900/30 p-4 mb-4 border-l-4 border-yellow-500 font-serif text-sm">
        "In some places, fast food, prepared meals, and sugary drinks are now sold in more shops and at lower prices than in the past.<br/>
        <strong>Do you think this is a positive or a negative development?</strong>"
      </div>
      
      <p class="mb-4">This asks for an evaluation of a change. You can still use the <strong>Cause and Effect</strong> language.</p>
      <p class="mb-4"><strong>Key Idea:</strong> Identify the change. <em>Is it better or worse that fast food is cheaper/easier to buy?</em></p>
      
      <div class="bg-white dark:bg-gray-800 p-4 border border-gray-200 rounded text-sm mb-4">
        <p class="mb-2"><strong>Perspective Example:</strong></p>
        <p class="italic">"This trend has had such a negative effect in my country that it is impossible to imagine that it has had a positive effect anywhere else in the world."</p>
      </div>
    `,
    citation: "Page 4-5, Cullen Education"
  },

  // --- MODEL ANSWER 2 (COMMUNITY SERVICE) ---
  {
    id: 'l_16_model_2',
    type: 'lesson',
    title: "Model Answer: Community Service",
    contentHTML: `
      <div class="bg-white dark:bg-gray-800 p-6 shadow-md border-l-4 border-blue-600 leading-relaxed text-gray-800 dark:text-gray-200 text-sm font-serif">
        <p class="mb-4">Community service is a useful way of helping in areas where the local government is unable to. However, as it is unpaid, the idea is often not very appealing to young people. This causes several problems, and it is important to find an effective solution.</p>
        <p class="mb-4">Community service and charitable programmes generally help to take care of the most vulnerable in society. This can mean providing food and care for the poor, the homeless, or the elderly...</p>
        <p class="mb-4">There are several ways to approach this problem. The first, and perhaps most obvious, is to make community service compulsory for all high school students...</p>
        <p class="mb-4">In conclusion, community service is an important part of any society and everyone suffers if it fails. In my view, the best way to encourage young people to get involved is to offer good incentives, and to show just how important it is to everyone. (333 words)</p>
      </div>
    `,
    citation: "Page 6, Cullen Education"
  },

  // --- LESSON 18: ABSTRACT TOPICS ---
  {
    id: 'l_18_intro',
    type: 'lesson',
    title: "Lesson 18: Abstract Topics (Languages)",
    contentHTML: `
      <div class="bg-yellow-100 dark:bg-yellow-900/30 p-4 mb-4 border-l-4 border-yellow-500 font-serif">
        <strong>The Question:</strong><br/>
        Every year, several languages die out. Some people think that this is not important because life will be easier if there are fewer languages in the world.<br/>
        To what extent do you agree or disagree?
      </div>

      <h3 class="text-xl font-bold mb-2">18.1 More abstract topics</h3>
      <p class="mb-4"><strong>The Trap:</strong> Many candidates focus on "learning a new language" (concrete) rather than "languages dying out" (abstract). Ensure you address the <em>loss</em> of languages.</p>
      
      <p class="mb-4"><strong>Thinking Strategy:</strong></p>
      <div class="flex items-center gap-2 text-sm justify-center mb-6">
        <div class="p-2 border rounded bg-blue-50 dark:bg-blue-900/20">Me</div>
        <span>&rarr;</span>
        <div class="p-2 border rounded bg-blue-50 dark:bg-blue-900/20">Family</div>
        <span>&rarr;</span>
        <div class="p-2 border rounded bg-blue-50 dark:bg-blue-900/20">Community</div>
        <span>&rarr;</span>
        <div class="p-2 border rounded bg-blue-50 dark:bg-blue-900/20">Country</div>
        <span>&rarr;</span>
        <div class="p-2 border rounded bg-blue-50 dark:bg-blue-900/20">World</div>
      </div>
    `,
    citation: "Page 8-9, Cullen Education"
  },

  // --- 18.2 MODEL ANSWER ---
  {
    id: 'l_18_model',
    type: 'lesson',
    title: "Lesson 18 Model Answer",
    contentHTML: `
      <div class="bg-white dark:bg-gray-800 p-6 shadow-md border-l-4 border-blue-600 leading-relaxed text-gray-800 dark:text-gray-200 text-sm font-serif">
        <p class="mb-4">In some parts of the world, native languages are being lost as the world develops and evolves. Some believe that this is unimportant and even see it as an advantage. This essay will discuss whether the loss of languages should be cause for concern.</p>
        
        <p class="mb-4">Certain aspects of everyday life are made easier through sharing a common language. First and foremost, business transactions are much simpler when the two parties concerned can understand each other well... Thanks to globalization, these types of communication are increasing... Thus, sadly, the need to make life simpler makes the loss of some languages inevitable.</p>
        
        <p class="mb-4">Nevertheless, language has a multitude of uses that go far beyond tourism and business communication. Firstly, our native tongue is used to express our deepest feelings and emotions. These are much more difficult to convey when using a second language. Language also plays an important part in our culture and identity... This must be an enormous loss for the people concerned.</p>
        
        <p class="mb-4">In conclusion, while it is true that having fewer languages benefits the world of business... I completely disagree with the view that the continued loss of languages is unimportant. (321 words)</p>
      </div>
    `,
    citation: "Page 11, Cullen Education"
  },

  // --- LESSON 19: REVIEW ---
  {
    id: 'l_19_review',
    type: 'lesson',
    title: "Lesson 19: Overview and Review",
    contentHTML: `
      <h3 class="text-xl font-bold mb-4">19.3 Reviewing Checklist</h3>
      
      <div class="space-y-4 text-sm">
        <div class="bg-green-50 dark:bg-green-900/20 p-4 rounded border-l-4 border-green-500">
            <strong>Introduction:</strong>
            <ul class="list-disc pl-5 mt-2">
                <li>General statement to introduce topic/context?</li>
                <li>Summarised main issue?</li>
                <li>Brief thesis statement (optional)?</li>
            </ul>
        </div>
        <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded border-l-4 border-blue-500">
            <strong>Body Paragraphs:</strong>
            <ul class="list-disc pl-5 mt-2">
                <li>Clear central topic?</li>
                <li>Supporting evidence for your ideas?</li>
                <li>Link or relevance to the question clear?</li>
            </ul>
        </div>
        <div class="bg-purple-50 dark:bg-purple-900/20 p-4 rounded border-l-4 border-purple-500">
            <strong>Conclusion:</strong>
            <ul class="list-disc pl-5 mt-2">
                <li>Summarised main ideas?</li>
                <li>Answered the question?</li>
                <li>Clear overall position?</li>
                <li>NO new ideas?</li>
            </ul>
        </div>
      </div>
    `,
    citation: "Page 14-16, Cullen Education"
  },

  // --- LESSON 20: TIMED PRACTICE ---
  {
    id: 'l_20_intro',
    type: 'lesson',
    title: "Lesson 20: Timed Test Practice",
    contentHTML: `
      <p class="mb-4">Complete each essay under exam conditions. Use the <strong>Think-Plan-Write-Check</strong> approach.</p>
      
      <div class="overflow-x-auto mb-6">
        <table class="w-full text-sm border text-left">
            <thead class="bg-gray-100 dark:bg-gray-800 font-bold">
                <tr><th class="p-2 border">Step</th><th class="p-2 border">Time</th></tr>
            </thead>
            <tbody>
                <tr><td class="p-2 border">Think</td><td class="p-2 border">1-2 mins</td></tr>
                <tr><td class="p-2 border">Plan</td><td class="p-2 border">7-8 mins</td></tr>
                <tr><td class="p-2 border">Write</td><td class="p-2 border">18-20 mins</td></tr>
                <tr><td class="p-2 border">Check</td><td class="p-2 border">10 mins</td></tr>
            </tbody>
        </table>
      </div>
      
      <div class="bg-cyan-50 dark:bg-cyan-900/20 p-4 rounded border-l-4 border-cyan-500">
        <strong>Key Idea:</strong> I wish you all the very best of luck with your test!
      </div>
    `,
    citation: "Page 17, Cullen Education"
  },

  // --- TEST 1 MODEL ---
  {
    id: 'l_20_test1',
    type: 'lesson',
    title: "Test 1 Model: Famous People",
    contentHTML: `
      <div class="bg-yellow-100 dark:bg-yellow-900/30 p-4 mb-4 border-l-4 border-yellow-500 font-serif text-sm">
        "Some young people like to copy the behaviour and clothes of famous people. Why might this be the case? What problems might it cause?"
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 shadow-md border-l-4 border-blue-600 leading-relaxed text-gray-800 dark:text-gray-200 text-sm font-serif">
        <p class="mb-4">Each generation has its own stars and fashion icons. The young often look up to these people and like to copy their style. This essay will consider the reasons for this and the problems it may cause...</p>
        <p class="mb-4">There are several reasons why young people aspire to be like the popular stars of their day. Firstly, the trend tends to happen when children are developing into young adults... Some have an innate sense of self-confidence...</p>
        <p class="mb-4">Nevertheless, this phenomenon can create problems. The famous like to stand out... Attempts to copy this can be unorthodox. Especially if the young people concerned come from a very conservative background...</p>
        <p class="mb-4">In conclusion, wanting to be like their heroes is a normal part of development... (296 words)</p>
      </div>
    `,
    citation: "Page 20, Cullen Education"
  },

  // --- TEST 2 MODEL ---
  {
    id: 'l_20_test2',
    type: 'lesson',
    title: "Test 2 Model: Children Helping",
    contentHTML: `
      <div class="bg-yellow-100 dark:bg-yellow-900/30 p-4 mb-4 border-l-4 border-yellow-500 font-serif text-sm">
        "Some people believe that children of all ages should have extra responsibilities (e.g. helping at home). Others believe... free to enjoy life. Discuss both views."
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 shadow-md border-l-4 border-blue-600 leading-relaxed text-gray-800 dark:text-gray-200 text-sm font-serif">
        <p class="mb-4">Children are constantly learning and developing. Some people believe this should include learning how to work and be responsible, while others disagree. There are pros and cons to both views.</p>
        <p class="mb-4">Some children have no responsibilities within the home when their school day is over... As a result, they are more likely to develop into adults who are very relaxed about life. However... they may become bored and lack self-discipline.</p>
        <p class="mb-4">In contrast, children who are given responsibility from an early age would develop in a very different way... helping in a family restaurant or shop... surely learn a great deal about life. However... can miss out on education...</p>
        <p class="mb-4">In my view, there are benefits to both approaches. It is important for all children to know how to relax and enjoy life, but also to balance this with a healthy work-life balance. (299 words)</p>
      </div>
    `,
    citation: "Page 21, Cullen Education"
  },

  // --- TEST 3 MODEL ---
  {
    id: 'l_20_test3',
    type: 'lesson',
    title: "Test 3 Model: Sports Stars",
    contentHTML: `
      <div class="bg-yellow-100 dark:bg-yellow-900/30 p-4 mb-4 border-l-4 border-yellow-500 font-serif text-sm">
        "Nowadays, sports stars can earn a great deal of money... What problems might this cause? Do you think this is a positive or negative development?"
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 shadow-md border-l-4 border-blue-600 leading-relaxed text-gray-800 dark:text-gray-200 text-sm font-serif">
        <p class="mb-4">Sports and advertising are now very closely linked. Thus, when we think of famous sports stars, we often inevitably think of the brand of clothing they wear. This can cause problems but also has a positive effect.</p>
        <p class="mb-4">Once they reach a certain level, sports stars or teams are offered generous sponsorship deals... This means that they receive large sums of money... However, the most popular sports are associated with advertisements for betting and gambling...</p>
        <p class="mb-4">On the other hand, there are several positive effects. Firstly, without advertising, it is unlikely that we would have the level of sport that exists today... Secondly, this inspires young people...</p>
        <p class="mb-4">In conclusion, advertising sponsorships allow sports people and sport itself to thrive. Although the type of products... need regulation... I believe this is a positive development. (291 words)</p>
      </div>
    `,
    citation: "Page 23, Cullen Education"
  },

  // --- TEST 4 MODEL ---
  {
    id: 'l_20_test4',
    type: 'lesson',
    title: "Test 4 Model: Work Stress",
    contentHTML: `
      <div class="bg-yellow-100 dark:bg-yellow-900/30 p-4 mb-4 border-l-4 border-yellow-500 font-serif text-sm">
        "Working long hours causes a great deal of stress... The government must find a way to reduce this type of stress. To what extent do you agree or disagree?"
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 shadow-md border-l-4 border-blue-600 leading-relaxed text-gray-800 dark:text-gray-200 text-sm font-serif">
        <p class="mb-4">Stress from overwork is a key factor in public health. Some believe the government should do something about this. This essay will discuss whether this type of intervention is necessary.</p>
        <p class="mb-4">Longer working hours and higher levels of stress are caused by a combination of factors. Firstly, there is now greater competition for jobs... Secondly, developments in mobile technology have created an expectation that employees are available 24/7...</p>
        <p class="mb-4">While working conditions have changed enormously, in many countries, employment regulations have not. Some people may argue that the government can do little to help. However, several countries have already managed to address these problems. For example, restricting the working week to 4 days.</p>
        <p class="mb-4">In conclusion, much of the stress now felt by workers comes from the faster pace of life... and companies should help... and governments should act on this change. (307 words)</p>
      </div>
    `,
    citation: "Page 24, Cullen Education"
  },

  // --- TEST 5 MODEL ---
  {
    id: 'l_20_test5',
    type: 'lesson',
    title: "Test 5 Model: Zoos",
    contentHTML: `
      <div class="bg-yellow-100 dark:bg-yellow-900/30 p-4 mb-4 border-l-4 border-yellow-500 font-serif text-sm">
        "Some experts believe it is better for animals to live in zoos where they are safe... Do you think that living in zoos has more advantages or more disadvantages?"
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 shadow-md border-l-4 border-blue-600 leading-relaxed text-gray-800 dark:text-gray-200 text-sm font-serif">
        <p class="mb-4">Large zoos can be found in most parts of the world. Many thought not all, are established to take care of animals. This can have both advantages and disadvantages...</p>
        <p class="mb-4">Zoos can have clear benefits for animals. Firstly, they are given food, shelter, and protection. The need for these is growing due to urban development... In addition, protection is needed from poachers...</p>
        <p class="mb-4">Nevertheless, there are also disadvantages. Although the best animal parks try to replicate the natural habitat... they cannot achieve this for larger creatures... The situation is far worse in smaller facilities...</p>
        <p class="mb-4">In conclusion, zoos clearly offer much-needed protection from human threats. However, the disadvantages of living in captivity for species that are not endangered must surely be greater. (308 words)</p>
      </div>
    `,
    citation: "Page 26, Cullen Education"
  },

  // --- TEST 6 MODEL ---
  {
    id: 'l_20_test6',
    type: 'lesson',
    title: "Test 6 Model: Online Shopping",
    contentHTML: `
      <div class="bg-yellow-100 dark:bg-yellow-900/30 p-4 mb-4 border-l-4 border-yellow-500 font-serif text-sm">
        "In some countries, more and more local shops are closing down because so many people now shop online. What problems might this cause? What is the best way to deal with this problem?"
      </div>
      <div class="bg-white dark:bg-gray-800 p-6 shadow-md border-l-4 border-blue-600 leading-relaxed text-gray-800 dark:text-gray-200 text-sm font-serif">
        <p class="mb-4">Small shops provide an important service to the local community. However, online shopping is forcing many to close. This causes problems that need to be addressed.</p>
        <p class="mb-4">The issues surrounding online shopping are complex. In the past, when people needed to buy something, they would wait to visit a shop... Nowadays, we can buy almost anything we want... However, if we only visit our local high streets now and again, smaller businesses that rely on regular trade will not survive...</p>
        <p class="mb-4">Nevertheless, there are several possible solutions. Firstly, the smaller shops could adapt and offer an online service to their customers... In addition, the public need to take some responsibility and adopt a more community minded and environmentally aware approach...</p>
        <p class="mb-4">In conclusion, evolution has shown the benefits of adapting to change, and this is the best way for local shops to survive. Nevertheless, shoppers also need to stop searching online for cheaper, easier options. (299 words)</p>
      </div>
    `,
    citation: "Page 27, Cullen Education"
  }
];

export const MOCK_STATS = [
  { name: 'Task Response', score: 6.5 },
  { name: 'Coherence', score: 6.0 },
  { name: 'Lexical', score: 7.0 },
  { name: 'Grammar', score: 6.5 },
];
