"use client"

import React, { useCallback, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Database,
  Palette,
  Smartphone,
  X,
} from "lucide-react"
import { useLanguage } from "../../../LanguageContext"
import HorizontalFeatureReveal, {
  type FeatureRevealProperty,
} from "../../ui/horizontal-feature-reveal"

type Language = "en" | "id"

interface Service {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  technologies: string[]
  accent: string
  iconBg: string
  ring: string
}

const COPY: Record<Language, {
  eyebrow: string
  titleLine1: string
  titleLine2: string
  description: string
  explore: string
  features: string
  technologies: string
  close: string
}> = {
  en: {
    eyebrow: "Professional Services",
    titleLine1: "Exceptional digital",
    titleLine2: "solutions",
    description:
      "Comprehensive services that transform ideas into experiences, combining technical excellence with creative innovation.",
    explore: "Explore service",
    features: "Key features",
    technologies: "Technologies",
    close: "Close",
  },
  id: {
    eyebrow: "Layanan Profesional",
    titleLine1: "Solusi digital",
    titleLine2: "yang luar biasa",
    description:
      "Layanan komprehensif yang mengubah ide menjadi pengalaman, memadukan keunggulan teknis dengan inovasi kreatif.",
    explore: "Jelajahi layanan",
    features: "Fitur utama",
    technologies: "Teknologi",
    close: "Tutup",
  },
}

