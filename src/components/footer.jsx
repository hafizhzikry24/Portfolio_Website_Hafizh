"use client";

import { useEffect, useState } from "react";
import {
  FiTwitter,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiInstagram,
} from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../LanguageContext";
import {
  Send,
  User,
  Mail,
  Phone,
  MessageSquare,
  ChevronUp,
} from "lucide-react";
import MyLogo from "../assets/mylogo.png";

const Footer = () => {
  const { language } = useLanguage();
  const [resultMessage, setResultMessage] = useState("");
  const [resultClass, setResultClass] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { ref: contentRef, inView: isContentVisible } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const form = document.getElementById("form");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      setResultMessage("Please wait...");
      setResultClass("");

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      })
        .then(async (response) => {
          const json = await response.json();
          if (response.status === 200) {
            setResultMessage(json.message);
            setResultClass("text-green-500");
          } else {
            setResultMessage(json.message);
            setResultClass("text-red-500");
          }
        })
        .catch((error) => {
          console.log(error);
          setResultMessage("Something went wrong!");
          setResultClass("text-red-500");
        })
        .finally(() => {
          form.reset();
          setTimeout(() => {
            setResultMessage("");
          }, 3000);
        });
    });
  }, []);

  return (
    <footer className="relative" id="contacts">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

      {/* Content */}
      <div className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8">
        <div
          ref={contentRef}
          className={`container mx-auto transition-all duration-1000 ease-in-out transform ${
            isContentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {/* Left side - Logo and info */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center mb-6 md:mb-0">
                  <img
                    className="w-20 h-auto sm:w-24 shadow-xl transform transition-transform duration-300 hover:scale-105"
                    src={MyLogo}
                    alt="logo"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Muhammad Hafizh Zikry
                  </h3>
                  <p className="text-gray-400 text-sm">
                    © 2024 All rights reserved
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white">
                  {language === "en"
                    ? "Connect with me"
                    : "Terhubung dengan saya"}
                </h4>
                <div className="flex space-x-4">
                  <SocialButton
                    icon={<FiGithub />}
                    href="https://github.com/hafizhzikry24"
                  />
                  <SocialButton
                    icon={<FiLinkedin />}
                    href="https://www.linkedin.com/in/hafizhzikry"
                  />
                  <SocialButton
                    icon={<FiInstagram />}
                    href="https://instagram.com/hafizh.zikry"
                  />
                </div>
              </div>

              <div>
                <a
                  href="https://wa.me/628117428555?text=Halo%20saya%20tertarik%20untuk%20menghubungi%20Anda"
                  className="inline-flex items-center px-5 py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-600/20"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <BsWhatsapp className="mr-2 text-xl" />
                  {language === "en" ? "WhatsApp Me" : "WA saya"}
                </a>
              </div>
            </div>

            {/* Right side - Contact form */}
            <div>
              <form
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-gray-700"
                id="form"
              >
                <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                  <MessageSquare className="mr-2 text-purple-400" />
                  {language === "en" ? "Get In Touch" : "Hubungi lewat Email"}
                </h2>

                <input
                  type="hidden"
                  name="access_key"
                  value="3fb4d7f3-81ab-42e0-b266-7a2aa397b69e"
                />
                <input
                  type="hidden"
                  name="subject"
                  value="New Submission from your Website"
                />
                <input
                  type="checkbox"
                  name="botcheck"
                  style={{ display: "none" }}
                />

                <div className="space-y-4">
                  <div className="relative">
                    <User
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder={
                        language === "en" ? "Full Name" : "Nama Lengkap"
                      }
                      required
                      className="w-full pl-10 pr-4 py-3 text-gray-100 rounded-lg bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder={
                        language === "en" ? "Email Address" : "Alamat Email"
                      }
                      required
                      className="w-full pl-10 pr-4 py-3 text-gray-100 rounded-lg bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-3 text-gray-400"
                      size={18}
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder={
                        language === "en" ? "Phone Number" : "Nomor Telepon"
                      }
                      required
                      className="w-full pl-10 pr-4 py-3 text-gray-100 rounded-lg bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      rows="4"
                      placeholder={
                        language === "en" ? "Your Message" : "Pesan Kamu"
                      }
                      required
                      className="w-full px-4 py-3 text-gray-100 rounded-lg bg-gray-700/50 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-500 hover:to-pink-400 transition duration-300 ease-in-out transform hover:scale-[1.02] flex items-center justify-center"
                  >
                    <Send className="mr-2" size={18} />
                    {language === "en" ? "Send Message" : "Kirim Pesan"}
                  </button>
                </div>

                <p
                  className={`text-base text-center mt-4 ${resultClass}`}
                  id="result"
                >
                  {resultMessage}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-purple-600 text-white shadow-lg shadow-purple-500/20 hover:bg-purple-500 transition-all duration-300 transform hover:scale-110 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </footer>
  );
};

// Social media button component
const SocialButton = ({ icon, href }) => {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all duration-300 transform hover:scale-110 border border-gray-700"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
};

export default Footer;
