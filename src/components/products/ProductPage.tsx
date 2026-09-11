"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  Variants,
} from "framer-motion";
import { FiExternalLink, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import adminPortalImg from "../../assets/admin portal.png";
import cashierAppImg from "../../assets/cashier app.png";
import notarySystemImg from "../../assets/notary-sytem.png";
import companyProfileImg from "../../assets/company-profile.png";

import ProductIntro from "./ProductIntro";
import FlowArt, { FlowSection } from "../ui/story-scroll";

// ─── Types ────────────────────────────────────────────────────────────────────

type AccentKey = "amber" | "cyan" | "violet";

/** Where images sit relative to text on desktop */
type ImagePosition = "left" | "right";

interface AccentConfig {
  hex: string;
  text: string;
  border: string;
  dimText: string;
  tag: string;
}

interface ProductImage {
  src: string;
  label: string;
}

interface Product {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  description: string;
  images: ProductImage[];
  waUrl: string;
  features: string[];
  accent: AccentKey;
  imagePosition: ImagePosition;
  /** Short, stacked headline used in the scroll-story intro (FlowArt) */
  headlineLines: string[];
}

// ─── Accent Config ────────────────────────────────────────────────────────────

const ACCENTS: Record<AccentKey, AccentConfig> = {
  amber: {
    hex: "#f59e0b",
    text: "text-amber-400",
    border: "border-amber-400",
    dimText: "text-amber-400/50",
    tag: "SYSTEM",
  },
  cyan: {
    hex: "#22d3ee",
    text: "text-cyan-400",
    border: "border-cyan-400",
    dimText: "text-cyan-400/50",
    tag: "PLATFORM",
  },
  violet: {
    hex: "#8b5cf6",
    text: "text-violet-400",
    border: "border-violet-400",
    dimText: "text-violet-400/50",
    tag: "WEB",
  },
};

// Backgrounds for the FlowArt story slides, cycled per product: black, purple, pink
const FLOW_BACKGROUNDS = ["#000000", "#3b0764", "#500724"];

// ─── Product Data ─────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: "pos",
    index: 0,
    title: "Point of Sale (POS) Application",
    subtitle: "Point of Sale (POS) Application",
    description:
      "A comprehensive POS system designed for small to medium businesses. Features a responsive cashier interface for fast transaction processing and a full-featured admin portal for managing products, inventory, employees, and sales reports — all in real time.",
    images: [
      { src: adminPortalImg, label: "ADMIN PORTAL" },
      { src: cashierAppImg, label: "CASHIER APP" },
    ],
    waUrl:
      "https://wa.me/628117428555/?text=Hello%2C%20I%20was%20impressed%20by%20your%20POS%20Application%20project.%20I%20am%20interested%20in%20implementing%20a%20similar%20solution%20for%20my%20business.%20Please%20let%20me%20know%20the%20next%20steps%20to%20discuss%20a%20potential%20collaboration.",
    features: [
      "Customer management system",
      "Cashier administration & access control",
      "Inventory and item management",
      "Free item promotions system",
      "Location management",
      "Receipt viewing and management",
      "Cashier barcode item scanning",
      "Cashier member registration & reward system",
      "Cashier transaction processing",
    ],
    accent: "amber",
    imagePosition: "right",
    headlineLines: ["Point of Sale", "Application"],
  },
  {
    id: "notary",
    index: 1,
    title: "Notary Information System",
    subtitle: "Notary Information System",
    description:
      "A web-based information system tailored for notary offices. Streamlines management of client data, legal documents, deed records, and appointment scheduling. Role-based access for admins and staff ensures data security and workflow efficiency.",
    images: [{ src: notarySystemImg, label: "MAIN DASHBOARD" }],
    waUrl:
      "https://wa.me/628117428555/?text=Hello%2C%20I%20was%20impressed%20by%20your%20Notary%20Information%20System%20project.%20I%20am%20interested%20in%20implementing%20a%20similar%20solution%20to%20improve%20document%20management%20and%20operational%20efficiency.%20Please%20let%20me%20know%20the%20next%20steps%20to%20discuss%20a%20potential%20collaboration.",
    features: [
      "Dashboard analytics & overview",
      "Customer data management",
      "Worksheet management",
      "Template deed inventory",
      "Finance management",
      "Automated finance report generation",
      "Automated notary report generation",
    ],
    accent: "cyan",
    imagePosition: "left",
    headlineLines: ["Notary Information", "System"],
  },
  {
    id: "company",
    index: 2,
    title: "Company or Blog Profile Website",
    subtitle: "Company or Blog Profile Website",
    description:
      "A modern, responsive company or blog profile website presenting business information, services, team members, portfolios, and articles in a structured way — strengthening online presence and brand credibility.",
    images: [{ src: companyProfileImg, label: "LANDING PAGE" }],
    waUrl:
      "https://wa.me/628117428555/?text=Hello%2C%20I%20was%20impressed%20by%20your%20Company%20or%20Blog%20Profile%20Website%20project.%20I%20am%20interested%20in%20implementing%20a%20similar%20solution%20to%20improve%20document%20management%20and%20operational%20efficiency.%20Please%20let%20me%20know%20the%20next%20steps%20to%20discuss%20a%20potential%20collaboration.",
    features: [
      "Responsive home & hero section",
      "About us & company history",
      "Services & offerings showcase",
      "Team members profiles",
      "Portfolio / projects gallery",
      "Blog & article management",
      "Contact form & location map",
      "SEO-optimized page structure",
      "Social media integration",
    ],
    accent: "violet",
    imagePosition: "right",
    headlineLines: ["Company or Blog Profile", "Profile Website"],
  },
];

