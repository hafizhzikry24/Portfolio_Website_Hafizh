"use client"

import React, { useEffect, useMemo, useState } from "react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Repeat,
  Settings,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react"
import { useLanguage } from "../../../LanguageContext"
import Modal from "../ui/modal"
import HowItWorks, {
  type Step as HowItWorksStep,
  type StepPosition,
} from "../../ui/how-it-works"

type Language = "en" | "id"

interface FlowStep {
  id: string
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
  phase: string
  accent: string
  highlights: string[]
  summary: string
}

const COPY: Record<Language, {
  eyebrow: string
  titleLine1: string
  titleLine2: string
  description: string
  learnMore: string
  highlights: string
}> = {
  en: {
    eyebrow: "Our Process",
    titleLine1: "From concept to",
    titleLine2: "digital reality",
    description:
      "A carefully crafted journey that transforms your vision into exceptional digital experiences through strategic planning, innovative design, and reliable execution.",
    learnMore: "Learn more",
    highlights: "What we cover",
  },
  id: {
    eyebrow: "Proses Kami",
    titleLine1: "Dari konsep menuju",
    titleLine2: "realitas digital",
    description:
      "Perjalanan yang dirancang dengan cermat untuk mengubah visi Anda menjadi pengalaman digital luar biasa melalui perencanaan strategis, desain inovatif, dan eksekusi yang andal.",
    learnMore: "Pelajari selengkapnya",
    highlights: "Yang kami lakukan",
  },
}

