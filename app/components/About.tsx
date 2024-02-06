'use client'
// components/AboutSection.tsx
import React from 'react';
import Image from 'next/image';

const AboutSection = () => {
  const scrollToSection = (sectionId: any) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about"
             className="flex flex-col justify-center items-center text-white px-4 md:px-8 py-10 md:py-0 relative z-10 min-h-screen">
      <div className="container mx-auto flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">About</h2>
        <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-6 bg-black rounded-lg p-4 md:p-8">
          <div className="w-full md:w-1/3 mx-auto">
            {/* Replace with your image path */}
            <div className="inline-block overflow-hidden relative rounded-3xl w-32 h-48 md:w-48 md:h-72">
              <Image src="/portrait.png" alt="Eli Jaramillo" layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="w-full text-gray-300 text-xs md:text-base">
            <p>
            {"I'm Eli Jaramillo, a passionate Software Engineer with a keen interest in stepping into the Product Management realm. My educational journey at the University of California, Irvine, where I earned dual degrees in Business Economics and Informatics with a specialization in Human-Computer Interaction, has equipped me with a unique blend of skills that bridge the gap between technology and business. My experience at Capital Group, managing projects that significantly improved operational efficiency and user satisfaction, has honed my ability to translate complex technical challenges into user-centric solutions. I'm driven by the challenge of innovating and optimizing products to enhance people's lives and businesses. Welcome to my portfolio, where I share my journey, projects, and the impact of my work."}
              {/* Your full biography and education information goes here */}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between w-full max-w-6xl px-4 absolute bottom-4 md:bottom-8">
        <button onClick={() => scrollToSection('home')} className="text-4xl text-white hover:text-gray-300 transition duration-300 ease-in-out">
            ↑
        </button>
        <button onClick={() => scrollToSection('experience')} className="text-4xl text-white hover:text-gray-300 transition duration-300 ease-in-out">
            ↓
        </button>
      </div>
    </section>
  );
};

export default AboutSection;
