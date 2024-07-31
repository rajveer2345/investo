import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('');

  const handleScroll = () => {
    console.log(window.scrollY)
    const sections = document.querySelectorAll('section');
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute('id');
      }
    });

    setActiveSection(current);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-center space-x-4">
        <a
          href="#section1"
          className={`px-4 py-2 ${activeSection === 'section1' ? 'bg-blue-500' : 'hover:bg-blue-700'}`}
        >
          Section 1
        </a>
        <a
          href="#section2"
          className={`px-4 py-2 ${activeSection === 'section2' ? 'bg-blue-500' : 'hover:bg-blue-700'}`}
        >
          Section 2
        </a>
        <a
          href="#section3"
          className={`px-4 py-2 ${activeSection === 'section3' ? 'bg-blue-500' : 'hover:bg-blue-700'}`}
        >
          Section 3
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
