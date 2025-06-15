"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./navbar";
import About from "./about";


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

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const [nameVisible, setNameVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    
    setTimeout(() => setNameVisible(true), 500);
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const zoomScale = Math.min(1 + scrollY * 0.002, 3);
  const nameOpacity = Math.max(1 - scrollY * 0.003, 0);
  const showSecondFrame = scrollY > 300;

  return (
    <div className="relative">

      <Navbar/>

      <div className="relative flex h-screen w-full items-center justify-center bg-black overflow-hidden">
 
        <div 
          className="absolute inset-0"
          style={{
            backgroundSize: '60px 60px',
            backgroundImage: 'linear-gradient(to right, #262626 1px, transparent 1px), linear-gradient(to bottom, #262626 1px, transparent 1px)',
            transform: 'rotate(45deg) scale(1.5)'
          }}
        />

        <div 
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black"
          style={{
            maskImage: 'radial-gradient(ellipse at center, transparent 20%, black)'
          }}
        />
       
        <div 
          className="relative z-10 text-center"
          style={{
            transform: `scale(${zoomScale})`,
            opacity: nameOpacity,
            transition: 'opacity 0.1s ease-out'
          }}
        >
          <h1 
            className={`text-6xl md:text-8xl font-bold text-white transition-all duration-2000 ease-out ${
              nameVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{
              textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
              letterSpacing: '0.1em'
            }}
          >
            ANWITA CHAKRABORTY
          </h1>
          <p 
            className={`text-xl md:text-2xl text-gray-400 mt-4 transition-all duration-2000 delay-500 ease-out ${
              nameVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ letterSpacing: '0.2em' }}
          >
            FULL STACK DEVELOPER | COMPETITIVE CODER
          </p>
        </div>

   
       
    
        <div 
          className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white transition-opacity duration-500 ${
            showSecondFrame ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-sm mb-2 tracking-wider">SCROLL</span>
            <div className="w-px h-8 bg-white"></div>
          </div>
        </div>
      </div>

   
      <About />
    </div>
  );
}