"use client"

import { useState, useEffect, useRef } from "react"
import { useLanguage } from "../../../LanguageContext"
import { Send, Bot, User, StopCircle } from "lucide-react" // Tambahkan StopCircle jika ingin ikon
import { useInView } from "react-intersection-observer" // Add this import

// Add this helper function before the AiChat component
const formatAIResponse = (text) => {
  if (!text) return ""
  
  let formattedText = text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/_([^_]+)_/g, "$1")      
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/^[•*]\s*/gm, "• ")
    .replace(/\n\s*\n\s*\n/g, "\n\n")
    .replace(/^\s+/gm, "")
    .replace(/\s+$/gm, "")
    .replace(/\.\s+/g, ".\n\n")
    .replace(/•(.*?)(?=\n|$)/g, "• $1\n")

  return formattedText
}

const AiChat = () => {
  const { language } = useLanguage()
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState([])
  const [typingText, setTypingText] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const chatContainerRef = useRef(null)
  const geminiApiKey = import.meta.env.VITE_GEMINI_KEY;
  const geminiApiModel = import.meta.env.VITE_GEMINI_MODEL;
  const typingSpeed = 20 // kecepatan pengetikan dalam milidetik
  const stopTypingRef = useRef(false) // 1. Tambahkan ref untuk sinyal berhenti

  // Add useInView hook
  const { ref: sectionRef, inView: isSectionVisible } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  // Fungsi untuk animasi pengetikan
  const typeMessage = async (text) => { // 2. Modifikasi typeMessage
    setIsTyping(true)
    setTypingText("")
    let currentTypedMessage = ""
    
    for (let i = 0; i < text.length; i++) {
      if (stopTypingRef.current) { // Periksa sinyal berhenti
        break
      }
      await new Promise(resolve => setTimeout(resolve, typingSpeed))
      currentTypedMessage += text[i]
      setTypingText(currentTypedMessage)
      
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }
    }
    
    setIsTyping(false)
    return currentTypedMessage // Kembalikan teks yang sudah diketik (bisa parsial)
  }

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatHistory, isTyping])

  useEffect(() => {
    if (chatContainerRef.current && isTyping) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [typingText])

  const [showSuggestions, setShowSuggestions] = useState(true)

  // 3. Buat fungsi handleStopGenerating
  const handleStopGenerating = () => {
    stopTypingRef.current = true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setShowSuggestions(false)
    stopTypingRef.current = false // 4. Reset sinyal berhenti

    const userMessage = {
      role: "user",
      content: message,
    }

    setChatHistory(prev => [...prev, userMessage])
    setIsLoading(true)
    setMessage("")

    // Scroll ke bawah setelah pesan user ditambahkan
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }
    }, 100)

    try {
      // Create conversation context from previous messages
      const conversationContext = chatHistory
        .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
        .join("\n\n")

      const response = await fetch(geminiApiModel,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": geminiApiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are an AI assistant for the portfolio of Muhammad Hafizh Zikry.
          Here is some information about the portfolio owner:
          
          EXPERIENCE:
          • Software Engineer at Alturian (Jan 2025 – Present)  
          Responsible for developing and maintaining website application(laravel, Angular) and mobile applications(PWA(Ionic)). I work on frontend, backend, and mobile development, ensuring optimal performance and security. I also collaborate with the team to improve application features and functionality.
          
          • Backend Developer at PT Awan Network Indonesia (Aug 2024 until Jan 2025)  
          Developed and optimized APIs for application and website integration.
          
          • Teaching Assistant at Diponegoro University (Aug 2024 until Nov 2024)  
          Assisted in teaching Digital Systems, Introduction to Networking, Advanced Digital Systems, etc.
          
          • UI/UX Designer at MTQMN XVII Malang (Nov 2023)  
          1st place winner in the MTQMN Quran App Design Competition representing Undip.
          
          • Network Engineer at SMKN 53 Jakarta (Jan 2023 until Feb 2023)  
          Designed and configured network architecture.
          
          PROJECTS:
          • OCReadEasy: A PWA OCR app using Next.js and Tesseract.js  
          • SPCPLCPMK: Capstone project website as a front-end developer  
          • Desa Bercak & Klikiran Blog: Village profile website using ReactJS and Tailwind  
          • Madani: UI/UX project for the MTQMN competition
          
          TECH STACK:
          • Frontend: React.js, Next.js, Tailwind CSS, Angular, HTML, CSS, JavaScript, TypeScript
          • Mobile: Ionic, React Native  
          • Backend: Laravel, SQL, PHP, Python
          • Tools: GitHub, Figma, Docker,  
          • Networking: Cisco
          
          CONTACT:
          • GitHub: hafizhzikry24  
          • LinkedIn: hafizhzikry  
          • Instagram: hafizh.zikry  
          • WhatsApp: +628117428555  
          • Portfolio: https://zikkdev.vercel.app/

          Education:
          • Computer Engineering at Diponegoro University (2020 - 2024)
          
          If the user asks about the level or rating of a skill (e.g., "How good is the Backend Development skill?" or "Give a score for Next.js and Laravel skills"), provide a brief evaluation based on the profile and experience provided.

            Respond using a clear structure like:

            • Skill: Backend Development  
            • Rating: 9/10  
            • Explanation: Strong experience shown through multiple projects and role as Backend Developer at PT Awan Network Indonesia. Uses Laravel, builds APIs, and integrates with frontend efficiently.

            Please answer questions politely, informatively, and concisely in the appropriate language (Indonesian/English).
          
          Important: Format your responses properly. Use separate paragraphs for each sentence or key point. If using bullet points, format them correctly with "•" instead of "*". Provide adequate spacing between paragraphs.
          
          Here is the previous conversation history:
          ${conversationContext}
          
          Users latest question: ${message}`,
                  },
                ],
              },
            ],
          })
          
        },
      )

      const data = await response.json()
      const aiResponse = data.candidates[0].content.parts[0].text
      
      // Mulai animasi pengetikan
      const typedResponse = await typeMessage(aiResponse) // typeMessage akan mengembalikan teks (parsial jika dihentikan)
      
      // Setelah animasi selesai atau dihentikan, tambahkan ke chat history
      setChatHistory(prev => [...prev, { 
        role: "assistant", 
        content: typedResponse // Gunakan typedResponse
      }])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage = language === "en"
        ? "Sorry, there was an error processing your request."
        : "Maaf, terjadi kesalahan dalam memproses permintaan Anda."
      
      stopTypingRef.current = false // Reset juga untuk pesan error
      const typedErrorMessage = await typeMessage(errorMessage)
      setChatHistory(prev => [...prev, { 
        role: "assistant", 
        content: typedErrorMessage 
      }])
    }

    setIsLoading(false)
  }

  // Add suggested questions in English
  const suggestedQuestions = [
    "Tell me about his Developer experience",
    "What technologies use for Developement?",
    "How to Contact the developer?",
    "what's skill the developer?"
  ]

  // Remove the first handleSuggestedQuestion definition and keep only this one
  const handleSuggestedQuestion = async (question) => {
    if (isLoading) return
    
    stopTypingRef.current = false // 4. Reset sinyal berhenti

    const userMessage = {
      role: "user",
      content: question,
    }

    setChatHistory(prev => [...prev, userMessage])
    setIsLoading(true)
    setMessage("")
    setShowSuggestions(false)

    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }
    }, 100)

    try {
      const conversationContext = chatHistory
        .map((msg) => `${msg.role === "user" ? "User" : "Assistant"}: ${msg.content}`)
        .join("\n\n")

      const response = await fetch( geminiApiModel, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": geminiApiKey,
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                {
                  text: `You are an AI assistant for the portfolio of Muhammad Hafizh Zikry.
          Here is some information about the portfolio owner:
          
          EXPERIENCE:
          • Software Engineer at Alturian (Jan 2025 – Present)  
          Responsible for developing and maintaining website application(laravel, Angular) and mobile applications(PWA(Ionic)). I work on frontend, backend, and mobile development, ensuring optimal performance and security. I also collaborate with the team to improve application features and functionality.
          
          • Backend Developer at PT Awan Network Indonesia (Aug 2024 until Jan 2025)  
          Developed and optimized APIs for application and website integration.
          
          • Teaching Assistant at Diponegoro University (Aug 2024 until Nov 2024)  
          Assisted in teaching Digital Systems, Introduction to Networking, Advanced Digital Systems, etc.
          
          • UI/UX Designer at MTQMN XVII Malang (Nov 2023)  
          1st place winner in the MTQMN Quran App Design Competition representing Undip.
          
          • Network Engineer at SMKN 53 Jakarta (Jan 2023 until Feb 2023)  
          Designed and configured network architecture.
          
          PROJECTS:
          • OCReadEasy: A PWA OCR app using Next.js and Tesseract.js  
          • SPCPLCPMK: Capstone project website as a front-end developer  
          • Desa Bercak & Klikiran Blog: Village profile website using ReactJS and Tailwind  
          • Madani: UI/UX project for the MTQMN competition
          
          TECH STACK:
          • Frontend: React.js, Next.js, Tailwind CSS, Angular, HTML, CSS, JavaScript, TypeScript
          • Mobile: Ionic, React Native  
          • Backend: Laravel, SQL, PHP, Python
          • Tools: GitHub, Figma, Docker,  
          • Networking: Cisco
          
          CONTACT:
          • GitHub: hafizhzikry24  
          • LinkedIn: hafizhzikry  
          • Instagram: hafizh.zikry  
          • WhatsApp: +628117428555  
          • Portfolio: https://zikkdev.vercel.app/

          Education:
          • Computer Engineering at Diponegoro University (2020 - 2024)
          
          If the user asks about the level or rating of a skill (e.g., "How good is the Backend Development skill?" or "Give a score for Next.js and Laravel skills"), provide a brief evaluation based on the profile and experience provided.

            Respond using a clear structure like:

            • Skill: Backend Development  
            • Rating: 9/10  
            • Explanation: Strong experience shown through multiple projects and role as Backend Developer at PT Awan Network Indonesia. Uses Laravel, builds APIs, and integrates with frontend efficiently.

            Please answer questions politely, informatively, and concisely in the appropriate language (Indonesian/English).
          
          Important: Format your responses properly. Use separate paragraphs for each sentence or key point. If using bullet points, format them correctly with "•" instead of "*". Provide adequate spacing between paragraphs.
          
          Here is the previous conversation history:
          ${conversationContext}
          
          Users latest question: ${question}`, // Ubah dari ${message} menjadi ${question}
                  },
                ],
              },
            ],
          })
          
        },
      )

      const data = await response.json()
      const aiResponse = data.candidates[0].content.parts[0].text
      
      // Start typing animation
      const typedResponse = await typeMessage(aiResponse) 
      
      setChatHistory(prev => [...prev, { 
        role: "assistant", 
        content: typedResponse
      }])
    } catch (error) {
      console.error("Error:", error)
      const errorMessage = language === "en"
        ? "Sorry, there was an error processing your request."
        : "Maaf, terjadi kesalahan dalam memproses permintaan Anda."
      
      stopTypingRef.current = false // Reset juga untuk pesan error
      const typedErrorMessage = await typeMessage(errorMessage)
      setChatHistory(prev => [...prev, { 
        role: "assistant", 
        content: typedErrorMessage
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-gradient-to-br from-gray-900 to-black py-24 text-white h-[90vh] sm:h-[75vh] md:h-[75vh] lg:h-screen xl:h-screen" id="ai-chat">
      <div 
        ref={sectionRef}
        className={`container mx-auto px-4 transition-all duration-1000 ease-in-out transform ${
          isSectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              {language === "en" ? "Chat with AI Assistant" : "Ngobrol dengan Asisten AI"}
            </h2>
            <p className="text-gray-400">
              {language === "en"
                ? "Ask anything about my skills, experience, or projects!"
                : "Tanyakan apa saja tentang skill, pengalaman, atau proyek saya!"}
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
            {/* Chat history display */}
            <div 
              ref={chatContainerRef} 
              className="mb-6 max-h-80 overflow-y-auto space-y-4 pr-2 scroll-smooth"
            >
              {chatHistory.map((chat, index) => (
                <div key={index} className={`flex items-start gap-3 ${chat.role === "user" ? "justify-end" : ""}`}>
                  {chat.role === "assistant" && <Bot className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />}
                  <div className={`rounded-lg p-3 max-w-[80%] ${
                    chat.role === "user" ? "bg-purple-600 ml-auto" : "bg-gray-700"
                  }`}>
                    {chat.role === "assistant" ? (
                      <div className="text-sm whitespace-pre-line">
                        {formatAIResponse(chat.content)}
                      </div>
                    ) : (
                      <p className="text-sm">{chat.content}</p>
                    )}
                  </div>
                  {chat.role === "user" && <User className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />}
                </div>
              ))}
              
              {/* Show typing animation OR loading dots, not both */}
              {isTyping ? (
                <div className="flex items-start gap-3">
                  <Bot className="w-6 h-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div className="bg-gray-700 rounded-lg p-3 max-w-[80%]">
                    <div className="text-sm whitespace-pre-line">
                      {formatAIResponse(typingText)}
                    </div>
                  </div>
                </div>
              ) : isLoading && (
                <div className="flex items-start gap-3">
                  <Bot className="w-6 h-6 text-purple-400 mt-1" />
                  <div className="bg-gray-700 rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div
                        className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Suggested Questions - hanya tampilkan jika showSuggestions true */}
            {showSuggestions && (
              <div className="mb-6 flex flex-wrap gap-2">
                {suggestedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    disabled={isLoading}
                    className="text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 py-1 px-3 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            {/* Input form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2 sm:gap-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={language === "en" ? "Ask something..." : "Tanyakan sesuatu..."}
                  className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  disabled={isTyping} // Opsional: nonaktifkan input saat AI mengetik
                />
                {/* 5. Perbarui tombol aksi */}
                <button
                  type={isTyping ? "button" : "submit"}
                  onClick={isTyping ? handleStopGenerating : undefined}
                  disabled={!isTyping && (isLoading || !message.trim())}
                  className={`px-3 sm:px-6 py-2 rounded-lg flex items-center gap-1 sm:gap-2 transition-colors whitespace-nowrap ${
                    isTyping
                      ? "bg-red-600 hover:bg-red-700 text-white" // Gaya tombol Stop
                      : "bg-purple-600 hover:bg-purple-700 text-white disabled:bg-purple-800 disabled:cursor-not-allowed" // Gaya tombol Kirim
                  }`}
                >
                  {isTyping ? (
                    <>
                      <StopCircle className="w-4 h-4" /> {/* Contoh menggunakan ikon */}
                      <span className="hidden sm:inline">Stop</span>
                    </>
                  ) : isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span className="hidden sm:inline">
                        {language === "en" ? "Send" : "Kirim"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AiChat