import React, { useState, useEffect, useRef } from 'react';
import ProjectsSection from './projects'; 
const TechIcon = ({ name, src, index }) => {
    const [isVisible, setIsVisible] = useState(false);
    const iconRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.3 }
      );

      if (iconRef.current) {
        observer.observe(iconRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div 
        ref={iconRef}
        className={`group relative p-4 bg-[#161412] border border-[#5a473a] border-opacity-30 rounded-lg hover:border-[#c7bdb1] hover:border-opacity-80 transition-all duration-500 transform hover:scale-105 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#5a473a] to-[#c7bdb1] opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg" />
        <div className="relative flex flex-col items-center gap-3">
          <div className="w-12 h-12 flex items-center justify-center">
            <img 
              src={src} 
              alt={name}
              className="w-full h-full object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300"
            />
          </div>
          <span className="text-[#c7bdb1] text-sm font-medium text-center group-hover:text-[#ffffff] transition-colors duration-300">
            {name}
          </span>
        </div>
      </div>
    );
  };

  
const ProjectsWrapper = () => {
    const [isVisible, setIsVisible] = useState(false);
    const projectsRef = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        },
        { threshold: 0.1 }
      );

      if (projectsRef.current) {
        observer.observe(projectsRef.current);
      }

      return () => observer.disconnect();
    }, []);

    return (
      <div 
        ref={projectsRef}
        className={`transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-20'
        }`}
      >
        <div className="relative">
    
          <div className="relative py-32">
            <AnimatedLines />
            <div className="max-w-6xl mx-auto px-8 lg:px-16">
              <div className="text-center">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#c7bdb1] to-transparent mb-12" />
                <div className="text-[#c7bdb1] text-lg font-medium tracking-wider uppercase mb-8">
                  Portfolio Showcase
                </div>
                <h1 className="text-6xl lg:text-8xl font-bold text-[#ffffff] mb-8 leading-tight">
                  <GlitchText>MY WORK</GlitchText>
                </h1>
                <p className="text-[#ddd9d6] text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-12">
                  Explore my portfolio of innovative projects spanning web development, AI/ML applications, and automation solutions
                </p>
                <div className="flex justify-center items-center gap-4 mb-16">
                  <div className="w-32 h-px bg-gradient-to-r from-transparent to-[#c7bdb1]" />
                  <div className="w-4 h-4 bg-[#c7bdb1] rotate-45" />
                  <div className="w-32 h-px bg-gradient-to-l from-transparent to-[#c7bdb1]" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0f0d0b] p-12 rounded-xl mx-8 border border-[#5a473a] border-opacity-30">
            <div className="text-center text-[#c7bdb1]">
              <ProjectsSection/>
            </div>
          </div>
        </div>
      </div>
    );
  };

const GlitchText = ({ children, className = "" }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      <span className={`relative z-10 transition-all duration-300 ${isGlitching ? 'text-[#ffffff]' : ''}`}>
        {children}
      </span>
      {isGlitching && (
        <>
          <span className="absolute top-0 left-0 text-red-500 animate-pulse opacity-80 transform translate-x-0.5 -translate-y-0.5">
            {children}
          </span>
          <span className="absolute top-0 left-0 text-blue-500 animate-pulse opacity-60 transform -translate-x-0.5 translate-y-0.5">
            {children}
          </span>
          <span className="absolute top-0 left-0 text-green-500 animate-pulse opacity-40 transform translate-x-1 translate-y-1">
            {children}
          </span>
        </>
      )}
    </div>
  );
};

const AnimatedDots = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-gradient-to-r from-[#5a473a] to-[#c7bdb1] rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

const AnimatedLines = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute h-px bg-gradient-to-r from-transparent via-[#5a473a] to-transparent opacity-40"
        style={{
          width: '200px',
          top: '20%',
          left: '-200px',
          animation: 'slideRight 8s linear infinite'
        }}
      />
      <div 
        className="absolute w-px bg-gradient-to-b from-transparent via-[#c7bdb1] to-transparent opacity-60"
        style={{
          height: '150px',
          top: '-150px',
          right: '30%',
          animation: 'slideDown 6s linear infinite'
        }}
      />
    </div>
  );
};

const TerminalAchievements = () => {
  const [currentInput, setCurrentInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [discoveredAchievements, setDiscoveredAchievements] = useState(new Set());
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const achievements = {
    'hack': {
      title: "Track Winner at Amplicode Hackathon 2025",
      description: "Won the track competition in a competitive hackathon environment. Created an innovative test generator using RAG and Llama 3.0 via Groq API with FAISS for vector search, demonstrating cutting-edge AI integration.",
      secret: "You discovered my hackathon victory with AI innovation!"
    },
    'idea': {
      title: "1st Prize in Technovate For India Ideathon by Times Of India",
      description: "Developed an AI platform connecting unskilled laborers to jobs, freelance work, skill courses, and career support with multi-language features.",
      secret: "You found my ideathon triumph!"
    },
    'code': {
      title: "Top 60 Position in AIT Pune Coding Contest",
      description: "Secured top 60 position out of 500+ participants in a competitive coding contest, demonstrating strong algorithmic skills under time constraints.",
      secret: "You uncovered my coding contest achievement!"
    },
    'academic': {
      title: "Top 20% Students in CSE Department",
      description: "Among the top 20% students in Computer Science and Engineering department of IIIT Naya Raipur with CGPA of 8.68/10.0.",
      secret: "You revealed my academic excellence!"
    },
    'competitive': {
      title: "Codeforces Specialist Rank",
      description: "Achieved Specialist rank on Codeforces with a maximum rating of 1508, showcasing competitive programming skills.",
      details: "Max Rating: 1508",
      secret: "You found my competitive programming prowess!"
    }
  };

  const commands = {
    'help': () => "Available commands: help, clear, ls, whoami, achievements, hint\n\nTo unlock achievements, try these keywords:\n• 'hack' - for hackathon victories\n• 'idea' - for innovation challenges\n• 'code' - for programming contests\n• 'academic' - for educational achievements\n• 'competitive' - for coding platforms",
    'clear': () => { setTerminalHistory([]); return ''; },
    'ls': () => "achievements/  skills/  projects/  experience/",
    'whoami': () => "A passionate developer and problem solver specializing in AI/ML and full-stack development",
    'achievements': () => `ACHIEVEMENT KEYWORDS - Type these to unlock:\n\n[1] hack      - Discover hackathon victories\n[2] idea      - Reveal innovation challenges\n[3] code      - Uncover programming contests\n[4] academic  - Show educational excellence\n[5] competitive - Display coding achievements\n\nType any keyword above to unlock the corresponding achievement!`,
    'hint': () => {
      const remaining = 5 - discoveredAchievements.size;
      if (remaining === 5) {
        return "HINT: Start with 'hack' to discover my latest hackathon victory!\nOr try: idea | code | academic | competitive";
      } else if (remaining > 0) {
        const found = Array.from(discoveredAchievements);
        const all = ['hack', 'idea', 'code', 'academic', 'competitive'];
        const remaining_keys = all.filter(key => !found.includes(key));
        return `Progress: ${discoveredAchievements.size}/5 achievements unlocked!\nRemaining keywords: ${remaining_keys.join(' | ')}`;
      } else {
        return "Congratulations! You've unlocked all achievements!\nType 'clear' to restart or explore with other commands.";
      }
    }
  };

  const typeWriter = (text, callback) => {
    setIsTyping(true);
    setTerminalHistory(prev => {
      const newHistory = [...prev];
      if (newHistory.length > 0) {
        newHistory[newHistory.length - 1] = {
          ...newHistory[newHistory.length - 1],
          output: text
        };
      }
      return newHistory;
    });
    setIsTyping(false);
    if (callback) callback();
  };

  const handleCommand = (input) => {
    const trimmedInput = input.trim().toLowerCase();

    setTerminalHistory(prev => [...prev, { 
      type: 'command', 
      text: `$ ${input}`,
      output: ''
    }]);

    setTimeout(() => {
      let output = '';
      
      if (achievements[trimmedInput]) {
        const achievement = achievements[trimmedInput];
        if (!discoveredAchievements.has(trimmedInput)) {
          setDiscoveredAchievements(prev => new Set([...prev, trimmedInput]));
          output = `ACHIEVEMENT UNLOCKED!\n\n${achievement.title}\n\n${achievement.description}${achievement.details ? `\n\n${achievement.details}` : ''}\n\n${achievement.secret}`;
        } else {
          output = `Achievement already discovered: ${achievement.title}`;
        }
      } else if (commands[trimmedInput]) {
        const result = commands[trimmedInput]();
        if (result !== '') {
          output = result;
        }
      } else if (trimmedInput === '') {
        return;
      } else {
        output = `Command not found: ${input}\nType 'help' for available commands or try achievement keywords!`;
      }

      if (output) {
        setTerminalHistory(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = {
            ...newHistory[newHistory.length - 1],
            output: ''
          };
          return newHistory;
        });
        
        typeWriter(output);
      }
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  useEffect(() => {

    setTimeout(() => {
      setTerminalHistory([{
        type: 'system',
        text: 'Welcome to Achievement Terminal v1.0',
        output: "Type 'help' to get started or try discovering achievement keywords!\nHint: Think about competitions, academics, and coding..."
      }]);
    }, 500);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  
  const [activeSection, setActiveSection] = useState('achievements');

  const techStack = [
    { name: 'Python', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'JavaScript', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'React', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Next.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Node.js', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Express', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'MongoDB', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    { name: 'MySQL', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
    { name: 'TensorFlow', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
    { name: 'PyTorch', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
    { name: 'Firebase', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
    { name: 'Docker', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
    { name: 'Git', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'GitHub', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
    { name: 'HTML5', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'C++', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'Flask', src: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        
        @keyframes slideRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(100vw + 200px)); }
        }
        
        @keyframes slideDown {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(100vh + 150px)); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .terminal-cursor {
          animation: blink 1s infinite;
        }
      `}</style>
      
      <div className="relative bg-[#161412] min-h-screen py-20" id="achievements">
        <AnimatedLines />
        <AnimatedDots />
        
        <div className="max-w-6xl mx-auto px-8 lg:px-16">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="text-[#c7bdb1] text-sm font-medium tracking-wider uppercase mb-4">
              Interactive Experience
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-[#ffffff] mb-6">
              <GlitchText>Achievement Terminal</GlitchText>
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-[#c7bdb1] to-transparent mx-auto mb-8" />
            
            {/* Section Toggle */}
            <div className="flex justify-center gap-4 mb-12">
              <button
                onClick={() => setActiveSection('achievements')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === 'achievements'
                    ? 'bg-[#c7bdb1] text-[#161412]'
                    : 'border border-[#c7bdb1] text-[#c7bdb1] hover:bg-[#c7bdb1] hover:text-[#161412]'
                }`}
              >
                Terminal Challenge
              </button>
              <button
                onClick={() => setActiveSection('tech')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeSection === 'tech'
                    ? 'bg-[#c7bdb1] text-[#161412]'
                    : 'border border-[#c7bdb1] text-[#c7bdb1] hover:bg-[#c7bdb1] hover:text-[#161412]'
                }`}
              >
                Tech Stack
              </button>
            </div>
          </div>

          {/* Terminal Section */}
          {activeSection === 'achievements' && (
            <div className="mb-16">
              <div className="bg-[#0f0d0b] border border-[#5a473a] border-opacity-50 rounded-lg overflow-hidden">
                {/* Terminal Header */}
                <div className="bg-[#5a473a] bg-opacity-20 px-4 py-3 border-b border-[#5a473a] border-opacity-30 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full opacity-60"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full opacity-60"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full opacity-60"></div>
                  </div>
                  <div className="text-[#c7bdb1] text-sm ml-4 font-mono">
                    achievement-hunter@portfolio:~$
                  </div>
                  <div className="ml-auto text-[#c7bdb1] text-xs">
                    {discoveredAchievements.size}/5 achievements unlocked
                  </div>
                </div>
                
                {/* Terminal Content */}
                <div 
                  ref={terminalRef}
                  className="p-6 h-96 overflow-y-auto font-mono text-sm bg-[#0f0d0b]"
                  onClick={() => inputRef.current?.focus()}
                >
                  {terminalHistory.map((entry, index) => (
                    <div key={index} className="mb-2">
                      {entry.type === 'command' && (
                        <div className="text-[#c7bdb1]">{entry.text}</div>
                      )}
                      {entry.type === 'system' && (
                        <div className="text-[#5a473a] mb-2">{entry.text}</div>
                      )}
                      {entry.output && (
                        <div className="text-[#ffffff] whitespace-pre-line pl-2 border-l-2 border-[#5a473a] ml-2 mt-1">
                          {entry.output}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {/* Current Input Line */}
                  <div className="flex items-center text-[#c7bdb1]">
                    <span className="mr-2">$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 bg-transparent outline-none text-[#ffffff]"
                      disabled={isTyping}
                      placeholder={isTyping ? "" : "Try: hack | idea | code | academic | competitive"}
                      autoFocus
                    />
                    <span className="terminal-cursor text-[#c7bdb1]">|</span>
                  </div>
                </div>
              </div>
              
              {/* Achievement Progress */}
              <div className="mt-6 bg-[#0f0d0b] border border-[#5a473a] border-opacity-30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#c7bdb1] text-sm font-medium">Achievement Progress</span>
                  <span className="text-[#ffffff] text-sm">{discoveredAchievements.size}/5</span>
                </div>
                <div className="w-full bg-[#5a473a] bg-opacity-30 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#5a473a] to-[#c7bdb1] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(discoveredAchievements.size / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Tech Stack Section */}
          {activeSection === 'tech' && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-[#ffffff] mb-4">
                  Technologies & Tools
                </h2>
                <p className="text-[#ddd9d6] text-lg">
                  Expertise across full-stack development, AI/ML, and modern web technologies
                </p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {techStack.map((tech, index) => (
                  <TechIcon 
                    key={index}
                    name={tech.name}
                    src={tech.src}
                    index={index}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Projects Section */}
        <ProjectsWrapper />
      </div>
    </>
  );
};

export default TerminalAchievements;