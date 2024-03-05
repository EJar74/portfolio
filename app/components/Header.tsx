'use client'
// components/Header.tsx
import { useState } from 'react';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuHover = (menu:any) => {
    setActiveMenu(menu);
  };

  const handleMenuLeave = () => {
    setActiveMenu(null);
  };

  const scrollToSection = (e:any, sectionId:any) => {
    e.preventDefault();
    setIsNavOpen(false); // Close the mobile menu when a link is clicked
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-30 bg-black text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, 'home')}
          className="text-3xl font-bold cursor-pointer"
        >
          Eli Jaramillo
        </a>
        <div className="md:hidden">
          <button onClick={() => setIsNavOpen(!isNavOpen)}>
            {/* Hamburger Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isNavOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
        <nav
          className={`absolute inset-0 transform md:relative md:transform-none bg-black bg-opacity-90 md:bg-opacity-0 md:bg-transparent ${
            isNavOpen ? 'scale-100' : 'scale-0'
          } transition-transform duration-300 ease-in-out`}
          onMouseLeave={handleMenuLeave}
        >
          {isNavOpen && (
            <button
              onClick={() => setIsNavOpen(false)}
              className="absolute top-4 right-4 md:hidden"
            >
              {/* Close Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <ul className="flex flex-col items-center justify-center bg-black min-h-screen md:min-h-0 md:flex-row md:space-x-4 pt-20 md:pt-0">
            {/* Menu items... */}
            {['Home', 'About', 'Experience', 'Projects', 'Resume', 'Contact'].map((menu) => {
              const isResume = menu === 'Resume';
              const menuId = menu.toLowerCase();
              return (
                <li
                  key={menu}
                  onMouseEnter={() => handleMenuHover(menu)}
                  onMouseLeave={handleMenuLeave}
                  className={`transition-opacity duration-200 ease-in-out ${
                    activeMenu === menu ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {!isResume ? (
                    <a
                      href={`#${menuId}`}
                      onClick={(e) => scrollToSection(e, menuId)}
                      className="text-lg font-medium cursor-pointer block py-2 md:py-0 px-4"
                    >
                      {menu}
                    </a>
                  ) : (
                    <a
                      href="/Eli_Jaramillo_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium cursor-pointer block py-2 md:py-0 px-4"
                    >
                      {menu}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

