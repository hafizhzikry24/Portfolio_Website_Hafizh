"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useInView } from "react-intersection-observer";
import { Send, MessageSquare, User, Calendar } from "lucide-react";
import { useLanguage } from "../../../LanguageContext";
import Swal from "sweetalert2";

// Initialize Supabase client
const supabaseUrl = "https://mnwjnvmlgusuwjxtwczy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2pudm1sZ3VzdXdqeHR3Y3p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ5MjE3NDUsImV4cCI6MjA0MDQ5Nzc0NX0.bU8kMSYnWaxcz47M5F-5pkkYl44PlzD58fL90IzjEGw";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Comment() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { language } = useLanguage();
  const forbiddenWords = [
    "gay",
    "pantek",
    "bodoh",
    "kontol",
    "bajingan",
    "bangsat",
    "homo",
    "aku suka cowo",
    "lesbian",
    "biseksual",
    "lgbt",
    "p gay",
    "homoseksual",
    "cinta sesama jenis",
    "cinta gay",
    "hubungan sesama jenis",
    "cinta homo",
    "hubungan homo",
    "tolol",
    "anjing",
    "goblok",
    "brengsek",
    "sialan",
    "monyet",
    "setan",
    "iblis",
    "jahanam",
    "laknat",
    "kasar",
    "perek",
    "lonte",
    "sundal",
    "janda",
    "cabul",
    "mesum",
    "bejad",
    "porno",
    "maksiat",
    "seks",
    "pornoaksi",
    "porno",
    "esek-esek",
    "jijik",
    "teler",
    "pemabuk",
    "mabuk",
    "narkoba",
    "sabu",
    "ganja",
    "heroin",
    "kecanduan",
    "melacur",
    "pelacur",
    "gila",
    "banci",
    "otak mesum",
    "masturbasi",
    "stupid",
    "idiot",
    "moron",
    "bastard",
    "dumb",
    "slut",
    "whore",
    "bitch",
    "jerk",
    "damn",
    "crap",
    "hell",
    "suck",
    "loser",
    "trash",
    "pervert",
    "freak",
    "sicko",
    "degenerate",
    "creep",
    "gross",
    "nasty",
    "dirty",
    "drunk",
    "druggie",
    "addict",
    "high",
    "pothead",
    "stoned",
    "weed",
    "heroin",
    "cocaine",
    "meth",
    "sex",
    "porn",
    "masturbate",
    "obscene",
    "vulgar",
  ];

  const containsForbiddenWords = (message) => {
    const regex = new RegExp(forbiddenWords.join("|"), "i"); // 'i' for case insensitive
    return regex.test(message);
  };

  const [feedbackList, setFeedbackList] = useState([]);
  const { ref: contentRef, inView: isContentVisible } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchFeedbackList();
  }, []);

  const fetchFeedbackList = async () => {
    try {
      const { data, error } = await supabase
        .from("feedback")
        .select("name, messages, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching feedback:", error);
        return;
      }

      const formattedData = data.map((feedback) => ({
        ...feedback,
        created_at: new Date(feedback.created_at).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      }));

      setFeedbackList(formattedData);
    } catch (error) {
      console.error("Unexpected error fetching feedback:", error);
    }
  };

  const handleSubmit = async () => {
    if (!name || !message) {
      await Swal.fire({
        icon: "warning",
        title:
          language === "en" ? "Missing Information" : "Informasi Tidak Lengkap",
        text:
          language === "en"
            ? "Please provide both name and message."
            : "Mohon isi nama dan pesan.",
        confirmButtonText: language === "en" ? "Okay" : "Baik",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    if (containsForbiddenWords(message)) {
      await Swal.fire({
        icon: "error",
        title: language === "en" ? "Oops..." : "Ups...",
        text:
          language === "en"
            ? "Your message contains inappropriate content."
            : "Pesan Anda mengandung konten yang tidak pantas.",
        confirmButtonText: language === "en" ? "Okay" : "Baik",
        confirmButtonColor: "#6366f1",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const createdAt = new Date().toISOString();

      const { data, error } = await supabase
        .from("feedback")
        .insert([{ name, messages: message, created_at: createdAt }]);

      if (error) {
        console.error("Error submitting feedback:", error);
        setIsSubmitting(false);
        return;
      }

      const formattedCreatedAt = new Date(createdAt).toLocaleDateString(
        "en-US",
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );

      setFeedbackList([
        { name, messages: message, created_at: formattedCreatedAt },
        ...feedbackList,
      ]);

      await Swal.fire({
        icon: "success",
        title: language === "en" ? "Thank You!" : "Terima Kasih!",
        text:
          language === "en"
            ? "Your feedback has been submitted successfully."
            : "Feedback Anda telah berhasil dikirim.",
        confirmButtonText: language === "en" ? "Great!" : "Bagus!",
        confirmButtonColor: "#6366f1",
        timer: 2000,
        timerProgressBar: true,
      });

      setName("");
      setMessage("");
    } catch (error) {
      console.error("Unexpected error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={contentRef}
      className={`text-white body-font relative bg-gradient-to-br bg-gray-900 py-16 sm:py-20 transition-all duration-1000 ease-in-out transform ${
        isContentVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10"
      }`}
      id="comment"
    >
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.5),rgba(255,255,255,0.8))] bg-fixed opacity-20"></div>

      <div className="container px-5 py-2 mx-auto relative z-10">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-4xl text-3xl font-bold title-font mb-4 text-white tracking-tight">
            {language === "en" ? "Feedback" : "Kritik dan Saran"}
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded mx-auto mb-4"></div>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-white">
            {language === "en"
              ? "Feel free to share your comments or feedback for my portfolio."
              : "Dipersilahkan teman-teman memberikan kritik dan saran kepada website portoku."}
          </p>
        </div>

        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm font-medium text-white flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  {language === "en" ? "Name" : "Nama"}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder={
                    language === "en"
                      ? "Feel free to use anonym"
                      : "Dipersilahkan menggunakan nama samaran"
                  }
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-900 py-3 px-4 transition-colors duration-200 ease-in-out shadow-sm"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm font-medium text-white flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  {language === "en" ? "Message" : "Pesan"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder={
                    language === "en" ? "Your message" : "Pesan Kamu"
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-white rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-900 py-3 px-4 resize-none transition-colors duration-200 ease-in-out shadow-sm"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center justify-center mx-auto font-press text-sm text-white bg-gradient-to-r from-indigo-500 to-purple-600 border-0 py-3 px-8 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : null}
                {language === "en" ? "Send" : "Kirim"}{" "}
                <Send className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container px-7 mx-auto w-full py-8 sm:py-8">
        <h2 className="text-2xl font-semibold text-white mb-4">
          {language === "en" ? "Comments" : "Komentar"}{" "}
        </h2>
        <div className="overflow-x-auto">
          <div className="flex space-x-4">
            {feedbackList.length > 0 ? (
              feedbackList.map((feedback, index) => (
                <div
                  key={index}
                  className="w-full md:w-3/4 lg:w-1/3 sm:w-2/3 p-4 border-l-8 border-indigo-500 bg-gray-50 rounded-lg shadow-md flex-shrink-0 transition-all duration-300 ease-in-out transform hover:scale-90 hover:bg-gray-100"
                >
                  <h3 className="text-lg font-semibold font-pixel text-gray-900">
                    {feedback.name}
                  </h3>
                  <p className="mt-2 text-gray-700 font-pixel">{feedback.messages}</p>
                  <p className="mt-2 text-xs text-gray-500 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {feedback.created_at}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-white">
                {language === "en" ? "No feedback yet" : "Tidak ada feedback"}.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Comment;
