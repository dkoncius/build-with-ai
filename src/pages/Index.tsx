
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CourseDetails from '@/components/CourseDetails';
import LearningOutcomes from '@/components/LearningOutcomes';
import CourseProgram from '@/components/CourseProgram';
import Instructor from '@/components/Instructor';
import Registration from '@/components/Registration';
import Footer from '@/components/Footer';

const Index = () => {
  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  useEffect(() => {
    // Update document title
    document.title = "Build with AI | Mokymai 9-13 m. moksleiviams";
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CourseDetails />
        <LearningOutcomes />
        <CourseProgram />
        <Instructor />
        <Registration />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
