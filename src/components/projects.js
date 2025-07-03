'use client';
import Contact from './contact';
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

const ProjectsSection = () => {
  const [showContact, setShowContact] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeProject, setActiveProject] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideo, setModalVideo] = useState(null);
  const containerRef = useRef(null);

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
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const totalScrollable = documentHeight - windowHeight;
    const progress = Math.min(Math.max(scrollTop / totalScrollable, 0), 1);

    setScrollProgress(progress);
    setShowContact(progress > 0.99);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [updateScrollProgress]);

  const openModal = (project) => {
    if (project.videoUrl) {
      setModalVideo(project);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalVideo(null);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <div id="projects" className="relative bg-[#161412] min-h-screen">

      <div className="fixed top-0 left-0 w-full h-1 bg-[#5a473a] z-50">
        <div
          className="h-full bg-gradient-to-r from-[#c7bdb1] to-[#ffffff] transition-all duration-100"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #c7bdb1 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div
        ref={containerRef}
        className={`relative transition-all duration-1000 ${
          showContact ? 'transform scale-95 opacity-70' : 'transform scale-100 opacity-100'
        }`}
      >

        <div className="text-center py-16 px-0 md:py-20 md:px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-[#ffffff] mb-4">
            Featured Projects
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#c7bdb1] to-[#ffffff] mx-auto mb-6"></div>
          <p className="text-[#ddd9d6] text-lg md:text-lg max-w-2xl mx-auto px-0 md:px-0">
            A collection of projects showcasing modern web development and innovative solutions
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-0 md:px-4 pb-20 md:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-[#161412] border border-[#5a473a] border-opacity-30 rounded-xl overflow-hidden hover:border-opacity-60 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl"
                onMouseEnter={() => setActiveProject(index)}
              >
  
                <div 
                  className="relative aspect-video bg-[#5a473a] bg-opacity-20 overflow-hidden cursor-pointer"
                  onClick={() => openModal(project)}
                >
                  {project.videoUrl ? (
                    <>
                      <video
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        muted
                        loop
                        autoPlay
                        playsInline
                      >
                        <source src={project.videoUrl} type="video/mp4" />
                      </video>

                      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-[#c7bdb1] bg-opacity-90 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 md:w-8 md:h-8 text-[#161412]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <div className="text-[#c7bdb1] text-3xl md:text-4xl font-bold opacity-30 mb-2">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                        <div className="text-[#c7bdb1] text-xs md:text-sm opacity-50">
                          Video Coming Soon
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 left-3 md:top-4 md:left-4 w-7 h-7 md:w-8 md:h-8 bg-[#c7bdb1] bg-opacity-90 rounded-full flex items-center justify-center">
                    <span className="text-[#161412] text-xs md:text-sm font-bold">
                      {index + 1}
                    </span>
                  </div>

                  {project.videoUrl && (
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 flex items-center gap-1 md:gap-2 bg-[#161412] bg-opacity-80 px-2 py-1 md:px-3 md:py-1 rounded-full">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-[#c7bdb1] text-xs">LIVE</span>
                    </div>
                  )}
                </div>

                <div className="p-6 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-[#ffffff] mb-3 group-hover:text-[#c7bdb1] transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-[#ddd9d6] text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6 md:mb-6">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2.5 py-1 md:px-3 md:py-1 text-xs bg-[#5a473a] bg-opacity-50 text-[#c7bdb1] rounded-full border border-[#c7bdb1] border-opacity-30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.liveLink === '#' ? undefined : project.liveLink}
                      target={project.liveLink === '#' ? undefined : "_blank"}
                      rel={project.liveLink === '#' ? undefined : "noopener noreferrer"}
                      className={`flex-1 py-3 px-4 md:py-2 md:px-4 rounded-lg text-center text-sm font-medium transition-all duration-300 ${
                        project.liveLink === '#'
                          ? 'bg-[#5a473a] text-[#c7bdb1] cursor-not-allowed opacity-50'
                          : 'bg-[#c7bdb1] text-[#161412] hover:bg-[#ffffff] hover:shadow-lg transform hover:scale-105'
                      }`}
                      onClick={project.liveLink === '#' ? (e) => e.preventDefault() : undefined}
                    >
                      {project.liveLink === '#' ? 'Coming Soon' : 'Live Demo'}
                    </a>

                    <a
                      href={project.sourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 px-4 md:py-2 md:px-4 border border-[#c7bdb1] border-opacity-50 text-[#c7bdb1] rounded-lg hover:bg-[#c7bdb1] hover:text-[#161412] transition-all duration-300 text-center text-sm font-medium hover:shadow-lg transform hover:scale-105"
                    >
                      Source Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-24 md:h-32"></div>
      </div>

      {isModalOpen && modalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-4 bg-black bg-opacity-90 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl bg-[#161412] rounded-lg overflow-hidden border border-[#5a473a]">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-8 h-8 md:w-10 md:h-10 bg-[#5a473a] bg-opacity-80 hover:bg-opacity-100 text-[#c7bdb1] rounded-full flex items-center justify-center transition-all duration-300"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="aspect-video">
              <video
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={modalVideo.videoUrl} type="video/mp4" />
              </video>
            </div>

            <div className="p-4 md:p-6 bg-gradient-to-t from-[#161412] to-transparent">
              <h3 className="text-xl md:text-2xl font-bold text-[#ffffff] mb-2">
                {modalVideo.title}
              </h3>
              <p className="text-[#ddd9d6] text-sm md:text-base">
                {modalVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className={`fixed inset-0 transition-all duration-1000 z-40 ${
        showContact ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <Contact />
      </div>
    </div>
  );
};

export default ProjectsSection;