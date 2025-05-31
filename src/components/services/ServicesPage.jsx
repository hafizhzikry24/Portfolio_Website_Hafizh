import React from 'react';

import Services from './components/services'; // Sesuaikan path jika berbeda
import BusinessFlow from './components/business-flow'; // Sesuaikan path jika berbeda
import MapComponent from './components/map-component';

const ServicesPage = () => {
  return (
    <>
      <main> {/* Tambahkan tag main untuk konten utama halaman */}
      <Services/>
      <BusinessFlow/>
      <MapComponent/>
      </main>
    </>
  );
};

export default ServicesPage;