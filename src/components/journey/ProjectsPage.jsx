import React from 'react';
import {HeroHighlightJourney} from "./components/hero-journey"
import HorizontalScrollProjects from './components/HorizontalScrollProjects'; 
import { TimelineDemo } from "./components/timeline";
import Projects from './components/projects';
import ProjectCard from './components/sentence';

const ProjectPage = () => {
  return (
    <>
      <main> {/* Tambahkan tag main untuk konten utama halaman */}
      <HeroHighlightJourney/>
      <TimelineDemo/>
      {/* <Projects/> */}
      <HorizontalScrollProjects/>
      <ProjectCard/>
      </main>
    </>
  );
};

export default ProjectPage;