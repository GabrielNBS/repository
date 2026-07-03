import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Bridge from '@/components/sections/Bridge';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import ScrollTop from '@/components/ui/ScrollTop';

export default function Home() {
  return (
    <main id="top" className="min-h-screen overflow-x-clip">
      <Header />
      <Hero />
      <Bridge />
      <About />
      <Projects />
      <Contact />
      <Footer />
      <ScrollTop />
    </main>
  );
}
