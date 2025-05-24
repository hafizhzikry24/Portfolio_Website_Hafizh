import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../LanguageContext'; // Pastikan path ini benar
import { FiTrendingUp, FiCheckCircle, FiSettings, FiUsers, FiMessageSquare, FiRepeat } from 'react-icons/fi'; // Contoh ikon

const BusinessFlow = () => {
  const { language } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const flowSteps = [
    {
      icon: <FiMessageSquare className="w-10 h-10 mx-auto text-indigo-500 mb-3" />,
      title: { en: 'Initial Consultation', id: 'Konsultasi Awal' },
      description: {
        en: 'Understanding your project requirements, goals, and vision.',
        id: 'Memahami kebutuhan, tujuan, dan visi proyek Anda.',
      },
    },
    {
      icon: <FiSettings className="w-10 h-10 mx-auto text-indigo-500 mb-3" />,
      title: { en: 'Planning & Strategy', id: 'Perencanaan & Strategi' },
      description: {
        en: 'Defining the project scope, timeline, and development strategy.',
        id: 'Menentukan lingkup proyek, jadwal, dan strategi pengembangan.',
      },
    },
    {
      icon: <FiTrendingUp className="w-10 h-10 mx-auto text-indigo-500 mb-3" />,
      title: { en: 'Design & Development', id: 'Desain & Pengembangan' },
      description: {
        en: 'Crafting the UI/UX design and developing the core functionalities.',
        id: 'Merancang desain UI/UX dan mengembangkan fungsionalitas inti.',
      },
    },
    {
      icon: <FiRepeat className="w-10 h-10 mx-auto text-indigo-500 mb-3" />,
      title: { en: 'Testing & Iteration', id: 'Pengujian & Iterasi' },
      description: {
        en: 'Rigorous testing to ensure quality and incorporating feedback for improvements.',
        id: 'Pengujian ketat untuk memastikan kualitas dan memasukkan umpan balik untuk perbaikan.',
      },
    },
    {
      icon: <FiCheckCircle className="w-10 h-10 mx-auto text-indigo-500 mb-3" />,
      title: { en: 'Deployment & Launch', id: 'Deployment & Peluncuran' },
      description: {
        en: 'Deploying the application to the live environment.',
        id: 'Menerapkan aplikasi ke lingkungan live.',
      },
    },
    {
      icon: <FiUsers className="w-10 h-10 mx-auto text-indigo-500 mb-3" />,
      title: { en: 'Support & Maintenance', id: 'Dukungan & Pemeliharaan' },
      description: {
        en: 'Providing ongoing support and maintenance to ensure smooth operation.',
        id: 'Memberikan dukungan dan pemeliharaan berkelanjutan untuk memastikan kelancaran operasi.',
      },
    },
  ];

  return (
    <section
      ref={ref}
      id="business-flow"
      className={`py-16 sm:py-20 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white transition-all duration-1000 ease-in-out transform ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container px-5 mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
            {language === 'en' ? 'Development Business Flow' : 'Alur Bisnis Pengembangan'}
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded mx-auto"></div>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-300 mt-6">
            {language === 'en'
              ? 'My systematic approach to ensure successful project delivery from conception to completion.'
              : 'Pendekatan sistematis saya untuk memastikan keberhasilan pengiriman proyek dari konsepsi hingga penyelesaian.'}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {flowSteps.map((step, index) => (
            <div
              key={index}
              className="p-6 bg-gray-800 rounded-xl shadow-xl hover:shadow-purple-500/30 transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-700 hover:border-purple-500"
            >
              {step.icon}
              <h3 className="text-xl font-semibold text-white mb-2">
                {step.title[language]}
              </h3>
              <p className="text-gray-400 text-sm">
                {step.description[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessFlow;