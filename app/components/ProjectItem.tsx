// components/ProjectItem.tsx
import React from 'react';
import Image from 'next/image';

const ProjectItem = ({ project }:any) => {
  return (
    <div className="relative bg-gray-800 text-white rounded-lg shadow-lg overflow-hidden">
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        <div className="w-full h-40 relative overflow-hidden">
          <Image src={project.image} alt={project.title} layout="fill" objectFit="cover" />
        </div>
      </a>
      <div className="p-4">
        <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
        <p className="text-gray-400 text-sm">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectItem;
