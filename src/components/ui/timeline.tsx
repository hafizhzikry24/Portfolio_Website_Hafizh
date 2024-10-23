"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../LanguageContext";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const {language} = useLanguage();

  return (
    <div
      className="w-full bg-white py-20 font-sans md:px-10" id="experience"
      ref={containerRef} 
    >
      <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 lg:px-10 mt-" >
        <h2 className="text-lg md:text-4xl mb-4 text-[#1d377f]  max-w-4xl font-bold">
          {language === 'en'? 'Changelog from my journey' : 'Catatan perubahan dari perjalanan saya' }
        </h2>
        <p className="text-neutral-900  text-sm md:text-base max-w-sm">
        {language === 'en'? 'I have experience in the technology field, working on diverse projects and skills development.' : 'Saya memiliki pengalaman di bidang teknologi, mengerjakan berbagai proyek dan pengembangan keterampilan.' }
        
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start md:pt-5 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#efe6fb] flex items-center justify-center ">
  <div className="h-4 w-4 rounded-full bg-[#A78BFA] border border-[#A78BFA] dark:border-[#A78BFA] p-2" />
</div>
<h3 className="hidden md:block text-xl md:pl-20 font-semibold text-[#1d377f]">
  {item.title}
</h3>
            </div>

            <div className="relative pl-20 pr-8 md:pl-4 w-full">
              <h3 className="md:hidden block text-xl mb-2 text-left font-semibold text-[#3857ad] ">
                {item.title}
              </h3>
              {item.content}{" "}
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
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-300 via-blue-300 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
