import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from 'framer-motion';
import { MapPin, Navigation, Copy, Check } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { useLanguage } from '../../../LanguageContext';

export default function MapComponent({
  latitude = -6.265826493092703,
  longitude = 106.80147302427031,
  zoom = 15,
}) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const controls = useAnimation();
  const [address, setAddress] = useState("Loading address...");
  const [copied, setCopied] = useState(false);
  const [isMapHovered, setIsMapHovered] = useState(false);
  const { language } = useLanguage();
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

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
        );
        const data = await response.json();
        setAddress(data.display_name || "Address not found");
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("Unable to load address");
      }
    };

    fetchAddress();
  }, [latitude, longitude]);

  useEffect(() => {
    const loadLeaflet = async () => {
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        link.crossOrigin = "";
        document.head.appendChild(link);
      }

      if (!window.L) {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
        script.crossOrigin = "";
        return new Promise((resolve) => {
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }
    };

    const initializeMap = async () => {
      await loadLeaflet();

      if (mapRef.current && window.L && !mapInstanceRef.current) {
        const map = window.L.map(mapRef.current).setView([latitude, longitude], zoom);

        window.L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }
        ).addTo(map);

        const customIcon = window.L.divIcon({
          html: `
            <div style="
              background: #6366f1;
              width: 28px;
              height: 28px;
              border-radius: 50% 50% 50% 0;
              transform: rotate(-45deg);
              border: 3px solid #ffffff;
              box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            ">
              <div style="
                width: 8px;
                height: 8px;
                background: #ffffff;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) rotate(45deg);
              "></div>
            </div>
          `,
          className: "custom-marker",
          iconSize: [28, 28],
          iconAnchor: [14, 28],
        });

        const marker = window.L.marker([latitude, longitude], {
          icon: customIcon,
        }).addTo(map);

        marker.bindPopup(`
          <div style="background: #1f2937; color: #f9fafb; padding: 12px; border-radius: 8px; min-width: 200px;">
            <h3 style="font-weight: 600; font-size: 16px; margin-bottom: 8px; color: #f9fafb;">📍 Location</h3>
            <p style="font-size: 12px; color: #d1d5db; margin-bottom: 8px;">
              ${address.length > 50 ? address.substring(0, 50) + "..." : address}
            </p>
          </div>
        `);

        mapInstanceRef.current = map;
      }
    };

    initializeMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, zoom, address]);

  const centerMap = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([latitude, longitude], zoom);
    }
  };

  const copyCoordinates = async () => {
    try {
      await navigator.clipboard.writeText(`${latitude}, ${longitude}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy coordinates:", err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
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
    <section ref={ref} className="py-24 bg-gray-900 relative overflow-hidden">
      <motion.div
        variants={decorationVariants}
        initial="hidden"
        animate={controls}
        className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"
      />
      <motion.div
        variants={decorationVariants}
        initial="hidden"
        animate={controls}
        className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"
      />

      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="container mx-auto px-6 relative z-10"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="mb-8 text-center"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl font-bold text-white mb-4"
            >
              {language === 'en' ? 'Location' : 'Lokasi'}
            </motion.h2>
            <motion.div 
              variants={itemVariants}
              className="h-1 w-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mb-6" 
            />
            <motion.p 
              variants={itemVariants}
              className="text-gray-300 max-w-2xl mx-auto"
            >
              {language === 'en'
                ? 'Find us at the heart of the city, where innovation meets convenience.'
                : 'Temukan kami di pusat kota, di mana inovasi bertemu kenyamanan.'}
            </motion.p>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={controls}
            className="bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-700"
          >
            <motion.div 
              variants={itemVariants}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <MapPin className="text-indigo-400" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {language === 'en' ? 'Current Location' : 'Lokasi Saat Ini'}
                </h3>
              </div>
              <p className="text-gray-300 font-pixel text-sm mb-4">{address}</p>

              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 0.95 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={centerMap}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-all duration-300"
                >
                  <Navigation size={18} />
                  {language === 'en' ? 'Center Map' : 'Pusatkan Peta'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 0.95 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyCoordinates}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all duration-300"
                >
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                  {copied
                    ? (language === 'en' ? 'Copied!' : 'Tersalin!')
                    : (language === 'en' ? 'Copy Coordinates' : 'Salin Koordinat')}
                </motion.button>
              </div>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="relative"
            >
              <div
                ref={mapRef}
                onMouseEnter={() => setIsMapHovered(true)}
                onMouseLeave={() => setIsMapHovered(false)}
                className="w-full lg:h-[500px] h-[300px] rounded-xl overflow-hidden transition-all duration-300"
                style={{
                  filter: isMapHovered ? 'none' : 'grayscale(100%)',
                  opacity: isMapHovered ? 1 : 0.8,
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
