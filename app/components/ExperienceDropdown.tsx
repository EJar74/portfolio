// components/ExperienceDropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface Props{
    position:string;
    company:string;
    period:string;
    description:string;
    isOpen:boolean;
    toggleOpen:any;
    logoUrl:string;
}

const ExperienceDropdown = ({ position, company, period, description, isOpen, toggleOpen, logoUrl }:Props) => {
  const [contentHeight, setContentHeight] = useState<any>('0px');
  const contentRef = useRef<any>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setContentHeight(`${contentRef.current.scrollHeight}px`);
        const transitionEnd = () => {
          if (isOpen) setContentHeight('auto'); // 'auto' allows content to resize on window changes
          contentRef.current.removeEventListener('transitionend', transitionEnd);
        };
        contentRef.current.addEventListener('transitionend', transitionEnd);
      } else {
        setContentHeight('0px'); // Collapse content immediately
      }
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-700 overflow-hidden transition-height duration-500 ease-in-out">
      <button className="w-full text-left px-2 py-3 hover:bg-gray-800 focus:outline-none" onClick={toggleOpen}>
        <div className="flex justify-between items-start md:items-center">
          <div className="flex-1">
            <span className="block font-bold text-sm sm:text-base">{position}</span>
            <span className="block text-sm sm:text-base">@ {company}</span>
          </div>
          <div className="flex-shrink-0 ml-4 text-right">
            <span className="block text-xs sm:text-sm whitespace-nowrap">{period}</span>
            <div className="text-lg">{isOpen ? '↑' : '↓'}</div>
          </div>
        </div>
      </button>
      <div
        ref={contentRef}
        style={{ maxHeight: contentHeight }}
        className="transition-height duration-500 ease-in-out"
      >
        <div className="flex flex-col p-2 sm:p-4 bg-gray-900 text-gray-300 text-xs sm:text-sm">
          <div className="flex-1 mb-2">
            <p>{description}</p>
          </div>
          {logoUrl && (
            <div className="flex justify-end pl-2 sm:pl-4 w-16 sm:w-24">
              <Image src={logoUrl} alt={`${company} Logo`} layout="responsive" width={100} height={100} className="rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceDropdown;
