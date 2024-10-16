import React from "react";
import { useInView } from "react-intersection-observer";
import design from "../assets/profile.png";
import js from "../assets/js.png";
import reactImg from "../assets/react.png";
import css from "../assets/css.png";
import Slider from "react-slick";
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

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 8, // Menampilkan 8 logo di desktop
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4, // Menampilkan 4 logo di tablet dan mobile
        },
      },
    ],
  };

  return (
    <section
      className="text-gray-700 body-font overflow-hidden bg-gradient-to-r from-slate-100 to-slate-200 py-20 sm:py-16"
      id="about"
    >
        <div className="text-center mb-8 sm:mb-16">
          <p className="text-2xl sm:text-3xl font-extrabold text-purple-600 inline border-b-4 border-purple-400 ">
            About Me
          </p>
        </div>

        {/* <div className="text-center mb-12">
            <p className="text-4xl font-extrabold text-purple-600 inline border-b-4 border-purple-400 mb-4">
              About Me
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 items-center transition-all duration-1000 ease-in-out">
            <div className="flex-1 text-center md:text-justify">
              <p className="text-lg md:text-xl mb-4">
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
              <p className="text-lg md:text-xl">
                Creative software developer and network engineer with over 3+ years of experience as a freelancer. Proficient in Laravel, Tailwind CSS, ReactJS, APIs, and Cisco.
              </p>
            </div>
          </div> */}
        <div className="slider-container overflow-hidden w-full px-2 sm:px-3 ">
          <Slider {...settings}>
            {[
              js,
              css,
              html,
              reactImg,
              github,
              tailwind,
              laravel,
              figma,
              cisco2,
            ].map((icon, index) => (
              <img
                src={icon}
                title={icon.split("/").pop().split(".")[0]}
                alt=""
                className="sm:w-20 w-16 sm:h-20 h-16 object-contain mt-5 sm:mt-10 mb-2 sm:mb-12" 
              />
            ))}
          </Slider>
        </div>

    </section>
  );
};

export default About;
