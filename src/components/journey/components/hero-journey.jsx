"use client";
import { motion, useAnimation } from "framer-motion";
import { HeroHighlight, Highlight } from "../../ui/hero-highlight";
import { useEffect, useRef } from "react";
import { useLanguage } from "../../../LanguageContext";

export function HeroHighlightJourney() {
  const controls = useAnimation();
  const highlightControls = useAnimation();
  const ref = useRef(null);
  const { language } = useLanguage();

  const text = {
    en: {
      journey: "Every journey begins with a single step. Through some challenges and growth,",
      highlight: "Each moment becomes a memorable."
    },
    id: {
      journey: "Setiap perjalanan dimulai dengan satu langkah. Melalui berbagai tantangan dan pertumbuhan,",
      highlight: "Setiap momen menjadi kenangan yang berharga."
    }
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            y: [20, -5, 0],
          });
          highlightControls.set({ backgroundSize: "0% 100%" });
          highlightControls.start({
            backgroundSize: "100% 100%",
          });
        } else {
          controls.set({
            opacity: 0,
            y: 20,
          });
          highlightControls.set({ backgroundSize: "0% 100%" });
        }
      },
      {
        threshold: 0.5,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [controls, highlightControls]);

  return (
    <HeroHighlight>
      <motion.h1
        ref={ref}
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={controls}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-12 sm:px-4 md:text-4xl lg:text-5xl font-bold text-white text-justify md:max-w-2xl lg:max-w-4xl leading-relaxed lg:leading-snug mx-auto">
        {text[language].journey}{" "}
        <Highlight className="text-white" controls={highlightControls}>
          {text[language].highlight}
        </Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}
