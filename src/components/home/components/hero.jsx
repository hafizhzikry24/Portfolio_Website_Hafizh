import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../../../LanguageContext";
import AnimatedGreeting from "../../ui/animated-greeting";
import Profile from "../../../assets/bg-hero.jpg";

export default function Hero() {
  const canvasRef = useRef(null);
  const controls = useAnimation();
  const { language } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const greetings = [
    "ٱلسَّلَامُ عَلَيْكُمْ",
    "Hello",
    "Halo",
    "你好",
    "Bonjour!",
    "こんにちは",
  ];

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 100;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const particle of particles) {
        particle.update();
        particle.draw();
      }

      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.6,
        ease: [0.5, 1.2, 0.46, 1.5],
      },
    },
  };

  return (
    <div ref={ref} className="relative h-screen w-full overflow-hidden">
      {/* Background Image (Desktop only) */}
      <div
        className="absolute inset-0 hidden lg:block h-full w-full bg-cover bg-center bg-fixed opacity-95"
        style={{ backgroundImage: `url(${Profile})` }}
      />

      {/* Canvas Background (Mobile/Tablet only) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block lg:hidden h-full w-full bg-black"
      />
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <motion.div variants={itemVariants} className="mb-2">
          <AnimatedGreeting greetings={greetings} />
        </motion.div>
        <motion.h1
          variants={itemVariants}
          className="mb-6 text-3xl lg:text-5xl text-white lg:text-slate-900 font-press lg:font-bold tracking-tighter"
        >
          Muhammad Hafizh Zikry
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="max-w-[600px] text-lg lg:text-xl text-gray-100 sm:text-xl font-medium lg:font-bold font-pixel"
        >
          {language === "en"
            ? "Software Developer Enthusiast"
            : "Bersemangat Mengembangkan Software"}
        </motion.p>
      </motion.div>
    </div>
  );
}
