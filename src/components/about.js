import React, { useState, useEffect, useRef } from "react";
import ProjectsSection from "./projects";


const GlitchText = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState("");
  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  // Extract text from children (fixed function placement)
  const extractTextFromChildren = (children) => {
    if (typeof children === 'string') return children;
    if (typeof children === 'number') return String(children);
    if (Array.isArray(children)) return children.map(extractTextFromChildren).join('');
    if (typeof children === 'object' && children?.props?.children)
      return extractTextFromChildren(children.props.children);
    return '';
  };

  // Initialize glitchText with original text
  useEffect(() => {
    const originalText = extractTextFromChildren(children);
    setGlitchText(originalText);
  }, [children]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsGlitching(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!isGlitching) return;

    const originalText = extractTextFromChildren(children);
    let iterations = 0;

    const interval = setInterval(() => {
      setGlitchText(
        originalText
          .split("")
          .map((letter, index) => {
            if (index < iterations) {
              return originalText[index];
            }
            return letter === ' ' ? ' ' : characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      if (iterations >= originalText.length) {
        clearInterval(interval);
        setIsGlitching(false);
        setGlitchText(originalText); // Ensure final text is correct
      }

      iterations += 1 / 3; // Slightly slower reveal
    }, 50); // Slightly slower animation

    return () => clearInterval(interval);
  }, [isGlitching, children]);
  
  return (
    <span
      className={`${className} transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ fontFamily: 'Inter, monospace' }}
    >
      {glitchText}
    </span>
  );
};

const FloatingDots = () => {
  const dots = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="absolute w-1 h-1 rounded-full opacity-20"
      style={{
        backgroundColor: '#5a473a',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float-${i} ${3 + Math.random() * 4}s ease-in-out infinite`,
        animationDelay: `${Math.random() * 2}s`
      }}
    />
  ));
  
  return (
    <>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {dots}
      </div>
      <style>
        {`
          ${Array.from({ length: 20 }, (_, i) => `
            @keyframes float-${i} {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(180deg); }
            }
          `).join('')}
        `}
      </style>
    </>
  );
};

const ConnectingLines = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full opacity-10">
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#5a473a" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

