import Image from "next/image";

import Hero from '@/components/Hero';
import ProjectsCardStack from '@/components/ProjectsCardStack';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import SwipeProjects from '@/components/SwipeProjects';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SwipeProjects />
      <Services />
      <Contact />
    </main>
  );
}
