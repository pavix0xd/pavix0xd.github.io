'use client';
import { useEffect, useState } from 'react';
/* eslint-disable no-unused-vars */
import { color, motion } from 'framer-motion';
/* eslint-enable no-unused-vars */

// Animation definitions
const opacity = {
    initial: {
        opacity: 0,
    },
    enter: {
        opacity: 1,
        transition: { duration: 1, delay: 0.2 },
    },
};

const slideUp = {
    initial: {
        top: 0,
    },
    exit: {
        top: "-100vh",
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
};

// Component styles
const styles = {
    introduction: {
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        backgroundColor: '#000',
        zIndex: 9999,
        overflow: 'hidden',
        color: '#fff', // Ensure text is visible
        fontFamily: 'circular-web', // Add a readable font
    },
    word: {
        fontSize: '4rem', // Increased font size
        textAlign: 'justify', // Center-align the text
        lineHeight: '1.2', // Adjust line height for better spacing
        color: '#fdff65', // Replace with a valid yellow color (e.g., hex code for gold)
    },
};

const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Guten tag", "Hallo"];

export default function Preloader() {
    const [index, setIndex] = useState(0);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    useEffect(() => {
        if (index === words.length - 1) return;
        const timer = setTimeout(() => {
            setIndex(index + 1);
        }, index === 0 ? 1000 : 150);

        // Cleanup timer on unmount
        return () => clearTimeout(timer);
    }, [index]);

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`;

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
        },
    };

    return (
        <motion.div variants={slideUp} initial="initial" exit="exit" style={styles.introduction}>
            {dimension.width > 0 && (
                <>
                    <motion.p
                        style={styles.word} // Apply the updated styles
                        variants={opacity}
                        initial="initial"
                        animate="enter"
                    >
                        {words[index]}
                    </motion.p>
                    <svg>
                        <motion.path variants={curve} initial="initial" exit="exit"></motion.path>
                    </svg>
                </>
            )}
        </motion.div>
    );
}