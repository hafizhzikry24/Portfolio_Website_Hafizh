import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Impor komponen routing
import Header from './components/header';
import Content from './components/content';
import Footer from "./components/footer";
import Projects from "./components/projects";
import Comment from "./components/coment";
import { TimelineDemo } from "./components/timeline";
import { HeroParallaxDemo } from "./components/hero-parallax";
import AiChat from "./components/ai-chat";
import Services from "./components/Services"; 
import BusinessFlow from "./components/BusinessFlow";
import ServicesPage from "./components/ServicesPage"; // Impor halaman baru

// Komponen untuk Layout Halaman Utama
const MainPageLayout = () => {
  return (
    <>
      <Header/>
      <HeroParallaxDemo/>
      <Content/>
      <TimelineDemo/>
      <Projects/>
      <AiChat/>
      <Comment/>
      <Footer/>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPageLayout />} />
        <Route path="/our-services" element={<ServicesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
