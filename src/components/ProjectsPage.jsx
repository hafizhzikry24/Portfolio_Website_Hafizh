import React from 'react';
import { TimelineDemo } from "./timeline";
import Projects from './Projects';
import Comment from './coment';
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