'use client';
import Contact from './contact';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

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

const AnimatedDots = React.memo(() => {
  const dots = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="absolute w-1 h-1 bg-gradient-to-r from-[#5a473a] to-[#c7bdb1] rounded-full opacity-60"
          style={{
            left: `${dot.left}%`,
            top: `${dot.top}%`,
            animation: `float ${dot.duration}s ease-in-out infinite`,
            animationDelay: `${dot.delay}s`
          }}
        />
      ))}
    </div>
  );
});
AnimatedDots.displayName = "AnimatedDots";

const AnimatedLines = React.memo(() => {
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
});
AnimatedLines.displayName = "AnimatedLines";

const VideoModal = ({ isOpen, onClose, videoUrl, title }) => {
  const modalVideoRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen && modalVideoRef.current && videoUrl) {
      const video = modalVideoRef.current;
      video.load();
      video.muted = true;
      const play = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            video.muted = true;
            video.play().catch(() => {});
          });
        }
      };
      setTimeout(play, 100);
    }
  }, [isOpen, videoUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        className="absolute inset-0 bg-[#161412] bg-opacity-90 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-6xl max-h-[90vh] flex items-center justify-center">
        <div className="relative bg-[#161412] rounded-lg overflow-hidden border border-[#5a473a] max-w-full max-h-full w-full">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-[#5a473a] bg-opacity-80 hover:bg-opacity-100 text-[#c7bdb1] rounded-full flex items-center justify-center transition-all duration-300"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative w-full aspect-video">
            <video
              ref={modalVideoRef}
              className="w-full h-full object-cover rounded"
              controls
              loop
              muted
              playsInline
              autoPlay
              preload="auto"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#161412] to-transparent p-3 sm:p-6">
            <h3 className="text-base sm:text-lg md:text-2xl font-bold text-[#ffffff] truncate">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectCard = React.memo(({ project, isLeft, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle video playback for preview
  useEffect(() => {
    if (videoRef.current && project.videoUrl) {
      const video = videoRef.current;
      
      if (isMobile) {
        // Auto-play on mobile
        video.muted = true;
        video.play().catch(() => {
          console.log('Mobile autoplay failed');
        });
      } else {
        // Hover behavior on desktop
        if (isHovered) {
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
          }

          hoverTimeoutRef.current = setTimeout(() => {
            if (video && isHovered) {
              video.muted = true;
              video.play().catch(() => {
                console.log('Desktop hover play failed');
              });
            }
          }, 100);
        } else {
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
          }
          video.pause();
          video.currentTime = 0;
        }
      }
    }

    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [isHovered, isMobile, project.videoUrl]);

  const handleVideoClick = useCallback(() => {
    if (project.videoUrl) {
      setIsModalOpen(true);
    }
  }, [project.videoUrl]);

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) setIsHovered(true);
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) setIsHovered(false);
  }, [isMobile]);

  const handleModalClose = useCallback(() => setIsModalOpen(false), []);

  return (
    <>
      <div
        ref={cardRef}
        className={`flex items-center min-h-screen px-3 sm:px-6 lg:px-16 relative py-8 sm:py-16 ${
          isLeft ? 'justify-start' : 'justify-end'
        }`}
      >
        <AnimatedLines />
        <AnimatedDots />

        <div className={`max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center ${
          isLeft ? '' : 'lg:grid-flow-col-dense'
        }`}>
          {/* Video Section */}
          <div className={`relative ${
            isLeft ? 'lg:order-1' : 'lg:order-2'
          } ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}>
            <div
              className="relative overflow-hidden rounded-lg bg-[#161412] aspect-video group border border-[#5a473a] border-opacity-30 cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleVideoClick}
              tabIndex={0}
              role="button"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#161412] via-[#5a473a] to-[#c7bdb1] opacity-20" />

              {project.videoUrl ? (
                <>
                  <video
                    ref={videoRef}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      isMobile || isHovered ? 'opacity-100' : 'opacity-0'
                    }`}
                    muted
                    loop
                    playsInline
                    autoPlay={isMobile}
                    preload="metadata"
                  >
                    <source src={project.videoUrl} type="video/mp4" />
                  </video>

                  <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                    isMobile || isHovered ? 'opacity-0' : 'opacity-100'
                  }`}>
                    <div className="text-center space-y-2 sm:space-y-4">
                      <div className="text-[#c7bdb1] text-3xl sm:text-4xl md:text-6xl font-bold opacity-20">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="text-[#c7bdb1] text-[10px] sm:text-xs md:text-sm font-medium opacity-60 animate-pulse px-2">
                        {isMobile ? 'Tap to expand' : 'Hover to preview • Click to expand'}
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-6 h-6 sm:w-8 sm:h-8 bg-[#161412] bg-opacity-80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-[#c7bdb1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-2 sm:space-y-4">
                    <div className="text-[#c7bdb1] text-3xl sm:text-4xl md:text-6xl font-bold opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="text-[#c7bdb1] text-[10px] sm:text-xs md:text-sm font-medium opacity-40">
                      Video coming soon
                    </div>
                  </div>
                </div>
              )}

              <div className="absolute inset-2 sm:inset-4 border border-[#c7bdb1] border-opacity-30 rounded group-hover:border-opacity-80 transition-all duration-500" />

              <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 md:w-16 md:h-16 border border-[#c7bdb1] border-opacity-40 rounded-full flex items-center justify-center">
                <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-[#c7bdb1] rounded-full transition-all duration-300 ${
                  isMobile || isHovered ? 'animate-pulse scale-150' : 'animate-pulse'
                }`} />
              </div>

              <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex items-center gap-1 sm:gap-2 opacity-60">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full bg-red-500 animate-pulse" />
                <div className="text-[#c7bdb1] text-[8px] sm:text-[10px] md:text-xs font-medium">
                  {project.videoUrl ? 'LIVE PREVIEW' : 'NO VIDEO'}
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className={`relative ${
            isLeft ? 'lg:order-2' : 'lg:order-1'
          } ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`} style={{ animationDelay: '0.2s' }}>
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="space-y-1 sm:space-y-2">
                <div className="text-[#c7bdb1] text-[10px] sm:text-xs md:text-sm font-medium tracking-wider uppercase">
                  Project {String(index + 1).padStart(2, '0')}
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#ffffff] leading-tight">
                  <GlitchText>{project.title}</GlitchText>
                </h2>
              </div>

              <div className="w-12 sm:w-16 md:w-24 h-px bg-gradient-to-r from-[#c7bdb1] to-transparent" />

              <p className="text-[#ddd9d6] text-sm sm:text-base md:text-lg leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 sm:gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 sm:px-3 sm:py-1 text-[10px] sm:text-xs md:text-sm text-[#ddd9d6] bg-[#5a473a] bg-opacity-50 rounded-full border border-[#c7bdb1] border-opacity-30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 sm:gap-4 pt-2 sm:pt-4 flex-wrap">
                <div className="flex flex-col">
                  <a
                    href={project.liveLink === '#' ? undefined : project.liveLink}
                    target={project.liveLink === '#' ? undefined : "_blank"}
                    rel={project.liveLink === '#' ? undefined : "noopener noreferrer"}
                    className={`px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-all duration-300 text-sm sm:text-base ${
                      project.liveLink === '#'
                        ? 'bg-[#5a473a] text-[#c7bdb1] cursor-not-allowed opacity-60'
                        : 'bg-[#c7bdb1] text-[#161412] hover:bg-[#ffffff] hover:text-[#161412] transform hover:scale-105'
                    }`}
                    onClick={project.liveLink === '#' ? (e) => e.preventDefault() : undefined}
                  >
                    <span>View Project</span>
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  {project.liveLink === '#' && (
                    <span className="text-[8px] sm:text-[10px] md:text-xs text-[#c7bdb1] opacity-60 mt-1 ml-1">
                      Live link not available yet
                    </span>
                  )}
                </div>

                <a
                  href={project.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-3 border border-[#c7bdb1] text-[#c7bdb1] rounded-lg hover:bg-[#c7bdb1] hover:text-[#161412] transition-all duration-300 inline-flex items-center gap-2 text-sm sm:text-base"
                >
                  <span>Source Code</span>
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        videoUrl={project.videoUrl}
        title={project.title}
      />
    </>
  );
});
ProjectCard.displayName = "ProjectCard";