// ─── Motion Variants ──────────────────────────────────────────────────────────

const catalogContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.05 },
  },
};

const cardEntryVariants: Variants = {
  hidden: { opacity: 0, y: 52 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", damping: 20, stiffness: 100 },
  },
};

const modalItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.045,
      type: "spring",
      damping: 20,
      stiffness: 120,
    },
  }),
};

// ─── FeatureModal ─────────────────────────────────────────────────────────────

interface FeatureModalProps {
  open: boolean;
  onClose: () => void;
  product: Product;
}

const FeatureModal: React.FC<FeatureModalProps> = ({
  open,
  onClose,
  product,
}) => {
  const cfg = ACCENTS[product.accent];
  const numStr = String(product.index + 1).padStart(2, "0");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handler);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-4 py-8"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg border-2 border-neutral-700 bg-[#111]"
            style={{ boxShadow: `6px 6px 0px 0px ${cfg.hex}` }}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between border-b-2 border-neutral-800 bg-[#0d0d0d] px-5 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`font-mono text-xs font-black tracking-widest ${cfg.text}`}
                >
                  {numStr}
                </span>
                <span className="font-mono text-xs text-neutral-700">──</span>
                <h3
                  id="modal-title"
                  className="truncate font-mono text-xs text-neutral-400"
                >
                  {product.title.toUpperCase()}
                </h3>
              </div>
              <motion.button
                type="button"
                whileTap={{ scale: 0.9, y: 1 }}
                onClick={onClose}
                aria-label="Close modal"
                className="ml-3 flex-shrink-0 p-1 text-neutral-600 transition-colors duration-150 hover:text-neutral-100"
              >
                <FiX size={15} aria-hidden="true" />
              </motion.button>
            </div>

            {/* Tag row */}
            <div className="flex items-center gap-2 border-b border-neutral-800/60 px-5 py-2.5">
              <span
                className={`border ${cfg.border} ${cfg.text} font-mono text-[10px] font-bold tracking-widest px-2 py-0.5`}
              >
                {cfg.tag}
              </span>
              <span className="font-mono text-[10px] text-neutral-700">
                FEATURE_LIST
              </span>
            </div>

            {/* Features */}
            <ul className="max-h-[55vh] space-y-3 overflow-y-auto px-5 py-5">
              {product.features.map((feat, i) => (
                <motion.li
                  key={feat}
                  custom={i}
                  variants={modalItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-start gap-3"
                >
                  <span
                    className={`mt-0.5 flex-shrink-0 font-mono text-xs ${cfg.text}`}
                    aria-hidden="true"
                  >
                    ►
                  </span>
                  <span className="font-mono text-sm leading-relaxed text-neutral-300">
                    {feat}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Footer */}
            <div className="border-t-2 border-neutral-800 bg-[#0d0d0d] px-5 py-3">
              <p className="text-center font-mono text-[10px] text-neutral-700">
                INTERESTED?{" "}
                <span className="text-neutral-500">
                  USE [BOOK CALL] ON THE CARD.
                </span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── ProductImage ─────────────────────────────────────────────────────────────

interface ProductImageProps {
  src: string;
  alt: string;
  label: string;
  accent: AccentKey;
}

const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  label,
  accent,
}) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const cfg = ACCENTS[accent];

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen]);

  return (
    <>
      <div className="group/preview">
        <p
          className={`mb-2 font-mono text-[10px] font-bold tracking-widest ${cfg.dimText}`}
        >
          {label}
        </p>

        <motion.div
          whileHover={{ scale: 1.005 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative cursor-pointer overflow-hidden border-2 border-neutral-800 transition-colors duration-300 group-hover/preview:border-neutral-600"
          style={{ boxShadow: "3px 3px 0px 0px #1a1a1a" }}
          onClick={() => setLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") setLightboxOpen(true);
          }}
          aria-label={`View full size: ${alt}`}
        >
          <img
            src={src}
            alt={alt}
            className="h-44 w-full object-cover object-top grayscale transition-all duration-500 group-hover/preview:grayscale-0"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100">
            <span
              className={`border-2 ${cfg.border} ${cfg.text} bg-black/70 px-3 py-1 font-mono text-[10px] font-bold tracking-widest`}
            >
              EXPAND ↗
            </span>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 200 }}
              style={{ boxShadow: `8px 8px 0px 0px ${cfg.hex}` }}
              className="border-2 border-neutral-700"
            >
              <img
                src={src}
                alt={alt}
                className="block max-h-[85vh] max-w-4xl w-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// ─── ProductCard ──────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const cfg = ACCENTS[product.accent];
  const numStr = String(product.index + 1).padStart(2, "0");
  const isImagesLeft = product.imagePosition === "left";

  return (
    <>
      <motion.article
        variants={cardEntryVariants}
        whileHover={{
          x: 3,
          y: 3,
          boxShadow: `2px 2px 0px 0px ${cfg.hex}`,
        }}
        transition={{ type: "spring", damping: 22, stiffness: 220 }}
        style={{ boxShadow: `5px 5px 0px 0px ${cfg.hex}` }}
        className="border-2 border-neutral-800 bg-[#111111]"
        aria-label={product.title}
      >
        {/* Card header bar */}
        <div className="flex items-center justify-between border-b-2 border-neutral-800 bg-[#0d0d0d] px-5 py-2.5">
          <div className="flex items-center gap-4">
            <span
              className={`font-mono text-2xl font-black leading-none ${cfg.text}`}
            >
              {numStr}
            </span>
            <span className="font-mono text-xs tracking-widest text-neutral-700">
              PROJECT
            </span>
          </div>
          <span
            className={`border ${cfg.border} ${cfg.text} font-mono text-[10px] font-bold tracking-widest px-2.5 py-0.5`}
          >
            {cfg.tag}
          </span>
        </div>

        {/* Card body */}
        <div className="flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-start">
          {/* Text section — always first in DOM (mobile-first order) */}
          <div
            className={`w-full space-y-5 lg:w-1/2 ${
              isImagesLeft ? "lg:order-2" : ""
            }`}
          >
            <div>
              <h2 className="text-xl font-black uppercase leading-tight tracking-tight text-white sm:text-2xl">
                {product.title}
              </h2>
              <p
                className={`mt-2 font-mono text-xs tracking-wide ${cfg.text}`}
              >
                {product.subtitle}
              </p>
            </div>

            <p className="font-mono text-sm leading-relaxed text-neutral-500 sm:text-base">
              {product.description}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <motion.a
                whileTap={{ scale: 0.97, y: 2 }}
                href={product.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ boxShadow: "3px 3px 0px 0px rgba(0,0,0,0.6)" }}
                className="inline-flex items-center gap-2 border-2 border-green-500 bg-green-500 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-black transition-all duration-150 hover:bg-transparent hover:text-green-400"
              >
                <FaWhatsapp size={12} aria-hidden="true" />
                BOOK CALL
              </motion.a>

              <motion.button
                type="button"
                whileTap={{ scale: 0.97, y: 2 }}
                onClick={openModal}
                className={`inline-flex items-center gap-2 border-2 ${cfg.border} ${cfg.text} bg-transparent px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-150 hover:bg-neutral-800`}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full bg-current"
                  aria-hidden="true"
                />
                VIEW FEATURES
              </motion.button>
            </div>
          </div>

          {/* Images section */}
          <div
            className={`w-full space-y-5 lg:w-1/2 ${
              isImagesLeft ? "lg:order-1" : ""
            }`}
          >
            {product.images.map((img) => (
              <ProductImage
                key={img.label}
                src={img.src}
                alt={img.label}
                label={img.label}
                accent={product.accent}
              />
            ))}
          </div>
        </div>
      </motion.article>

      <FeatureModal open={modalOpen} onClose={closeModal} product={product} />
    </>
  );
};

