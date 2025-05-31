import React from 'react';
import { TimelineDemo } from "./components/timeline";
import Projects from './components/projects';
import Comment from './components/coment';
const ProjectPage = () => {
  return (
    <>
      <main> {/* Tambahkan tag main untuk konten utama halaman */}
      <TimelineDemo/>
      <Projects/>
      <Comment/>
      </main>
    </>
  );
};

export default ProjectPage;