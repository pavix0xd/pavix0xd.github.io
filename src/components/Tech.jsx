'use client';
import { useEffect, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
/* eslint-disable no-unused-vars */
import { useTransform, useScroll, motion } from 'framer-motion';
/* eslint-enable no-unused-vars */

const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
  "11.jpg",
  "12.jpg",
];

export default function Tech() {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({width: 0, height: 0});

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  });
  
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({width: window.innerWidth, height: window.innerHeight});
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="w-full">
      <div className="h-[100vh]"></div>
      <div ref={gallery} className="h-[175vh] overflow-hidden bg-[rgb(45,45,45)] relative flex gap-[2vw] p-[2vw]">
        <Column images={[images[0], images[1], images[2]]} y={y}/>
        <Column images={[images[3], images[4], images[5]]} y={y2}/>
        <Column images={[images[6], images[7], images[8]]} y={y3}/>
        <Column images={[images[9], images[10], images[11]]} y={y4}/>
      </div>
      <div className="h-[100vh]"></div>
    </main>
  );
}

const Column = ({images, y}) => {
  return (
    <motion.div 
      className="relative h-full w-[25%] min-w-[250px] flex flex-col gap-[2vw]"
      style={{ y }}
    >
      {images.map((src, i) => {
        return (
          <div key={i} className="relative h-[33%] w-full rounded-[1vw] overflow-hidden">
            <img 
              src={`/img/${src}`}
              alt="Gallery image"
              className="absolute h-full w-full object-cover"
            />
          </div>
        );
      })}
    </motion.div>
  );
};