'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function SwipeProjects() {
  const swipeSectionRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const swipePanelsRef = useRef([]);
  const horizontalPanelsRef = useRef([]);

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
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    /* VERTICAL SCROLLING CODE (COMMENTED OUT)
    // Variables for swipe section
    let allowScroll = true; // sometimes we want to ignore scroll-related stuff
    let scrollTimeout = gsap.delayedCall(1, () => allowScroll = true).pause(); // controls how long to wait before allowing another scroll action
    let currentIndex = 0;
    let swipePanels = swipePanelsRef.current;

    // Set z-index levels for the swipe panels
    gsap.set(swipePanels, { zIndex: i => swipePanels.length - i });

    // Create an observer and disable it to start
    let intentObserver = ScrollTrigger.observe({
      type: "wheel,touch",
      onUp: () => allowScroll && gotoPanel(currentIndex - 1, false),
      onDown: () => allowScroll && gotoPanel(currentIndex + 1, true),
      tolerance: 10,
      preventDefault: true,
      onEnable(self) {
        allowScroll = false;
        scrollTimeout.restart(true);
        // When enabling, save the scroll position and freeze it
        let savedScroll = self.scrollY();
        self._restoreScroll = () => self.scrollY(savedScroll); // force back to where it should be
        document.addEventListener("scroll", self._restoreScroll, {passive: false});
      },
      onDisable: self => document.removeEventListener("scroll", self._restoreScroll)
    });
    intentObserver.disable();

    // Handle the panel swipe animations
    function gotoPanel(index, isScrollingDown) {
      // Return to normal scroll if we're at the end or back up to the start
      if ((index === swipePanels.length && isScrollingDown) || (index === -1 && !isScrollingDown)) {
        intentObserver.disable(); // resume native scroll
        return;
      }
      allowScroll = false;
      scrollTimeout.restart(true);

      let target = isScrollingDown ? swipePanels[currentIndex] : swipePanels[index];
      gsap.to(target, {
        yPercent: isScrollingDown ? -100 : 0,
        duration: 0.75
      });

      currentIndex = index;
    }

    // Pin swipe section and initiate observer
    ScrollTrigger.create({
      trigger: ".swipe-section",
      pin: true,
      start: "top top",
      end: "+=200", // just enough to prevent vibration during fast-scroll
      onEnter: (self) => {
        if (intentObserver.isEnabled) { return } // in case native scroll jumped past the end
        self.scroll(self.start + 1); // jump to just one pixel past the start
        intentObserver.enable(); // STOP native scrolling
      },
      onEnterBack: (self) => {
        if (intentObserver.isEnabled) { return } // in case native scroll jumped backward
        self.scroll(self.end - 1); // jump to one pixel before the end
        intentObserver.enable(); // STOP native scrolling
      }
    });
    */

    // Horizontal scrolling section
    let horizontalPanels = horizontalPanelsRef.current;
    gsap.to(horizontalPanels, {
      xPercent: -100 * (horizontalPanels.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: '.horizontal-section',
        pin: true,
        scrub: 1,
        end: "+=3500",
      }
    });

    return () => {
      // Clean up all ScrollTriggers
      ScrollTrigger.getAll().forEach(st => st.kill());
      // Vertical scrolling cleanup removed as it's no longer used
    };
  }, []);

  return (
    <section id="projects" className="relative">
      {/* Introduction panel */}
      <div className="description panel bg-white dark:bg-gray-900 h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            A showcase of websites and applications I&apos;ve designed and developed
          </p>
          <div className="scroll-down flex flex-col items-center">
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-2">Scroll horizontally</span>
            <div className="arrow w-6 h-6 border-r-2 border-b-2 border-indigo-500 transform rotate-45 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Horizontal scrolling section */}
      <div ref={horizontalSectionRef} className="horizontal-section relative overflow-hidden">
        <div className="container horizontal flex flex-nowrap">
          {projects.map((project, index) => (
            <section 
              key={`horizontal-${project.id}`}
              ref={(el) => horizontalPanelsRef.current[index] = el}
              className="panel w-screen h-screen flex-shrink-0 flex items-center justify-center p-8"
            >
              <div className={`w-full h-full max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-10 shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center h-full">
                  {/* Project image - enhanced with better styling */}
                  <div className={`bg-gradient-to-br ${project.color} rounded-2xl p-10 flex items-center justify-center h-full transform transition-transform duration-500 hover:scale-105`}>
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      width={300}
                      height={300}
                      className="w-72 h-72 object-contain filter invert drop-shadow-xl" 
                    />
                  </div>
                  
                  {/* Project details - enhanced with better typography and spacing */}
                  <div className="flex flex-col justify-between h-full py-4">
                    <div>
                      <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Tags - enhanced with better styling */}
                      <div className="flex flex-wrap gap-3 mb-10">
                        {project.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="px-5 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-md rounded-full font-medium shadow-sm transition-all duration-300 hover:shadow-md hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="space-y-6 bg-gray-50 dark:bg-gray-750 p-6 rounded-xl">
                        <h4 className="text-2xl font-semibold text-gray-900 dark:text-white">Key Features</h4>
                        <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-3 text-lg">
                          <li>Responsive design for all devices</li>
                          <li>Modern UI with smooth animations</li>
                          <li>Optimized performance and accessibility</li>
                          <li>Intuitive user experience</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-10">
                      <a 
                        href="#" 
                        className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        View Full Case Study <ExternalLink className="ml-2 w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}