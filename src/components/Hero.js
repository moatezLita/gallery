'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown } from 'lucide-react';
import FloatingPerson from './FloatingPerson';
import GradientBlobs from './GradientBlobs';
import TypedHeadline from './TypedHeadline';
import ParticleSystem from './ParticleSystem';

export default function Hero() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const parallaxRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the hero section
      gsap.from(heroRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      });

      // Animate the text elements
      gsap.from(textRef.current.children, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out'
      });

      // Animate the CTA
      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1,
        ease: 'power2.out'
      });
      
      // Parallax effect on scroll
      if (parallaxRef.current) {
        window.addEventListener('scroll', () => {
          const scrollY = window.scrollY;
          const elements = parallaxRef.current.children;
          
          // Apply different speeds to create parallax effect
          for (let i = 0; i < elements.length; i++) {
            const speed = 1 - (i * 0.1);
            gsap.to(elements[i], {
              y: scrollY * speed * 0.1,
              duration: 0.5,
              ease: 'power1.out'
            });
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      {/* Particle system background */}
      <ParticleSystem />
      
      {/* Gradient blobs */}
      <GradientBlobs />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Text content with parallax effect */}
          <div ref={parallaxRef} className="order-2 md:order-1">
            <div ref={textRef} className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
                <span className="block mb-2">I&apos;m a</span>
                <TypedHeadline 
                  phrases={[
                    "Web Designer",
                    "UI/UX Developer",
                    "Creative Coder",
                    "Frontend Expert"
                  ]}
                  className="text-indigo-600 dark:text-indigo-400"
                />
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Crafting beautiful, responsive, and user-friendly websites that make an impact.
                Bringing your vision to life with modern technologies and thoughtful design.
              </p>
              <div
                ref={ctaRef}
                className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
              >
                <a
                  href="#projects"
                  className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 bg-transparent border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600/10 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 w-full sm:w-auto text-center"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
          
          {/* Floating person */}
          <div className="order-1 md:order-2 flex justify-center">
            <FloatingPerson />
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll to explore</span>
          <ArrowDown className="w-6 h-6 animate-bounce text-indigo-500" />
        </div>
      </div>
    </section>
  );
}