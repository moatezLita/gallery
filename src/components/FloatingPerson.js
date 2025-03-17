'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

export default function FloatingPerson() {
  const personRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Create a floating animation for the person
    gsap.to(personRef.current, {
      y: 15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Mouse movement parallax effect
    const handleMouseMove = (e) => {
      if (!containerRef.current || !personRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      
      // Calculate mouse position relative to the container
      const x = clientX - left;
      const y = clientY - top;
      
      // Calculate rotation based on mouse position
      const rotateX = gsap.utils.mapRange(0, height, 5, -5, y);
      const rotateY = gsap.utils.mapRange(0, width, -5, 5, x);
      
      // Animate the person with mouse movement
      gsap.to(personRef.current, {
        rotateX,
        rotateY,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
      <div 
        ref={personRef} 
        className="w-[300px] h-[400px] md:w-[400px] md:h-[500px] relative transform-gpu"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Replace with your actual person cutout image */}
        <Image
          src="/person-cutout.svg"
          alt="Designer"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}