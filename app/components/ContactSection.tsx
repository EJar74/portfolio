'use client'
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
      <div className="text-center z-20 bg-black rounded-lg p-6">
        <h2 className="text-5xl font-bold text-white mb-4">{"Let's Connect"}</h2>
        <p className="text-white text-lg mb-6 max-w-md">
          {"I'm always open to new connections and opportunities. Looking forward to hearing from you!"}
        </p>
        <a href="mailto:Eli.Jaramillo74@gmail.com" className="text-white text-lg hover:opacity-75 transition-opacity duration-300 block">
          {"Send me an email"}
        </a>
        <a href="https://github.com/EJar74" target="_blank" rel="noopener noreferrer" className="text-white text-lg hover:opacity-75 transition-opacity duration-300 mt-2 block">
          {"Visit my GitHub"}
        </a>
      </div>
      <button 
        onClick={scrollToProjects} 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-4xl cursor-pointer z-20"
        aria-label="Go to Projects"
      >
        ↑
      </button>
    </section>
  );
};

export default ContactSection;