const ScrollProgressBar = React.memo(({ scrollProgress }) => (
  <div className="fixed top-0 left-0 w-full h-1 bg-[#5a473a] z-50">
    <div
      className="h-full bg-gradient-to-r from-[#c7bdb1] to-[#ffffff] transition-all duration-100"
      style={{ width: `${scrollProgress * 100}%` }}
    />
  </div>
));
ScrollProgressBar.displayName = "ScrollProgressBar";

const ContactOverlay = React.memo(({ showContact }) => (
  <div className={`fixed inset-0 transition-all duration-1000 z-40 ${
    showContact ? 'opacity-100 visible' : 'opacity-0 invisible'
  }`}>
    <Contact />
  </div>
));
ContactOverlay.displayName = "ContactOverlay";

const ProjectsSection = () => {
  const [showContact, setShowContact] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const ticking = useRef(false);

  const projects = useMemo(() => [
    {
      title: "Code Editor",
      description: "A lightweight in-browser code editor featuring syntax highlighting and live preview, ideal for web development demos or teaching tools.",
      technologies: ["React", "Monaco Editor", "REST API", "JavaScript", "Tailwind CSS"],
      liveLink: "https://code-editor-inky-xi.vercel.app/",
      sourceLink: "https://github.com/anwitac246/code-editor",
      videoUrl: "/videos/Code-Editor.mp4"
    },
    {
      title: "Test Generator Web",
      description: "A web app that dynamically creates customizable quizzes and tests—users can specify topics, question count, and formats.",
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      liveLink: "#",
      sourceLink: "https://github.com/anwitac246/test-generator-web",
      videoUrl: "/videos/Test Gen.mp4"
    },
    {
      title: "Healthcare AI Agent",
      description: "An AI assistant designed to analyze patient data and provide recommendations or alerts to support clinical decision-making.",
      technologies: ["Python", "FastAPI", "TensorFlow", "PostgreSQL"],
      liveLink: "#",
      sourceLink: "https://github.com/anwitac246/healthcare-ai-agent",
      videoUrl: "/videos/Healthcare.mp4"
    },
    {
      title: "Data Analytics Automation",
      description: "Automates pipelines for ETL, data cleansing, analysis, and reporting with scheduled execution and visualization outputs.",
      technologies: ["Python", "Pandas", "EvalML", "Three.js", "Flask", "MERN stack"],
      liveLink: "http://54.89.211.65:3000/",
      sourceLink: "https://github.com/anwitac246/data-analytics-automation",
      videoUrl: "/videos/demo.mp4"
    }
  ], []);

  const updateScrollProgress = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const totalScrollable = documentHeight - windowHeight;
        const progress = Math.min(Math.max(scrollTop / totalScrollable, 0), 1);

        setScrollProgress(progress);

        const lastProjectThreshold = 0.99;
        setShowContact(progress > lastProjectThreshold);

        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => updateScrollProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollProgress]);

  return (
    <div id="projects">
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

      <ScrollProgressBar scrollProgress={scrollProgress} />

      <div
        ref={containerRef}
        className={`relative bg-[#161412] transition-all duration-1000 ${
          showContact ? 'transform scale-95 opacity-70' : 'transform scale-100 opacity-100'
        }`}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={`project-${index}`}
            project={project}
            isLeft={index % 2 === 0}
            index={index}
          />
        ))}
      </div>

      <ContactOverlay showContact={showContact} />
    </div>
  );
};

export default ProjectsSection;