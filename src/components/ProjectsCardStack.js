'use client';

import { useEffect, useRef, useState } from 'react';
import '../app/card-stack.css';
import '../app/scroll-indicator.css';
import { ExternalLink, ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function ProjectsCardStack() {
  const cardsWrapperRef = useRef(null);
  const cardsRef = useRef([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  // Sample project data
  const projects = [
    {
      id: 1,
      title: 'Modern E-Commerce Platform',
      description: 'A fully responsive e-commerce website with dark mode, animations, and seamless checkout experience.',
      tags: ['Next.js', 'TailwindCSS', 'Stripe', 'Framer Motion'],
      image: '/window.svg', // Placeholder image
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 2,
      title: 'Creative Agency Portfolio',
      description: 'Minimalist portfolio site for a creative agency featuring case studies and interactive elements.',
      tags: ['React', 'GSAP', 'Styled Components', 'Three.js'],
      image: '/globe.svg', // Placeholder image
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 3,
      title: 'Financial Dashboard',
      description: 'Data visualization dashboard with real-time updates, interactive charts, and responsive design.',
      tags: ['Vue.js', 'D3.js', 'TailwindCSS', 'Firebase'],
      image: '/file.svg', // Placeholder image
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 4,
      title: 'Social Media Application',
      description: 'Feature-rich social platform with real-time messaging, content sharing, and user profiles.',
      tags: ['React Native', 'GraphQL', 'Node.js', 'MongoDB'],
      image: '/window.svg', // Placeholder image
      color: 'from-purple-500 to-pink-600'
    },
  ];

  useEffect(() => {
    if (typeof window === 'undefined' || !cardsWrapperRef.current) return;

    // Get the cards wrapper and cards
    const $cardsWrapper = cardsWrapperRef.current;
    const $cards = cardsRef.current;

    // Pass the number of cards to the CSS because it needs it to add some extra padding
    const numCards = $cards.length;
    $cardsWrapper.style.setProperty('--numcards', numCards);
    
    /* VERTICAL SCROLLING CODE - COMMENTED OUT AS REQUESTED
    // Card dimensions and spacing
    const cardHeight = $cards[0]?.offsetHeight || 400;
    const marginY = 0; // No space between cards when stacked to ensure complete overlap
    
    // Initialize Intersection Observer to detect when cards enter viewport
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        // Cards inside viewport - add scroll listener
        window.addEventListener('scroll', handleScroll);
      } else {
        // Cards not inside viewport - remove scroll listener
        window.removeEventListener('scroll', handleScroll);
      }
    });
    
    observer.observe($cardsWrapper);
    
    // Handle scroll event
    const handleScroll = () => {
      // Use requestAnimationFrame for smooth animations
      window.requestAnimationFrame(() => {
        const wrapperTop = $cardsWrapper.getBoundingClientRect().top;
        const cardTop = 15 * window.innerHeight / 100; // Equivalent to top-[15vh]
        
        // Hide scroll indicator after user has scrolled a bit
        if (wrapperTop < 0) {
          setShowScrollIndicator(false);
        } else {
          setShowScrollIndicator(true);
        }
        
        // Apply transform to each card
        $cards.forEach(($card, i) => {
          // Calculate how much the card should be scaled down
          const scrolling = cardTop - wrapperTop - i * cardHeight;
          
          // Set z-index to ensure proper stacking (higher index = appears on top)
          $card.style.zIndex = numCards - i;
          
          if (scrolling > 0) { 
            // Card is fixed - scale it down
            const scale = (cardHeight - scrolling * 0.05) / cardHeight;
            $card.style.transform = `translateY(0) scale(${scale})`;
            // Make card visible
            $card.style.opacity = '1';
            
            // Update active card index for progress dots
            if (i > activeCardIndex) {
              setActiveCardIndex(i);
            }
          } else {
            // Card is not fixed yet - reset transform
            $card.style.transform = `translateY(0) scale(1)`;
            // Hide cards that should be underneath
            if (i > 0) {
              $card.style.opacity = '0';
            } else {
              $card.style.opacity = '1';
              
              // Reset active card index when scrolling back to top
              if (activeCardIndex !== 0) {
                setActiveCardIndex(0);
              }
            }
          }
        });
      });
    };
    
    // Initial positioning of cards
    $cards.forEach(($card, i) => {
      $card.style.transform = `translateY(0) scale(1)`;
      $card.style.transformOrigin = 'center top';
      $card.style.zIndex = numCards - i;
      // Initially only show the first card
      if (i > 0) {
        $card.style.opacity = '0';
      }
    });
    
    // Trigger initial scroll positioning
    handleScroll();
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
    */
  }, [activeCardIndex]);

  return (
    <section 
      id="projects" 
      className="py-24 relative overflow-hidden bg-white dark:bg-gray-900"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            A showcase of websites and applications I&apos;ve designed and developed
          </p>
        </div>

        {/* Card stack container */}
        <div 
          id="cards" 
          ref={cardsWrapperRef}
          className="stack-cards js-stack-cards relative min-h-[800px] mb-32 mx-auto max-w-4xl"
        >
          {/* Scroll indicator */}
          {showScrollIndicator && (
            <div className="scroll-indicator-container">
              <span className="scroll-indicator-text">Scroll to explore</span>
              <div className="scroll-indicator"></div>
              <div className="progress-dots">
                {projects.map((_, index) => (
                  <div 
                    key={index} 
                    className={`progress-dot ${index <= activeCardIndex ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          )}
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className="card stack-cards__item js-stack-cards__item h-[70vh] flex items-center justify-center"
              style={{ '--index': index + 1 }}
            >
              <div 
                ref={(el) => cardsRef.current[index] = el}
                className="card__content w-full bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                  {/* Project image */}
                  <div className={`bg-gradient-to-br ${project.color} rounded-xl p-6 flex items-center justify-center h-[200px] md:h-full`}>
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      width={128}
                      height={128}
                      className="w-32 h-32 object-contain filter invert" 
                    />
                  </div>
                  
                  {/* Project details */}
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6">
                        {project.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Call to action */}
                    <div className="mt-auto">
                      <a 
                        href="#" 
                        className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
                      >
                        View Project <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}