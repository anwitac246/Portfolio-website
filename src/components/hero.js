"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import About from "./about";

const GlitchText = ({ children, className = "" }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(children);
  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  function extractTextFromChildren(children) {
    if (typeof children === 'string') return children;
    if (typeof children === 'number') return String(children);
    if (Array.isArray(children)) return children.map(extractTextFromChildren).join('');
    if (typeof children === 'object' && children?.props?.children)
      return extractTextFromChildren(children.props.children);
    return '';
  }
  
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
    }, 40);

    return () => clearInterval(interval);
  }, [isGlitching, children]);

  return (
    <span
      className={className}
      onMouseEnter={() => setIsGlitching(true)}
      style={{ fontFamily: 'monospace' }}
    >
      {glitchText}
    </span>
  );
};

const FloatingParticle = ({ delay, duration, size }) => {
  return (
    <div
      className="absolute rounded-full opacity-30"
      style={{
        backgroundColor: '#5a473a',
        width: `${size}px`,
        height: `${size}px`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationName: 'float',
        animationDuration: `${duration}s`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDelay: `${delay}s`,
      }}
    />
  );
};

const GeometricShape = ({ type, delay, className = "" }) => {
  const shapes = {
    circle: "rounded-full",
    square: "rotate-45",
    triangle: "clip-path-triangle"
  };

  return (
    <div
      className={`absolute border-2 opacity-20 ${shapes[type]} ${className}`}
      style={{
        borderColor: '#c7bdb1',
        animationName: 'geometricFloat',
        animationDuration: `${4 + Math.random() * 2}s`,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDelay: `${delay}s`,
      }}
    />
  );
};

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [nameVisible, setNameVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    
    setTimeout(() => setNameVisible(true), 500);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const zoomScale = Math.min(1 + scrollY * 0.002, 3);
  const nameOpacity = Math.max(1 - scrollY * 0.003, 0);
  const showSecondFrame = scrollY > 300;

  return (
    <div className="relative">
      <Navbar/>

      <div 
        className="relative flex h-screen w-full items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#161412' }}
      >
     
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundSize: '80px 80px',
            backgroundImage: `
              linear-gradient(to right, #5a473a 1px, transparent 1px), 
              linear-gradient(to bottom, #5a473a 1px, transparent 1px)
            `,
            transform: `rotate(45deg) scale(1.5) translate(${scrollY * 0.1}px, ${scrollY * 0.05}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />

        {Array.from({ length: 20 }, (_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.5}
            duration={8 + Math.random() * 4}
            size={2 + Math.random() * 4}
          />
        ))}

        <GeometricShape 
          type="circle" 
          delay={0} 
          className="w-32 h-32 top-20 left-20" 
        />
        <GeometricShape 
          type="square" 
          delay={1} 
          className="w-24 h-24 top-1/4 right-32" 
        />
        <GeometricShape 
          type="circle" 
          delay={2} 
          className="w-16 h-16 bottom-32 left-1/4" 
        />
        <GeometricShape 
          type="square" 
          delay={3} 
          className="w-20 h-20 bottom-20 right-20" 
        />

        <div 
          className="fixed w-96 h-96 rounded-full pointer-events-none z-0 transition-all duration-300 ease-out"
          style={{
            background: `radial-gradient(circle, rgba(90, 71, 58, 0.15) 0%, transparent 70%)`,
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transform: `scale(${1 + scrollY * 0.001})`,
          }}
        />

        <div 
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            background: `radial-gradient(ellipse at center, transparent 30%, rgba(22, 20, 18, 0.8) 70%)`,
          }}
        />

        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 left-0 w-full h-px opacity-40"
            style={{
              background: `linear-gradient(90deg, transparent, #5a473a, transparent)`,
              animationName: 'borderGlow',
              animationDuration: '3s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: '0s'
            }}
          />
          <div 
            className="absolute bottom-0 left-0 w-full h-px opacity-40"
            style={{
              background: `linear-gradient(90deg, transparent, #5a473a, transparent)`,
              animationName: 'borderGlow',
              animationDuration: '3s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: '1.5s'
            }}
          />
          <div 
            className="absolute top-0 left-0 w-px h-full opacity-40"
            style={{
              background: `linear-gradient(180deg, transparent, #5a473a, transparent)`,
              animationName: 'borderGlow',
              animationDuration: '3s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: '0.75s'
            }}
          />
          <div 
            className="absolute top-0 right-0 w-px h-full opacity-40"
            style={{
              background: `linear-gradient(180deg, transparent, #5a473a, transparent)`,
              animationName: 'borderGlow',
              animationDuration: '3s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: '2.25s'
            }}
          />
        </div>

        <div 
          className="relative z-10 text-center"
          style={{
            transform: `scale(${zoomScale})`,
            opacity: nameOpacity,
            transition: 'opacity 0.1s ease-out'
          }}
        >

          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-32 h-px opacity-60">
            <div 
              className="w-full h-full"
              style={{
                background: `linear-gradient(90deg, transparent, #c7bdb1, transparent)`,
                animationName: 'pulse',
                animationDuration: '2s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: '0s'
              }}
            />
          </div>
          
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-32 h-px opacity-60">
            <div 
              className="w-full h-full"
              style={{
                background: `linear-gradient(90deg, transparent, #c7bdb1, transparent)`,
                animationName: 'pulse',
                animationDuration: '2s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: '1s'
              }}
            />
          </div>

          <h1 
            className={`text-6xl md:text-8xl font-bold transition-all duration-2000 ease-out ${
              nameVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              color: '#ffffff',
              textShadow: `
                0 0 20px rgba(255, 255, 255, 0.3), 
                0 0 40px rgba(199, 189, 177, 0.2),
                0 0 60px rgba(90, 71, 58, 0.1)
              `,
              letterSpacing: '0.1em',
              background: `linear-gradient(135deg, #ffffff 0%, #ddd9d6 50%, #c7bdb1 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            <span>ANWITA CHAKRABORTY</span>
          </h1>
          
          <div className="relative mt-6">
            <div 
              className="absolute inset-0 rounded-lg opacity-20"
              style={{
                background: `linear-gradient(45deg, rgba(90, 71, 58, 0.1), rgba(199, 189, 177, 0.1))`,
                animationName: 'subtlePulse',
                animationDuration: '4s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: '0s'
              }}
            />
            
            <p 
              className={`relative text-xl md:text-2xl mt-4 px-6 py-3 transition-all duration-2000 delay-500 ease-out ${
                nameVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                color: '#c7bdb1',
                letterSpacing: '0.2em',
                textShadow: '0 0 10px rgba(199, 189, 177, 0.3)'
              }}
            >
              <span>FULL STACK DEVELOPER | COMPETITIVE CODER</span>
            </p>
          </div>

      
          <div className="flex justify-center items-center mt-8 space-x-4">
            <div 
              className="w-16 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, #5a473a)`,
                animationName: 'expandLine',
                animationDuration: '2s',
                animationTimingFunction: 'ease-out',
                animationDelay: '1s',
                animationFillMode: 'forwards'
              }}
            />
            <div 
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: '#5a473a',
                animationName: 'dotPulse',
                animationDuration: '2s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: '1.5s'
              }}
            />
            <div 
              className="w-16 h-px"
              style={{
                background: `linear-gradient(90deg, #5a473a, transparent)`,
                animationName: 'expandLine',
                animationDuration: '2s',
                animationTimingFunction: 'ease-out',
                animationDelay: '1s',
                animationFillMode: 'forwards'
              }}
            />
          </div>
        </div>

        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${
            showSecondFrame ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex flex-col items-center group cursor-pointer">
            <span 
              className="text-sm mb-3 tracking-wider font-mono transition-all duration-300 group-hover:scale-110"
              style={{ 
                color: '#c7bdb1',
                textShadow: '0 0 10px rgba(199, 189, 177, 0.3)'
              }}
            >
              SCROLL
            </span>
            <div className="relative">
              <div 
                className="w-px h-8 transition-all duration-300 group-hover:h-12"
                style={{ backgroundColor: '#c7bdb1' }}
              />
              <div 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-4 opacity-60"
                style={{
                  backgroundColor: '#ffffff',
                  animationName: 'scrollIndicator',
                  animationDuration: '2s',
                  animationTimingFunction: 'ease-in-out',
                  animationIterationCount: 'infinite',
                  animationDelay: '0s'
                }}
              />
            </div>
            <div 
              className="mt-2 w-2 h-2 rounded-full transition-all duration-300 group-hover:scale-125"
              style={{
                backgroundColor: '#5a473a',
                animationName: 'bounce',
                animationDuration: '2s',
                animationTimingFunction: 'ease-in-out',
                animationIterationCount: 'infinite',
                animationDelay: '0s'
              }}
            />
          </div>
        </div>

        <div className="absolute top-8 left-8 w-8 h-8 opacity-40">
          <div 
            className="w-full h-px"
            style={{ 
              backgroundColor: '#5a473a',
              animationName: 'cornerGlow',
              animationDuration: '3s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: '0s'
            }}
          />
          <div 
            className="w-px h-full"
            style={{ 
              backgroundColor: '#5a473a',
              animationName: 'cornerGlow',
              animationDuration: '3s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: '0.5s'
            }}
          />
        </div>
        
        <div className="absolute top-8 right-8 w-8 h-8 opacity-40">
          <div 
            className="w-full h-px"
            style={{ 
              backgroundColor: '#5a473a',
              animationName: 'cornerGlow',
              animationDuration: '3s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: '1s'
            }}
          />
          <div 
            className="w-px h-full ml-auto"
            style={{ 
              backgroundColor: '#5a473a',
              animationName: 'cornerGlow',
              animationDuration: '3s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: '1.5s'
            }}
          />
        </div>
        
        <div className="absolute bottom-8 left-8 w-8 h-8 opacity-40">
          <div 
            className="w-full h-px mt-auto"
            style={{ 
              backgroundColor: '#5a473a',
              animationName: 'cornerGlow',
              animationDuration: '3s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',  
              animationDelay: '2s'
            }}
          />
          <div 
            className="w-px h-full"
            style={{ 
              backgroundColor: '#5a473a',
              animationName: 'cornerGlow',
              animationDuration: '3s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: '2.5s'
            }}
          />
        </div>
        
        <div className="absolute bottom-8 right-8 w-8 h-8 opacity-40">
          <div 
            className="w-full h-px mt-auto"
            style={{ 
              backgroundColor: '#5a473a',
              animationName: 'cornerGlow',
              animationDuration: '3s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: '3s'
            }}
          />
          <div 
            className="w-px h-full ml-auto"
            style={{ 
              backgroundColor: '#5a473a',
              animationName: 'cornerGlow',
              animationDuration: '3s',
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
              animationDelay: '3.5s'
            }}
          />
        </div>
      </div>

      <About />

  
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes geometricFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-15px) rotate(120deg) scale(1.1); }
          66% { transform: translateY(-5px) rotate(240deg) scale(0.9); }
        }
        
        @keyframes borderGlow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        
        @keyframes subtlePulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.02); opacity: 0.3; }
        }
        
        @keyframes expandLine {
          0% { width: 0; }
          100% { width: 4rem; }
        }
        
        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.5); opacity: 1; }
        }
        
        @keyframes scrollIndicator {
          0% { transform: translateY(0px) translateX(-50%); opacity: 1; }
          100% { transform: translateY(16px) translateX(-50%); opacity: 0; }
        }
        
        @keyframes cornerGlow {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}