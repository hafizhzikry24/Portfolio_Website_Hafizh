import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../LanguageContext';
import { useState } from 'react';
import Modal from './ui/modal';
import { MessageSquare, Settings, TrendingUp, Repeat, CheckCircle, Users } from 'lucide-react';

const BusinessFlow = ({ title, detailedContent }) => {
  const { language } = useLanguage();
  const controls = useAnimation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  React.useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const flowSteps = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: { en: 'Initial Consultation', id: 'Konsultasi Awal' },
      description: {
        en: 'Understanding your project requirements, goals, and vision.',
        id: 'Memahami kebutuhan, tujuan, dan visi proyek Anda.',
      },
      detailedContent: {
        en: (
          <div className="space-y-4">
            <p>Our web development service encompasses everything you need to build a modern, high-performance website:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Custom web application development</li>
              <li>Progressive Web Apps (PWA)</li>
              <li>E-commerce solutions</li>
              <li>Content Management Systems</li>
              <li>API development and integration</li>
              <li>Performance optimization</li>
              <li>SEO-friendly development</li>
            </ul>
            <p>We use cutting-edge technologies and follow best practices to ensure your website is fast, secure, and scalable.</p>
          </div>
        ),
        id: (
          <div className="space-y-4">
            <p>Layanan pengembangan web kami mencakup semua yang Anda butuhkan untuk membangun website modern dan berkinerja tinggi:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pengembangan aplikasi web kustom</li>
              <li>Aplikasi Web Progresif (PWA)</li>
              <li>Solusi e-commerce</li>
              <li>Sistem Manajemen Konten</li>
              <li>Pengembangan dan integrasi API</li>
              <li>Optimasi kinerja</li>
              <li>Pengembangan ramah SEO</li>
            </ul>
            <p>Kami menggunakan teknologi terkini dan mengikuti praktik terbaik untuk memastikan website Anda cepat, aman, dan dapat diskalakan.</p>
          </div>
        ),
      },
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: { en: 'Planning & Strategy', id: 'Perencanaan & Strategi' },
      description: {
        en: 'Defining the project scope, timeline, and development strategy.',
        id: 'Menentukan lingkup proyek, jadwal, dan strategi pengembangan.',
      },
      detailedContent: {
        en: (
          <div className="space-y-4">
            <p>Our web development service encompasses everything you need to build a modern, high-performance website:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Custom web application development</li>
              <li>Progressive Web Apps (PWA)</li>
              <li>E-commerce solutions</li>
              <li>Content Management Systems</li>
              <li>API development and integration</li>
              <li>Performance optimization</li>
              <li>SEO-friendly development</li>
            </ul>
            <p>We use cutting-edge technologies and follow best practices to ensure your website is fast, secure, and scalable.</p>
          </div>
        ),
        id: (
          <div className="space-y-4">
            <p>Layanan pengembangan web kami mencakup semua yang Anda butuhkan untuk membangun website modern dan berkinerja tinggi:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pengembangan aplikasi web kustom</li>
              <li>Aplikasi Web Progresif (PWA)</li>
              <li>Solusi e-commerce</li>
              <li>Sistem Manajemen Konten</li>
              <li>Pengembangan dan integrasi API</li>
              <li>Optimasi kinerja</li>
              <li>Pengembangan ramah SEO</li>
            </ul>
            <p>Kami menggunakan teknologi terkini dan mengikuti praktik terbaik untuk memastikan website Anda cepat, aman, dan dapat diskalakan.</p>
          </div>
        ),
      },
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: { en: 'Design & Development', id: 'Desain & Pengembangan' },
      description: {
        en: 'Crafting the UI/UX design and developing the core functionalities.',
        id: 'Merancang desain UI/UX dan mengembangkan fungsionalitas inti.',
      },
      detailedContent: {
        en: (
          <div className="space-y-4">
            <p>Our web development service encompasses everything you need to build a modern, high-performance website:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Custom web application development</li>
              <li>Progressive Web Apps (PWA)</li>
              <li>E-commerce solutions</li>
              <li>Content Management Systems</li>
              <li>API development and integration</li>
              <li>Performance optimization</li>
              <li>SEO-friendly development</li>
            </ul>
            <p>We use cutting-edge technologies and follow best practices to ensure your website is fast, secure, and scalable.</p>
          </div>
        ),
        id: (
          <div className="space-y-4">
            <p>Layanan pengembangan web kami mencakup semua yang Anda butuhkan untuk membangun website modern dan berkinerja tinggi:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pengembangan aplikasi web kustom</li>
              <li>Aplikasi Web Progresif (PWA)</li>
              <li>Solusi e-commerce</li>
              <li>Sistem Manajemen Konten</li>
              <li>Pengembangan dan integrasi API</li>
              <li>Optimasi kinerja</li>
              <li>Pengembangan ramah SEO</li>
            </ul>
            <p>Kami menggunakan teknologi terkini dan mengikuti praktik terbaik untuk memastikan website Anda cepat, aman, dan dapat diskalakan.</p>
          </div>
        ),
      },
    },
    {
      icon: <Repeat className="w-8 h-8" />,
      title: { en: 'Testing & Iteration', id: 'Pengujian & Iterasi' },
      description: {
        en: 'Rigorous testing to ensure quality and incorporating feedback for improvements.',
        id: 'Pengujian ketat untuk memastikan kualitas dan memasukkan umpan balik untuk perbaikan.',
      },
      detailedContent: {
        en: (
          <div className="space-y-4">
            <p>Our web development service encompasses everything you need to build a modern, high-performance website:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Custom web application development</li>
              <li>Progressive Web Apps (PWA)</li>
              <li>E-commerce solutions</li>
              <li>Content Management Systems</li>
              <li>API development and integration</li>
              <li>Performance optimization</li>
              <li>SEO-friendly development</li>
            </ul>
            <p>We use cutting-edge technologies and follow best practices to ensure your website is fast, secure, and scalable.</p>
          </div>
        ),
        id: (
          <div className="space-y-4">
            <p>Layanan pengembangan web kami mencakup semua yang Anda butuhkan untuk membangun website modern dan berkinerja tinggi:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pengembangan aplikasi web kustom</li>
              <li>Aplikasi Web Progresif (PWA)</li>
              <li>Solusi e-commerce</li>
              <li>Sistem Manajemen Konten</li>
              <li>Pengembangan dan integrasi API</li>
              <li>Optimasi kinerja</li>
              <li>Pengembangan ramah SEO</li>
            </ul>
            <p>Kami menggunakan teknologi terkini dan mengikuti praktik terbaik untuk memastikan website Anda cepat, aman, dan dapat diskalakan.</p>
          </div>
        ),
      },
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: { en: 'Deployment & Launch', id: 'Deployment & Peluncuran' },
      description: {
        en: 'Deploying the application to the live environment.',
        id: 'Menerapkan aplikasi ke lingkungan live.',
      },
      detailedContent: {
        en: (
          <div className="space-y-4">
            <p>Our web development service encompasses everything you need to build a modern, high-performance website:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Custom web application development</li>
              <li>Progressive Web Apps (PWA)</li>
              <li>E-commerce solutions</li>
              <li>Content Management Systems</li>
              <li>API development and integration</li>
              <li>Performance optimization</li>
              <li>SEO-friendly development</li>
            </ul>
            <p>We use cutting-edge technologies and follow best practices to ensure your website is fast, secure, and scalable.</p>
          </div>
        ),
        id: (
          <div className="space-y-4">
            <p>Layanan pengembangan web kami mencakup semua yang Anda butuhkan untuk membangun website modern dan berkinerja tinggi:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pengembangan aplikasi web kustom</li>
              <li>Aplikasi Web Progresif (PWA)</li>
              <li>Solusi e-commerce</li>
              <li>Sistem Manajemen Konten</li>
              <li>Pengembangan dan integrasi API</li>
              <li>Optimasi kinerja</li>
              <li>Pengembangan ramah SEO</li>
            </ul>
            <p>Kami menggunakan teknologi terkini dan mengikuti praktik terbaik untuk memastikan website Anda cepat, aman, dan dapat diskalakan.</p>
          </div>
        ),
      },
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: { en: 'Support & Maintenance', id: 'Dukungan & Pemeliharaan' },
      description: {
        en: 'Providing ongoing support and maintenance to ensure smooth operation.',
        id: 'Memberikan dukungan dan pemeliharaan berkelanjutan untuk memastikan kelancaran operasi.',
      },
      detailedContent: {
        en: (
          <div className="space-y-4">
            <p>Our web development service encompasses everything you need to build a modern, high-performance website:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Custom web application development</li>
              <li>Progressive Web Apps (PWA)</li>
              <li>E-commerce solutions</li>
              <li>Content Management Systems</li>
              <li>API development and integration</li>
              <li>Performance optimization</li>
              <li>SEO-friendly development</li>
            </ul>
            <p>We use cutting-edge technologies and follow best practices to ensure your website is fast, secure, and scalable.</p>
          </div>
        ),
        id: (
          <div className="space-y-4">
            <p>Layanan pengembangan web kami mencakup semua yang Anda butuhkan untuk membangun website modern dan berkinerja tinggi:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pengembangan aplikasi web kustom</li>
              <li>Aplikasi Web Progresif (PWA)</li>
              <li>Solusi e-commerce</li>
              <li>Sistem Manajemen Konten</li>
              <li>Pengembangan dan integrasi API</li>
              <li>Optimasi kinerja</li>
              <li>Pengembangan ramah SEO</li>
            </ul>
            <p>Kami menggunakan teknologi terkini dan mengikuti praktik terbaik untuk memastikan website Anda cepat, aman, dan dapat diskalakan.</p>
          </div>
        ),
      },
    },
  ];

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
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section
      ref={ref}
      id="business-flow"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        variants={{
          visible: { 
            opacity: 0.1,
            scale: 1,
            transition: { duration: 1 }
          }
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        variants={{
          visible: { 
            opacity: 0.1,
            scale: 1,
            transition: { duration: 1 }
          }
        }}
        className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 mb-6"
          >
            {language === 'en' ? 'Development Process' : 'Proses Pengembangan'}
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto mb-6"
          />
          <motion.p
            variants={itemVariants}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            {language === 'en'
              ? 'A systematic approach ensuring successful project delivery from conception to completion.'
              : 'Pendekatan sistematis untuk memastikan keberhasilan proyek dari konsepsi hingga penyelesaian.'}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {flowSteps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative h-full flex flex-col p-8 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden backdrop-blur-sm">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-md" />
                <div className="absolute -left-4 -bottom-4 w-20 h-20 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full blur-md" />
                
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full blur-sm transform group-hover:scale-110 transition-transform duration-300" />
                  <div className="relative flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3">
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                  {step.title[language]}
                </h3>
                
                <p className="text-gray-600 text-sm flex-grow">
                  {step.description[language]}
                </p>
                
                <div className="mt-6 overflow-hidden h-8">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                    <motion.button
                      whileHover={{ scale: 0.95 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSelectedStep(step);
                        setIsModalOpen(true);
                      }}
                      className="text-sm font-medium text-purple-600 flex items-center group/button"
                    > 
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
          ))}
        </motion.div>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedStep?.title[language]}
          content={selectedStep?.detailedContent[language]}
        />
      </div>
    </section>
  );
};

export default BusinessFlow;