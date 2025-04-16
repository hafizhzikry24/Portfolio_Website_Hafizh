"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../LanguageContext";
import { Calendar, Briefcase } from "lucide-react";
import { Search, Filter, ChevronDown, ChevronUp, X } from "lucide-react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  category?: string;
  date: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [height, setHeight] = useState(0);

  const categories = Array.from(
    new Set(data.map((item) => item.category || "Other"))
  );

  const filteredData = data
    .filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return isAscending ? dateA - dateB : dateB - dateA;
    });

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, filteredData]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const sectionHeight = height / filteredData.length;
    const currentSection = Math.floor((latest * height) / sectionHeight);
    setActiveIndex(Math.min(currentSection, filteredData.length - 1));
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
        <div className="mb-8">
          {/* DESKTOP & TABLET */}
          <div className="hidden sm:flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder={
                  language === "en"
                    ? "Search experiences..."
                    : "Cari pengalaman..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg text-white hover:border-purple-500/50 transition-colors"
            >
              <Filter className="h-4 w-4" />
              {language === "en" ? "Filters" : "Filter"}
            </button>
            <button
              onClick={() => setIsAscending(!isAscending)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg text-white hover:border-purple-500/50 transition-colors"
            >
              {isAscending ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              {language === "en" ? "Sort by Date" : "Berdasarkan Tanggal"}
            </button>
          </div>

          {/* MOBILE */}
          <div className="flex sm:hidden flex-col gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder={
                  language === "en"
                    ? "Search experiences..."
                    : "Cari pengalaman..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg text-white hover:border-purple-500/50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                {language === "en" ? "Filters" : "Filter"}
              </button>
              <button
                onClick={() => setIsAscending(!isAscending)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-900/50 border border-purple-500/20 rounded-lg text-white hover:border-purple-500/50 transition-colors"
              >
                {isAscending ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
                {language === "en" ? "Sort by Date" : "Berdasarkan Tanggal"}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 p-4 bg-gray-900/30 rounded-lg border border-purple-500/10">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() =>
                        setSelectedCategory(
                          selectedCategory === category ? null : category
                        )
                      }
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedCategory === category
                          ? "bg-purple-500 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors flex items-center gap-1"
                    >
                      <X className="h-3 w-3" />
                      {language === "en" ? "Clear Filter" : "Hapus Filter"}
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {filteredData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400">
              {language === "en"
                ? "No experiences found"
                : "Tidak ada pengalaman yang ditemukan"}
            </p>
          </motion.div>
        ) : (
          filteredData.map((item, index) => (
            <div key={index} className="flex justify-start md:pt-5 md:gap-10">
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div
                  className={`h-12 w-12 absolute left-2.5 sm:left-2.5 rounded-full 
                    ${
                      index === activeIndex
                        ? "bg-gradient-to-br from-purple-500 to-pink-500 scale-110"
                        : "bg-gradient-to-br from-purple-500/50 to-pink-500/50"
                    } 
                    flex items-center justify-center transform transition-all duration-300`}
                >
                  <div
                    className={`h-8 w-8 rounded-full bg-gray-950 flex items-center justify-center transition-transform duration-300
                    ${index === activeIndex ? "scale-110" : "scale-100"}`}
                  >
                    <Briefcase
                      className={`h-4 w-4 ${
                        index === activeIndex
                          ? "text-purple-400"
                          : "text-purple-400/50"
                      }`}
                    />
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
                <div
                  className={`bg-gray-900/50 rounded-lg p-4 sm:p-6 backdrop-blur-sm border 
                  ${
                    index === activeIndex
                      ? "border-purple-500/30 shadow-lg shadow-purple-500/10"
                      : "border-purple-500/10"
                  } 
                  transition-all duration-300 hover:border-purple-500/20`}
                >
                  {item.content}
                </div>
              </div>
            </div>
          ))
        )}
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
