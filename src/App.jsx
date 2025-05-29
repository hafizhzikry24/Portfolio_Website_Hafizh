import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from './components/header';
import Footer from "./components/footer";
import ServicesPage from "./components/ServicesPage";
import HomePage from "./components/HomePage";
import ProjectPage from "./components/ProjectsPage";

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Komponen untuk Layout Halaman Utama
const MainLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/our-services" element={<ServicesPage />} />
          <Route path="/experience" element={<ProjectPage/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
};

export default App;
