import React from "react";
import Header from './components/header'
import Content from './components/content'
import Footer from "./components/footer";
import About from "./components/about";
import Projects from "./components/projects";
import Experience from "./components/experience";
import Comment from "./components/coment";
import Landing from "./components/lnding";


const App = () => {
  
  return (
    <>
      <Header/>
      <Landing/>
      <Content/>
      <About/>
      <Experience/>
      <Projects/>
      <Comment/>
      <Footer/>

    </>
  );
};

export default App;
