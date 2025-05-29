import React from 'react';
import Content from './content';
import { HeroParallaxDemo } from "./hero-parallax";
import AiChat from "./ai-chat";

const HomePage = () => {
  return (
    <>
      <main> {/* Tambahkan tag main untuk konten utama halaman */}
      <HeroParallaxDemo/> {/*inculude in tab Home at header*/}
      <Content/>{/*inculude in tab Home at header*/}
      <AiChat/>{/*inculude in tab Home at header*/}
      </main>
    </>
  );
};

export default HomePage;