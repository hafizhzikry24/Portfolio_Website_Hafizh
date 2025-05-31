import React from 'react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedGreetingProps {
  greetings: string[];
  className?: string;
}

const AnimatedGreeting: React.FC<AnimatedGreetingProps> = ({ greetings, className = "" }) => {
  const [currentGreetingIndex, setCurrentGreetingIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Typing effect speed
  const typingSpeed = 150;
  const deletingSpeed = 100;
  const pauseDuration = 1500;

  useEffect(() => {
    const currentGreeting = greetings[currentGreetingIndex];
    
    let timeout: NodeJS.Timeout;
    
    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }
    
    if (isDeleting) {
      if (displayedText === "") {
        setIsDeleting(false);
        setCurrentGreetingIndex((prev) => (prev + 1) % greetings.length);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (displayedText === currentGreeting) {
        setIsPaused(true);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(currentGreeting.slice(0, displayedText.length + 1));
        }, typingSpeed);
      }
    }
    
    return () => clearTimeout(timeout);
  }, [displayedText, currentGreetingIndex, isDeleting, isPaused, greetings]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-[40px] flex items-center justify-center ${className}`}
    >
      <span className="text-2xl md:text-3xl lg:text-4xl text-white opacity-90 font-medium font-pixel">
        {displayedText}
      </span>
    </motion.div>
  );
};

export default AnimatedGreeting;