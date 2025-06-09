import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Code, Globe, Smartphone, Database, Award } from 'lucide-react';
import { useLanguage } from '../../../LanguageContext';

// Import images
import porto from "../../../assets/skripsi.png";
import kkn from "../../../assets/13.png";
import bercak from "../../../assets/Bercak.png";
import ocr from "../../../assets/OCReadEasy.png";
import KP from "../../../assets/KP.png";
import Madani from "../../../assets/Madani.png";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  status: string;
  icon: React.ReactNode;
  color: string;
}

const HorizontalScrollProjects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  const projects: Project[] = [
    {
      id: 1,
      title: "OCReadEasy",
      category: language === "en" ? "OCR PWA" : "Aplikasi OCR PWA",
      description: language === "en" 
        ? "Created a PWA App OCR using Next.js, and Tesseract.js for real-time text recognition and processing."
        : "Membuat aplikasi PWA OCR menggunakan Next.js dan Tesseract.js untuk pengenalan dan pemrosesan teks secara real-time.",
      image: ocr,
      technologies: ["Next.js", "Tesseract.js", "PWA", "TypeScript"],
      link: "https://ocreadeasy.vercel.app/",
      status: language === "en" ? "Completed" : "Selesai",
      icon: <Smartphone className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "SPCPLCPMK",
      category: language === "en" ? "Capstone Project" : "Proyek Capstone",
      description: language === "en"
        ? "Created website SPCPLCPMK for Capstone project, serving as the front-end developer for evaluation system."
        : "Membuat website SPCPLCPMK untuk proyek Capstone, berperan sebagai pengembang front-end untuk sistem evaluasi.",
      image: porto,
      technologies: ["React", "Laravel", "MySQL", "Tailwind CSS"],
      link: "https://evaluasi-cpl.ce.undip.ac.id",
      status: language === "en" ? "Completed" : "Selesai",
      icon: <Code className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      title: language === "en" ? "Bercak Village Blog" : "Blog Desa Bercak",
      category: language === "en" ? "Profile Website" : "Website Profil",
      description: language === "en"
        ? "Created website village profile for Bercak village as part of KKN program using ReactJS and Tailwind CSS."
        : "Membuat website profil desa untuk desa Bercak sebagai bagian dari program KKN menggunakan ReactJS dan Tailwind CSS.",
      image: bercak,
      technologies: ["React", "Tailwind CSS", "Firebase", "JavaScript"],
      link: "https://desabercakboyolali.web.app/",
      status: language === "en" ? "Completed" : "Selesai",
      icon: <Globe className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      title: language === "en" ? "Klikiran Village Blog" : "Blog Desa Klikiran",
      category: language === "en" ? "Profile Website" : "Website Profil",
      description: language === "en"
        ? "Created website village profile for Klikiran village as part of KKN program using ReactJS and Tailwind CSS."
        : "Membuat website profil desa untuk desa Klikiran sebagai bagian dari program KKN menggunakan ReactJS dan Tailwind CSS.",
      image: kkn,
      technologies: ["React", "Tailwind CSS", "Firebase", "JavaScript"],
      link: "https://desaklikiran-381b3.web.app/",
      status: language === "en" ? "Completed" : "Selesai",
      icon: <Globe className="w-6 h-6" />,
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Madani",
      category: language === "en" ? "UI/UX Competition" : "Kompetisi UI/UX",
      description: language === "en"
        ? "UI/UX Competition project for MTQMN using Figma, developed with design thinking methodology."
        : "Proyek kompetisi UI/UX untuk MTQMN menggunakan Figma, dikembangkan dengan metodologi design thinking.",
      image: Madani,
      technologies: ["Figma", "Design Thinking", "Prototyping", "UI/UX"],
      link: "https://bit.ly/PrototipeMadani",
      status: language === "en" ? "Completed" : "Selesai",
      icon: <Award className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 6,
      title: language === "en" ? "Network Engineer" : "Teknisi Jaringan",
      category: language === "en" ? "Internship" : "Magang",
      description: language === "en"
        ? "Network Design and Reconfiguration for Laboratory 2 at SMKN 53 Jakarta during internship program."
        : "Desain dan Rekonfigurasi Jaringan untuk Laboratorium 2 di SMKN 53 Jakarta selama program magang.",
      image: KP,
      technologies: ["Network Design", "Cisco", "Infrastructure", "Configuration"],
      link: "#",
      status: language === "en" ? "Completed" : "Selesai",
      icon: <Database className="w-6 h-6" />,
      color: "from-teal-500 to-cyan-500"
    }
  ];

  useEffect(() => {
    const container = containerRef.current;
    const sections = sectionsRef.current;
    const progress = progressRef.current;

    if (!container || !sections || !progress) return;

    // Calculate the total scroll distance
    const scrollDistance = sections.scrollWidth - sections.clientWidth;

    // Create the horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${scrollDistance}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Update progress bar
          gsap.set(progress, { 
            scaleX: self.progress,
            transformOrigin: "left center"
          });
        }
      }
    });

    // Animate horizontal movement
    tl.to(sections, {
      x: -scrollDistance,
      ease: "none"
    });

    // Animate individual project cards on scroll
    projects.forEach((_, index) => {
      gsap.fromTo(`.project-card-${index}`, 
        {
          y: 100,
          opacity: 0,
          scale: 0.9,
          rotationY: 15
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationY: 0,
          scrollTrigger: {
            trigger: `.project-card-${index}`,
            start: "left 80%",
            end: "left 20%",
            scrub: 1,
            horizontal: true,
            containerAnimation: tl
          }
        }
      );

      // Animate tech badges with stagger
      gsap.fromTo(`.project-card-${index} .tech-badge`, 
        {
          opacity: 0,
          y: 20,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: `.project-card-${index}`,
            start: "left 60%",
            end: "left 40%",
            scrub: 1,
            horizontal: true,
            containerAnimation: tl
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const TechBadge: React.FC<{ tech: string }> = ({ tech }) => (
    <span className="inline-block px-3 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded-full mr-2 mb-2 hover:bg-purple-200 transition-colors cursor-default">
      {tech}
    </span>
  );

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          ref={progressRef}
          className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 origin-left scale-x-0"
        />
      </div>

      {/* Header */}
      <div className="absolute top-4 md:top-8 left-4 md:left-8 z-40 max-w-[80%] md:max-w-md">
        <h2 className="text-4xl lg:text-5xl mt-5 lg:mt-0 font-bold text-gray-800 mb-4">
          {language === "en" ? "My " : "Proyek "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {language === "en" ? "Projects" : "Saya"}
          </span>
        </h2>
      </div>

      {/* Horizontal Scrolling Container */}
      <div ref={sectionsRef} className="flex h-full items-center">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-card-${index} flex-shrink-0 w-screen h-full flex items-center justify-center px-7 md:px-16`}
          >
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-center">
              {/* Project Image */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r opacity-20 rounded-2xl group-hover:opacity-30 transition-opacity duration-300" 
                     style={{backgroundImage: `linear-gradient(135deg, ${project.color.split(' ')[1]}, ${project.color.split(' ')[3]})`}} />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 md:h-96 object-cover rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white bg-opacity-20 backdrop-blur-sm p-3 rounded-full hover:bg-opacity-30 transition-colors"
                    >
                      <ExternalLink className="w-6 h-6 text-white" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-4 md:space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 md:p-3 rounded-xl bg-gradient-to-r ${project.color} shadow-lg`}>
                    {project.icon}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 md:space-x-3 mb-2">
                      <span className="px-2 md:px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-700">
                        {project.category}
                      </span>
                      <span className="px-2 md:px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-4xl font-bold text-gray-800">{project.title}</h3>
                  </div>
                </div>

                <p className="text-gray-600 text-sm md:text-lg leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <div key={techIndex} className="tech-badge">
                      <TechBadge tech={tech} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Counter */}
      <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 text-gray-800">
        {/* <div className="flex space-x-2">
          {projects.map((_, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full bg-purple-500 hover:bg-purple-600 transition-colors cursor-pointer"
            />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default HorizontalScrollProjects;