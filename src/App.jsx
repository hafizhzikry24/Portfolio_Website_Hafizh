import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from './components/header';
import Footer from "./components/footer";

// Lazy load pages
const HomePage = lazy(() => import("./components/home/HomePage"));
const ServicesPage = lazy(() => import("./components/services/ServicesPage"));
const ProductsPage = lazy(() => import("./components/products/ProductPage"));
const ProjectPage = lazy(() => import("./components/journey/ProjectsPage"));

// Loading component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

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
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/our-services" element={<ServicesPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/experience" element={<ProjectPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
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
