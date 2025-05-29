import React from 'react';

import Services from './services'; // Sesuaikan path jika berbeda
import BusinessFlow from './business-flow'; // Sesuaikan path jika berbeda
import MapComponent from './map-component';

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