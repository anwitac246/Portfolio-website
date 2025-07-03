"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from 'next/link';

const GlitchText = ({ children, className = "" }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchText, setGlitchText] = useState(children);

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';

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
    }, 40);

    return () => clearInterval(interval);
  }, [extractTextFromChildren, isGlitching, children]);

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
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-white font-mono text-lg">PORTFOLIO</div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            <Link href="#projects" onClick={closeMenu}>
              <GlitchText className="text-white hover:text-green-400 cursor-pointer transition duration-200 text-sm font-medium tracking-wider">
                PROJECTS
              </GlitchText>
            </Link>
            <Link href="#about" onClick={closeMenu}>
              <GlitchText className="text-white hover:text-green-400 cursor-pointer transition duration-200 text-sm font-medium tracking-wider">
                ABOUT
              </GlitchText>
            </Link>
            <Link href="#achievements" onClick={closeMenu}>
              <GlitchText className="text-white hover:text-green-400 cursor-pointer transition duration-200 text-sm font-medium tracking-wider">
                ACHIEVEMENTS
              </GlitchText>
            </Link>
            <Link href="#contact" onClick={closeMenu}>
              <GlitchText className="text-white hover:text-green-400 cursor-pointer transition duration-200 text-sm font-medium tracking-wider">
                CONTACT
              </GlitchText>
            </Link>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link href="#projects" onClick={closeMenu}>
              <GlitchText className="block text-white hover:text-green-400 text-sm font-medium tracking-wider">
                PROJECTS
              </GlitchText>
            </Link>
            <Link href="#about" onClick={closeMenu}>
              <GlitchText className="block text-white hover:text-green-400 text-sm font-medium tracking-wider">
                ABOUT
              </GlitchText>
            </Link>
            <Link href="#achievements" onClick={closeMenu}>
              <GlitchText className="block text-white hover:text-green-400 text-sm font-medium tracking-wider">
                ACHIEVEMENTS
              </GlitchText>
            </Link>
            <Link href="#contact" onClick={closeMenu}>
              <GlitchText className="block text-white hover:text-green-400 text-sm font-medium tracking-wider">
                CONTACT
              </GlitchText>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
