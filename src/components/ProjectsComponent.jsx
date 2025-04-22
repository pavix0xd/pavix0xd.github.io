import { useState, useRef } from 'react';
/* eslint-disable no-unused-vars */
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
/* eslint-enable no-unused-vars */

const ProjectsComponent = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  
  const data = [
    {
      title: "Frontend Wizard",
      description: "Casting clean code spells with React and a sprinkle of CSS magic. I bring ideas to life through smooth animations, fast load times, and pixel-precise layouts.",
      speed: 0.5
    },
    {
      title: "Visual Storyteller",
      description: "Every interface tells a story. I design and build UIs that guide users naturally, blending form and function to turn wireframes into delightful experiences.",
      speed: 0.5
    },
    {
      title: "React ft. python",
      description: "I like keeping things simple and powerful — React for crafting dynamic frontends, Python for clean, reliable backends. Best of both worlds, speaking fluently in both.",
      speed: 0.67
    },
    {
      title: "Lead by Design",
      description: "Good design leads to great products. I work closely with designers and teams to build accessible, scalable, and maintainable frontend systems that look good and work even better.",
      speed: 0.8
    },
    {
      title: "AI & I’ll solve It",
      description: "Worked on AI-driven platforms where I focused on making the complex feel simple. Because even the smartest techie needs a friendly companion :3",
      speed: 0.8
    },
    {
      title: "Pixel-Perfect",
      description: "I believe every detail matters. From margins to motion, I obsess over UI polish to ensure a consistent, responsive, and beautiful user experience across devices.",
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
            className="inline-block text-yellow-300 uppercase font-bold text-[8vw] leading-[8vw] m-0 relative z-[2]"
            style={{ clipPath: clip }}
          >
            {title}
          </motion.p>
          <p className="block absolute text-[#1c1c1c] top-0 z-[1] uppercase font-bold text-[8vw] leading-[8vw]">
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
              className="bg-yellow-300 flex justify-between items-center pl-[10%] pr-[10%]"
              style={{
                clipPath: selectedProject === i ? "inset(0 0 0)" : "inset(50% 0 50%)",
                transition: 'clip-path 0.4s'
              }}
            >
              <p className="text-[#010101] uppercase font-bold text-[8vw] leading-[8vw] m-0 relative z-[1]">
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
    <section id ="why me?" className="bg-black pb-40 relative w-full overflow-hidden">
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