const buildServices = (language: Language): Service[] => [
  {
    id: "web-dev",
    icon: <Code2 className="h-6 w-6" aria-hidden="true" />,
    title: language === "en" ? "Web Development" : "Pengembangan Web",
    description:
      language === "en"
        ? "Crafting exceptional digital experiences with modern technologies and meticulous attention to detail."
        : "Menciptakan pengalaman digital hebat dengan teknologi modern dan perhatian pada setiap detail.",
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
    accent: "from-emerald-400 to-teal-500",
    iconBg: "bg-emerald-500/10 text-emerald-300",
    ring: "hover:border-emerald-400/40",
  },
  {
    id: "ui-ux",
    icon: <Palette className="h-6 w-6" aria-hidden="true" />,
    title: language === "en" ? "UI/UX Design" : "Desain UI/UX",
    description:
      language === "en"
        ? "Intuitive, aesthetically refined interfaces that prioritize user experience and business objectives."
        : "Antarmuka intuitif dan estetis yang mengutamakan pengalaman pengguna dan tujuan bisnis.",
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
            "Riset & analisis pengguna komprehensif",
            "Wireframing & prototyping interaktif",
            "Identitas merek & sistem desain visual",
            "Desain mikro-interaksi & animasi",
            "Arsitektur design system yang scalable",
            "Pengujian & optimasi kegunaan",
          ],
    technologies: ["Figma", "Adobe Creative"],
    accent: "from-violet-400 to-purple-500",
    iconBg: "bg-violet-500/10 text-violet-300",
    ring: "hover:border-violet-400/40",
  },
  {
    id: "mobile-dev",
    icon: <Smartphone className="h-6 w-6" aria-hidden="true" />,
    title: language === "en" ? "Mobile Development" : "Pengembangan Mobile",
    description:
      language === "en"
        ? "High-performance mobile applications that deliver native-quality experiences across every platform."
        : "Aplikasi mobile berkinerja tinggi yang memberikan pengalaman setara native di setiap platform.",
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
    accent: "from-sky-400 to-indigo-500",
    iconBg: "bg-sky-500/10 text-sky-300",
    ring: "hover:border-sky-400/40",
  },
  {
    id: "database",
    icon: <Database className="h-6 w-6" aria-hidden="true" />,
    title: language === "en" ? "Database Architecture" : "Arsitektur Database",
    description:
      language === "en"
        ? "Robust, scalable database solutions that ensure optimal performance and data integrity."
        : "Solusi database yang andal dan scalable, menjamin performa optimal dan integritas data.",
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
            "Optimasi query & tuning kinerja",
            "Strategi migrasi data yang mulus",
            "Implementasi keamanan tingkat lanjut",
            "Solusi backup & pemulihan otomatis",
            "Pemantauan & pemeliharaan real-time",
          ],
    technologies: ["MySQL", "MongoDB", "Firebase", "Supabase"],
    accent: "from-amber-400 to-orange-500",
    iconBg: "bg-amber-500/10 text-amber-300",
    ring: "hover:border-amber-400/40",
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const Services: React.FC = () => {
  const { language } = useLanguage() as { language: Language }
  const copy = COPY[language] ?? COPY.en
  const services = buildServices(language)

  const revealFeatures: FeatureRevealProperty[] = services.map((service, i) => ({
    no: i + 1,
    title: service.title,
    titleClass: "text-slate-100",
    contentClass: "text-slate-400",
    paragraphs: [
      service.description,
      `${copy.technologies}: ${service.technologies.join(", ")}`,
    ],
    visual: (
      <div
        className={`flex h-56 w-56 items-center justify-center rounded-3xl bg-gradient-to-br ${service.accent} sm:h-72 sm:w-72 [&>svg]:!h-20 [&>svg]:!w-20 [&>svg]:text-white sm:[&>svg]:!h-28 sm:[&>svg]:!w-28`}
      >
        {service.icon}
      </div>
    ),
  }))

  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const [gridRef, gridInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const handleSelect = useCallback((service: Service) => {
    setSelectedService(service)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedService(null)
  }, [])

  useEffect(() => {
    if (!selectedService) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose()
    }
    window.addEventListener("keydown", handleKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKey)
    }
  }, [selectedService, handleClose])

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-black to-slate-950 py-20 sm:py-24 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/5 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 translate-x-1/2 rounded-full bg-violet-500/5 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={headerRef}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={cardVariants}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur sm:text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
            {copy.eyebrow}
          </motion.span>

          <motion.h2
            id="services-heading"
            variants={cardVariants}
            className="mt-6 text-balance text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl"
          >
            {copy.titleLine1}{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-teal-400 bg-clip-text text-transparent">
              {copy.titleLine2}
            </span>
          </motion.h2>

          <motion.p
            variants={cardVariants}
            className="mt-5 text-pretty text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            {copy.description}
          </motion.p>
        </motion.div>
      </div>

      {/* Horizontal scroll-driven story — one pinned panel per service */}
      <div className="relative mt-14 sm:mt-16">
        <HorizontalFeatureReveal
          aria-label="Services story"
          features={revealFeatures}
        />
      </div>

      {/* <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mt-14 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2 lg:gap-10"
        >
          {services.map((service) => (
            <motion.article
              key={service.id}
              variants={cardVariants}
              className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-black/40 sm:rounded-3xl sm:p-8 lg:p-10 ${service.ring}`}
            >
              <div
                className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${service.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                aria-hidden="true"
              />

              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${service.iconBg}`}>
                {service.icon}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-slate-100 sm:text-2xl">
                {service.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400 sm:text-base">
                {service.description}
              </p>

              <button
                type="button"
                onClick={() => handleSelect(service)}
                aria-label={`${copy.explore}: ${service.title}`}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-200 transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                <span>{copy.explore}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div> */}

      <AnimatePresence>
        {selectedService && (
          <motion.div
            key="service-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-md sm:px-6"
            onClick={handleClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 shadow-2xl"
            >
              <header className="flex items-start justify-between gap-4 border-b border-white/5 p-6 sm:p-8">
                <div className="flex items-center gap-4">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${selectedService.iconBg}`}>
                    {selectedService.icon}
                  </div>
                  <div>
                    <h3
                      id="service-modal-title"
                      className="text-xl font-semibold text-slate-100 sm:text-2xl"
                    >
                      {selectedService.title}
                    </h3>
                    <div
                      className={`mt-2 h-0.5 w-12 rounded-full bg-gradient-to-r ${selectedService.accent}`}
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label={copy.close}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition-colors duration-200 hover:bg-white/5 hover:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </header>

              <div className="grid gap-8 overflow-y-auto p-6 sm:p-8 lg:grid-cols-2">
                <div>
                  <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                    {selectedService.description}
                  </p>

                  <section className="mt-8" aria-labelledby="service-features-heading">
                    <h4
                      id="service-features-heading"
                      className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400"
                    >
                      <span
                        className={`h-2 w-2 rounded-full bg-gradient-to-r ${selectedService.accent}`}
                        aria-hidden="true"
                      />
                      {copy.features}
                    </h4>
                    <ul className="mt-4 space-y-3">
                      {selectedService.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-sm text-slate-300 sm:text-base">
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400"
                            aria-hidden="true"
                          />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <section aria-labelledby="service-technologies-heading">
                  <h4
                    id="service-technologies-heading"
                    className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-400"
                  >
                    <span
                      className={`h-2 w-2 rounded-full bg-gradient-to-r ${selectedService.accent}`}
                      aria-hidden="true"
                    />
                    {copy.technologies}
                  </h4>
                  <ul className="mt-4 grid grid-cols-2 gap-3">
                    {selectedService.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-sm font-medium text-slate-200"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Services
