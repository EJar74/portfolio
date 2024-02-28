'use client'
// components/Main.tsx
import React from 'react';

const Main = () => {
  const scrollToAboutSection = (e:any) => {
    e.preventDefault();

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <main id="home" className="flex flex-col items-center justify-center min-h-screen py-2 relative z-10">
      <h2 className="text-6xl md:text-8xl font-extrabold text-white mb-4">Eli Jaramillo</h2>
      <p className="text-xl md:text-2xl text-gray-300">Software Engineer</p>
      <div className="mt-8">
        <a href="#about" onClick={scrollToAboutSection} className="text-4xl animate-bounce text-white cursor-pointer">
          ↓
        </a>
      </div>
    </main>
  );
};

export default Main;
