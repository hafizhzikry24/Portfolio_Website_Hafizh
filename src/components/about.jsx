import React from "react";
import { useInView } from "react-intersection-observer";
import design from "../assets/profile.png";
import js from "../assets/js.png";
import reactImg from "../assets/react.png";
import css from "../assets/css.png";
import figma from "../assets/figma.png";
import cisco2 from "../assets/image.png";
import html from "../assets/html .png";
import tailwind from "../assets/tailwind.png";
import github from "../assets/github.png";
import laravel from "../assets/laravel.png";

const About = () => {
  const { ref: cardRef, inView: isCardVisible } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section
      className="text-gray-700 body-font overflow-hidden bg-gradient-to-r from-slate-100 to-slate-200 py-24 sm:py-28"
      id="about"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={cardRef}
          className={`flex flex-col justify-center items-center w-full h-full bg-white p-8 rounded-2xl shadow-xl text-gray-800 transition-all duration-1000 ease-in-out transform ${
            isCardVisible
              ? "opacity-100 translate-y-0 hover:scale-105"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <p className="text-4xl font-extrabold text-purple-600 inline border-b-4 border-purple-400 mb-4">
              About Me
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center transition-all duration-1000 ease-in-out">
            <div className="flex-1 text-center md:text-justify">
              <p className="text-md md:text-xl mb-4 text-justify">
                I am eager to build a career in IT, focusing on both backend and frontend development. I thrive on creating efficient backend systems and crafting engaging front-end interfaces. I am committed to mastering the latest technologies and best practices to deliver high-quality, comprehensive solutions.
              </p>
            </div>
            <div className="flex-1 text-center md:text-left hidden md:block">
              <img
                src={design}
                alt="Design"
                className="w-96 mx-auto mb-4 rounded-lg shadow-lg transition-transform duration-1000 ease-in-out hover:scale-110 transform hover:rotate-3"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-md md:text-xl text-justify">
                Creative software developer and network engineer with over 3+ years of experience as a freelancer. Proficient in Laravel, Tailwind CSS, ReactJS, APIs, and Cisco.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden w-full mt-10 md:mt-10 ">
            <div className="grid grid-cols-3 gap-5 sm:mx-auto px-6 justify-center md:grid-cols-9 animate-fadeInUp mx-4">
              {[js, css, html, reactImg, github, tailwind, laravel, figma, cisco2].map((icon, index) => (
                <img
                  key={index}
                  src={icon}
                  title={icon.split("/").pop().split(".")[0]}
                  alt=""
                  className="transition-transform duration-1000 ease-in-out hover:scale-105 hover:rotate-3 flx flex-1 animate-pulse" 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


