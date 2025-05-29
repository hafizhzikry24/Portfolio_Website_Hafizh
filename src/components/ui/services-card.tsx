import React, { useState } from "react";
import { motion } from "framer-motion";
import Modal from "./modal";
import { useLanguage } from "../../LanguageContext";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  detailedContent: React.ReactNode;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  icon,
  title,
  description,
  detailedContent,
  index,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        whileHover={{
          y: -8,
          transition: { duration: 0.2 },
        }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="relative h-full flex flex-col p-8 bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-md"></div>
          <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full blur-md"></div>

          <div className="mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full blur-sm transform group-hover:scale-110 transition-transform duration-300"></div>
            <div className="relative flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3">
              {icon}
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
            {title}
          </h3>

          <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
            {description}
          </p>

          <div className="mt-6 overflow-hidden h-8">
            <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
              <motion.button
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="text-sm font-medium text-purple-600 dark:text-purple-400 flex items-center group/button"
              >
                {" "}
                {language === 'en' ? 'Learn more' : 'Pelajari lebih lanjut'}
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        content={detailedContent}
      />
    </>
  );
};

export default ServiceCard;
