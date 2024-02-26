'use client'
// components/ExperienceSection.tsx
import React, { useRef, useState } from 'react';
import ExperienceDropdown from './ExperienceDropdown';

const experiences:any = [
  // Populate this array with your experience data
  // {
  //   position: 'Software Engineer',
  //   company: 'Saimon Global Ltd',
  //   period: '2019 - Present',
  //   description: 'Quick blurb about your role...',
  //   accomplishments: ['Accomplishment 1', 'Accomplishment 2'],
  // },
  // ... more experiences
  {
    position:"Small Business Owner",
    company:"California Thrift Store",
    period:"Dec 2023 - Present",
    description:"Lead digital transformation of operations to lift inventory turnover ratio through multichannel retailing."
  },
  {
    position: "Solutions Engineer II",
    company: "Capital Group",
    period: "Apr 2023 - Dec 2023",
    description: "Managed and expanded custom HR and review systems, incorporating advanced automation to enhance operational efficiency and stakeholder satisfaction."
  },
  {
    position: "Solutions Engineer",
    company: "Capital Group",
    period: "Aug 2021 - Apr 2023",
    description: "Developed a full-stack web application to streamline HR processes, significantly reducing manual work and improving data management."
  },
  {
    position: "Post-Closing Intern",
    company: "CoreVest Finance",
    period: "Jul 2020 - Aug 2020",
    description: "Ensured accuracy and consistency in loan documentation, supporting audit readiness and operational integrity."
  },
  {
    position: "Commercial Lending Intern",
    company: "Pacific Enterprise Bank",
    period: "May 2019 - Sep 2019",
    description: "Conducted property site visits and financial analyses to validate loan eligibility and optimize lending decisions."
  },
  {
    position: "Research Protections Assistant",
    company: "UCI Office of Research",
    period: "Nov 2017 - Jun 2018",
    description: "Managed research records and compliance documentation, ensuring organization and accessibility for audit and review processes."
  }  
];

const ExperienceSection = () => {
  const [openDropdown, setOpenDropdown] = useState<any>(null);

  const handleDropdownClick = (index:number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const scrollToSection = (sectionId:any) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="experience" className="min-h-screen flex flex-col justify-center items-center text-white px-8 relative z-10">
      <h2 className="text-5xl font-bold mb-4">Work Experience</h2>
      <div className="w-full max-w-4xl mx-auto bg-black rounded-lg">
        {experiences.map((exp:any, index:number) => (
          <ExperienceDropdown
            key={index}
            position={exp.position}
            company={exp.company}
            period={exp.period}
            description={exp.description}
            isOpen={openDropdown === index}
            toggleOpen={() => handleDropdownClick(index)}
            logoUrl={exp.logoUrl}
          />
        ))}
      </div>
        <div className="flex justify-between w-full max-w-6xl px-4 absolute bottom-4 md:bottom-8">
            <button onClick={() => scrollToSection('about')} className="text-4xl text-white hover:text-gray-300 transition duration-300 ease-in-out">
                ↑
            </button>
            <button onClick={() => scrollToSection('projects')} className="text-4xl text-white hover:text-gray-300 transition duration-300 ease-in-out">
                ↓
            </button>
        </div>
    </section>
  );
};

export default ExperienceSection;
