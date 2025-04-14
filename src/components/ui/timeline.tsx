"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../LanguageContext";
import { Calendar, Briefcase } from 'lucide-react';


interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const sectionHeight = height / data.length;
    const currentSection = Math.floor((latest * height) / sectionHeight);
    setActiveIndex(Math.min(currentSection, data.length - 1));
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const { language } = useLanguage();

  return (
    <div
      className="w-full bg-gray-950 py-20 font-sans md:px-10"
      id="experience"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-4 px-4 md:px-6 lg:px-6 mt-">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold">
            {language === "en"
              ? "Professional Journey"
              : "Perjalanan Profesional"}
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            {language === "en"
              ? "Exploring the intersection of technology and innovation through diverse projects and continuous learning."
              : "Menjelajahi perpaduan teknologi dan inovasi melalui berbagai proyek dan pembelajaran berkelanjutan."}
          </p>
        </motion.div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start md:pt-5 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div 
                  className={`h-12 w-12 absolute left-2.5 sm:left-2.5 rounded-full 
                    ${index === activeIndex 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 scale-110' 
                      : 'bg-gradient-to-br from-purple-500/50 to-pink-500/50'
                    } 
                    flex items-center justify-center transform transition-all duration-300`}
                >
                  <div className={`h-8 w-8 rounded-full bg-gray-950 flex items-center justify-center transition-transform duration-300
                    ${index === activeIndex ? 'scale-110' : 'scale-100'}`}>
                    <Briefcase className={`h-4 w-4 ${index === activeIndex ? 'text-purple-400' : 'text-purple-400/50'}`} />
                  </div>
                </div>
              <h2 className="hidden md:block text-xl md:pl-20 font-semibold text-neutral-300">
                {item.title}
              </h2>
            </div>

            <div className="relative pl-24 sm:pl-4 pr-4 sm:pr-8 w-full sm:w-2/3 mb-10">
                <h2 className="sm:hidden block text-lg mb-2 text-left font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                  {item.title}
                </h2>
                <div className={`bg-gray-900/50 rounded-lg p-4 sm:p-6 backdrop-blur-sm border 
                  ${index === activeIndex 
                    ? 'border-purple-500/30 shadow-lg shadow-purple-500/10' 
                    : 'border-purple-500/10'
                  } 
                  transition-all duration-300 hover:border-purple-500/20`}>
                  {item.content}
                </div>
              </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-pink-100 dark:via-indigo-200 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-600 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