const AnimatedText = ({ children, delay, className = "", style }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <div 
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

export default function About() {
  const [scrollY, setScrollY] = useState(0);
  const [aboutOpacity, setAboutOpacity] = useState(1);
  const [aboutTransform, setAboutTransform] = useState(0);
  const aboutRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      if (aboutRef.current) {
        const aboutHeight = aboutRef.current.offsetHeight;
        const scrollBottom = currentScrollY + window.innerHeight;
        const aboutBottom = aboutRef.current.offsetTop + aboutHeight;
       
        const fadeStartPoint = aboutBottom - 20;
        
        if (scrollBottom > fadeStartPoint) {
          const fadeProgress = (scrollBottom - fadeStartPoint) / 500;
          const clampedProgress = Math.min(Math.max(fadeProgress, 0), 1);
          
          setAboutOpacity(1 - clampedProgress);
          setAboutTransform(-100 * clampedProgress);
        } else {
          setAboutOpacity(1);
          setAboutTransform(0);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const parallaxOffset = scrollY * 0.2;
  
  return (
    <div className="relative" id = "about">
      <div 
        ref={aboutRef}
        className="min-h-screen relative overflow-hidden transition-all duration-500 ease-out"
        style={{ 
          backgroundColor: '#161412',
          opacity: aboutOpacity,
          transform: `translateY(${aboutTransform}px)`
        }}
      >
        <FloatingDots />
        <ConnectingLines />
        
        <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
          <div className="text-center mb-40" style={{ transform: `translateY(${parallaxOffset}px)` }}>
            <GlitchText 
              className="block text-8xl md:text-9xl font-bold mb-8 tracking-wider"
              style={{ color: '#ffffff' }}
              delay={200}
            >
              ABOUT
            </GlitchText>
            <GlitchText 
              className="block text-2xl md:text-3xl font-light tracking-[0.3em]"
              style={{ color: '#c7bdb1' }}
              delay={800}
            >
              WHO I AM
            </GlitchText>
          </div>

          <div className="grid md:grid-cols-2 gap-20 items-center mb-60">
            <div className="space-y-8">
              <div 
                className="block text-5xl md:text-6xl font-bold leading-tight"
                style={{ color: '#ddd9d6' }}
                delay={1200}
              >
                PASSIONATE
                <br />
                DEVELOPER
              </div>
              
              <div className="space-y-6">
                <AnimatedText
                  delay={1600}
                  className="text-lg leading-relaxed font-light"
                  style={{ color: '#c7bdb1' }}
                >
                  Currently navigating my pre-final year at IIIT Naya Raipur, 
                  pursuing B.Tech in Computer Science Engineering.
                </AnimatedText>
                
                <AnimatedText
                  delay={2000}
                  className="text-lg leading-relaxed font-light"
                  style={{ color: '#c7bdb1' }}
                >
                  My journey spans across the digital landscape — from crafting 
                  intuitive web experiences to solving complex algorithmic challenges.
                </AnimatedText>
              </div>
            </div>
            
            <div className="relative">
              <AnimatedText delay={2400}>
                <div 
                  className="w-full h-80 relative overflow-hidden"
                  style={{ 
                    backgroundColor: '#5a473a',
                    clipPath: 'polygon(0 0, 100% 20%, 100% 100%, 0 80%)'
                  }}
                >
                  <div className="absolute bottom-8 left-8">
                    <GlitchText 
                      className="block text-2xl font-bold"
                      style={{ color: '#ffffff' }}
                      delay={2800}
                    >
                      IIIT NAYA RAIPUR
                    </GlitchText>
                    <GlitchText 
                      className="block text-sm tracking-widest font-mono"
                      style={{ color: '#ddd9d6' }}
                      delay={3200}
                    >
                      B.TECH CSE
                    </GlitchText>
                  </div>
                </div>
              </AnimatedText>
            </div>
          </div>

          <div className="mb-60">
            <GlitchText 
              className="block text-6xl md:text-7xl font-bold mb-20 text-center"
              style={{ color: '#ffffff' }}
              delay={3600}
            >
              EXPERTISE
            </GlitchText>
            
            <div className="grid md:grid-cols-3 gap-16">
              <AnimatedText delay={4000} className="text-center">
                <GlitchText 
                  className="block text-3xl font-bold mb-6"
                  style={{ color: '#5a473a' }}
                  delay={4200}
                >
                  WEB DEVELOPMENT
                </GlitchText>
                <div 
                  className="text-base font-light leading-relaxed"
                  style={{ color: '#c7bdb1' }}
                >
                  Building responsive, interactive web applications with modern 
                  technologies and best practices.
                </div>
              </AnimatedText>
              
              <AnimatedText delay={4400} className="text-center">
                <GlitchText 
                  className="block text-3xl font-bold mb-6"
                  style={{ color: '#5a473a' }}
                  delay={4600}
                >
                  COMPETITIVE PROGRAMMING
                </GlitchText>
                <div 
                  className="text-base font-light leading-relaxed"
                  style={{ color: '#c7bdb1' }}
                >
                  Solving algorithmic challenges and optimizing solutions for 
                  complex computational problems.
                </div>
              </AnimatedText>
              
              <AnimatedText delay={4800} className="text-center">
                <GlitchText 
                  className="block text-3xl font-bold mb-6"
                  style={{ color: '#5a473a' }}
                  delay={5000}
                >
                  EMERGING TECH
                </GlitchText>
                <div 
                  className="text-base font-light leading-relaxed"
                  style={{ color: '#c7bdb1' }}
                >
                  Exploring blockchain technology and diving deep into machine 
                  learning algorithms and applications.
                </div>
              </AnimatedText>
            </div>
          </div>

          <div className="text-center mb-60">
            <AnimatedText delay={5400}>
              <div 
                className="block text-4xl md:text-5xl font-mono leading-relaxed max-w-4xl mx-auto"
                style={{ color: '#ddd9d6' }}
              >
                "Code is poetry written in logic, 
                <br />
                where every line tells a story 
                <br />
                of possibilities."
              </div>
            </AnimatedText>
          </div>

          <div className="text-center pb-40">
            <div 
              className="block text-xl font-mono tracking-widest mb-16"
              style={{ color: '#c7bdb1' }}
              delay={6200}
            >
              SCROLL TO EXPLORE PROJECTS
            </div>

            <AnimatedText delay={6600} className="flex justify-center">
              <div className="animate-bounce">
                <div 
                  className="w-px h-16 mx-auto"
                  style={{ backgroundColor: '#5a473a' }}
                />
                <div 
                  className="w-2 h-2 rounded-full mt-2 mx-auto"
                  style={{ backgroundColor: '#5a473a' }}
                />
              </div>
            </AnimatedText>
          </div>
        </div>
      
        <div className="absolute top-20 right-20 w-32 h-32 opacity-10">
          <div 
            className="w-full h-full border-2 rotate-45"
            style={{ borderColor: '#5a473a' }}
          />
        </div>
        
        <div className="absolute bottom-40 left-20 w-24 h-24 opacity-10">
          <div 
            className="w-full h-full rounded-full border-2"
            style={{ borderColor: '#c7bdb1' }}
          />
        </div>
      </div>

    
      <ProjectsSection/>
    </div>
  );
}