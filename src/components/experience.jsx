import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useLanguage } from '../LanguageContext';

export default function Experience() {
  const scrollContainerRef = useRef(null);
  const { language } = useLanguage();

  useEffect(() => {
    const cards = document.querySelectorAll('.experience-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('transform', 'scale-105');
          entry.target.classList.remove('opacity-0');
        } else {
          entry.target.classList.remove('transform', 'scale-105');
          entry.target.classList.add('opacity-0');
        }
      });
    }, { threshold: 0.1 });

    cards.forEach(card => {
      observer.observe(card);
    });

    return () => {
      cards.forEach(card => {
        observer.unobserve(card);
      });
    };
  }, []);

  const { ref: contentRef, inView: isContentVisible } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollContainerRef.current.offsetWidth : scrollContainerRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const experienceData = [
    {
      company: { en: "PT. Awan Network Indonesia", id: "PT. Awan Network Indonesia" },
      period: { en: "Aug 2024 - Nov 2024", id: "Agustus 2024 - November 2024" },
      role: { en: "Back End Developer", id: "Pengembang Backend" },
      description: {
        en: "As a Backend Developer at PT Awan Network Indonesia, I developed and optimized APIs for seamless integration between the application and the website with my team. My responsibilities included ensuring efficient backend performance, implementing scalable solutions, and collaborating with cross-functional teams to deliver a robust and secure platform that enhances user interaction and functionality.",
        id: "Sebagai Pengembang Backend di PT Awan Network Indonesia, saya mengembangkan dan mengoptimalkan API untuk integrasi antara aplikasi dan situs web bersama tim saya. Tanggung jawab saya termasuk memastikan kinerja backend yang efisien, menerapkan solusi yang dapat diskalakan, dan berkolaborasi dengan tim lintas fungsi untuk memberikan platform yang kuat dan aman yang meningkatkan interaksi dan fungsionalitas pengguna."
      },
    },
    {
      company: { en: "Diponegoro University", id: "Universitas Diponegoro" },
      period: { en: "Apr 2023 - Apr 2024", id: "April 2023 - April 2024" },
      role: { en: "Assistant Practicum", id: "Asisten Praktikum" },
      description: {
        en: "During my studies I took the opportunity to become a practicum assistant, I taught: Assistant practicum of Digital System Class, Assistant practicum of Introduction To Network Class, Assistant practicum of Advanced Digital Systems Lanjut Lanjut Class, Assistant practicum of Switching, routing and wireless essentials Class, Assistant practicum of Automation and Control Systems Practical Class.",
        id: "Selama masa studi saya, saya mengambil kesempatan untuk menjadi asisten praktikum, saya mengajar: Asisten praktikum Sistem Digital, Asisten praktikum Pengantar Jaringan, Asisten praktikum Sistem Digital Lanjut, Asisten praktikum Switching, routing, dan wireless essentials, Asisten praktikum Sistem Otomasi dan Kontrol."
      },
    },
    {
      company: { en: "MTQMN XVII at Malang", id: "MTQMN XVII di Malang" },
      period: { en: "Nov 2023", id: "November 2023" },
      role: { en: "UI/UX Design", id: "Desain UI/UX" },
      description: {
        en: "Won first place in the Diponegoro University MTQM Al-Qur'an Application Design competition, representing the university at the National MTQM at Brawijaya University, Malang. Our team, out of 50 university representatives, presented the Quran Application Design and finished in the top 18.",
        id: "Meraih juara pertama di kompetisi Desain Aplikasi Al-Qur'an MTQM Universitas Diponegoro, mewakili universitas di MTQM Nasional di Universitas Brawijaya, Malang. Tim kami, dari 50 perwakilan universitas, mempresentasikan Desain Aplikasi Al-Qur'an dan berhasil finis di 18 besar."
      },
    },
    {
      company: { en: "SMKN 53 Jakarta", id: "SMKN 53 Jakarta" },
      period: { en: "Jan 2023 - Feb 2023", id: "Januari 2023 - Februari 2023" },
      role: { en: "Network Engineer", id: "Network Engineer" },
      description: {
        en: "Carrying out network design or what is known as network architecture, installing and configuring the network design then monitoring the network to ensure that the network does not experience problems, troubleshooting which is carried out when interference or problems are found on a network and documentation is useful for reports and also makes the subsequent troubleshooting process easier.",
        id: "Melaksanakan desain jaringan atau yang dikenal sebagai arsitektur jaringan, menginstal dan mengonfigurasi desain jaringan kemudian memantau jaringan untuk memastikan jaringan tidak mengalami masalah, pemecahan masalah dilakukan ketika gangguan atau masalah ditemukan pada jaringan dan dokumentasi berguna untuk laporan serta memudahkan proses pemecahan masalah selanjutnya."
      },
    },
  ];

  return (
    <section
      ref={contentRef}
      className={`text-gray-600 body-font bg-gradient-to-r from-gray-50 via-gray-100 py-3 sm:py-4 transition-all duration-1000 ease-in-out transform ${
        isContentVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`} id="experience"
    >
      <div className="container px-5 py-14 mx-auto text-center sm:py-4 relative">
        <div className="mb-16">
          <h1 className="sm:text-4xl text-2xl font-extrabold text-gray-900 mb-4 mt-14 animate__animated animate__fadeIn">
            {language === 'en' ? 'Experience' : 'Pengalaman'}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-700 animate__animated animate__fadeIn animate__delay-1s">
            {language === 'en' ? 'This is my experience in technology field.' : 'Ini adalah pengalaman saya pada dunia teknologi.'}
          </p>
        </div>

        {/* Left Scroll Icon */}
        <button
          className="absolute z-10 left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 mx-1"
          onClick={() => handleScroll("left")}
        >
          <FiChevronLeft size={24} />
        </button>

        {/* Right Scroll Icon */}
        <button
          className="absolute z-10 right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full p-2 mx-1"
          onClick={() => handleScroll("right")}
        >
          <FiChevronRight size={24} />
        </button>

        <div className="overflow-x-auto snap-x" ref={scrollContainerRef}>
          <div className="flex space-x-24 pb-4">
            {experienceData.map((item, index) => (
              <div
                key={index}
                className="snap-start bg-gradient-to-r from-slate-50 to-gray-100 experience-card min-w-full p-10 text-justify sm:p-20 rounded-lg shadow-md hover:shadow-lg transition-all duration-500 ease-in-out transform opacity-0"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 text-lg font-bold mr-4">
                    {item.company[language].charAt(0)}
                  </div>
                  <div>
                    <span className="block font-semibold text-gray-700">{item.company[language]}</span>
                    <span className="block text-gray-500 text-sm">{item.period[language]}</span>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">{item.role[language]}</h2>
                <p className="leading-relaxed text-gray-600">{item.description[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

