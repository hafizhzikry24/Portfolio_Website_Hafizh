import React, { useRef } from "react";
import porto from "../assets/SPCPLCPMK.png";
import { useLanguage } from "../LanguageContext";
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
      className={`p-2 sm:p-4 transition-transform transform ${
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
  const {language} = useLanguage();
  const projects = [
    {
      src: bercak,
      title: language === 'en' ? "BLOG Bercak Village" : "Blog Desa Bercak",
      category: language === 'en' ? "Profile Website" : "Website Profil",
      description:
        language === 'en'
          ? "Created a profile village of Bercak for KKN task using ReactJS and Tailwind CSS."
          : "Membuat profil desa Bercak untuk tugas KKN menggunakan ReactJS dan Tailwind CSS.",
      link: "https://desabercakboyolali.web.app/",
    },
    {
      src: madani,
      title: "Madani",
      category: language === 'en' ? "UI/UX Competition" : "Kompetisi UI/UX",
      description:
        language === 'en'
          ? "Created for UI/UX Competition for MTQMN using Figma and developed with design thinking."
          : "Dibuat untuk Kompetisi UI/UX MTQMN menggunakan Figma dan dikembangkan dengan design thinking.",
      link: "https://bit.ly/PrototipeMadani",
    },
    {
      src: KP,
      title: language === 'en' ? "Network Engineer" : "Teknisi Jaringan",
      category: language === 'en' ? "Internship" : "Magang",
      description:
        language === 'en'
          ? "Network Design And Reconfiguration Laboratory 2 State Vocational School 53 JAKARTA."
          : "Desain Jaringan dan Rekonfigurasi Laboratorium 2 SMKN 53 JAKARTA.",
      link: "#",
    },
    {
      src: porto,
      title: "SPCPLCPMK",
      category: language === 'en' ? "Capstone Project" : "Proyek Akhir",
      description:
        language === 'en'
          ? "Created website SPCPLCPMK for Capstone, and my role is front-end developer."
          : "Membuat website SPCPLCPMK untuk Proyek Akhir, dan peran saya adalah pengembang front-end.",
      link: "https://test1.spcplcpmk.com/login",
    },
    {
      src: foody,
      title: "FOODY",
      category: language === 'en' ? "Final Project PWA" : "Proyek Akhir PWA",
      description:
        language === 'en'
          ? "Created a PWA App recipe food using Next.js, Tailwind CSS, and Firebase for real-time updates."
          : "Membuat aplikasi PWA resep makanan menggunakan Next.js, Tailwind CSS, dan Firebase.",
      link: "https://foody-culinary.vercel.app/",
    },
    {
      src: kkn,
      title: language === 'en' ? "Blog Klikiran Village" : "Blog Desa Klikiran",
      category: language === 'en' ? "Profile Website" : "Website Profil",
      description:
        language === 'en'
          ? "Created a profile village of Klikiran for KKN task using ReactJS and Tailwind CSS."
          : "Membuat profil desa Klikiran untuk tugas KKN menggunakan ReactJS dan Tailwind CSS.",
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
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 animate__animated animate__fadeIn">
            {language === 'en' ? 'My Projects' : 'Proyek Saya'}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-700 animate__animated animate__fadeIn animate__delay-1s">
            {language === 'en'
              ? 'This is a project that I made while in the IT field. These projects were created for college and internship needs to develop hard skills, including college assignments, practical work, and research.'
              : 'Ini adalah proyek yang saya buat saat berada di bidang IT. Proyek-proyek ini dibuat untuk kebutuhan kuliah dan magang untuk mengembangkan hard skills, termasuk tugas kuliah, kerja praktek, dan penelitian.'}
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
        <div ref={scrollRef} className="snap-x flex md:hidden overflow-x-auto space-x-4">
          {projects.map((project, index) => (
            <div className=" snap-start w-full py-10 flex-shrink-0" key={index}>
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
