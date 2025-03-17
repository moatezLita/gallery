'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Globe, Zap, Check, DollarSign, Star, Award, Shield } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const headingRef = useRef(null);
  const linesRef = useRef(null);
  const pricingRef = useRef(null);
  const [activePlan, setActivePlan] = useState('standard');

  const services = [
    {
      title: 'Web Development',
      description: 'Crafting responsive and user-friendly websites tailored to your needs.',
      icon: <Code size={24} />,
    },
    {
      title: 'UI/UX Design',
      description: 'Creating intuitive and visually appealing user interfaces.',
      icon: <Palette size={24} />,
    },
    {
      title: 'SEO Optimization',
      description: 'Improve your website\'s visibility and ranking on search engines.',
      icon: <Globe size={24} />,
    },
    {
      title: 'Performance Optimization',
      description: 'Enhance the speed and performance of your website.',
      icon: <Zap size={24} />,
    },
    {
      title: 'Maintenance and Support',
      description: 'Ensure your website stays up-to-date and running smoothly.',
      icon: <Check size={24} />,
    },
  ];

  const pricingPlans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 499,
      description: 'Perfect for small businesses just getting started online.',
      features: [
        'Responsive Website Design',
        'Up to 5 Pages',
        'Basic SEO Setup',
        'Contact Form',
        '1 Month Support',
      ],
      icon: <Star className="h-6 w-6 text-blue-500" />,
      color: 'border-blue-500',
      buttonColor: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 999,
      description: 'Ideal for growing businesses needing more features.',
      features: [
        'Everything in Basic',
        'Up to 10 Pages',
        'Advanced SEO Optimization',
        'Blog Integration',
        'Social Media Integration',
        '3 Months Support',
      ],
      icon: <Award className="h-6 w-6 text-indigo-500" />,
      color: 'border-indigo-500',
      buttonColor: 'bg-indigo-600 hover:bg-indigo-700',
      popular: true,
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 1999,
      description: 'For businesses requiring advanced features and customization.',
      features: [
        'Everything in Standard',
        'Unlimited Pages',
        'E-commerce Integration',
        'Custom Animations',
        'Performance Optimization',
        'Priority Support',
        '6 Months Support',
      ],
      icon: <Shield className="h-6 w-6 text-purple-500" />,
      color: 'border-purple-500',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the heading
      gsap.from(headingRef.current.children, {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
        }
      });

      // Animate the cards with staggered reveal
      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.from(cards, {
          opacity: 0,
          y: 100,
          scale: 0.9,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 75%',
          }
        });
      }

      // Animate connecting lines
      if (linesRef.current) {
        const lines = linesRef.current.children;
        gsap.from(lines, {
          width: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          stagger: 0.2,
          scrollTrigger: {
            trigger: linesRef.current,
            start: 'top 70%',
          }
        });
      }

      // Animate pricing cards
      if (pricingRef.current) {
        const pricingCards = pricingRef.current.children;
        gsap.from(pricingCards, {
          opacity: 0,
          y: 50,
          scale: 0.95,
          stagger: 0.2,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: pricingRef.current,
            start: 'top 75%',
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%239C92AC\' fill-opacity=\'0.4\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'3\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'3\'/%3E%3C/g%3E%3C/svg%3E")',
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Services section heading */}
        <div ref={headingRef} className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Expert solutions to bring your digital vision to life
          </p>
        </div>

        {/* Services cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-b-4 border-indigo-500 dark:border-indigo-400 group"
            >
              <div className="w-14 h-14 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-6 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Connecting lines */}
        <div ref={linesRef} className="hidden md:block relative h-24 mb-16">
          <div className="absolute left-1/4 right-1/4 top-1/2 h-0.5 bg-indigo-200 dark:bg-indigo-800"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-200 dark:bg-indigo-800"></div>
        </div>

        {/* Pricing section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Pricing Plans
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Flexible options tailored to your needs
          </p>
        </div>

        {/* Pricing cards */}
        <div ref={pricingRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.id}
              className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-t-4 ${plan.color} transition-all duration-300 hover:shadow-xl ${activePlan === plan.id ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-gray-900' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-6 transform -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold py-1 px-3 rounded-full">
                  Popular
                </div>
              )}
              <div className="flex items-center justify-center mb-4">
                {plan.icon}
              </div>
              <h3 className="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">${plan.price}</span>
                <span className="text-gray-500 dark:text-gray-400"> / project</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-center mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                    <Check size={18} className="text-green-500 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setActivePlan(plan.id)}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${plan.buttonColor} ${activePlan === plan.id ? 'ring-2 ring-offset-2 ring-indigo-500 dark:ring-offset-gray-900' : ''}`}
              >
                {activePlan === plan.id ? 'Selected' : 'Select Plan'}
              </button>
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="mt-20 text-center">
          <a 
            href="#contact" 
            className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300"
          >
            <DollarSign className="mr-2" size={20} />
            Get a Custom Quote
          </a>
        </div>
      </div>
    </section>
  );
}