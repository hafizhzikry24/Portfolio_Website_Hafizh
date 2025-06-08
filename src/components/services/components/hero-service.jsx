"use client";
import React, { useEffect, useRef, useState } from "react";
import { FlipWords } from "../../ui/flip-words";
import { motion, useAnimation } from "framer-motion";

export function HeroService() {
  const words = ["professional", "responsive", "beautiful", "modern"];
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          controls.start({
            opacity: 1,
            y: 0,
          });
        } else {
          setIsVisible(false);
          controls.set({
            opacity: 0,
            y: 20,
          });
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
  }, [controls]);

  return (
    <div className="h-screen bg-black flex justify-center items-center px-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="lg:text-6xl text-4xl mx-auto font-normal text-neutral-300"
      >
        Build
        <FlipWords words={words} isVisible={isVisible} /> <br />
        websites with ZikkDev
      </motion.div>
    </div>
  );
}
