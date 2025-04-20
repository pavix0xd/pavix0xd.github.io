import React from 'react';
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Navbar from './components/Navbar.jsx';
import Projects from './components/Projects.jsx';

const App = () => {
    return (
        <main className="relative min-h-screen w-screen overflow-x-hidden">
            <Navbar/>
            <Hero/>
            <About/>
            <Projects/>
        </main>
    );
};

export default App;

