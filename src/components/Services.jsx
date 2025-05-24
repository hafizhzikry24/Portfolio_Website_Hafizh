import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../LanguageContext';
import { FiCode, FiLayout, FiSmartphone, FiDatabase, FiGitBranch } from 'react-icons/fi'; // Contoh ikon, Anda bisa menambahkan lebih banyak

const Services = () => {
  const { language } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: false, // Animasi akan berjalan setiap kali elemen masuk ke viewport
    threshold: 0.1,   // Persentase elemen yang terlihat sebelum animasi dimulai
  });

  const servicesData = [
    {
      icon: <FiCode className="w-12 h-12 mx-auto text-purple-600 mb-4" />,
      title: { en: 'Web Development', id: 'Pengembangan Web' },
      description: {
        en: 'Building responsive and dynamic websites using modern technologies like React, Next.js, Angular, and Laravel.',
        id: 'Membangun situs web yang responsif dan dinamis menggunakan teknologi modern seperti React, Next.js, Angular, dan Laravel.',
      },
    },
    {
      icon: <FiLayout className="w-12 h-12 mx-auto text-purple-600 mb-4" />,
      title: { en: 'UI/UX Design', id: 'Desain UI/UX' },
      description: {
        en: 'Creating intuitive and visually appealing user interfaces with a focus on user experience, using tools like Figma.',
        id: 'Menciptakan antarmuka pengguna yang intuitif dan menarik secara visual dengan fokus pada pengalaman pengguna, menggunakan alat seperti Figma.',
      },
    },
    {
      icon: <FiSmartphone className="w-12 h-12 mx-auto text-purple-600 mb-4" />,
      title: { en: 'Mobile App Development', id: 'Pengembangan Aplikasi Mobile' },
      description: {
        en: 'Developing cross-platform mobile applications using PWA (Ionic) and React Native.',
        id: 'Mengembangkan aplikasi seluler lintas platform menggunakan PWA (Ionic) dan React Native.',
      },
    },
    {
      icon: <FiDatabase className="w-12 h-12 mx-auto text-purple-600 mb-4" />,
      title: { en: 'Backend Development', id: 'Pengembangan Backend' },
      description: {
        en: 'Designing and implementing robust backend systems and APIs with PHP (Laravel) and Python.',
        id: 'Merancang dan mengimplementasikan sistem backend dan API yang tangguh dengan PHP (Laravel) dan Python.',
      },
    },
    {
      icon: <FiGitBranch className="w-12 h-12 mx-auto text-purple-600 mb-4" />,
      title: { en: 'Version Control & Collaboration', id: 'Kontrol Versi & Kolaborasi' },
      description: {
        en: 'Proficient in using Git and GitHub for version control and team collaboration.',
        id: 'Mahir menggunakan Git dan GitHub untuk kontrol versi dan kolaborasi tim.',
      },
    },
  ];

  return (
    <section
      ref={ref}
      id="services" // ID untuk navigasi jika diperlukan
      className={`py-16 sm:py-20 bg-gradient-to-r from-slate-100 to-slate-200 transition-all duration-1000 ease-in-out transform ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="container px-5 mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
            {language === 'en' ? 'Services I Offer' : 'Layanan yang Saya Tawarkan'}
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded mx-auto"></div>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-700 mt-4">
            {language === 'en' 
              ? 'Here are some of the key services I provide, leveraging my skills and experience to deliver high-quality solutions.' 
              : 'Berikut adalah beberapa layanan utama yang saya sediakan, memanfaatkan keahlian dan pengalaman saya untuk memberikan solusi berkualitas tinggi.'}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105"
            >
              {service.icon}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title[language]}
              </h3>
              <p className="text-gray-600 text-sm">
                {service.description[language]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;