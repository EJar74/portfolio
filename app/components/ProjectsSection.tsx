'use client'
// components/ProjectsSection.tsx
import React from 'react';
import ProjectItem from './ProjectItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

// Import the necessary Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const projects = [
  // Replace with your actual projects data
  {
    "title": "Siliconian Showdown",
    "image": "/SSLogo.png",
    "link": "https://siliconianshowdown.com",
    "description": "A revival of the childhood MMO 'Nanovor,' this project involved learning web development to create a modernized version. It features global matchmaking, customizable avatars, and fun game modes."
  },
  {
    "title": "California Thrift Store",
    "image": "/CTS.png",
    "link": "https://californiathriftstore.com",
    "description": "Developed an e-commerce platform for a family-owned thrift store, transitioning their business online. This site showcases unique finds, and offers intuitive shopping experiences."
  },
  {
    "title": "Nanovor Reborn",
    "image": "/Logo_Reborn.png",
    "link": "http://nanovorreborn.com",
    "description": "An ambitious project to advance the 'Nanovor' franchise. It aims to provide a sophisticated platform for new and returning players, with a dedicated website to engage the community."
  },
  {
    "title": "Vor: Silicon Showdown",
    "image":"/Vor.png",
    "link":"https://www.youtube.com/watch?v=mPGhiMdALts",
    "description":"An early rendition of Siliconian Showdown, a stand-alone executable made exclusively with Python using the Tkinter library for the UI. It was my first major project."
  }
  // ... more projects
];

const ProjectsSection = () => {
    const scrollToSection = (sectionId:any) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="projects" className="min-h-screen pt-20 p-8 relative z-10">
            <h2 className="text-4xl font-bold text-white text-center mb-8">Projects</h2>
            <Swiper
                modules={[Navigation, Pagination]} // Pass the modules
                spaceBetween={30}
                slidesPerView={1} // Adjust this value as needed
                navigation // Enable navigation
                pagination={{ clickable: true }} // Enable pagination
                breakpoints={{
                    // Adjust the number of slides per view based on breakpoints
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 4,
                    },
                }}
            >
                {projects.map((project:any, index:number) => (
                    <SwiperSlide key={project.id || index}>
                        <ProjectItem project={project} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="absolute left-4 bottom-4 md:left-8 md:bottom-8">
                <button onClick={() => scrollToSection('experience')} className="text-4xl text-white hover:text-gray-300 transition duration-300 ease-in-out">
                    ↑
                </button>
            </div>
            <div className="absolute right-4 bottom-4 md:right-8 md:bottom-8">
                <button onClick={() => scrollToSection('contact')} className="text-4xl text-white hover:text-gray-300 transition duration-300 ease-in-out">
                    ↓
                </button>
            </div>
        </section>
    );
};

export default ProjectsSection;
