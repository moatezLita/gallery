'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function GradientBlobs() {
  const blobsRef = useRef(null);

  useEffect(() => {
    if (!blobsRef.current) return;
    
    const blobs = blobsRef.current.querySelectorAll('.blob');
    
    // Create random animations for each blob
    blobs.forEach((blob) => {
      // Random starting position
      gsap.set(blob, {
        x: gsap.utils.random(-100, 100),
        y: gsap.utils.random(-100, 100),
        scale: gsap.utils.random(0.8, 1.2),
        opacity: gsap.utils.random(0.3, 0.7)
      });
      
      // Animate each blob with random parameters
      gsap.to(blob, {
        x: gsap.utils.random(-150, 150),
        y: gsap.utils.random(-150, 150),
        scale: gsap.utils.random(0.7, 1.3),
        opacity: gsap.utils.random(0.2, 0.6),
        duration: gsap.utils.random(15, 25),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: gsap.utils.random(0, 5)
      });
      
      // Rotate blobs slowly
      gsap.to(blob, {
        rotation: gsap.utils.random(-180, 180),
        duration: gsap.utils.random(20, 40),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }, []);

  return (
    <div ref={blobsRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="blob w-[300px] h-[300px] absolute top-[-50px] left-[-50px] rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl"></div>
      <div className="blob w-[400px] h-[400px] absolute bottom-[-100px] right-[-100px] rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl"></div>
      <div className="blob w-[250px] h-[250px] absolute top-[30%] right-[10%] rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 blur-3xl"></div>
      <div className="blob w-[350px] h-[350px] absolute bottom-[20%] left-[5%] rounded-full bg-gradient-to-r from-amber-500/20 to-yellow-500/20 blur-3xl"></div>
    </div>
  );
}