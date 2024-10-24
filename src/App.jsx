import React from "react";
import Header from './components/header'
import Content from './components/content'
import Footer from "./components/footer";
import About from "./components/about";
import Projects from "./components/projects";
import Experience from "./components/experience";
import Comment from "./components/coment";
import Landing from "./components/lnding";
import { TimelineDemo } from "./components/timeline";
import { HeroScrollDemo } from "./components/tab";
import { HeroParallaxDemo } from "./components/hero-parallax";


const App = () => {
  
  return (
    <>
      <Header/>
      <HeroParallaxDemo/>
      {/* <Landing/> */}
      {/* <HeroScrollDemo/> */}
      <Content/>
      <About/>
      <TimelineDemo/>
      <Projects/>
      <Comment/>
      <Footer/>

    </>
  );
};

export default App;
