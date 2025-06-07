"use client"

import React, { useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { MessageSquare, Settings, TrendingUp, Repeat, CheckCircle, Users, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { useLanguage } from '../../../LanguageContext';
import Modal from "../ui/modal"

const BusinessFlow = () => {
  const controls = useAnimation()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedStep, setSelectedStep] = useState<any>(null)
  const { language } = useLanguage();
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  React.useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, inView])

  const flowSteps = [
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: language === 'en' ? "Discovery & Consultation" : "Penemuan & Konsultasi",
      subtitle: language === 'en' ? "Understanding Your Vision" : "Memahami Visi Anda",
      description: language === 'en' 
        ? "Deep dive into your business requirements, goals, and target audience to create a comprehensive project roadmap."
        : "Mendalami kebutuhan bisnis, tujuan, dan target audiens Anda untuk membuat roadmap proyek yang komprehensif.",
      badge: language === 'en' ? "Phase 1" : "Fase 1",
      color: "from-violet-500 to-purple-600",
      detailedContent: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-violet-50 to-purple-50 p-6 rounded-xl border border-violet-100">
            <h4 className="font-semibold text-violet-900 mb-3">
              {language === 'en' ? "What We Cover" : "Apa yang Kami Cakup"}
            </h4>
            <ul className="space-y-2 text-violet-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-500" />
                {language === 'en' ? "Business objectives and success metrics" : "Tujuan bisnis dan metrik kesuksesan"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-500" />
                {language === 'en' ? "Target audience analysis and user personas" : "Analisis target audiens dan persona pengguna"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-500" />
                {language === 'en' ? "Competitive landscape assessment" : "Penilaian lanskap kompetitif"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-violet-500" />
                {language === 'en' ? "Technical requirements and constraints" : "Kebutuhan dan batasan teknis"}
              </li>
            </ul>
          </div>
          <p className="text-slate-600 leading-relaxed font-pixel">
            {language === 'en' 
              ? "This foundational phase ensures we're aligned on your vision and sets the stage for a successful project delivery."
              : "Fase dasar ini memastikan kami selaras dengan visi Anda dan menyiapkan panggung untuk pengiriman proyek yang sukses."}
          </p>
        </div>
      ),
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: language === 'en' ? "Strategy & Architecture" : "Strategi & Arsitektur",
      subtitle: language === 'en' ? "Building the Blueprint" : "Membangun Cetak Biru",
      description: language === 'en'
        ? "Crafting a detailed technical architecture and project timeline that ensures scalable and maintainable solutions."
        : "Membuat arsitektur teknis dan timeline proyek yang detail untuk memastikan solusi yang dapat diskalakan dan dipelihara.",
      badge: language === 'en' ? "Phase 2" : "Fase 2",
      color: "from-blue-500 to-cyan-600",
      detailedContent: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
            <h4 className="font-semibold text-blue-900 mb-3">
              {language === 'en' ? "Strategic Planning" : "Perencanaan Strategis"}
            </h4>
            <ul className="space-y-2 text-blue-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                {language === 'en' ? "System architecture design" : "Desain arsitektur sistem"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                {language === 'en' ? "Technology stack selection" : "Pemilihan teknologi"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                {language === 'en' ? "Database design and optimization" : "Desain dan optimasi database"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-blue-500" />
                {language === 'en' ? "Security and compliance planning" : "Perencanaan keamanan dan kepatuhan"}
              </li>
            </ul>
          </div>
          <p className="text-slate-600 leading-relaxed font-pixel">
            {language === 'en'
              ? "We create a robust foundation that supports your current needs while allowing for future growth and scalability."
              : "Kami membuat fondasi yang kuat yang mendukung kebutuhan Anda saat ini sambil memungkinkan pertumbuhan dan skalabilitas di masa depan."}
          </p>
        </div>
      ),
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: language === 'en' ? "Design & Development" : "Desain & Pengembangan",
      subtitle: language === 'en' ? "Bringing Ideas to Life" : "Menghidupkan Ide",
      description: language === 'en'
        ? "Creating intuitive user experiences and robust functionality through iterative design and development cycles."
        : "Menciptakan pengalaman pengguna yang intuitif dan fungsionalitas yang kuat melalui siklus desain dan pengembangan yang iteratif.",
      badge: language === 'en' ? "Phase 3" : "Fase 3",
      color: "from-emerald-500 to-teal-600",
      detailedContent: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
            <h4 className="font-semibold text-emerald-900 mb-3">
              {language === 'en' ? "Development Process" : "Proses Pengembangan"}
            </h4>
            <ul className="space-y-2 text-emerald-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {language === 'en' ? "UI/UX design and prototyping" : "Desain UI/UX dan prototyping"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {language === 'en' ? "Agile development methodology" : "Metodologi pengembangan Agile"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {language === 'en' ? "Regular progress reviews and feedback" : "Ulasan kemajuan dan umpan balik secara berkala"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                {language === 'en' ? "Performance optimization" : "Optimasi kinerja"}
              </li>
            </ul>
          </div>
          <p className="text-slate-600 leading-relaxed font-pixel">
            {language === 'en'
              ? "Our iterative approach ensures continuous improvement and alignment with your evolving requirements."
              : "Pendekatan iteratif kami memastikan peningkatan berkelanjutan dan keselarasan dengan kebutuhan Anda yang berkembang."}
          </p>
        </div>
      ),
    },
    {
      icon: <Repeat className="w-6 h-6" />,
      title: language === 'en' ? "Testing & Quality Assurance" : "Pengujian & Jaminan Kualitas",
      subtitle: language === 'en' ? "Ensuring Excellence" : "Memastikan Keunggulan",
      description: language === 'en'
        ? "Comprehensive testing across all devices and scenarios to guarantee a flawless user experience."
        : "Pengujian komprehensif di semua perangkat dan skenario untuk menjamin pengalaman pengguna yang sempurna.",
      badge: language === 'en' ? "Phase 4" : "Fase 4",
      color: "from-amber-500 to-orange-600",
      detailedContent: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-100">
            <h4 className="font-semibold text-amber-900 mb-3">
              {language === 'en' ? "Quality Assurance" : "Jaminan Kualitas"}
            </h4>
            <ul className="space-y-2 text-amber-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                {language === 'en' ? "Automated and manual testing" : "Pengujian otomatis dan manual"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                {language === 'en' ? "Cross-browser compatibility" : "Kompatibilitas lintas browser"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                {language === 'en' ? "Mobile responsiveness testing" : "Pengujian responsivitas seluler"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-amber-500" />
                {language === 'en' ? "Performance and security audits" : "Audit kinerja dan keamanan"}
              </li>
            </ul>
          </div>
          <p className="text-slate-600 leading-relaxed font-pixel">
            {language === 'en'
              ? "Rigorous testing ensures your application performs flawlessly across all platforms and use cases."
              : "Pengujian yang ketat memastikan aplikasi Anda berfungsi dengan sempurna di semua platform dan kasus penggunaan."}
          </p>
        </div>
      ),
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: language === 'en' ? "Launch & Deployment" : "Peluncuran & Penyebaran",
      subtitle: language === 'en' ? "Going Live" : "Menjadi Aktif",
      description: language === 'en'
        ? "Seamless deployment to production with monitoring and optimization for peak performance."
        : "Penyebaran yang mulus ke produksi dengan pemantauan dan optimasi untuk kinerja puncak.",
      badge: language === 'en' ? "Phase 5" : "Fase 5",
      color: "from-rose-500 to-pink-600",
      detailedContent: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-rose-50 to-pink-50 p-6 rounded-xl border border-rose-100">
            <h4 className="font-semibold text-rose-900 mb-3">
              {language === 'en' ? "Launch Strategy" : "Strategi Peluncuran"}
            </h4>
            <ul className="space-y-2 text-rose-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-rose-500" />
                {language === 'en' ? "Production environment setup" : "Penyiapan lingkungan produksi"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-rose-500" />
                {language === 'en' ? "Domain and SSL configuration" : "Konfigurasi domain dan SSL"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-rose-500" />
                {language === 'en' ? "Performance monitoring setup" : "Penyiapan pemantauan kinerja"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-rose-500" />
                {language === 'en' ? "Launch day support and monitoring" : "Dukungan dan pemantauan hari peluncuran"}
              </li>
            </ul>
          </div>
          <p className="text-slate-600 leading-relaxed font-pixel">
            {language === 'en'
              ? "We ensure a smooth launch with comprehensive monitoring and immediate support for any issues."
              : "Kami memastikan peluncuran yang lancar dengan pemantauan komprehensif dan dukungan segera untuk masalah apa pun."}
          </p>
        </div>
      ),
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: language === 'en' ? "Support & Growth" : "Dukungan & Pertumbuhan",
      subtitle: language === 'en' ? "Ongoing Partnership" : "Kemitraan Berkelanjutan",
      description: language === 'en'
        ? "Continuous support, maintenance, and feature enhancements to keep your application thriving."
        : "Dukungan berkelanjutan, pemeliharaan, dan peningkatan fitur untuk menjaga aplikasi Anda tetap berkembang.",
      badge: language === 'en' ? "Phase 6" : "Fase 6",
      color: "from-indigo-500 to-purple-600",
      detailedContent: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
            <h4 className="font-semibold text-indigo-900 mb-3">
              {language === 'en' ? "Ongoing Support" : "Dukungan Berkelanjutan"}
            </h4>
            <ul className="space-y-2 text-indigo-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-500" />
                {language === 'en' ? "24/7 monitoring and maintenance" : "Pemantauan dan pemeliharaan 24/7"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-500" />
                {language === 'en' ? "Regular security updates" : "Pembaruan keamanan berkala"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-500" />
                {language === 'en' ? "Feature enhancements and scaling" : "Peningkatan fitur dan penskalaan"}
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-500" />
                {language === 'en' ? "Analytics and performance insights" : "Analitik dan wawasan kinerja"}
              </li>
            </ul>
          </div>
          <p className="text-slate-600 leading-relaxed font-pixel">
            {language === 'en'
              ? "Our partnership continues beyond launch, ensuring your application evolves with your business needs."
              : "Kemitraan kami berlanjut setelah peluncuran, memastikan aplikasi Anda berkembang sesuai dengan kebutuhan bisnis Anda."}
          </p>
        </div>
      ),
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        variants={{
          visible: {
            opacity: 0.4,
            scale: 1,
            transition: { duration: 2 },
          },
        }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-violet-200/30 to-purple-300/30 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        variants={{
          visible: {
            opacity: 0.4,
            scale: 1,
            transition: { duration: 2, delay: 0.5 },
          },
        }}
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-200/30 to-cyan-300/30 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"
      />

      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="container mx-auto px-6 relative z-10"
      >
        {/* Enhanced Header */}
        <motion.div variants={containerVariants} className="text-center mb-20">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full text-violet-700 font-medium text-sm mb-6"
          >
            <Sparkles className="w-4 h-4" />
            {language === 'en' ? 'Our Process' : 'Proses Kami'}
          </motion.div>

          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
              {language === 'en' ? 'From Concept to' : 'Dari Konsep ke'}
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {language === 'en' ? 'Digital Reality' : 'Realitas Digital'}
            </span>
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="h-1 w-32 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full mx-auto mb-8"
          />

          <motion.p variants={itemVariants} className="text-slate-600 text-xl max-w-3xl mx-auto leading-relaxed">
            {language === 'en'
              ? "A meticulously crafted journey that transforms your vision into exceptional digital experiences through strategic planning, innovative design, and flawless execution."
              : "Perjalanan yang dirancang dengan teliti yang mengubah visi Anda menjadi pengalaman digital yang luar biasa melalui perencanaan strategis, desain inovatif, dan eksekusi yang sempurna."}
          </motion.p>
        </motion.div>

        {/* Enhanced Process Steps */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {flowSteps.map((step, index) => (
            <motion.div key={index} variants={itemVariants} className="group relative">
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 h-full flex flex-col">
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <Badge
                      variant="secondary"
                      className={`bg-gradient-to-r ${step.color} text-white border-0 px-3 py-1`}
                    >
                      {step.badge}
                    </Badge>
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-r ${step.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-violet-700 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mb-4">{step.subtitle}</p>
                    <p className="text-slate-600 leading-relaxed mb-6">{step.description}</p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedStep(step)
                      setIsModalOpen(true)
                    }}
                    className="group/btn w-full font-slikscreen justify-between p-0 h-auto 
                              text-violet-600 hover:text-violet-700 hover:bg-violet-50 
                              transition-all duration-300 
                              opacity-100 pointer-events-auto 
                              lg:opacity-0 lg:pointer-events-none 
                              group-hover:opacity-100 group-hover:pointer-events-auto"
                  >
                    {language === 'en' ? 'Learn more' : 'Pelajari lebih lanjut'}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Enhanced Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedStep?.title}
        subtitle={selectedStep?.subtitle}
        content={selectedStep?.detailedContent}
      />
    </section>
  )
}

export default BusinessFlow
