import React from "react";
import Profile from "../../../assets/graduated.jpg";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../../../LanguageContext"; // Import useLanguage
import js from "../../../assets/js.png";
import reactImg from "../../../assets/react.png";
import css from "../../../assets/css.png";
import Slider from "react-slick";
import figma from "../../../assets/figma.png";
import cisco2 from "../../../assets/image.png";
import html from "../../../assets/html .png";
import tailwind from "../../../assets/tailwind.png";
import github from "../../../assets/github.png";
import laravel from "../../../assets/laravel.png";
import angular from "../../../assets/angular.png";
import docker from "../../../assets/docker.png"
import php from "../../../assets/php.png"
import python from "../../../assets/python.png"
import next from "../../../assets/next.png"

function Content() {
  const { ref: contentRef, inView: isContentVisible } = useInView({
    triggerOnce: false, // Allows fade-in animation on both scroll up and down
    threshold: 0.1,
  });

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 8, // Menampilkan 8 logo di desktop
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: false, // Tambahkan ini untuk mencegah pause saat hover
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4, // Menampilkan 4 logo di tablet dan mobile
        },
      },
    ],
  };

  const { language } = useLanguage(); // Get language

  return (
    <section
      className="text-gray-500 body-font bg-gradient-to-r py-24 from-gray-50 to-gray-100"
      id="profile"
    >
      <div
        ref={contentRef}
        className={`container mx-auto flex flex-col-reverse lg:flex-row items-center py-12 px-6 lg:px-12 transition-all duration-1000 ease-in-out transform ${
          isContentVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        {/* Text Section */}
        <div className="lg:w-1/2 w-full lg:pr-12 mb-6 lg:mb-0">
          <div className="flex items-center mb-4 transition-transform transform hover:scale-90">
            <svg
              className="stroke-gray-700 stroke-2 h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 10 10"
            >
              <line x1="0" y1="5" x2="10" y2="5" />
            </svg>
            <h2 className="text-lg sm:text-xl font-press text-gray-800 uppercase ">
              {language === "en" ? "My name is" : "Nama Saya"}
            </h2>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 animate-pulse sm:animate-bounce">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-600 to-pink-400 bg-clip-text text-transparent">
              Muhammad Hafizh Zikry
            </span>
          </h1>
          <p className="text-md md:text-xl text-gray-900 mb-6 font-pixel text-justify transition-transform transform hover:scale-110">
            {language === "en"
              ? "Hello! I am Muhammad Hafizh Zikry, a fresh graduate Computer Engineering Diponegoro University passionate about both backend and frontend development. I’m dedicated to mastering technologies and delivering impactful solutions."
              : "Halo! Saya Muhammad Hafizh Zikry, lulusan baru Teknik Komputer Universitas Diponegoro yang bersemangat dalam pengembangan backend dan frontend. Saya berdedikasi untuk menguasai teknologi dan memberikan solusi yang berdampak."}
          </p>
          <div className="flex items-center space-x-4 mb-3">
            <a
              href="https://www.instagram.com/hafizh.zikry/"
              name = "instagram"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Kunjungi profil Instagram Hafizh Zikry"
               title="Instagram Hafizh Zikry"
            >
                <span className="sr-only">Instagram Hafizh Zikry</span>
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2 "
                className="w-6 h-6 text-gray-800 hover:text-purple-400 transition-transform transform hover:scale-110"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-hafizh-zikry/"
              target="_blank"
              name = "LinkedIn"
              rel="noopener noreferrer"
              title="LinkedIn Hafizh Zikry"
              aria-label="Kunjungi profil LinkedIn Muhammad Hafizh Zikry"
            >
              <span className="sr-only">LinkedIn Hafizh Zikry</span>
              <svg
                fill="currentColor"
                className="w-6 h-6 text-gray-800 hover:text-purple-400 transition-transform transform hover:scale-110"
                viewBox="0 0 24 24"
              >
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
            <a
              href="https://github.com/hafizhzikry24/"
              name = 'github'
              target="_blank"
              rel="noopener noreferrer"
              title="Github Hafizh Zikry"
              aria-label="Kunjungi profil GitHub Hafizh Zikry"
            >
              <span className="sr-only">Github Hafizh Zikry</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-gray-800 hover:text-purple-400 transition-transform transform hover:scale-110"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                ></path>
              </svg>
            </a>
            {/* <a href={CV} download="CV_Muhammad_Hafizh_Zikry.pdf">
              <button className="transform hover:-translate-y-1 transition duration-400 inline-flex h-11 animate-shimmer items-center justify-center rounded-3xl border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:ring-offset-1 focus:ring-offset-slate-100">
                Download CV
              </button>
            </a> */}
            <a href='https://www.papermark.io/view/cm3zuc1h70004je9d9eib4hkw'target="_blank" >
              <button className="font-pixel text-base transform hover:-translate-y-1 transition duration-400 inline-flex h-11 animate-shimmer items-center justify-center rounded-3xl border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-600 focus:ring-offset-1 focus:ring-offset-slate-100">
                Download CV
              </button>
            </a>
          </div>
        </div>
        {/* Image Section */}
        <div className="lg:w-1/2 w-full flex justify-center mb-10">
          <img
            className="w-72 h-auto sm:w-3/4 sm:h-3/4 rounded-full sm:rounded-xl shadow-xl transition-transform duration-1000 ease-in-out transform hover:scale-110 hover:rotate-3"
            src={Profile}
            alt="Profile"
          />
        </div>
      </div>
      <Slider className="overflow-x-hidden"  {...settings}>
          {[
            js,
            css,
            html,
            php,
            python,
            figma,
            reactImg,
            next,
            angular,
            tailwind,
            laravel,
            github,
            cisco2,
            docker
          ].map((icon, index) => (
            <img
              key={index} // Ensure each image has a unique key
              src={icon}
              title={icon.split("/").pop().split(".")[0]}
              alt={
                icon.includes("js")
                  ? "JavaScript Icon"
                  : icon.includes("css")
                  ? "CSS Icon"
                  : icon.includes("html")
                  ? "HTML Icon"
                  : icon.includes("php")
                  ? "PHP Icon"
                  : icon.includes("python")
                  ? "Python Icon"
                  : icon.includes("figma")
                  ? "Figma Icon"
                  : icon.includes("react")
                  ? "React Icon"
                  : icon.includes("next")
                  ? "Next Icon"
                  : icon.includes("angular")
                  ? "Angular Icon"
                  : icon.includes("tailwind")
                  ? "Tailwind CSS Icon"
                  : icon.includes("laravel")
                  ? "Laravel Icon"
                  : icon.includes("github")
                  ? "GitHub Icon"
                  : icon.includes("cisco")
                  ? "Cisco Icon"
                  : icon.includes("docker")
                  ? "Docker Icon"
                  : "Tech Icon" // Default for unrecognized icons
              }
              className="w-10 h-10 sm:w-20 sm:h-20 object-contain mt-5 sm:mt-10 mb-2 sm:mb-12 ease-in-out transform hover:scale-110 hover:rotate-6"
            />
          ))}
        </Slider>
    </section>
  );
}

export default Content;
