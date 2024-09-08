import React, { useEffect, useState } from 'react';
import logo from '../assets/images/Mediaicon.ico'
const Navbar = () => {
  const [activeSection, setActiveSection] = useState('section1');

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
    <nav className="fixed top-0 left-0 w-full bg-secondary text-white py-2 sm:px-8 px-1 text-xs font-poppins font-medium box-border z-40">
      <div className="flex justify-between">

        <img className='w-12 rounded-md me-1' src={logo} alt="logo" />

        <div className='flex justify-between sm:gap-3 gap-0 items-center'>

          <a
            href="#section1"
            className={`px-4 py-2 rounded-full ${activeSection === 'section1' ? 'bg-primary text-black' : 'hover:border border-primary'}`}
          >
            Home
          </a>
          <a
            href="#section2"
            className={`px-4 py-2 rounded-full ${activeSection === 'section2' ? 'bg-primary text-black' : 'hover:border border-primary'}`}
          >
            About
          </a>
          <a
            href="#section3"
            className={`px-4 py-2 rounded-full ${activeSection === 'section3' ? 'bg-primary text-black' : 'hover:border border-primary'}`}
          >
            Contact
          </a>
          <a
            href="#section4"
            className={`px-4 py-2 rounded-full ${activeSection === 'section4' ? 'bg-primary text-black' : 'hover:border border-primary'}`}
          >
            Testimonials
          </a>

        </div>


      </div>
    </nav>
  );
};

export default Navbar;
