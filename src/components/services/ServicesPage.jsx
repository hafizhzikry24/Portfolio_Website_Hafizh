import React from 'react';

import Services from './components/services'; // Sesuaikan path jika berbeda
import BusinessFlow from './components/business-flow'; // Sesuaikan path jika berbeda
import MapComponent from './components/map-component';
import { HeroService } from './components/hero-service';

const ServicesPage = () => {
  return (
    <>
      <main> {/* Tambahkan tag main untuk konten utama halaman */}
      <HeroService/>
      <Services/>
      <BusinessFlow/>
      <MapComponent/>
      </main>
    </>
  );
};

export default ServicesPage;