import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useInView } from "react-intersection-observer";
import { FiSend } from 'react-icons/fi';
import { useLanguage } from '../LanguageContext';

// Initialize Supabase client
const supabaseUrl = "https://mnwjnvmlgusuwjxtwczy.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ud2pudm1sZ3VzdXdqeHR3Y3p5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ5MjE3NDUsImV4cCI6MjA0MDQ5Nzc0NX0.bU8kMSYnWaxcz47M5F-5pkkYl44PlzD58fL90IzjEGw";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function Comment() {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const {language} = useLanguage();
    const forbiddenWords = [
        'gay', 
        'homo', 
        'aku suka cowo', 
        'lesbian', 
        'biseksual', 
        'lgbt', 
        'p gay', 
        'p gay', 
        'homoseksual', 
        'cinta sesama jenis', 
        'cinta gay', 
        'hubungan sesama jenis', 
        'cinta homo', 
        'hubungan homo'
    ];
    const containsForbiddenWords = (message) => {
        const words = message.toLowerCase().split(/\s+/);
        return words.some((word) => forbiddenWords.includes(word));
    };
    const [feedbackList, setFeedbackList] = useState([]);
    const { ref: contentRef, inView: isContentVisible } = useInView({
        triggerOnce: false,
        threshold: 0.1,
    });

    useEffect(() => {
        fetchFeedbackList();
    }, []);

    const fetchFeedbackList = async () => {
        try {
            const { data, error } = await supabase
                .from('feedback')
                .select('name, messages, created_at')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Error fetching feedback:', error);
                return;
            }

            const formattedData = data.map(feedback => ({
                ...feedback,
                created_at: new Date(feedback.created_at).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
            }));

            setFeedbackList(formattedData);
        } catch (error) {
            console.error('Unexpected error fetching feedback:', error);
        }
    };

    const handleSubmit = async () => {
        if (containsForbiddenWords(message)) {
            alert("Your message contains inappropriate content.");
            return; // Tidak melanjutkan jika ada kata terlarang
        }
    
        if (name && message) {
            try {
                const createdAt = new Date().toISOString();
    
                const { data, error } = await supabase
                    .from('feedback')
                    .insert([{ name, messages: message, created_at: createdAt }]);
    
                if (error) {
                    console.error('Error submitting feedback:', error);
                    return;
                }
    
                const formattedCreatedAt = new Date(createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
    
                setFeedbackList([{ name, messages: message, created_at: formattedCreatedAt }, ...feedbackList]);
    
                setName('');
                setMessage('');
            } catch (error) {
                console.error('Unexpected error submitting feedback:', error);
            }
        }
    };

    return (
        <section
            ref={contentRef}
            className={`text-gray-600 body-font relative bg-gradient-to-r from-gray-100 via-gray-200 py-16 sm:py-12 transition-all duration-1000 ease-in-out transform ${
                isContentVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
            }`}id='comment'
        >
            <div className="container px-10 py-2 mt-6 sm:mt-4 sm:py-5 mx-auto w-full md:w-3/4 sm:w-1/2">
                <div className="flex flex-col text-center w-full mt-10 mb-4">
                    <h1 className="sm:text-3xl text-2xl font-bold title-font mb-4 text-gray-900">{language === 'en' ? "Feedback" : "Kritik dan Saran"}</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-gray-700">
                        {language === 'en' ? 'Feel free to share your comments or feedback for my portfolio.' : 'Dipersilahkan teman-teman memberikan kritik dan saran kepada website portoku.'}
                    </p>
                </div>
                <div className="lg:w-1/2 md:w-2/3 mx-auto">
                    <div className="flex flex-wrap -m-2">
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="name" className="leading-7 text-sm text-gray-600">{language === 'en' ? 'Name' : 'Nama'}</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder={language === 'en' ? 'Feel free to use anonym' : 'Dipersilahkan menggunakan nama samaran'}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-3 px-4 transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <div className="relative">
                                <label htmlFor="message" className="leading-7 text-sm text-gray-600">{language === 'en' ? 'Message' : 'Pesan'}</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder={language === 'en' ? 'Your message' : 'Pesan Kamu'}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-24 text-base outline-none text-gray-700 py-3 px-4 resize-none transition-colors duration-200 ease-in-out"
                                />
                            </div>
                        </div>
                        {/* <div className="p-2 w-full">
                            <button
                                onClick={handleSubmit}
                                className="flex mx-auto text-white bg-indigo-500 border-0 py-3 px-8 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                            >
                            <FiSend className="ml-2" />
                                Send
                            </button>
                        </div> */}
                        <div className="p-2 w-full">
                            <button
                                onClick={handleSubmit}
                                className="flex items-center justify-center mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
                                {language === 'en' ? 'Send' : 'Kirim'} <FiSend className="ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container px-7 mx-auto w-full py-8 sm:py-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{language === 'en' ? 'Comments' : 'Komentar'} </h3>
                <div className="overflow-x-auto">
                    <div className="flex space-x-4">
                        {feedbackList.length > 0 ? (
                            feedbackList.map((feedback, index) => (
                                <div
                                    key={index}
                                    className="w-full md:w-3/4 lg:w-1/3 sm:w-2/3 p-4 border-l-8 border-indigo-500 bg-gray-50 rounded-lg shadow-md flex-shrink-0 transition-all duration-300 ease-in-out transform hover:scale-90 hover:bg-gray-100"
                                >
                                    <h4 className="text-lg font-semibold text-gray-900">{feedback.name}</h4>
                                    <p className="mt-2 text-gray-700">{feedback.messages}</p>
                                    <p className="mt-2 text-gray-500 text-sm">{feedback.created_at}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600">{language === 'en'? 'No feedback yet' : 'Tidak ada feedback'}.</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Comment;
