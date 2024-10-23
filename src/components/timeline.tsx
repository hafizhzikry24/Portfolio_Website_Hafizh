import React from "react";
import { Timeline } from "./ui/timeline";
import { useInView } from "react-intersection-observer"; 
import { useLanguage } from "../LanguageContext";

export function TimelineDemo() {
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: false, // Trigger animation once
    threshold: 0.1, // Trigger when 10% of the component is visible
  });

  const { language } = useLanguage();

  const data = [
    {
      title: "PT Awan Network Indonesia",
      content: (
        <div>
          <p className="text-neutral-500  text-xs md:text-base font-normal mb-6">
            Aug 2024 - Present
          </p>
          <p className="text-neutral-800  text-xs text-justify md:text-base font-normal mb-8 sm:mb-16">
            {language === "en"
              ? "As a Backend Developer at PT Awan Network Indonesia, I developed and optimized APIs for seamless integration between the application and the website with my team. My responsibilities included ensuring efficient backend performance, implementing scalable solutions, and collaborating with cross-functional teams to deliver a robust and secure platform that enhances user interaction and functionality."
              : "Sebagai Backend Developer di PT Awan Network Indonesia, saya mengembangkan dan mengoptimalkan API untuk integrasi yang mulus antara aplikasi dan situs web dengan tim saya. Tanggung jawab saya termasuk memastikan kinerja backend yang efisien, menerapkan solusi yang dapat diskalakan, dan berkolaborasi dengan tim lintas fungsi untuk menghadirkan platform yang kuat dan aman yang meningkatkan interaksi dan fungsionalitas pengguna."
            }
          </p>
        </div>
      ),
    },
    {
      title: language === "en" ? "Diponegoro University" : "Universitas Diponegoro",
      content: (
        <div>
          <p className="text-neutral-500  text-xs md:text-base font-normal mb-6">
            Aug 2024 - Nov 2024
          </p>
          <p className="text-neutral-800  text-xs text-justify md:text-base font-normal mb-8 sm:mb-16">
            {language === "en"
              ? "During my studies I took the opportunity to become a practicum assistant, I taught: Assistant practicum of Digital System Class, Assistant practicum of Introduction To Network Class, Assistant practicum of Advanced Digital Systems Class, Assistant practicum of Switching, routing and wireless essentials Class, Assistant practicum of Automation and Control Systems Practical Class."
              : "Selama studi saya, saya mengambil kesempatan untuk menjadi asisten praktikum, saya mengajar: Asisten praktikum Kelas Sistem Digital, Asisten praktikum Kelas Pengantar Jaringan, Asisten praktikum Kelas Sistem Digital Lanjut, Asisten praktikum Kelas Switching, routing dan wireless essentials, Asisten praktikum Kelas Sistem Otomasi dan Kontrol."
            }
          </p>
        </div>
      ),
    },
    {
      title: language === "en" ? "MTQMN XVII at Malang" : "MTQMN XVII Malang",
      content: (
        <div>
          <p className="text-neutral-500  text-xs md:text-base font-normal mb-6">
            Nov 2023
          </p>
          <p className="text-neutral-800  text-xs text-justify md:text-base font-normal mb-8 sm:mb-16">
            {language === "en"
              ? "Won first place in the Diponegoro University MTQM Al-Qur'an Application Design competition, representing the university at the National MTQM at Brawijaya University, Malang. Our team, out of 50 university representatives, presented the Quran Application Design and finished in the top 18."
              : "Meraih juara pertama dalam kompetisi Desain Aplikasi Al-Qur'an MTQM Universitas Diponegoro, mewakili universitas di MTQM Nasional di Universitas Brawijaya, Malang. Tim kami, dari 50 perwakilan universitas, mempresentasikan Desain Aplikasi Quran dan selesai di peringkat 18 besar."
            }
          </p>
        </div>
      ),
    },
    {
      title: "SMKN 53 Jakarta",
      content: (
        <div>
          <p className="text-neutral-500  text-xs md:text-base font-normal mb-6">
            Jan 2023 - Feb 2023
          </p>
          <p className="text-neutral-800  text-xs text-justify md:text-base font-normal mb-8 sm:mb-16">
            {language === "en"
              ? "Carrying out network design or what is known as network architecture, installing and configuring the network design then monitoring the network to ensure that the network does not experience problems, troubleshooting which is carried out when interference or problems are found on a network and documentation is useful for reports and also makes the subsequent troubleshooting process easier."
              : "Melakukan perancangan jaringan atau yang dikenal dengan arsitektur jaringan, memasang dan mengkonfigurasi desain jaringan kemudian memantau jaringan untuk memastikan bahwa jaringan tidak mengalami masalah, pemecahan masalah yang dilakukan saat gangguan atau masalah ditemukan pada jaringan dan dokumentasi berguna untuk laporan dan juga mempermudah proses pemecahan masalah selanjutnya."
            }
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div
        ref={inViewRef} // Attach inViewRef here
        className={`transition-all duration-1000 ease-in-out transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} // Apply animation classes
      >
        <Timeline data={data} />
      </div>
    </div>
  );
}
