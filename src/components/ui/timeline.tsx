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
import { 
  Briefcase, 
  Search, 
  Filter, 
  Calendar,
  ChevronUp,
  ChevronDown,
  X
} from 'lucide-react';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  category?: string;
  date: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAscending, setIsAscending] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const { language } = useLanguage();

  // Extract unique categories
  const categories = Array.from(
    new Set(data.map((item) => item.category || "Other"))
  );

  // Filter and sort data
  const filteredData = data
    .filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
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

  return (
    <div
      className="w-full bg-gradient-to-b from-gray-950 to-gray-900 py-12 sm:py-20 font-sans relative overflow-hidden"
      id="experience"
      ref={containerRef}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAwIiBmaWxsPSIjZmZmIi8+PC9nPjwvc3ZnPg==')] bg-repeat opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold">
            {language === "en" ? "Professional Journey" : "Perjalanan Profesional"}
          </h1>
          <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed">
            {language === "en"
              ? "Exploring the intersection of technology and innovation through diverse projects and continuous learning."
              : "Menjelajahi perpaduan teknologi dan inovasi melalui berbagai proyek dan pembelajaran berkelanjutan."}
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder={language === "en" ? "Search experiences..." : "Cari pengalaman..."}
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
              {isAscending ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              {language === "en" ? "Sort by Date" : "Urutkan berdasarkan Tanggal"}
            </button>
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
                      onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
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

        {/* Timeline Content */}
        <div ref={ref} className="relative max-w-7xl mx-auto">
          {filteredData.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-400">
                {language === "en" ? "No experiences found" : "Tidak ada pengalaman yang ditemukan"}
              </p>
            </motion.div>
          ) : (
            filteredData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row justify-start sm:pt-8 sm:gap-10 group mb-8 sm:mb-12"
              >
                <div className="sticky flex flex-row sm:flex-col items-center top-4 sm:top-40 self-start max-w-full sm:max-w-xs lg:max-w-sm sm:w-1/3">
                  <div 
                    className={`h-12 w-12 absolute left-4 sm:left-4 rounded-full 
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
                  <h2 className="hidden sm:block text-base sm:text-lg md:text-xl sm:pl-24 font-semibold text-white group-hover:text-purple-400 transition-colors duration-300">
                    {item.title}
                  </h2>
                </div>

                <div className="relative pl-24 sm:pl-4 pr-4 sm:pr-8 w-full sm:w-2/3">
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
              </motion.div>
            ))
          )}

          <div
            style={{
              height: height + "px",
            }}
            className="absolute sm:left-8 left-8 top-0 overflow-hidden w-[3px] bg-gradient-to-b from-transparent via-purple-500/20 to-transparent [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-purple-600 via-pink-500 to-purple-300 rounded-full shadow-lg shadow-purple-500/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
};