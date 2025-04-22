import React, { useEffect, useState } from 'react';
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
/* eslint-enable no-unused-vars */
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Navbar from './components/Navbar.jsx';
import Projects from './components/Projects.jsx';
import Footer from './components/Footer.jsx';
import ProjectsComponent from './components/ProjectsComponent.jsx';
import Contact from './components/Contact.jsx';
import Preloader from './components/Preloader.jsx'; // Ensure this component exists

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.cursor = 'default';
            window.scrollTo(0, 0);
        }, 2000);

        // Cleanup the timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            <AnimatePresence mode="wait">
                {isLoading && <Preloader />}
            </AnimatePresence>
            {!isLoading && (
                <>
                    <Navbar />
                    <Hero />
                    <About />
                    <Projects />
                    <ProjectsComponent />
                    <Contact />
                    <Footer />
                </>
            )}
        </main>
    );
};

export default App;

