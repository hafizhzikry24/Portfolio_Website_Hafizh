import React from 'react';
import Content from './components/content';
import AiChat from "./components/ai-chat";
import Hero from './components/hero';

const HomePage = () => {
  return (
    <>
      <main> {/* Tambahkan tag main untuk konten utama halaman */}
      <Hero/>
      <Content/>{/*inculude in tab Home at header*/}
      <AiChat/>{/*inculude in tab Home at header*/}
      </main>
    </>
  );
};

export default HomePage;