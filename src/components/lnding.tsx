'use client'

import React from "react";
import { useScroll, useTransform } from "framer-motion";
import { GoogleGeminiEffect } from "./ui/google-gemini-effect"; 
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../LanguageContext";

const Landing: React.FC = () => {
  const ref = React.useRef<HTMLDivElement | null>(null); // Explicitly type the ref
  const { language } = useLanguage();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  const { ref: contentRef, inView: isContentVisible } = useInView({
    triggerOnce: false,
    threshold: 0.09,
  });

  return (
    <div
      className={`h-[325vh] bg-black min-w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip transition-all duration-1000 ease-in-out transform ${
        isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      ref={(node) => {
        ref.current = node; // Set the ref for scrolling
        contentRef(node); // Set the ref for intersection observer
      }}
    >
      <GoogleGeminiEffect
        // title={language === "en" ? "My Portfolio" : "Portofolio Saya"}
        // description={language === "en" ? "Scroll this component and see my journey!" : "Gulir konten ini dan Nikmati perjalanannya"}
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
      <div className="flex justify-center mt-5">
          <h1 className="text-5xl md:text-8xl font-normal pb-4 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-300">
            <span className="bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-200 bg-clip-text text-transparent font-bold">
            {language === "en" ? "My Portfolio" : "Portofolio Saya"}
            </span>
          </h1>
      </div>
          <p className="text-2xl md:text-3xl font-normal text-center text-neutral-400 mt-4 max-w-lg mx-auto">
          {language === "en" ? "Scroll this component and see my journey!" : "Gulir konten ini dan Nikmati perjalanannya"}
      </p>
    </div>
    
  );
}

export default Landing;