// ─── Products Page ────────────────────────────────────────────────────────────

const ProductsPage: React.FC = () => {
  const catalogRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(catalogRef, { once: true, amount: 0.05 });

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Intro hero section */}
      <ProductIntro />

      {/* Product catalog */}
      <section
        id="product-catalog"
        aria-labelledby="catalog-heading"
        className="relative"
      >
        {/* Section label bar */}
        <div className="border-y-2 border-neutral-800 bg-[#0d0d0d] px-4 py-3.5 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <h2
              id="catalog-heading"
              className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-700"
            >
              PRODUCT_CATALOG :: 03 ITEMS
            </h2>
            <span className="flex items-center gap-2 font-mono text-xs text-green-400">
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400"
                aria-hidden="true"
              />
              LIVE
            </span>
          </div>
        </div>

        {/* Scroll-driven story intro — one pinned, rotating slide per product */}
        <FlowArt aria-label="Product catalog story">
          {PRODUCTS.map((product) => {
            const cfg = ACCENTS[product.accent];
            const numStr = String(product.index + 1).padStart(2, "0");
            const flowBg = FLOW_BACKGROUNDS[product.index % FLOW_BACKGROUNDS.length];

            return (
              <FlowSection
                key={product.id}
                aria-label={product.title}
                style={{ backgroundColor: flowBg, color: "#fff" }}
              >
                <p
                  className="font-mono text-xs font-bold uppercase tracking-[0.2em]"
                  style={{ color: cfg.hex }}
                >
                  {numStr} — {cfg.tag}
                </p>
                <hr
                  className="my-[2vw] border-none border-t"
                  style={{ borderColor: `${cfg.hex}33` }}
                />
                <div>
                  <h2 className="text-[clamp(2.5rem,9vw,9rem)] font-black uppercase leading-[0.92] tracking-tight text-white">
                    {product.headlineLines.map((line, i) => (
                      <React.Fragment key={line}>
                        {line}
                        {i < product.headlineLines.length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </h2>
                </div>
                <hr
                  className="my-[2vw] border-none border-t"
                  style={{ borderColor: `${cfg.hex}33` }}
                />
                <p className="mt-auto max-w-[60ch] font-mono text-[clamp(0.95rem,2vw,1.4rem)] leading-relaxed text-neutral-500">
                  {product.description}
                </p>
                <hr
                  className="my-[2vw] border-none border-t"
                  style={{ borderColor: `${cfg.hex}33` }}
                />
                <div className="flex flex-wrap gap-[3vw]">
                  {product.features.slice(0, 3).map((feat) => (
                    <div key={feat} className="min-w-[180px] flex-1">
                      <p
                        className="mb-2 font-mono text-sm font-bold"
                        style={{ color: cfg.hex }}
                        aria-hidden="true"
                      >
                        ►
                      </p>
                      <p className="font-mono text-sm leading-relaxed text-neutral-500">
                        {feat}
                      </p>
                    </div>
                  ))}
                </div>
              </FlowSection>
            );
          })}
        </FlowArt>

        {/* Cards */}
        {/* <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <motion.div
            ref={catalogRef}
            variants={catalogContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-10 sm:space-y-14"
          >
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </div> */}

        {/* Bottom CTA */}
        <div className="border-t-2 border-neutral-800 bg-[#0d0d0d] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl space-y-5 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-neutral-700">
              HAVE A PROJECT IDEA? LET&#39;S EXPLORE THE BEST SOLUTION.
            </p>
            <motion.a
              whileTap={{ scale: 0.97, y: 2 }}
              href="https://wa.me/628117428555/?text=Hello%2C%20I%20saw%20your%20portfolio%20and%20wanted%20to%20collaborate%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              style={{ boxShadow: "4px 4px 0px 0px #1a1a1a" }}
              className="inline-flex items-center gap-2 border-2 border-neutral-700 px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-neutral-500 transition-all duration-200 hover:border-green-500 hover:text-green-400"
            >
              <FaWhatsapp size={13} aria-hidden="true" />
              CONTACT ON WHATSAPP
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
