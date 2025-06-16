import React, { useState, useEffect, useRef } from 'react';
import Contact from './contact';

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
      {[...Array(20)].map((_, i) => (
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
      <div 
        className="absolute h-px bg-gradient-to-l from-transparent via-[#5a473a] to-transparent opacity-50"
        style={{
          width: '300px',
          bottom: '30%',
          right: '-300px',
          animation: 'slideLeft 10s linear infinite'
        }}
      />
    </div>
  );
};

const ProjectCard = ({ project, isLeft, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={cardRef}
      id="projects"
      className={`flex items-center min-h-screen px-8 lg:px-16 relative ${
        isLeft ? 'justify-start' : 'justify-end'
      }`}
    >
      <AnimatedLines />
      <AnimatedDots />
      
      <div className={`max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
        isLeft ? '' : 'lg:grid-flow-col-dense'
      }`}>

        <div className={`relative ${isLeft ? 'lg:order-1' : 'lg:order-2'} ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="relative overflow-hidden rounded-lg bg-[#161412] aspect-video group border border-[#5a473a] border-opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-[#161412] via-[#5a473a] to-[#c7bdb1] opacity-20" />
            <div className="absolute inset-4 border border-[#c7bdb1] border-opacity-30 rounded group-hover:border-opacity-80 transition-all duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-[#c7bdb1] text-6xl font-bold opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                {index + 1}
              </div>
            </div>
            <div className="absolute bottom-4 right-4 w-16 h-16 border border-[#c7bdb1] border-opacity-40 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-[#c7bdb1] rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        <div className={`relative ${isLeft ? 'lg:order-2' : 'lg:order-1'} ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`} style={{ animationDelay: '0.2s' }}>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="text-[#c7bdb1] text-sm font-medium tracking-wider uppercase">
                Project {String(index + 1).padStart(2, '0')}
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#ffffff]">
                <GlitchText>{project.title}</GlitchText>
              </h2>
            </div>

            <div className="w-24 h-px bg-gradient-to-r from-[#c7bdb1] to-transparent" />

            <p className="text-[#ddd9d6] text-lg leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className="px-3 py-1 text-sm text-[#ddd9d6] bg-[#5a473a] bg-opacity-50 rounded-full border border-[#c7bdb1] border-opacity-30"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <a 
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#c7bdb1] text-[#161412] rounded-lg hover:bg-[#ffffff] hover:text-[#161412] transition-all duration-300 transform hover:scale-105 font-medium inline-flex items-center gap-2"
              >
                <span>View Project</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <a
                href={project.sourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-[#c7bdb1] text-[#c7bdb1] rounded-lg hover:bg-[#c7bdb1] hover:text-[#161412] transition-all duration-300 inline-flex items-center gap-2"
              >
                <span>Source Code</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




const ProjectsSection = () => {
  const [showContact, setShowContact] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  const projects = [
    {
      title: "Code Editor",
      description: "A lightweight in-browser code editor featuring syntax highlighting and live preview, ideal for web development demos or teaching tools.",
      technologies: ["React", "CodeMirror", "JavaScript", "CSS"],
      liveLink: "#",
      sourceLink: "https://github.com/anwitac246/code-editor"
    },
    {
      title: "Test Generator Web",
      description: "A web app that dynamically creates customizable quizzes and tests—users can specify topics, question count, and formats.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      liveLink: "#",
      sourceLink: "https://github.com/anwitac246/test-generator-web"
    },
    {
      title: "Healthcare AI Agent",
      description: "An AI assistant designed to analyze patient data and provide recommendations or alerts to support clinical decision-making.",
      technologies: ["Python", "FastAPI", "TensorFlow", "PostgreSQL"],
      liveLink: "#",
      sourceLink: "https://github.com/anwitac246/healthcare-ai-agent"
    },
    {
      title: "Data Analytics Automation",
      description: "Automates pipelines for ETL, data cleansing, analysis, and reporting with scheduled execution and visualization outputs.",
      technologies: ["Python", "Pandas", "Apache Airflow", "Plotly"],
      liveLink: "#",
      sourceLink: "https://github.com/anwitac246/data-analytics-automation"
    },
    {
      title: "HitUp Chat",
      description: "A real-time chat application with support for multiple rooms, private messaging, and online presence indicators.",
      technologies: ["Node.js", "Socket.io", "React", "Redis"],
      liveLink: "#",
      sourceLink: "https://github.com/anwitac246/hitup_chat"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const totalScrollable = documentHeight - windowHeight;
      const progress = scrollTop / totalScrollable;
      
      setScrollProgress(progress);
      
      const lastProjectThreshold = 0.98;
      if (progress > lastProjectThreshold) {
        setShowContact(true);
      } else {
        setShowContact(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100vw - 300px)); }
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
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
      
      <div 
        ref={containerRef}
        className={`relative bg-[#161412] transition-all duration-1000 ${
          showContact ? 'transform scale-75 opacity-50' : 'transform scale-100 opacity-100'
        }`}
      >

        <div className="fixed top-0 left-0 w-full h-1 bg-[#5a473a] z-50">
          <div 
            className="h-full bg-gradient-to-r from-[#c7bdb1] to-[#ffffff] transition-all duration-300"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>


        {projects.map((project, index) => (
          <ProjectCard 
            key={index}
            project={project}
            isLeft={index % 2 === 0}
            index={index}
          />
        ))}
      </div>


      <div className={`fixed inset-0 transition-all duration-1000 z-40 ${
        showContact ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <Contact />
      </div>
    </>
  );
};

export default ProjectsSection;