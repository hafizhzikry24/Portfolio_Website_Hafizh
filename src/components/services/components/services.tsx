"use client"

import  React from "react"
import { useRef, useEffect, useState } from "react"
import { Code2, Palette, Smartphone, Database, X, ArrowRight, CheckCircle } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLanguage } from '../../../LanguageContext';

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface Service {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  technologies: string[]
  gradient: string
  accentColor: string
}

interface ServicesProps {
  language?: "en" | "id"
}

const Services: React.FC<ServicesProps> = () => {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const servicesRefs = useRef<(HTMLDivElement | null)[]>([])
  const { language } = useLanguage();

  const services: Service[] = [
    {
      id: "web-dev",
      icon: <Code2 className="w-7 h-7" />,
      title: language === "en" ? "Web Development" : "Pengembangan Web",
      description:
        language === "en"
          ? "Crafting exceptional digital experiences with cutting-edge technologies and meticulous attention to detail."
          : "Menciptakan pengalaman digital yang luar biasa dengan teknologi terkini dan perhatian yang teliti terhadap detail.",
      features:
        language === "en"
          ? [
              "Custom web application development",
              "Progressive Web Apps (PWA)",
              "Enterprise e-commerce solutions",
              "RESTful API development & integration",
              "Performance optimization & monitoring",
              "SEO-optimized development practices",
            ]
          : [
              "Pengembangan aplikasi web kustom",
              "Progressive Web Apps (PWA)",
              "Solusi e-commerce perusahaan",
              "Pengembangan & integrasi API RESTful",
              "Optimasi & pemantauan kinerja",
              "Praktik pengembangan yang dioptimalkan SEO",
            ],
      technologies: ["React", "Next.js", "Angular", "Laravel", "Docker", "GitHub"],
      gradient: "from-slate-900 via-slate-800 to-slate-700",
      accentColor: "from-emerald-400 to-teal-500",
    },
    {
      id: "ui-ux",
      icon: <Palette className="w-7 h-7" />,
      title: language === "en" ? "UI/UX Design" : "Desain UI/UX",
      description:
        language === "en"
          ? "Creating intuitive, aesthetically pleasing interfaces that prioritize user experience and business objectives."
          : "Menciptakan antarmuka  dan menarik secara estetika, mengutamakan pengalaman pengguna dan tujuan bisnis.",
      features:
        language === "en"
          ? [
              "Comprehensive user research & analysis",
              "Interactive wireframing & prototyping",
              "Brand identity & visual design systems",
              "Micro-interaction & animation design",
              "Scalable design system architecture",
              "Usability testing & optimization",
            ]
          : [
              "Penelitian & analisis pengguna komprehensif",
              "Wireframing & prototyping interaktif",
              "Identitas merek & sistem desain visual",
              "Desain mikro-interaksi & animasi",
              "Arsitektur sistem desain yang dapat diskalakan",
              "Pengujian & optimasi kegunaan",
            ],
      technologies: ["Figma", "Adobe Creative"],
      gradient: "from-slate-900 via-slate-800 to-slate-700",
      accentColor: "from-violet-400 to-purple-500",
    },
    {
      id: "mobile-dev",
      icon: <Smartphone className="w-7 h-7" />,
      title: language === "en" ? "Mobile Development" : "Pengembangan Mobile",
      description:
        language === "en"
          ? "Building high-performance mobile applications that deliver native experiences across all platforms."
          : "Membangun aplikasi mobile berkinerja tinggi yang memberikan pengalaman native di semua platform.",
      features:
        language === "en"
          ? [
              "Native iOS & Android development",
              "Cross-platform application solutions",
              "App Store optimization strategies",
              "Real-time push notification systems",
              "Offline-first functionality design",
              "Advanced performance optimization",
            ]
          : [
              "Pengembangan iOS & Android native",
              "Solusi aplikasi lintas platform",
              "Strategi optimasi App Store",
              "Sistem notifikasi push real-time",
              "Desain fungsionalitas offline-first",
              "Optimasi kinerja tingkat lanjut",
            ],
      technologies: ["React Native", "Flutter"],
      gradient: "from-slate-900 via-slate-800 to-slate-700",
      accentColor: "from-blue-400 to-indigo-500",
    },
    {
      id: "database",
      icon: <Database className="w-7 h-7" />,
      title: language === "en" ? "Database Architecture" : "Arsitektur Database",
      description:
        language === "en"
          ? "Designing robust, scalable database solutions that ensure optimal performance and data integrity."
          : "Merancang solusi database yang kuat dan dapat diskalakan yang memastikan kinerja optimal dan integritas data.",
      features:
        language === "en"
          ? [
              "Enterprise database architecture design",
              "Query optimization & performance tuning",
              "Seamless data migration strategies",
              "Advanced security implementation",
              "Automated backup & recovery solutions",
              "Real-time monitoring & maintenance",
            ]
          : [
              "Desain arsitektur database perusahaan",
              "Optimasi query & penyesuaian kinerja",
              "Strategi migrasi data yang mulus",
              "Implementasi keamanan tingkat lanjut",
              "Solusi backup & pemulihan otomatis",
              "Pemantauan & pemeliharaan real-time",
            ],
      technologies: ["MySQL", "MongoDB", "Firebase", "Supabase"],
      gradient: "from-slate-900 via-slate-800 to-slate-700",
      accentColor: "from-amber-400 to-orange-500",
    },
  ]

  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Horizontal scroll animation for service cards
      const cards = servicesRefs.current.filter(Boolean)

      if (cards.length > 0) {
        // Create horizontal scroll timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
            pin: false,
          },
        })

        // Animate cards from different directions
        cards.forEach((card, index) => {
          const isEven = index % 2 === 0

          gsap.fromTo(
            card,
            {
              opacity: 0,
              x: isEven ? -200 : 200,
              y: 50,
              rotationY: isEven ? -15 : 15,
              scale: 0.8,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              rotationY: 0,
              scale: 1,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "top 50%",
                toggleActions: "play none none reverse",
                scrub: 0.5,
              },
            },
          )

          // Add floating animation on hover
          card?.addEventListener("mouseenter", () => {
            gsap.to(card, {
              y: -20,
              rotationX: 5,
              rotationY: isEven ? 5 : -5,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out",
            })
          })

          card?.addEventListener("mouseleave", () => {
            gsap.to(card, {
              y: 0,
              rotationX: 0,
              rotationY: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out",
            })
          })
        })

        // Parallax effect for background elements
        gsap.to(".bg-pattern-1", {
          x: -100,
          y: -50,
          rotation: 10,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })

        gsap.to(".bg-pattern-2", {
          x: 100,
          y: 50,
          rotation: -10,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleServiceClick = (service: Service) => {
    setSelectedService(service)
    document.body.style.overflow = "hidden"

    // Animate modal entrance
    gsap.fromTo(
      ".modal-content",
      { scale: 0.5, opacity: 0, rotationY: 180 },
      { scale: 1, opacity: 1, rotationY: 0, duration: 0.6, ease: "back.out(1.7)" },
    )
  }

  const handleCloseModal = () => {
    // Animate modal exit
    gsap.to(".modal-content", {
      scale: 0.5,
      opacity: 0,
      rotationY: -180,
      duration: 0.4,
      ease: "back.in(1.7)",
      onComplete: () => {
        setSelectedService(null)
        document.body.style.overflow = "unset"
      },
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent, service: Service) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleServiceClick(service)
    }
  }

  const handleModalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      handleCloseModal()
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-gradient-to-br from-gray-900 via-black to-slate-900 overflow-hidden"
    >
      {/* Enhanced Background Patterns with Parallax */}
      <div className="bg-pattern-1 absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="bg-pattern-2 absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-violet-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(14,165,233,0.05),transparent_50%)] pointer-events-none" />

      <div ref={containerRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <div ref={headerRef} className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100/10 backdrop-blur-sm rounded-full text-sm font-medium text-slate-300 mb-6 border border-slate-700/50">
            <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full animate-pulse" />
            {language === "en" ? "Professional Services" : "Layanan Profesional"}
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-100 via-slate-200 to-slate-50 bg-clip-text text-transparent mb-6 leading-tight">
            {language === "en" ? "Exceptional Digital" : "Digital yang Luar Biasa"}
            <br />
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              {language === "en" ? "Solutions" : "Solusi"}
            </span>
          </h2>

          <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mx-auto mb-8" />

          <p className="text-xl sm:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
            {language === "en"
              ? "We deliver comprehensive digital solutions that transform ideas into exceptional experiences, combining technical excellence with creative innovation."
              : "Kami menyediakan solusi digital komprehensif yang mengubah ide menjadi pengalaman luar biasa, menggabungkan keunggulan teknis dengan inovasi kreatif."}
          </p>
        </div>

        {/* Enhanced Services Grid with 3D Effects */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-8 lg:gap-10 perspective-1000">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (servicesRefs.current[index] = el)}
              className="group relative transform-gpu"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="relative bg-white/5 backdrop-blur-md rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-700 border border-slate-700/50 hover:border-slate-600/50 cursor-pointer group overflow-hidden"
                onClick={() => handleServiceClick(service)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e, service)}
                aria-label={`Learn more about ${service.title}`}
              >
                {/* Enhanced Background Effects */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-700`}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${service.accentColor} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-700`}
                />

                {/* Animated Icon with 3D Effect */}
                <div
                  className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-r ${service.accentColor} text-white mb-8 shadow-lg group-hover:shadow-2xl transition-all duration-700 transform-gpu`}
                >
                  {service.icon}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${service.accentColor} rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-700`}
                  />
                  <div
                    className={`absolute -inset-2 bg-gradient-to-r ${service.accentColor} rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 transition-all duration-700`}
                  />
                </div>

                {/* Enhanced Content */}
                <div className="relative">
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-100 mb-4 group-hover:text-white transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 text-lg leading-relaxed mb-8 font-light group-hover:text-slate-200 transition-colors duration-500">
                    {service.description}
                  </p>

                  {/* Enhanced CTA */}
                  <div className="flex items-center text-slate-400 group-hover:text-slate-200 transition-all duration-500">
                    <span className="flex items-center text-slate-300 group-hover:text-slate-400 group/btn w-full font-slikscreen justify-between p-0 h-auto 
                             hover:text-slate-200 hover:bg-slate-300 
                              transition-all duration-300 
                              opacity-100 pointer-events-auto 
                              lg:opacity-0 lg:pointer-events-none 
                              group-hover:opacity-100 group-hover:pointer-events-auto">
                      {language === "en" ? "Explore Service" : "Jelajahi Layanan"}
                    </span>
                    <ArrowRight className="w-5 h-5 ml-3 transition-all duration-500 group-hover:translate-x-3 group-hover:scale-125" />
                  </div>
                </div>

                {/* Enhanced Decorative Elements */}
                <div
                  className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${service.accentColor} rounded-full blur-3xl opacity-5 group-hover:opacity-15 transition-all duration-700 transform group-hover:scale-150`}
                />
                <div
                  className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr ${service.accentColor} rounded-full blur-2xl opacity-5 group-hover:opacity-15 transition-all duration-700 transform group-hover:scale-150`}
                />

                {/* Glow Effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.accentColor} opacity-0 group-hover:opacity-10 blur-xl transition-all duration-700`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal with 3D Animation */}
      {selectedService && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          onClick={handleCloseModal}
          onKeyDown={handleModalKeyDown}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="modal-content bg-slate-900/95 backdrop-blur-sm rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-700/50"
            onClick={(e) => e.stopPropagation()}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="p-8 lg:p-12">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-r ${selectedService.accentColor} text-white shadow-lg`}
                  >
                    {selectedService.icon}
                  </div>
                  <div>
                    <h3 id="modal-title" className="text-3xl lg:text-4xl font-bold text-slate-100 mb-2">
                      {selectedService.title}
                    </h3>
                    <div className={`w-16 h-1 bg-gradient-to-r ${selectedService.accentColor} rounded-full`} />
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-3 hover:bg-slate-800 rounded-full transition-all duration-200 hover:scale-110 text-slate-400 hover:text-slate-200"
                  aria-label="Close modal"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="grid lg:grid-cols-2 gap-12">
                <div>
                  <p className="text-slate-300 text-xl leading-relaxed mb-10 font-light">
                    {selectedService.description}
                  </p>

                  <div className="mb-10">
                    <h4 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${selectedService.accentColor}`} />
                      {language === "en" ? "Key Features" : "Fitur Utama"}
                    </h4>
                    <ul className="space-y-4">
                      {selectedService.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-4 group">
                          <CheckCircle className="w-6 h-6 text-emerald-400 mt-0.5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                          <span className="text-slate-300 text-lg leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="text-2xl font-bold text-slate-100 mb-6 flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${selectedService.accentColor}`} />
                    {language === "en" ? "Technologies" : "Teknologi"}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedService.technologies.map((tech, index) => (
                      <div
                        key={index}
                        className={`group px-6 py-4 bg-gradient-to-r ${selectedService.accentColor} text-white rounded-2xl text-center font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-default`}
                      >
                        <span className="relative z-10">{tech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Services
