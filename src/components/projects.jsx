import React, { useRef } from "react";
import porto from "../assets/SPCPLCPMK.png";
import foody from "../assets/12.png";
import kkn from "../assets/13.png";
import bercak from "../assets/Bercak.png";
import madani from "../assets/Madani.png";
import KP from "../assets/KP.png";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useInView } from "react-intersection-observer";

const ProjectCard = ({ project }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`p-4 transition-transform transform ${
        inView ? "opacity-100 translate-y-0 scale-105 shadow-lg" : "opacity-0 translate-y-10"
      } duration-700 ease-in-out`}
    >
      <div className="relative flex flex-col bg-white rounded-lg shadow-md overflow-hidden h-full">
        <img
          alt="gallery"
          className="w-full h-64 object-cover object-center bg-white"
          src={project.src}
        />
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="p-6 flex flex-col h-full">
            <h2 className="tracking-widest text-sm title-font font-medium text-yellow-500 mb-1">
              {project.category}
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              {project.title}
            </h1>
            <p className="leading-relaxed text-gray-600 flex-grow">
              {project.description}
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default function Projects() {
  const projects = [
    {
      src: bercak,
      title: "BLOG Bercak Village",
      category: "Profile Website",
      description:
        "Created a profile village of Bercak for KKN task using ReactJS and Tailwind CSS.",
      link: "https://desabercakboyolali.web.app/",
    },
    {
      src: madani,
      title: "Madani",
      category: "UI/UX Competition",
      description:
        "Created for UI/UX Competition for MTQMN using Figma and developed with design thinking.",
      link: "https://bit.ly/PrototipeMadani",
    },
    {
      src: KP,
      title: "Network Engineer",
      category: "Internship",
      description:
        "Network Design And Reconfiguration Laboratory 2 State Vocational School 53 JAKARTA.",
      link: "#",
    },
    {
      src: porto,
      title: "SPCPLCPMK",
      category: "Capstone Project",
      description:
        "Created website SPCPLCPMK for Capstone, and my role is front-end developer.",
      link: "https://test1.spcplcpmk.com/login",
    },
    {
      src: foody,
      title: "FOODY",
      category: "Final Project PWA",
      description:
        "Created a PWA App recipe food using Next.js, Tailwind CSS, and Firebase for real-time updates.",
      link: "https://foody-culinary.vercel.app/",
    },
    {
      src: kkn,
      title: "Blog Klikiran Village",
      category: "Profile Website",
      description:
        "Created a profile village of Klikiran for KKN task using ReactJS and Tailwind CSS.",
      link: "https://desaklikiran-381b3.web.app/",
    },
  ];

  const scrollRef = useRef(null);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -368, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 368, behavior: "smooth" });
  };

  return (
    <section
      className="text-gray-600 body-font bg-gradient-to-r from-slate-100 via-slate-200 to-gray-200 py-24 sm:py-16"
      id="projects"
    >
      <div className="container px-5 mx-auto">
        <div className="text-center mb-5 mt-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 animate__animated animate__fadeIn">
            My Projects
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-700 animate__animated animate__fadeIn animate__delay-1s">
            This is a project that I made while studying in the IT field. These projects were created for college and internship needs to develop hard skills, including college assignments, practical work, and research.
          </p>
        </div>

        {/* Arrows for scrolling */}
        

        {/* Desktop View */}
        <div className="hidden md:flex flex-wrap -m-4 text-justify">
          {projects.map((project, index) => (
            <div className="lg:w-1/3 sm:w-1/2 p-4 mb-4 sm:mb-0" key={index}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Mobile View with scroll */}
        <div ref={scrollRef} className="flex md:hidden overflow-x-auto space-x-4">
          {projects.map((project, index) => (
            <div className="w-full py-2 flex-shrink-0" key={index}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="flex md:hidden justify-between items-center mt-4 mx-6">
          <FiArrowLeft onClick={scrollLeft} className="text-2xl cursor-pointer" />
          <FiArrowRight onClick={scrollRight} className="text-2xl cursor-pointer" />
        </div>
      </div>
    </section>
  );
}
