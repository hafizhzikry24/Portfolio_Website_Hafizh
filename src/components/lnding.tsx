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
      className={`h-[400vh] bg-black min-w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip transition-all duration-1000 ease-in-out transform ${
        isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      ref={(node) => {
        ref.current = node; // Set the ref for scrolling
        contentRef(node); // Set the ref for intersection observer
      }}
    >
      <GoogleGeminiEffect
        title={language === "en" ? "My Portfolio" : "Portofolio Saya"}
        description={language === "en" ? "Scroll this component and see my journey!" : "Gulir konten ini dan Nikmati perjalanannya"}
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
      />
    </div>
  );
}

export default Landing;