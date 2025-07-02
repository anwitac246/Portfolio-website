'use client';
import React, { useState, useEffect, useCallback } from "react";

const GlitchText = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(children);
  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsGlitching(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
    const extractTextFromChildren = useCallback((children) => {
    if (typeof children === 'string') return children;
    if (typeof children === 'number') return String(children);
    if (Array.isArray(children)) return children.map(extractTextFromChildren).join('');
    if (typeof children === 'object' && children?.props?.children)
      return extractTextFromChildren(children.props.children);
    return '';
  }, []);
  
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
      }

      iterations += 1 / 4;
    }, [extractTextFromChildren], 40);

    return () => clearInterval(interval);
  }, [extractTextFromChildren, isGlitching, children]);

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

const ContactIcon = ({ icon, label, link, delay, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  const iconComponents = {
    linkedin: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    leetcode: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path fill="currentColor" d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.518 2.126 7.28-.046 2.248-2.165 2.248-5.816 0-7.981l-4.244-4.168a1.375 1.375 0 1 0-1.961 1.934l4.244 4.168a2.79 2.79 0 0 1 0 4.112c-.951.93-2.367.93-3.318 0l-4.277-4.193-.039-.038a2.829 2.829 0 0 1-.606-.896 2.415 2.415 0 0 1-.062-.293 2.803 2.803 0 0 1 .062-1.196 2.706 2.706 0 0 1 .606-1.05l3.854-4.126 5.406-5.788a1.375 1.375 0 0 0-1.961-1.934z"/>
      </svg>
    ),
    codeforces: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path fill="currentColor" d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5S3 20.328 3 19.5V9c0-.828.672-1.5 1.5-1.5zm15 0c.828 0 1.5.672 1.5 1.5v10.5c0 .828-.672 1.5-1.5 1.5S18 20.328 18 19.5V9c0-.828.672-1.5 1.5-1.5zM12 3c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5s-1.5-.672-1.5-1.5V4.5c0-.828.672-1.5 1.5-1.5z"/>
      </svg>
    ),
    email: (
      <svg viewBox="0 0 24 24" className="w-full h-full">
        <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    )
  };
  
  return (
    <AnimatedText delay={delay} className="flex flex-col items-center group">
      <div 
        className={`relative w-20 h-20 mb-4 cursor-pointer transition-all duration-500 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => window.open(link, '_blank')}
        style={{
          transform: isHovered ? 'scale(1.2) rotate(10deg)' : 'scale(1) rotate(0deg)',
        }}
      >
        <div 
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{
            backgroundColor: isHovered ? '#5a473a' : 'transparent',
            boxShadow: isHovered ? '0 0 30px rgba(90, 71, 58, 0.5)' : 'none',
            border: `2px solid ${isHovered ? '#5a473a' : '#c7bdb1'}`,
          }}
        />

        <div 
          className={`absolute inset-0 rounded-full border-2 border-dashed transition-all duration-1000 ${
            isHovered ? 'animate-spin' : ''
          }`}
          style={{
            borderColor: '#5a473a',
            opacity: isHovered ? 1 : 0,
          }}
        />
    
        <div 
          className="absolute inset-0 flex items-center justify-center p-4 transition-all duration-500"
          style={{
            color: isHovered ? '#ffffff' : '#c7bdb1',
          }}
        >
          {iconComponents[icon]}
        </div>
        
        {isHovered && (
          <div 
            className="absolute inset-0 rounded-full animate-ping"
            style={{
              backgroundColor: 'rgba(90, 71, 58, 0.2)',
            }}
          />
        )}
      </div>
      
      <GlitchText
        className={`text-sm font-mono tracking-wider transition-all duration-500 ${
          isHovered ? 'scale-110' : 'scale-100'
        }`}
        style={{ 
          color: isHovered ? '#5a473a' : '#c7bdb1',
        }}
        delay={delay + 200}
      >
        {label}
      </GlitchText>
    </AnimatedText>
  );
};

export default function Contact() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Add smooth scrolling CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const contactLinks = [
    {
      icon: 'linkedin',
      label: 'LINKEDIN',
      link: 'https://www.linkedin.com/in/anwita-chakraborty-76aa59296/'
    },
    {
      icon: 'github',
      label: 'GITHUB',
      link: 'https://github.com/anwitac246'
    },
    {
      icon: 'leetcode',
      label: 'LEETCODE',
      link: 'https://leetcode.com/u/8RCBMkZpm8/'
    },
    {
      icon: 'codeforces',
      label: 'CODEFORCES',
      link: 'https://codeforces.com/profile/anwita.chakraborty07'
    }
  ];
  
  const handleEmailClick = () => {
    navigator.clipboard.writeText('anwita.chakraborty07@gmail.com');
    setIsEmailCopied(true);
    setTimeout(() => setIsEmailCopied(false), 2000);
  };
  
  return (
    <section 
      className="min-h-screen relative overflow-hidden"
      id="contact"
      style={{ 
        backgroundColor: '#0a0908',
        scrollMarginTop: '80px' // Add offset for fixed navbar
      }}
    >
 
      <div className="absolute inset-0">
        {Array.from({ length: 50 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full opacity-20"
            style={{
              backgroundColor: '#5a473a',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle-${i} ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

  
      <div 
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0 transition-all duration-1000 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(90, 71, 58, 0.1) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
    
        <div className="text-center mb-20">
          <GlitchText 
            className="block text-8xl md:text-9xl font-bold mb-8 tracking-wider"
            style={{ color: '#ffffff' }}
            delay={300}
          >
            CONTACT
          </GlitchText>
          <GlitchText 
            className="block text-2xl md:text-3xl font-light tracking-[0.3em]"
            style={{ color: '#c7bdb1' }}
            delay={700}
          >
            LET&apos;S BUILD SOMETHING AMAZING
          </GlitchText>
        </div>

        <div className="text-center mb-20">
          <AnimatedText delay={1100} className="mb-8">
            <div 
              className="inline-flex items-center gap-4 px-8 py-6 border-2 cursor-pointer group transition-all duration-500 hover:scale-105"
              style={{ 
                borderColor: '#5a473a',
                backgroundColor: isEmailCopied ? 'rgba(90, 71, 58, 0.2)' : 'transparent'
              }}
              onClick={handleEmailClick}
            >
              <div 
                className="w-8 h-8 transition-all duration-500 group-hover:scale-110"
                style={{ color: '#c7bdb1' }}
              >
                <svg viewBox="0 0 24 24" className="w-full h-full">
                  <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <div
                className="text-2xl md:text-3xl font-mono tracking-wider"
                style={{ color: '#ddd9d6' }}
                delay={1300}
              >
                anwita.chakraborty07@gmail.com
              </div>
            </div>
          </AnimatedText>
          
          {isEmailCopied && (
            <AnimatedText delay={0} className="text-center">
              <div 
                className="text-sm font-mono tracking-wider animate-pulse"
                style={{ color: '#5a473a' }}
              >
                EMAIL COPIED TO CLIPBOARD
              </div>
            </AnimatedText>
          )}
        </div>

   
        <div className="flex justify-center items-center gap-16 mb-20">
          {contactLinks.map((contact, index) => (
            <ContactIcon
              key={contact.icon}
              icon={contact.icon}
              label={contact.label}
              link={contact.link}
              delay={1500 + index * 200}
              index={index}
            />
          ))}
        </div>
        
       
        <div className="text-center mb-20">
          <div 
            className="block text-4xl md:text-5xl font-light leading-relaxed max-w-4xl mx-auto mb-12"
            style={{ color: '#ddd9d6' }}
            delay={2500}
          >
            Ready to turn ideas into reality?
            <br />
            Let&apos;s connect and create something extraordinary.
          </div>
          
          <AnimatedText delay={3000}>
            <div 
              className="inline-block px-12 py-6 border-2 transition-all duration-500 hover:scale-110 hover:rotate-2 cursor-pointer group"
              style={{ 
                borderColor: '#5a473a',
                backgroundColor: 'transparent'
              }}
            >
              <div
                className="text-xl font-mono tracking-wider group-hover:scale-110 transition-transform duration-500"
                style={{ color: '#5a473a' }}
                delay={3200}
              >
                SAY HELLO
              </div>
            </div>
          </AnimatedText>
        </div>

        
        <div className="text-center">
          <AnimatedText delay={3600}>
            <div 
              className="text-sm font-mono tracking-widest opacity-60"
              style={{ color: '#c7bdb1' }}
            >
              © 2024 • CRAFTED WITH PASSION • BUILT FOR THE FUTURE
            </div>
          </AnimatedText>
        </div>
      </div>

     
      <div className="absolute top-20 left-20 w-40 h-40 opacity-5">
        <div 
          className="w-full h-full border-4 rounded-full animate-pulse"
          style={{ borderColor: '#5a473a' }}
        />
      </div>
      
      <div className="absolute bottom-20 right-20 w-32 h-32 opacity-5">
        <div 
          className="w-full h-full border-4 rotate-45 animate-bounce"
          style={{ borderColor: '#c7bdb1' }}
        />
      </div>
   
     
      <style>
        {`
          ${Array.from({ length: 50 }, (_, i) => `
            @keyframes twinkle-${i} {
              0%, 100% { opacity: 0.2; transform: scale(1); }
              50% { opacity: 0.8; transform: scale(1.5); }
            }
          `).join('')}
        `}
      </style>
    </section>
  );
}