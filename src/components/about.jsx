import React from "react";
import { useInView } from "react-intersection-observer";
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
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const logos = [js, css, html, reactImg, github, tailwind, laravel, figma, cisco2];

  return (
    <section
      ref={ref}
      className={`text-gray-700 body-font overflow-hidden bg-white py-14 sm:py-14 transition-all duration-1000 ease-in-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      <div className="container mx-auto lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-600 inline-block mb-2">
            My Skills
          </h2>
          <div className="w-24 h-1 bg-purple-600 mx-auto mt-2 rounded-full"></div>
        </div>

        <div className="logo-slider">
          <div className="logos-slide">
            {[...logos, ...logos, ...logos].map((icon, index) => (
              <img
                key={index}
                src={icon}
                title={icon.split("/").pop().split(".")[0]}
                alt=""
                className="logo"
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .logo-slider {
          position: relative;
          overflow: hidden;
          padding: 30px 0;
          background: white;
          margin-top: 10px;
        }

        .logo-slider::before,
        .logo-slider::after {
          position: absolute;
          top: 0;
          width: 250px;
          height: 100%;
          content: "";
          z-index: 2;
        }

        .logo-slider::before {
          left: 0;
          background: linear-gradient(to left, rgba(255, 255, 255, 0), white);
        }

        .logo-slider::after {
          right: 0;
          background: linear-gradient(to right, rgba(255, 255, 255, 0), white);
        }

        .logos-slide {
          display: inline-flex;
          animation: 55s slide infinite linear;
        }

        .logos-slide img {
          height: 60px;
          margin: 0 50px;
          transition: all 0.3s ease;
        }

        .logos-slide img:hover {
          transform: scale(1.1) rotate(6deg);
        }

        @media (hover: hover) {
          .logo-slider:hover .logos-slide {
            animation-play-state: paused;
          }
        }

        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% * 2 / 3));
          }
        }

        @media (max-width: 768px) {
          .logo-slider::before,
          .logo-slider::after {
            width: 75px;
          }

          .logos-slide {
            animation: 60s slide infinite linear;
          }

           .logos-slide img {
            margin: 10px 20px;
          }
        }
      `}</style>
    </section>
  );
};

export default About;