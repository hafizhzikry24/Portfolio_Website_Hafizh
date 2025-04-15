import React, { useRef } from "react";
import porto from "../assets/SPCPLCPMK.png";
import { useLanguage } from "../LanguageContext";
import kkn from "../assets/13.png";
import bercak from "../assets/Bercak.png";
import ocr from "../assets/OCReadEasy.png";
import KP from "../assets/KP.png";
import Madani from "../assets/Madani.png";
import { FiArrowLeft, FiArrowRight, FiExternalLink } from "react-icons/fi";
import { useInView } from "react-intersection-observer";

const ProjectCard = ({ project }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const { language } = useLanguage();

  return (
    <div
      ref={ref}
      className={`p-2 sm:p-4 transition-transform transform ${
        inView ? "translate-y-0 scale-105" : "opacity-0 translate-y-10"
      } duration-700 ease-in-out`}
    >
      <div className="relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 transition-all duration-300 border border-red-100 dark:border-gray-700">
        <div className="relative overflow-hidden group">
          <div className="h-64 overflow-hidden">
            <img
              alt={project.title}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-in-out group-hover:scale-110"
              src={project.src}
            />
          </div>

          {/* Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div className="p-6 w-full">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300 text-sm font-medium"
              >
                <FiExternalLink className="mr-2" />
                {language === "en" ? "View Project" : "Lihat Proyek"}
              </a>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              {project.category}
            </span>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {project.status}

              {language === "en" ? "Completed" : "Selesai"}
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-all duration-300 group-hover:text-purple-600 dark:group-hover:text-purple-400">
            {project.title}
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {project.description}
          </p>

          <div className="mt-auto">
            <div className="flex flex-wrap">
              {project.technologies &&
                project.technologies.map((tech, i) => (
                  <TechBadge key={i} tech={tech} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const { language } = useLanguage();
  const projects = [
    {
      src: ocr,
      title: "OCReadEasy",
      category: language === "en" ? "OCR PWA" : "OCR PWA",
      description:
        language === "en"
          ? "Created a PWA App OCR using Next.js, Tailwind CSS, and Tesseract.js for real-time updates."
          : "Membuat aplikasi PWA OCR menggunakan Next.js, Tailwind CSS, dan Tesseract.js.",
      link: "https://ocreadeasy.vercel.app/",
    },
    {
      src: porto,
      title: "SPCPLCPMK",
      category: language === "en" ? "Capstone Project" : "Proyek Akhir",
      description:
        language === "en"
          ? "Created website SPCPLCPMK for Capstone, and my role is front-end developer."
          : "Membuat website SPCPLCPMK untuk Capstone, dan role saya adalah front-end.",
      link: "https://test1.spcplcpmk.com/login",
    },
    {
      src: bercak,
      title: language === "en" ? "BLOG Bercak Village" : "Blog Desa Bercak",
      category: language === "en" ? "Profile Website" : "Website Profil",
      description:
        language === "en"
          ? "Created a profile village of Bercak for KKN task using ReactJS and Tailwind CSS."
          : "Membuat profil desa Bercak untuk tugas KKN menggunakan ReactJS dan Tailwind CSS.",
      link: "https://desabercakboyolali.web.app/",
    },
    {
      src: kkn,
      title: language === "en" ? "Blog Klikiran Village" : "Blog Desa Klikiran",
      category: language === "en" ? "Profile Website" : "Website Profil",
      description:
        language === "en"
          ? "Created a profile village of Klikiran for KKN task using ReactJS and Tailwind CSS."
          : "Membuat profil desa Klikiran untuk tugas KKN menggunakan ReactJS dan Tailwind CSS.",
      link: "https://desaklikiran-381b3.web.app/",
    },
    {
      src: Madani,
      title: "Madani",
      category: language === "en" ? "UI/UX Competition" : "Kompetisi UI/UX",
      description:
        language === "en"
          ? "Created UI/UX Competition MTQMN using Figma and developed with design thinking."
          : "Dibuat untuk Kompetisi UI/UX MTQMN dengan Figma dan design thinking.",
      link: "https://bit.ly/PrototipeMadani",
    },
    {
      src: KP,
      title: language === "en" ? "Network Engineer" : "Teknisi Jaringan",
      category: language === "en" ? "Internship" : "Magang",
      description:
        language === "en"
          ? "Network Design And Reconfiguration Laboratory 2 SMKN 53 JAKARTA."
          : "Desain Jaringan dan Rekonfigurasi Laboratorium 2 SMKN 53 JAKARTA.",
      link: "#",
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
            {language === "en" ? "My Projects" : "Proyek Saya"}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-700 animate__animated animate__fadeIn animate__delay-1s">
            {language === "en"
              ? "This is a project that I made while in the IT field. These projects were created for college and internship needs to develop hard skills, including college assignments, practical work, and research."
              : "Ini adalah proyek yang saya buat saat berada di bidang IT. Proyek-proyek ini dibuat untuk kebutuhan kuliah dan magang untuk mengembangkan hard skills, termasuk tugas kuliah, kerja praktek, dan penelitian."}
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
        <div
          ref={scrollRef}
          className="snap-x flex md:hidden overflow-x-auto space-x-4"
        >
          {projects.map((project, index) => (
            <div className=" snap-start w-full py-10 flex-shrink-0" key={index}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        <div className="flex md:hidden justify-between items-center mx-2">
          <FiArrowLeft
            onClick={scrollLeft}
            className="text-2xl cursor-pointer"
          />
          <FiArrowRight
            onClick={scrollRight}
            className="text-2xl cursor-pointer"
          />
        </div>
      </div>
    </section>
  );
}
