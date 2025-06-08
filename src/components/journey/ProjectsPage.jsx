import React from 'react';
import {HeroHighlightJourney} from "./components/hero-journey"
import { TimelineDemo } from "./components/timeline";
import Projects from './components/projects';

const ProjectPage = () => {
  return (
    <>
      <main> {/* Tambahkan tag main untuk konten utama halaman */}
      <HeroHighlightJourney/>
      <TimelineDemo/>
      <Projects/>
      </main>
    </>
  );
};

export default ProjectPage;