const buildSteps = (language: Language): FlowStep[] => [
  {
    id: "discovery",
    icon: <MessageSquare className="h-5 w-5" aria-hidden="true" />,
    title: language === "en" ? "Discovery & Consultation" : "Penemuan & Konsultasi",
    subtitle: language === "en" ? "Understanding your vision" : "Memahami visi Anda",
    description:
      language === "en"
        ? "Deep dive into your business requirements, goals, and target audience to shape a comprehensive project roadmap."
        : "Mendalami kebutuhan bisnis, tujuan, dan target audiens Anda untuk menyusun roadmap proyek yang komprehensif.",
    phase: language === "en" ? "Phase 01" : "Fase 01",
    accent: "from-violet-500 to-purple-600",
    highlights:
      language === "en"
        ? [
            "Business objectives & success metrics",
            "Target audience analysis & personas",
            "Competitive landscape assessment",
            "Technical requirements & constraints",
          ]
        : [
            "Tujuan bisnis & metrik kesuksesan",
            "Analisis audiens & persona pengguna",
            "Penilaian lanskap kompetitif",
            "Kebutuhan & batasan teknis",
          ],
    summary:
      language === "en"
        ? "This foundational phase ensures we are aligned on your vision and sets the stage for a successful project delivery."
        : "Fase fondasi ini memastikan kami selaras dengan visi Anda dan menyiapkan panggung untuk pengiriman proyek yang sukses.",
  },
  {
    id: "strategy",
    icon: <Settings className="h-5 w-5" aria-hidden="true" />,
    title: language === "en" ? "Strategy & Architecture" : "Strategi & Arsitektur",
    subtitle: language === "en" ? "Building the blueprint" : "Membangun cetak biru",
    description:
      language === "en"
        ? "Crafting a detailed technical architecture and project timeline that ensures scalable and maintainable solutions."
        : "Menyusun arsitektur teknis dan timeline proyek yang detail untuk memastikan solusi yang scalable dan mudah dikelola.",
    phase: language === "en" ? "Phase 02" : "Fase 02",
    accent: "from-blue-500 to-cyan-500",
    highlights:
      language === "en"
        ? [
            "System architecture design",
            "Technology stack selection",
            "Database design & optimization",
            "Security & compliance planning",
          ]
        : [
            "Desain arsitektur sistem",
            "Pemilihan technology stack",
            "Desain & optimasi database",
            "Perencanaan keamanan & kepatuhan",
          ],
    summary:
      language === "en"
        ? "We build a robust foundation that supports current needs while allowing for future growth and scalability."
        : "Kami membangun fondasi kokoh yang mendukung kebutuhan saat ini sekaligus memungkinkan pertumbuhan di masa depan.",
  },
  {
    id: "design",
    icon: <TrendingUp className="h-5 w-5" aria-hidden="true" />,
    title: language === "en" ? "Design & Development" : "Desain & Pengembangan",
    subtitle: language === "en" ? "Bringing ideas to life" : "Menghidupkan ide",
    description:
      language === "en"
        ? "Creating intuitive user experiences and robust functionality through iterative design and development cycles."
        : "Menciptakan pengalaman pengguna intuitif dan fungsionalitas tangguh melalui siklus desain dan pengembangan iteratif.",
    phase: language === "en" ? "Phase 03" : "Fase 03",
    accent: "from-emerald-500 to-teal-500",
    highlights:
      language === "en"
        ? [
            "UI/UX design & prototyping",
            "Agile development methodology",
            "Regular progress reviews & feedback",
            "Performance optimization",
          ]
        : [
            "Desain UI/UX & prototyping",
            "Metodologi pengembangan Agile",
            "Ulasan kemajuan & umpan balik berkala",
            "Optimasi kinerja",
          ],
    summary:
      language === "en"
        ? "Our iterative approach ensures continuous improvement and alignment with your evolving requirements."
        : "Pendekatan iteratif kami memastikan peningkatan berkelanjutan dan keselarasan dengan kebutuhan Anda yang berkembang.",
  },
  {
    id: "qa",
    icon: <Repeat className="h-5 w-5" aria-hidden="true" />,
    title: language === "en" ? "Testing & QA" : "Pengujian & QA",
    subtitle: language === "en" ? "Ensuring excellence" : "Memastikan keunggulan",
    description:
      language === "en"
        ? "Comprehensive testing across devices and scenarios to guarantee a flawless user experience."
        : "Pengujian komprehensif di berbagai perangkat dan skenario untuk menjamin pengalaman pengguna yang sempurna.",
    phase: language === "en" ? "Phase 04" : "Fase 04",
    accent: "from-amber-500 to-orange-500",
    highlights:
      language === "en"
        ? [
            "Automated & manual testing",
            "Cross-browser compatibility",
            "Mobile responsiveness testing",
            "Performance & security audits",
          ]
        : [
            "Pengujian otomatis & manual",
            "Kompatibilitas lintas browser",
            "Pengujian responsivitas mobile",
            "Audit kinerja & keamanan",
          ],
    summary:
      language === "en"
        ? "Rigorous testing ensures your application performs flawlessly across all platforms and use cases."
        : "Pengujian ketat memastikan aplikasi Anda berfungsi sempurna di semua platform dan kasus penggunaan.",
  },
  {
    id: "launch",
    icon: <CheckCircle2 className="h-5 w-5" aria-hidden="true" />,
    title: language === "en" ? "Launch & Deployment" : "Peluncuran & Deployment",
    subtitle: language === "en" ? "Going live" : "Saatnya rilis",
    description:
      language === "en"
        ? "Seamless deployment to production with monitoring and optimization for peak performance."
        : "Deployment yang mulus ke produksi dengan pemantauan dan optimasi untuk performa puncak.",
    phase: language === "en" ? "Phase 05" : "Fase 05",
    accent: "from-rose-500 to-pink-500",
    highlights:
      language === "en"
        ? [
            "Production environment setup",
            "Domain & SSL configuration",
            "Performance monitoring setup",
            "Launch-day support & monitoring",
          ]
        : [
            "Penyiapan environment produksi",
            "Konfigurasi domain & SSL",
            "Penyiapan pemantauan kinerja",
            "Dukungan & pemantauan hari peluncuran",
          ],
    summary:
      language === "en"
        ? "We ensure a smooth launch with comprehensive monitoring and immediate support for any issues."
        : "Kami memastikan peluncuran yang mulus dengan pemantauan komprehensif dan dukungan instan jika ada kendala.",
  },
  {
    id: "support",
    icon: <Users className="h-5 w-5" aria-hidden="true" />,
    title: language === "en" ? "Support & Growth" : "Dukungan & Pertumbuhan",
    subtitle: language === "en" ? "Ongoing partnership" : "Kemitraan berkelanjutan",
    description:
      language === "en"
        ? "Continuous support, maintenance, and feature enhancements to keep your application thriving."
        : "Dukungan, pemeliharaan, dan peningkatan fitur berkelanjutan untuk menjaga aplikasi Anda tetap berkembang.",
    phase: language === "en" ? "Phase 06" : "Fase 06",
    accent: "from-indigo-500 to-purple-600",
    highlights:
      language === "en"
        ? [
            "24/7 monitoring & maintenance",
            "Regular security updates",
            "Feature enhancements & scaling",
            "Analytics & performance insights",
          ]
        : [
            "Pemantauan & pemeliharaan 24/7",
            "Pembaruan keamanan berkala",
            "Peningkatan fitur & penskalaan",
            "Analitik & insight performa",
          ],
    summary:
      language === "en"
        ? "Our partnership continues beyond launch, ensuring your application evolves with your business needs."
        : "Kemitraan kami berlanjut setelah peluncuran, memastikan aplikasi Anda berkembang sesuai kebutuhan bisnis.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

// Zig-zag pinned positions for 6 steps (the ui component ships defaults for
// 5), mirroring the original's alternating left/right, tight-pair-then-jump
// rhythm.
const HOW_IT_WORKS_POSITIONS: StepPosition[] = [
  { className: "md:absolute md:top-0 md:left-[15%]", rotate: "rotate-8" },
  { className: "md:absolute md:top-[150px] md:right-[15%]", rotate: "-rotate-8" },
  { className: "md:absolute md:top-[430px] md:left-[15%]", rotate: "rotate-8" },
  { className: "md:absolute md:top-[580px] md:right-[10%]", rotate: "-rotate-8" },
  { className: "md:absolute md:top-[860px] md:left-[15%]", rotate: "rotate-8" },
  { className: "md:absolute md:top-[1010px] md:right-[15%]", rotate: "-rotate-8" },
]

// The ui component only knows 3 preset palettes; cycle them for variety
// rather than trying to hue-match each step's own accent gradient.
const HOW_IT_WORKS_THEMES: Array<"purple" | "blue" | "orange"> = [
  "purple",
  "blue",
  "orange",
]

const BusinessFlow: React.FC = () => {
  const { language } = useLanguage() as { language: Language }
  const copy = COPY[language] ?? COPY.en
  const flowSteps = useMemo(() => buildSteps(language), [language])

  const howItWorksSteps: HowItWorksStep[] = useMemo(
    () =>
      flowSteps.map((step, index) => ({
        title: step.title,
        description: step.description,
        colorTheme: HOW_IT_WORKS_THEMES[index % HOW_IT_WORKS_THEMES.length],
      })),
    [flowSteps],
  )

  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [selectedStep, setSelectedStep] = useState<FlowStep | null>(null)

  useEffect(() => {
    if (inView) controls.start("visible")
  }, [controls, inView])

  return (
    <section
      ref={ref}
      aria-labelledby="business-flow-heading"
      className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-20 sm:py-24 lg:py-32"
    >


      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 rounded-full border border-violet-200/60 bg-violet-50 px-4 py-1.5 text-xs font-medium text-violet-700 sm:text-sm"
          >
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {copy.eyebrow}
          </motion.span>

          <motion.h2
            id="business-flow-heading"
            variants={itemVariants}
            className="mt-6 text-balance text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            {copy.titleLine1}{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {copy.titleLine2}
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-pretty text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            {copy.description}
          </motion.p>
        </motion.div>
      </div>

      {/* Visual step-by-step overview */}
      <div className="relative mt-10 sm:mt-14">
        <HowItWorks features={howItWorksSteps} stepPositions={HOW_IT_WORKS_POSITIONS} />
      </div>

      {/* <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.ol
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mt-14 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {flowSteps.map((step) => (
            <motion.li key={step.id} variants={itemVariants}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl sm:p-8">
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center rounded-full bg-gradient-to-r ${step.accent} px-3 py-1 text-xs font-semibold text-white`}
                  >
                    {step.phase}
                  </span>
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r ${step.accent} text-white shadow-sm transition-transform duration-300 group-hover:scale-105`}
                  >
                    {step.icon}
                  </div>
                </div>

                <div className="mt-6 flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-500">{step.subtitle}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                    {step.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedStep(step)}
                  aria-label={`${copy.learnMore}: ${step.title}`}
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-violet-600 transition-colors duration-300 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                >
                  <span>{copy.learnMore}</span>
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </article>
            </motion.li>
          ))}
        </motion.ol>
      </div> */}

      {/* <Modal
        isOpen={Boolean(selectedStep)}
        onClose={() => setSelectedStep(null)}
        title={selectedStep?.title}
        subtitle={selectedStep?.subtitle}
        content={
          selectedStep ? (
            <div className="space-y-5">
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-5">
                <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  <span
                    className={`h-2 w-2 rounded-full bg-gradient-to-r ${selectedStep.accent}`}
                    aria-hidden="true"
                  />
                  {copy.highlights}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {selectedStep.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-700 sm:text-base">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" aria-hidden="true" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
                {selectedStep.summary}
              </p>
            </div>
          ) : null
        }
      /> */}
    </section>
  )
}

export default BusinessFlow
