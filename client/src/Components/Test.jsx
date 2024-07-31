import React from 'react';
import Navbar from './Navbar';

const Test = () => {
  return (
    <div className="relative">
      <Navbar />
      <main className="pt-16">
        <section id="section1" className="h-screen bg-gray-100 flex items-center justify-center">
          <h1 className="text-4xl">Section 1</h1>
        </section>
        <section id="section2" className="h-screen bg-gray-200 flex items-center justify-center">
          <h1 className="text-4xl">Section 2</h1>
        </section>
        <section id="section3" className="h-screen bg-gray-300 flex items-center justify-center">
          <h1 className="text-4xl">Section 3</h1>
        </section>
      </main>
    </div>
  );
};

export default Test;
