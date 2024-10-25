import React, { useEffect, useState } from "react";
import { FiTwitter, FiMail, FiGithub, FiLinkedin } from "react-icons/fi";
import MyLogo from "../assets/mylogo.png";
import { BsWhatsapp } from "react-icons/bs";
import { useInView } from "react-intersection-observer";
import { useLanguage } from "../LanguageContext";

const Footer = () => {
  const {language} = useLanguage();
  const [resultMessage, setResultMessage] = useState("");
  const [resultClass, setResultClass] = useState("");
  const { ref: contentRef, inView: isContentVisible } = useInView({
    triggerOnce: false, // Allows fade-in animation on both scroll up and down
    threshold: 0.1,
  });

  useEffect(() => {
    const form = document.getElementById("form");

    form.addEventListener("submit", function (e) {
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
          let json = await response.json();
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
    <div
      className="bg-gray-900 text-white py-8 sm:py-12 rounded-xl "
      id="contact"
    >
      <div
        ref={contentRef}
        className={`container mx-auto flex flex-col md:flex-row justify-around items-center  transition-all duration-1000 ease-in-out transform ${
          isContentVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex items-center mb-6 md:mb-0">
          <img
            className="w-28 sm:w-32 shadow-xl transform transition-transform duration-300 hover:scale-105"
            src={MyLogo}
            alt="logo"
          />
          <p className="text-sm text-gray-400 ml-4">
            © 2024 Muhammad Hafizh Zikry
          </p>
        </div>

        <form
          className="w-3/4 sm:w-1/4 lg:w-1/3 md:w-2/3 bg-gray-800 p-3 sm:p-6 rounded-lg shadow-lg"
          id="form"
        >
          <h2 className="text-lg font-semibold text-white mb-4">
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
          <input type="checkbox" name="botcheck" style={{ display: "none" }} />

          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder={language === "en" ? "Full Name" : "Nama Lengkap"}
              required
              className="w-full px-4 py-2 text-gray-900 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder={language === "en" ? "Email Address" : "Alamat Email"}
              required
              className="w-full px-4 py-2 text-gray-900 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="mb-4">
            <input
              type="text"
              name="phone"
              placeholder={language === "en" ? "Phone Number" : "Nomor Telepon"}
              required
              className="w-full px-4 py-2 text-gray-900 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          <div className="mb-4">
            <textarea
              name="message"
              rows="4"
              placeholder={language === "en" ? "Your Message" : "Pesan Kamu"}
              required
              className="w-full px-4 py-2 text-gray-900 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 mb-6 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition duration-300 ease-in-out"
          >
            {language === "en" ? "Send Message" : "Kirim Pesan"}
          </button>
          <a
            href="https://wa.me/628117428555?text=Halo%20saya%20tertarik%20untuk%20menghubungi%20Anda"
            className="flex items-center text-green-300 font-bold hover:text-green-200 transition duration-300 ease-in-out"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsWhatsapp className="mr-2 text-xl" />
            {language === 'en' ? 'WhatsApp Me' : 'WA saya'}
          </a>
          <p
            className={`text-base text-center mt-4 ${resultClass}`}
            id="result"
          >
            {resultMessage}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Footer;
