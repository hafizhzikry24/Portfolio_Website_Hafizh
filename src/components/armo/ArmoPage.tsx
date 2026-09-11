"use client";

import React, { useEffect } from "react";
import { useLanguage } from "../../LanguageContext";

import ScrollExpandMedia from "../ui/scroll-expansion-hero";
import GiftReveal from "./GiftReveal";

import armoPhoto from "../../assets/armo/sample1.jpg";
import armoVideo from "../../assets/armo/sample2.mp4";

const copy = {
  en: {
    title: "Us, Always",
    date: "A Little Peek Into Our Story",
    scrollToExpand: "Scroll to open the curtain ✨",
    heading: "Our Little World",
    overview:
      "Every quiet moment, every inside joke, every little peek from behind the curtain — it all adds up to something worth keeping. This is just a small page for the two of us. 💕",
    conclusion:
      "Here's to more silly moments, more adventures, and more of us. Always and forever, hehe.",
  },
  id: {
    title: "Kita, Selalu",
    date: "Sedikit Cerita Tentang Kita",
    scrollToExpand: "Gulir untuk buka tirainya ✨",
    heading: "Dunia Kecil Kita",
    overview:
      "Setiap momen sederhana, setiap candaan receh, setiap intipan dari balik tirai — semuanya berharga untuk disimpan. Ini cuma halaman kecil untuk kita berdua. 💕",
    conclusion:
      "Semoga makin banyak momen konyol, petualangan, dan waktu buat kita. Selalu dan selamanya, hehe.",
  },
};

const ArmoPage = () => {
  const languageCtx = useLanguage();
  const language = languageCtx?.language ?? "en";
  const t = language === "id" ? copy.id : copy.en;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-500 via-black to-pink-500 text-pink-50">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={armoVideo}
        posterSrc={armoPhoto}
        bgImageSrc={armoPhoto}
        title={t.title}
        date={t.date}
        scrollToExpand={t.scrollToExpand}
        textBlend
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-3xl md:text-4xl font-romantic text-pink-200 mb-6">
            💌
          </p>
          <h2 className="text-3xl md:text-4xl font-elegant italic mb-6 text-pink-100">
            {t.heading}
          </h2>
          <p className="text-lg mb-6 text-rose-200/90 leading-relaxed">
            {t.overview}
          </p>
          <p className="text-lg mb-8 text-rose-200/90 leading-relaxed">
            {t.conclusion}
          </p>
          <p className="text-2xl font-romantic text-rose-300">
            ✨ 🩷 ✨
          </p>
        </div>
      </ScrollExpandMedia>

      <GiftReveal />
    </div>
  );
};

export default ArmoPage;
