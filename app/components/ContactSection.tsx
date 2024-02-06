'use client'
// components/ContactSection.tsx
import React from 'react';

const ContactSection = () => {

  const scrollToProjects = () => {
    let projects = document.getElementById('projects');
    if (projects){
        projects.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="contact" className="min-h-screen p-8 flex flex-col items-center justify-center relative z-10">
      <h2 className="text-4xl font-bold text-white mb-4">{"Let's Connect"}</h2>
      <p className="text-white text-lg text-center mb-6 max-w-md">
        {"I'm always open to new connections and opportunities. Looking forward to hearing from you!"}
      </p>
      <a href="mailto:Eli.Jaramillo74@gmail.com" className="text-white text-lg hover:opacity-75 transition-opacity duration-300">
        {"Send me an email"}
      </a>
      <a href="https://github.com/EJar74" target="_blank" rel="noopener noreferrer" className="text-white text-lg hover:opacity-75 transition-opacity duration-300 mt-2">
        {"Visit my GitHub"}
      </a>
      <button 
        onClick={scrollToProjects} 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-4xl cursor-pointer"
        aria-label="Go to Projects"
      >
        ↑
      </button>
    </section>
  );
};

export default ContactSection;
