import React from 'react';
import Content from './components/content';
import AiChat from "./components/ai-chat";
import Hero from './components/hero';
import Comment from './components/coment';

const HomePage = () => {
  return (
    <>
      <main>
      <Hero/>
      <Content/>{/*inculude in tab Home at header*/}
      <AiChat/>{/*inculude in tab Home at header*/}
      <Comment/>
      </main>
    </>
  );
};

export default HomePage;