import { useState, useRef } from 'react';
/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
/* eslint-enable no-unused-vars */

const ProjectsComponent = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  const data = [
    {
      title: "Ford",
      description: "Working on the Next-Generation HMI Experience without no driving experience.",
      speed: 0.5
    },
    {
      title: "UFC",
      description: "Developed the Future of UFC Sports Ecosystem despite not being a sports fan.",
      speed: 0.5
    },
    {
      title: "Lincoln",
      description: "Defined the visual concept and design language for the Lincoln Zephyr 2022 but never seen it in real life.",
      speed: 0.67
    },
    {
      title: "Royal Caribbean",
      description: "I was just one person on a massive team that created an entire Royal Caribbean eco-system.",
      speed: 0.8
    },
    {
      title: "Sleepiq",
      description: "Designed a 1M+ users product utilizing my best personal experience: sleeping.",
      speed: 0.8
    },
    {
      title: "NFL",
      description: "Explored the Future of Fantasy Football while being in a country where football means a total different sport.",
      speed: 0.8
    }
  ];

  const crop = (string, maxLength) => {
    return string.substring(0, maxLength);
  };

  const Title = ({ data, setSelectedProject }) => {
    const { title, speed, i } = data;
    const container = useRef(null);

    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start end', `${25 / speed}vw end`]
    });

    const clipProgress = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const clip = useMotionTemplate`inset(0 ${clipProgress}% 0 0)`;
    
    return (
      <div ref={container} className="border-b border-[rgba(183,171,152,0.25)] cursor-default relative z-[2]">
        <div 
          className="inline-block pl-[10%]"
          onMouseOver={() => setSelectedProject(i)}
          onMouseLeave={() => setSelectedProject(null)}
        >
          <motion.p 
            className="inline-block text-[#b7ab98] uppercase font-bold text-[8vw] leading-[7.5vw] m-0 relative z-[2]"
            style={{ clipPath: clip }}
          >
            {title}
          </motion.p>
          <p className="block absolute text-[#1c1c1c] top-0 z-[1] uppercase font-bold text-[8vw] leading-[7.5vw]">
            {title}
          </p>
        </div>
      </div>
    );
  };

  const Descriptions = ({ data, selectedProject }) => {
    return (
      <div className="absolute top-[3px] h-full w-full z-[2] pointer-events-none">
        {data.map((project, i) => {
          const { title, description } = project;
          return (
            <div 
              key={i} 
              className="bg-[#ec4e39] flex justify-between items-center pl-[10%] pr-[10%]"
              style={{
                clipPath: selectedProject === i ? "inset(0 0 0)" : "inset(50% 0 50%)",
                transition: 'clip-path 0.4s'
              }}
            >
              <p className="text-[#010101] uppercase font-bold text-[8vw] leading-[7.5vw] m-0 relative z-[1]">
                {crop(title, 9)}
              </p>
              <p className="w-[40%] text-[1vw] font-bold">
                {description}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="bg-black pb-40 relative w-full overflow-hidden">
      <div className="w-full border-t border-[rgba(183,171,152,0.25)]">
        {data.map((project, i) => (
          <Title 
            key={i} 
            data={{ ...project, i }} 
            setSelectedProject={setSelectedProject} 
          />
        ))}
      </div>
      <Descriptions data={data} selectedProject={selectedProject} />
    </section>
  );
};

export default ProjectsComponent;