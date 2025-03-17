'use client';

import { useEffect, useRef, useState } from 'react';

export default function TypedHeadline({ phrases = [], className = '', speed = 100, delay = 1500 }) {
  const [currentPhrase, setCurrentPhrase] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [delta, setDelta] = useState(speed);
  const cursorRef = useRef(null);

  useEffect(() => {
    // Blinking cursor animation
    if (cursorRef.current) {
      const blink = () => {
        cursorRef.current.classList.toggle('opacity-0');
      };
      const interval = setInterval(blink, 500);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    if (phrases.length === 0) return;

    const tick = () => {
      const fullPhrase = phrases[phraseIndex];
      const updatedPhrase = isDeleting
        ? fullPhrase.substring(0, currentPhrase.length - 1)
        : fullPhrase.substring(0, currentPhrase.length + 1);

      setCurrentPhrase(updatedPhrase);

      // If deleting, speed up the process
      if (isDeleting) {
        setDelta(speed / 1.5);
      }

      // If completed typing the current phrase
      if (!isDeleting && updatedPhrase === fullPhrase) {
        // Pause at the end of the phrase
        setDelta(delay);
        setIsDeleting(true);
      } else if (isDeleting && updatedPhrase === '') {
        setIsDeleting(false);
        // Move to the next phrase
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        // Reset typing speed
        setDelta(speed);
      }
    };

    const timer = setTimeout(tick, delta);
    return () => clearTimeout(timer);
  }, [currentPhrase, delta, isDeleting, phraseIndex, phrases, speed, delay]);

  return (
    <div className={`inline-flex items-center ${className}`}>
      <span>{currentPhrase}</span>
      <span ref={cursorRef} className="ml-1 font-bold transition-opacity">|</span>
    </div>
  );
}