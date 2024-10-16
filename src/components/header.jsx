import { useState } from 'react';
import MyLogo from "../assets/mylogo.png";
import { TiThMenuOutline } from "react-icons/ti";
import { Link } from 'react-scroll';
import { IoCloseSharp } from "react-icons/io5";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(prevState => !prevState);
  };

  return (
    <header className="body-font sticky top-0 z-10 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg text-white">
      <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center sm:p-5">
        <div className="flex w-full justify-between items-center md:w-auto mb-2">
          {/* Logo */}
          <img
            className="ml-5 mt-3 w-32 h-6 sm:w-32 sm:h-7 shadow-xl transition-transform duration-1000 ease-in-out transform hover:scale-110 hover:rotate-3"
            src={MyLogo}
            alt="logo"
          />

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className={`inline-flex items-center mr-3 mt-3 border-0 px-3 focus:outline-none rounded text-base md:hidden transition-transform duration-500 transform ${
              isMobileMenuOpen ? 'rotate-90' : 'rotate-0'
            } shadow-lg`}
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
          className={`${
            isMobileMenuOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden transition-all duration-700 ease-in-out md:max-h-full md:opacity-100 md:flex md:ml-auto mb-3 mt-2 space-x-4 sm:space-x-7 text-md sm:text-lg`}
          style={{
            transition: 'max-height 0.7s ease-in-out, opacity 1.5s ease-in-out',
          }}
        >
          <Link
            to="content"
            smooth={true}
            duration={500}
            className="hover:text-purple-400 text-purple-300 cursor-pointer transition-colors font-bold duration-300 font-header"
          >
            Intro
          </Link>
          <Link
            to="experience"
            smooth={true}
            duration={500}
            className="hover:text-purple-400 text-purple-300 cursor-pointer transition-colors font-bold duration-300 font-header"
          >
            Experience
          </Link>
          <Link
            to="projects"
            smooth={true}
            duration={500}
            className="hover:text-purple-400 text-purple-300 cursor-pointer transition-colors font-bold duration-300 font-header"
          >
            Projects
          </Link>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="hover:text-purple-400 text-purple-300 cursor-pointer transition-colors font-bold duration-300 font-header"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
