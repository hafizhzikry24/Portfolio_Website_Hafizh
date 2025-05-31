import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useLanguage } from '../../../LanguageContext';
import { Code, Layout, Smartphone, Database } from 'lucide-react';
import ServiceCard from '../../ui/services-card';

const Services = () => {
  const { language } = useLanguage();
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  const servicesData = [
    {
      icon: <Code className="w-8 h-8" />,
      title: { en: 'Web Development', id: 'Pengembangan Web' },
      description: {
        en: 'Building responsive and dynamic websites using modern technologies like React, Next.js, Angular, and Laravel.',
        id: 'Membangun situs web yang responsif dan dinamis menggunakan teknologi modern seperti React, Next.js, Angular, dan Laravel.',
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
      icon: <Layout className="w-8 h-8" />,
      title: { en: 'UI/UX Design', id: 'Desain UI/UX' },
      description: {
        en: 'Creating intuitive and visually appealing user interfaces with a focus on user experience.',
        id: 'Menciptakan antarmuka pengguna yang intuitif dan menarik secara visual dengan fokus pada pengalaman pengguna.',
      },
      detailedContent: {
        en: (
          <div className="space-y-4">
            <p>Our UI/UX design process focuses on creating beautiful, functional interfaces that users love:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>User research and analysis</li>
              <li>Wireframing and prototyping</li>
              <li>Visual design and branding</li>
              <li>Interaction design</li>
              <li>Usability testing</li>
              <li>Responsive design</li>
              <li>Design system creation</li>
            </ul>
            <p>We ensure every design decision enhances user experience and achieves your business goals.</p>
          </div>
        ),
        id: (
          <div className="space-y-4">
            <p>Proses desain UI/UX kami berfokus pada pembuatan antarmuka yang indah dan fungsional yang disukai pengguna:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Riset dan analisis pengguna</li>
              <li>Wireframing dan prototyping</li>
              <li>Desain visual dan branding</li>
              <li>Desain interaksi</li>
              <li>Pengujian kegunaan</li>
              <li>Desain responsif</li>
              <li>Pembuatan sistem desain</li>
            </ul>
            <p>Kami memastikan setiap keputusan desain meningkatkan pengalaman pengguna dan mencapai tujuan bisnis Anda.</p>
          </div>
        ),
      },
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: { en: 'Mobile App Development', id: 'Pengembangan Aplikasi Mobile' },
      description: {
        en: 'Developing cross-platform mobile applications using PWA (Ionic) and React Native.',
        id: 'Mengembangkan aplikasi seluler lintas platform menggunakan PWA (Ionic) dan React Native.',
      },
      detailedContent: {
        en: (
          <div className="space-y-4">
            <p>We build high-performance mobile applications that work seamlessly across platforms:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Native iOS and Android development</li>
              <li>Cross-platform development</li>
              <li>Progressive Web Apps</li>
              <li>App Store optimization</li>
              <li>Performance optimization</li>
              <li>Push notifications</li>
              <li>Offline functionality</li>
            </ul>
            <p>Our mobile apps are built with the latest technologies to ensure optimal performance and user experience.</p>
          </div>
        ),
        id: (
          <div className="space-y-4">
            <p>Kami membangun aplikasi mobile berkinerja tinggi yang bekerja dengan lancar di berbagai platform:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pengembangan native iOS dan Android</li>
              <li>Pengembangan lintas platform</li>
              <li>Aplikasi Web Progresif</li>
              <li>Optimasi App Store</li>
              <li>Optimasi kinerja</li>
              <li>Notifikasi push</li>
              <li>Fungsionalitas offline</li>
            </ul>
            <p>Aplikasi mobile kami dibangun dengan teknologi terbaru untuk memastikan kinerja dan pengalaman pengguna yang optimal.</p>
          </div>
        ),
      },
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: { en: 'Database Design', id: 'Desain Database' },
      description: {
        en: 'Creating efficient, scalable database architectures optimized for application performance.',
        id: 'Membuat arsitektur database yang efisien dan dapat diskalakan, dioptimalkan untuk kinerja aplikasi.',
      },
      detailedContent: {
        en: (
          <div className="space-y-4">
            <p>Our database design services ensure your data is structured efficiently and securely:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Database architecture design</li>
              <li>Performance optimization</li>
              <li>Data migration</li>
              <li>Security implementation</li>
              <li>Backup and recovery solutions</li>
              <li>Scalability planning</li>
              <li>Monitoring and maintenance</li>
            </ul>
            <p>We implement robust database solutions that grow with your business needs.</p>
          </div>
        ),
        id: (
          <div className="space-y-4">
            <p>Layanan desain database kami memastikan data Anda terstruktur secara efisien dan aman:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Desain arsitektur database</li>
              <li>Optimasi kinerja</li>
              <li>Migrasi data</li>
              <li>Implementasi keamanan</li>
              <li>Solusi backup dan pemulihan</li>
              <li>Perencanaan skalabilitas</li>
              <li>Pemantauan dan pemeliharaan</li>
            </ul>
            <p>Kami mengimplementasikan solusi database yang kuat yang berkembang sesuai kebutuhan bisnis Anda.</p>
          </div>
        ),
      },
    },
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const decorationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section
      ref={ref}
      id="services"
      className="py-20 sm:py-28 relative overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      <motion.div 
        variants={decorationVariants}
        initial="hidden"
        animate={controls}
        className="absolute top-0 right-0 w-96 h-96 bg-purple-200/30 dark:bg-purple-900/20 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"
      />
      <motion.div 
        variants={decorationVariants}
        initial="hidden"
        animate={controls}
        className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-200/30 dark:bg-indigo-900/20 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"
      />
      
      <div className="container px-4 sm:px-6 mx-auto relative z-10">
        <motion.div 
          variants={headerVariants}
          initial="hidden"
          animate={controls}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 inline-block mb-4">
            {language === 'en' ? 'Services I Offer' : 'Layanan yang Saya Tawarkan'}
          </h2>
          
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto mb-6"></div>
          
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {language === 'en' 
              ? 'Delivering exceptional digital experiences through cutting-edge technologies and creative solutions.' 
              : 'Memberikan pengalaman digital luar biasa melalui teknologi mutakhir dan solusi kreatif.'}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={index}
              index={index}
              icon={service.icon}
              title={service.title[language]}
              description={service.description[language]}
              detailedContent={service.detailedContent[language]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;