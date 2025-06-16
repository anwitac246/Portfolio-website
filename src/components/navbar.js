"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link'
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

export default function Navbar() {
    return(
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-center items-center">
            <div className="flex justify-between space-x-50">
              <Link href="#projects">
              <GlitchText className="text-white hover:text-green-400 cursor-pointer transition-colors duration-200 text-sm font-medium tracking-wider">
                PROJECTS</GlitchText>
              </Link>
              <Link href="#about">
              <GlitchText className="text-white hover:text-green-400 cursor-pointer transition-colors duration-200 text-sm font-medium tracking-wider">
                ABOUT</GlitchText>
              </Link>
              <Link href="#contact">
              <GlitchText className="text-white hover:text-green-400 cursor-pointer transition-colors duration-200 text-sm font-medium tracking-wider">
                CONTACT
              </GlitchText></Link>
            </div>
          </div>
        </div>
      </nav>
    );
}