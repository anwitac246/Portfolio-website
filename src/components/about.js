import React, { useState, useEffect, useRef } from "react";
import AchievementsSection from "./achievements";

const GlitchText = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState("");
  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  const extractTextFromChildren = (children) => {
    if (typeof children === 'string') return children;
    if (typeof children === 'number') return String(children);
    if (Array.isArray(children)) return children.map(extractTextFromChildren).join('');
    if (typeof children === 'object' && children?.props?.children)
      return extractTextFromChildren(children.props.children);
    return '';
  };

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
        setGlitchText(originalText);
      }

      iterations += 1 / 3;
    }, 50);

    return () => clearInterval(interval);
  }, [isGlitching, children]);
  
  return (
    <span
      className={`${className} transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {glitchText}
    </span>
  );
};

const FloatingDots = () => {
  const dots = Array.from({ length: 15 }, (_, i) => (
    <div
      key={i}
      className="absolute w-1 h-1 rounded-full opacity-20"
      style={{
        backgroundColor: '#5a473a',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animation: `float-${i} ${4 + Math.random() * 3}s ease-in-out infinite`,
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
          ${Array.from({ length: 15 }, (_, i) => `
            @keyframes float-${i} {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-15px) rotate(180deg); }
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
      <svg className="w-full h-full opacity-5">
        <defs>
          <pattern id="grid" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#5a473a" strokeWidth="1"/>
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
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
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
       
        const fadeStartPoint = aboutBottom - 100;
        
        if (scrollBottom > fadeStartPoint) {
          const fadeProgress = (scrollBottom - fadeStartPoint) / 400;
          const clampedProgress = Math.min(Math.max(fadeProgress, 0), 1);
          
          setAboutOpacity(1 - clampedProgress * 0.7);
          setAboutTransform(-50 * clampedProgress);
        } else {
          setAboutOpacity(1);
          setAboutTransform(0);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const parallaxOffset = scrollY * 0.1;
  
  return (
    <div className="relative" id="about">
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
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
          {/* Header Section */}
          <div className="text-center mb-32" style={{ transform: `translateY(${parallaxOffset}px)` }}>
            <GlitchText 
              className="block text-7xl md:text-8xl font-bold mb-6 tracking-wide"
              style={{ color: '#ffffff' }}
              delay={200}
            >
              ABOUT
            </GlitchText>
            <span 
              className="block text-xl md:text-2xl font-normal tracking-widest"
              style={{ color: '#c7bdb1' }}
              delay={800}
            >
              WHO I AM
            </span>
          </div>

          {/* Main Content */}
          <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
            <div className="space-y-8">
              <AnimatedText
                delay={1200}
                className="text-4xl md:text-5xl font-bold leading-tight"
                style={{ color: '#ddd9d6' }}
              >
                PASSIONATE
                <br />
                DEVELOPER
              </AnimatedText>
              
              <div className="space-y-6">
                <AnimatedText
                  delay={1600}
                  className="text-lg leading-relaxed"
                  style={{ color: '#c7bdb1' }}
                >
                  Currently navigating my pre-final year at IIIT Naya Raipur, 
                  pursuing B.Tech in Computer Science Engineering.
                </AnimatedText>
                
                <AnimatedText
                  delay={2000}
                  className="text-lg leading-relaxed"
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
                  className="w-full h-72 relative overflow-hidden rounded-lg shadow-2xl"
                  style={{ 
                    backgroundColor: '#5a473a',
                    clipPath: 'polygon(0 0, 100% 15%, 100% 100%, 0 85%)'
                  }}
                >
                  <div className="absolute bottom-8 left-8">
                    <span
                      className="block text-xl font-bold mb-2"
                      style={{ color: '#ffffff' }}
                      delay={2800}
                    >
                      IIIT NAYA RAIPUR
                    </span>
                    <span
                      className="block text-sm tracking-widest uppercase"
                      style={{ color: '#ddd9d6' }}
                      delay={3200}
                    >
                      B.Tech CSE
                    </span>
                  </div>
                </div>
              </AnimatedText>
            </div>
          </div>

          {/* Expertise Section */}
          <div className="mb-32">
            <GlitchText 
              className="block text-5xl md:text-6xl font-bold mb-16 text-center"
              style={{ color: '#ffffff' }}
              delay={3600}
            >
              EXPERTISE
            </GlitchText>
            
            <div className="grid md:grid-cols-3 gap-12">
              <AnimatedText delay={4000} className="text-center p-8 rounded-lg" style={{ backgroundColor: 'rgba(90, 71, 58, 0.1)' }}>
                <span 
                  className="block text-2xl font-bold mb-4"
                  style={{ color: '#5a473a' }}
                  delay={4200}
                >
                  WEB DEVELOPMENT
                </span>
                <div 
                  className="text-base leading-relaxed"
                  style={{ color: '#c7bdb1' }}
                >
                  Building responsive, interactive web applications with modern 
                  technologies and best practices.
                </div>
              </AnimatedText>
              
              <AnimatedText delay={4400} className="text-center p-8 rounded-lg" style={{ backgroundColor: 'rgba(90, 71, 58, 0.1)' }}>
                <span 
                  className="block text-2xl font-bold mb-4"
                  style={{ color: '#5a473a' }}
                  delay={4600}
                >
                  COMPETITIVE PROGRAMMING
                </span>
                <div 
                  className="text-base leading-relaxed"
                  style={{ color: '#c7bdb1' }}
                >
                  Solving algorithmic challenges and optimizing solutions for 
                  complex computational problems.
                </div>
              </AnimatedText>
              
              <AnimatedText delay={4800} className="text-center p-8 rounded-lg" style={{ backgroundColor: 'rgba(90, 71, 58, 0.1)' }}>
                <span 
                  className="block text-2xl font-bold mb-4"
                  style={{ color: '#5a473a' }}
                  delay={5000}
                >
                  EMERGING TECH
                </span>
                <div 
                  className="text-base leading-relaxed"
                  style={{ color: '#c7bdb1' }}
                >
                  Exploring blockchain technology and diving deep into machine 
                  learning algorithms and applications.
                </div>
              </AnimatedText>
            </div>
          </div>

          {/* Quote Section */}
          <div className="text-center mb-32">
            <AnimatedText delay={5400}>
              <div 
                className="text-3xl md:text-4xl font-normal leading-relaxed max-w-4xl mx-auto italic"
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

          {/* Scroll Indicator */}
          <div className="text-center pb-20">
            <AnimatedText
              delay={6200}
              className="text-lg tracking-widest mb-8 uppercase"
              style={{ color: '#c7bdb1' }}
            >
              SCROLL TO VIEW ACHIEVEMENTS
            </AnimatedText>

            <AnimatedText delay={6600} className="flex justify-center">
              <div className="animate-bounce">
                <div 
                  className="w-px h-12 mx-auto"
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
      
        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 w-24 h-24 opacity-10">
          <div 
            className="w-full h-full border-2 rotate-45 rounded-lg"
            style={{ borderColor: '#5a473a' }}
          />
        </div>
        
        <div className="absolute bottom-40 left-20 w-16 h-16 opacity-10">
          <div 
            className="w-full h-full rounded-full border-2"
            style={{ borderColor: '#c7bdb1' }}
          />
        </div>
      </div>

      <AchievementsSection />
    </div>
  );
}