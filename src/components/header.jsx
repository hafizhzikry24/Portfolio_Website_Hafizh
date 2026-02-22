import { useState, useEffect } from 'react';
import MyLogo from "../assets/mylogo.png";
import { TiThMenuOutline } from "react-icons/ti";
import { Link as RouterLink } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import { US, ID } from 'country-flag-icons/react/3x2';
import { useLanguage } from '../LanguageContext'; // Import useLanguage

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  // Update isEnglish state when language changes
  const [isEnglish, setIsEnglish] = useState(language === "en");

  // Add useEffect to sync isEnglish state with language changes
  useEffect(() => {
    setIsEnglish(language === "en");
  }, [language]);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  const handleLanguageToggle = () => {
    const newLanguage = isEnglish ? "id" : "en";
    setLanguage(newLanguage);
    // Remove this line as it's now handled by useEffect
    // setIsEnglish(!isEnglish);
  };

  return (
    <header className="body-font sticky top-0 z-50 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg text-white">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center sm:p-5">
        <div className="flex w-full justify-between items-center md:w-auto mb-2">
          {/* Logo */}
          <img
            className="ml-3 mt-3 w-28 h-6 sm:w-32 sm:h-7 shadow-xl transition-transform duration-1000 ease-in-out transform hover:scale-110 hover:rotate-3"
            src={MyLogo}
            alt="logo"
          />

          {/* Language Toggle */}
          <div className="ml-5 flex items-center">
            <div className=" mt-2 mr-8 relative w-16 h-8 bg-gray-700 rounded-full p-1 cursor-pointer transition-all duration-300 ease-in-out"
              onClick={handleLanguageToggle}>
              {/* Flag slider */}
              <div className={`overflow-hidden absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${isEnglish ? 'translate-x-0' : 'translate-x-8'}`}>
                {/* Rounded flags */}
                {isEnglish ? <US className="w-6 h-6 scale-150 rounded-full" /> : <ID className="w-6 h-6 scale-150 rounded-full" />}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className={`inline-flex items-center mr-3 mt-3 border-0 px-3 focus:outline-none rounded text-base md:hidden transition-transform duration-500 transform ${isMobileMenuOpen ? 'rotate-90' : 'rotate-0'} shadow-lg`}
            aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
          >
            {isMobileMenuOpen ? (
              <IoCloseSharp className="text-3xl text-purple-500" />
            ) : (
              <TiThMenuOutline className="text-2xl text-purple-500" />
            )}
          </button>
        </div>

        {/* Mobile navigation */}
        <nav
          className={`${isMobileMenuOpen ? 'mx-auto max-h-60 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden transition-all duration-700 ease-in-out md:max-h-full md:opacity-100 md:flex md:ml-auto mb-3 mt-2 space-x-6 md:space-x-5 sm:space-x-16 text-base sm:text-base`}
          style={{ transition: 'max-height 0.7s ease-in-out, opacity 1.5s ease-in-out' }}
        >
          <RouterLink
            to="/"
            className="hover:text-purple-400 text-purple-300 ml-2 cursor-pointer font-bold duration-300 font-mono transition-transform transform hover:scale-105"
          >
            {language === 'en' ? 'Home' : 'Beranda'}
          </RouterLink>
          <RouterLink
            to="/our-services"
            className="hover:text-purple-400 text-purple-300 cursor-pointer font-bold duration-300 font-mono transition-transform transform hover:scale-105 ml-1"
          >
            {language === 'en' ? 'Services' : 'Layanan'}
          </RouterLink>
          <RouterLink
            to="/products"
            className="hover:text-purple-400 text-purple-300 cursor-pointer font-bold duration-300 font-mono transition-transform transform hover:scale-105 ml-1"
          >
            {language === 'en' ? 'Products' : 'Produk'}
          </RouterLink>
          <RouterLink
            to="/experience"
            className="hover:text-purple-400 text-purple-300 cursor-pointer font-bold duration-300 font-mono transition-transform transform hover:scale-105"
          >
            {language === 'en' ? 'Journey' : 'Jelajah'}
          </RouterLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;