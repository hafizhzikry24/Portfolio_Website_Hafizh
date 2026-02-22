import React, { useEffect, useRef, useState } from 'react';
import { FiExternalLink, FiX, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import adminPortalImg from '../../assets/admin portal.png';
import cashierAppImg from '../../assets/cashier app.png';
import notarySystemImg from '../../assets/notary-sytem.png';
import companyProfileImg from '../../assets/company-profile.png';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const useIntersection = (threshold = 0.15) => {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return { ref, visible };
};

// ---------------------------------------------------------------------------
// Feature Modal
// ---------------------------------------------------------------------------
interface FeatureModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    subtitle: string;
    features: string[];
    accentColor?: 'purple' | 'blue' | 'green';
}

const FeatureModal: React.FC<FeatureModalProps> = ({
    open,
    onClose,
    title,
    subtitle,
    features,
    accentColor = 'purple',
}) => {
    // Close on Escape key
    useEffect(() => {
        if (!open) return;
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [open, onClose]);

    // Lock body scroll when open
    useEffect(() => {
        if (open) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    const accent = {
        purple: {
            badge: 'bg-purple-900/60 text-purple-300 border-purple-700/50',
            icon: 'text-purple-400',
            dot: 'bg-purple-500',
            border: 'border-purple-700/40',
            glow: 'shadow-purple-900/40',
            gradient: 'from-purple-600 to-pink-500',
            hover: 'hover:from-purple-500 hover:to-pink-400',
        },
        blue: {
            badge: 'bg-blue-900/60 text-blue-300 border-blue-700/50',
            icon: 'text-blue-400',
            dot: 'bg-blue-500',
            border: 'border-blue-700/40',
            glow: 'shadow-blue-900/40',
            gradient: 'from-blue-600 to-cyan-500',
            hover: 'hover:from-blue-500 hover:to-cyan-400',
        },
        green: {
            badge: 'bg-green-900/60 text-green-300 border-green-700/50',
            icon: 'text-green-400',
            dot: 'bg-green-500',
            border: 'border-green-700/40',
            glow: 'shadow-green-900/40',
            gradient: 'from-green-600 to-teal-500',
            hover: 'hover:from-green-500 hover:to-teal-400',
        },
    }[accentColor];

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Panel */}
            <div
                className={`fixed z-50 inset-0 flex items-center justify-center p-4 pointer-events-none`}
            >
                <div
                    className={`relative w-full max-w-lg bg-gray-900 border ${accent.border} rounded-2xl shadow-2xl ${accent.glow}
                        transition-all duration-400 ease-out
                        ${open ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-8 pointer-events-none'}
                    `}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Glowing top bar */}
                    <div className={`h-1 w-full rounded-t-2xl bg-gradient-to-r ${accent.gradient}`} />

                    {/* Header */}
                    <div className="px-6 pt-5 pb-4 flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-xl font-bold text-white leading-snug">{title}</h3>
                            {subtitle && (
                                <p className={`text-sm font-mono mt-1 ${accent.icon}`}>{subtitle}</p>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="flex-shrink-0 mt-0.5 p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                        >
                            <FiX size={18} />
                        </button>
                    </div>

                    {/* Divider */}
                    <div className={`mx-6 h-px bg-gradient-to-r ${accent.gradient} opacity-30`} />

                    {/* Feature list */}
                    <ul className="px-6 py-5 space-y-3 max-h-[60vh] overflow-y-auto">
                        {features.map((feat, i) => (
                            <li
                                key={i}
                                className="flex items-start gap-3 group"
                                style={{
                                    animation: open ? `fadeSlideIn 0.35s ease-out ${i * 60}ms both` : 'none',
                                }}
                            >
                                <FiCheckCircle
                                    size={17}
                                    className={`flex-shrink-0 mt-0.5 ${accent.icon} group-hover:scale-110 transition-transform duration-200`}
                                />
                                <span className="text-gray-300 text-sm leading-relaxed">{feat}</span>
                            </li>
                        ))}
                    </ul>

                    {/* Footer */}
                    <div className="px-6 pb-5 pt-2">
                        <p className="text-xs text-gray-500 text-center">
                            Interested in this system?{' '}
                            <span className="text-gray-400">Click "Book a call" on the card to get in touch.</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Keyframe injection */}
            <style>{`
                @keyframes fadeSlideIn {
                    from { opacity: 0; transform: translateX(-10px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
            `}</style>
        </>
    );
};

// ---------------------------------------------------------------------------
// "View Features" pill button
// ---------------------------------------------------------------------------
const ViewFeaturesButton: React.FC<{ onClick: () => void; color: string }> = ({ onClick, color }) => (
    <button
        onClick={onClick}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold font-mono tracking-wide transition-all duration-300 hover:scale-105 ${color}`}
    >
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
        View Features
    </button>
);

// ---------------------------------------------------------------------------
// WhatsApp Button
// ---------------------------------------------------------------------------
const WhatsappButton: React.FC<{ href: string }> = ({ href }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-green-600 to-green-500 text-white font-semibold text-sm hover:from-green-500 hover:to-green-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-700/30"
    >
        <FaWhatsapp size={16} />
        Book a call
    </a>
);

// ---------------------------------------------------------------------------
// Image Preview (clickable lightbox)
// ---------------------------------------------------------------------------
const ImagePreview: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [open, setOpen] = useState(false);

    // Close on Escape key
    useEffect(() => {
        if (!open) return;
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [open]);

    return (
        <>
            <div
                className="overflow-hidden rounded-xl border border-gray-700 cursor-pointer group relative"
                onClick={() => setOpen(true)}
            >
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-44 object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <FiExternalLink size={28} className="text-white drop-shadow-lg" />
                </div>
            </div>

            {/* Lightbox */}
            {open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setOpen(false)}
                >
                    <img
                        src={src}
                        alt={alt}
                        className="max-w-4xl w-full rounded-2xl shadow-2xl border border-purple-700/50"
                    />
                </div>
            )}
        </>
    );
};

// ---------------------------------------------------------------------------
// Product Card – single-image variant
// ---------------------------------------------------------------------------
interface SingleCardProps {
    index: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    github: string;
    features: string[];
    accentColor?: 'purple' | 'blue' | 'green';
}

const SingleCard: React.FC<SingleCardProps> = ({
    index,
    title,
    subtitle,
    description,
    image,
    github,
    features,
    accentColor = 'purple',
}) => {
    const { ref, visible } = useIntersection();
    const isEven = index % 3 === 0;
    const [modalOpen, setModalOpen] = useState(false);

    const featBtnColor = {
        purple: 'border-purple-600/60 text-purple-300 hover:bg-purple-700/20',
        blue: 'border-blue-600/60 text-blue-300 hover:bg-blue-700/20',
        green: 'border-green-600/60 text-green-300 hover:bg-green-700/20',
    }[accentColor];

    return (
        <>
            <div
                ref={ref}
                className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                style={{ transitionDelay: '100ms' }}
            >
                <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/60 rounded-2xl p-6 md:p-8 hover:border-purple-700/60 transition-all duration-400 shadow-xl hover:shadow-purple-900/20">
                    <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                        {/* Image */}
                        <div className="w-full lg:w-1/2">
                            <ImagePreview src={image} alt={title} />
                        </div>

                        {/* Info */}
                        <div className="w-full lg:w-1/2 space-y-4">
                            <span className="inline-block font-mono text-purple-400 text-sm font-bold tracking-widest">
                                {String(index + 1).padStart(2, '0')} / PROJECT
                            </span>

                            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                {title}
                            </h2>
                            <p className="text-purple-300 font-mono text-sm">{subtitle}</p>

                            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                {description}
                            </p>

                            <div className="pt-2 flex flex-wrap gap-3">
                                <WhatsappButton href={github} />
                                <ViewFeaturesButton onClick={() => setModalOpen(true)} color={featBtnColor} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FeatureModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={title}
                subtitle={subtitle}
                features={features}
                accentColor={accentColor}
            />
        </>
    );
};

// ---------------------------------------------------------------------------
// Product Card – dual-image variant (POS App)
// ---------------------------------------------------------------------------
interface DualCardProps {
    index: number;
    title: string;
    subtitle: string;
    description: string;
    images: { src: string; label: string }[];
    github: string;
    features: string[];
    accentColor?: 'purple' | 'blue' | 'green';
}

const DualCard: React.FC<DualCardProps> = ({
    index,
    title,
    subtitle,
    description,
    images,
    github,
    features,
    accentColor = 'purple',
}) => {
    const { ref, visible } = useIntersection();
    const [modalOpen, setModalOpen] = useState(false);

    const featBtnColor = {
        purple: 'border-purple-600/60 text-purple-300 hover:bg-purple-700/20',
        blue: 'border-blue-600/60 text-blue-300 hover:bg-blue-700/20',
        green: 'border-green-600/60 text-green-300 hover:bg-green-700/20',
    }[accentColor];

    return (
        <>
            <div
                ref={ref}
                className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                style={{ transitionDelay: '100ms' }}
            >
                <div className="bg-gray-800/60 backdrop-blur-sm border border-gray-700/60 rounded-2xl p-6 md:p-8 hover:border-purple-700/60 transition-all duration-400 shadow-xl hover:shadow-purple-900/20">
                    <div className="flex flex-col gap-8">
                        {/* Info row */}
                        <div className="flex flex-col lg:flex-row gap-8 items-start">
                            {/* Left: text */}
                            <div className="w-full lg:w-1/2 space-y-4">
                                <span className="inline-block font-mono text-purple-400 text-sm font-bold tracking-widest">
                                    {String(index + 1).padStart(2, '0')} / PROJECT
                                </span>

                                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                                    {title}
                                </h2>
                                <p className="text-purple-300 font-mono text-sm">{subtitle}</p>

                                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                                    {description}
                                </p>

                                <div className="pt-2 flex flex-wrap gap-3">
                                    <WhatsappButton href={github} />
                                    <ViewFeaturesButton onClick={() => setModalOpen(true)} color={featBtnColor} />
                                </div>
                            </div>

                            {/* Right: stacked images */}
                            <div className="w-full lg:w-1/2 space-y-4">
                                {images.map((img, i) => (
                                    <div key={i}>
                                        <p className="text-xs font-semibold text-purple-400 font-mono mb-1.5 ml-1">
                                            {img.label}
                                        </p>
                                        <ImagePreview src={img.src} alt={img.label} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FeatureModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title={title}
                subtitle={subtitle}
                features={features}
                accentColor={accentColor}
            />
        </>
    );
};

// ---------------------------------------------------------------------------
// Decorative floating orb
// ---------------------------------------------------------------------------
const Orb: React.FC<{ className: string }> = ({ className }) => (
    <div className={`absolute rounded-full blur-3xl opacity-20 pointer-events-none ${className}`} />
);

// ---------------------------------------------------------------------------
// Feature data
// ---------------------------------------------------------------------------
const posFeatures = [
    'Customer management system',
    'Cashier administration & access control',
    'Inventory and item management',
    'Free item promotions system',
    'Location management',
    'Receipt viewing and management',
    'Cashier barcode item scanning',
    'Cashier member registration & reward system',
    'Cashier transaction processing',
];

const notaryFeatures = [
    'Dashboard analytics & overview',
    'Customer data management',
    'Worksheet management',
    'Template deed inventory',
    'Finance management',
    'Automated finance report generation',
    'Automated notary report generation',
];

const companyFeatures = [
    'Responsive home & hero section',
    'About us & company history',
    'Services & offerings showcase',
    'Team members profiles',
    'Portfolio / projects gallery',
    'Blog & article management',
    'Contact form & location map',
    'SEO-optimized page structure',
    'Social media integration',
];

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
const ProductsPage: React.FC = () => {
    const { ref: heroRef, visible: heroVisible } = useIntersection(0.1);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden">
            {/* Decorative background orbs */}
            <Orb className="w-96 h-96 bg-purple-700 top-10 -left-32" />
            <Orb className="w-80 h-80 bg-pink-700 top-1/3 -right-24" />
            <Orb className="w-72 h-72 bg-purple-800 bottom-20 left-1/4" />

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

                {/* ---- Hero Header ---- */}
                <div
                    ref={heroRef}
                    className={`text-center mb-20 transition-all duration-1000 ease-out ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                        }`}
                >
                    <p className="font-mono text-purple-400 text-sm tracking-widest uppercase mb-3">
                        My Work
                    </p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent leading-tight mb-5">
                        Products
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg">
                        A collection of real-world applications I've designed and built — blending clean UI with solid engineering.
                    </p>

                    {/* Decorative line */}
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <div className="h-px w-16 bg-purple-700" />
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        <div className="h-px w-16 bg-purple-700" />
                    </div>
                </div>

                {/* ---- Product Cards ---- */}
                <div className="space-y-12">
                    {/* 1. POS App */}
                    <DualCard
                        index={0}
                        title="Point of Sale (POS) Application"
                        subtitle="Full-stack Business Management System"
                        description="A comprehensive Point of Sale system designed for small to medium businesses. It features a responsive cashier interface for fast transaction processing and a full-featured admin portal for managing products, categories, inventory, employees, and sales reports — all in real time."
                        images={[
                            { src: adminPortalImg, label: '🖥️ Admin Portal' },
                            { src: cashierAppImg, label: '🛒 Cashier App' },
                        ]}
                        github="https://wa.me/628117428555/?text=Hello%2C%20I%20was%20impressed%20by%20your%20POS%20Application%20project.%20I%20am%20interested%20in%20implementing%20a%20similar%20solution%20for%20my%20business.%20Please%20let%20me%20know%20the%20next%20steps%20to%20discuss%20a%20potential%20collaboration."
                        features={posFeatures}
                        accentColor="purple"
                    />

                    {/* 2. Notary Information System */}
                    <SingleCard
                        index={1}
                        title="Notary Information System"
                        subtitle="Document & Client Management Platform"
                        description="A web-based information system tailored for notary offices. It streamlines the management of client data, legal documents, deed records, and appointment scheduling. The platform includes role-based access for admins and staff, ensuring data security and workflow efficiency."
                        image={notarySystemImg}
                        github="https://wa.me/628117428555/?text=Hello%2C%20I%20was%20impressed%20by%20your%20Notary%20Information%20System%20project.%20I%20am%20interested%20in%20implementing%20a%20similar%20solution%20to%20improve%20document%20management%20and%20operational%20efficiency.%20Please%20let%20me%20know%20the%20next%20steps%20to%20discuss%20a%20potential%20collaboration."
                        features={notaryFeatures}
                        accentColor="blue"
                    />

                    {/* 3. Company or Blog Profile Website */}
                    <SingleCard
                        index={2}
                        title="Company or Blog Profile Website"
                        subtitle="Online Presence & Brand Building"
                        description="A modern and responsive company or blog profile website built to present business information, services, team members, portfolios, and blog articles in a structured and engaging way to strengthen online presence and credibility."
                        image={companyProfileImg}
                        github="https://wa.me/628117428555/?text=Hello%2C%20I%20was%20impressed%20by%20your%20Company%20or%20Blog%20Profile%20Website%20project.%20I%20am%20interested%20in%20implementing%20a%20similar%20solution%20to%20improve%20document%20management%20and%20operational%20efficiency.%20Please%20let%20me%20know%20the%20next%20steps%20to%20discuss%20a%20potential%20collaboration."
                        features={companyFeatures}
                        accentColor="green"
                    />
                </div>

                {/* ---- Bottom CTA ---- */}
                <div className="mt-20 text-center">
                    <p className="text-gray-400 text-sm mb-4">
                        Have a Project Idea? Let's Explore the Best Solution for Your Business.
                    </p>
                    <a
                        href="https://wa.me/628117428555/?text=Hello%2C%20I%20saw%20your%20portfolio%20and%20wanted%20to%20collaborate%20with%20you."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-purple-600 text-purple-300 hover:bg-purple-700/30 transition-all duration-300 font-mono text-sm hover:scale-105 transform"
                    >
                        <FaWhatsapp size={18} />
                        Contact me on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;