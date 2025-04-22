import React from 'react';
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Navbar from './components/Navbar.jsx';
import Projects from './components/Projects.jsx';
import Footer from './components/Footer.jsx';
import ProjectsComponent from './components/ProjectsComponent.jsx';
import Contact from './components/Contact.jsx';


const App = () => {
    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            <Navbar/>
            <Hero/>
            <About/>
            <Projects/>
            <ProjectsComponent/>
            <Contact/>
            <Footer/>
        </main>
    );
};

export default App;

