import React from 'react';
import Header from './header'; // Sesuaikan path jika berbeda
import Services from './Services'; // Sesuaikan path jika berbeda
import BusinessFlow from './BusinessFlow'; // Sesuaikan path jika berbeda
import Footer from './footer'; // Sesuaikan path jika berbeda

const ServicesPage = () => {
  return (
    <>
      <Header />
      <main> {/* Tambahkan tag main untuk konten utama halaman */}
        <Services />
        <BusinessFlow />
      </main>
      <Footer />
    </>
  );
};

export default ServicesPage;