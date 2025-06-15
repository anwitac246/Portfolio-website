"use client";
import React, { useState, useEffect } from "react";

const GlitchText = ({ children, className = "" }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(children);
  
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  useEffect(() => {
    if (!isGlitching) {
      setGlitchText(children);
      return;
    }
    
    let iterations = 0;
    const originalText = children;
    
    const interval = setInterval(() => {
      setGlitchText(
        originalText
          .split("")
          .map((letter, index) => {
            if (index < iterations) {
              return originalText[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );
      
      if (iterations >= originalText.length) {
        clearInterval(interval);
        setIsGlitching(false);
      }
      
      iterations += 1 / 3;
    }, 30);
    
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

export default function Navbar() {
    return(
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-center items-center">
            <div className="flex justify-between space-x-50">
              <GlitchText className="text-white hover:text-green-400 cursor-pointer transition-colors duration-200 text-sm font-medium tracking-wider">
                PROJECTS
              </GlitchText>
              <GlitchText className="text-white hover:text-green-400 cursor-pointer transition-colors duration-200 text-sm font-medium tracking-wider">
                ABOUT
              </GlitchText>
              <GlitchText className="text-white hover:text-green-400 cursor-pointer transition-colors duration-200 text-sm font-medium tracking-wider">
                CONTACT
              </GlitchText>
            </div>
          </div>
        </div>
      </nav>
    );
}