import { useState } from 'react';
/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
/* eslint-enable no-unused-vars */
import useMousePosition from "../hooks/useMousePosition";


export default function AboutText() {
  const [isHovered, setIsHovered] = useState(false); // To control hover state
  const { x, y } = useMousePosition(); // Custom hook returns mouse x/y

  // changes the mask size depending on whether user is hovering or not
  const size = isHovered ? window.innerWidth * 0.3 : 40;

  return (
    <main className="relative min-h-[80vh] w-full overflow-hidden px-4 flex flex-col justify-center items-center">

      {/* masked hover animation. Uses a .svg mask that follows the mouse */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-[yellow] text-black
          [mask-image:url('/mask.svg')] [mask-repeat:no-repeat] [mask-size:40px] [mask-position:center]
          [-webkit-mask-image:url('/mask.svg')] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:40px] [-webkit-mask-position:center]
          pointer-events-none z-20"
        
        // Animate the mask's position and size as the user moves the mouse
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
          opacity: isHovered ? 1 : 0, // Only visible during hover
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
      >

        <AnimatePresence>
          {/* text when hovered */}
          {isHovered && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="max-w-[1000px] p-4 text-center text-[clamp(1.5rem,4vw,4rem)] leading-tight text-black"
            >
              Curious right? Yeah I build Full-stacks too. Flutter? you guessed it — Flutter too.
              <span className="text-[#6F8695]"> Not a typical "Hello World!" guy.</span>
              Give me a challenge or a good paycheck and watch the magic happen :3
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* always-visible main text */}
      <motion.div 
        className="relative z-10 flex items-center justify-center w-full"
        initial={{ opacity: 0, y: 30 }} // Fade-in on load
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p 
          onMouseEnter={() => setIsHovered(true)} // Show hidden layer
          onMouseLeave={() => setIsHovered(false)} // Hide it again
          className="max-w-[1000px] p-4 text-center text-[clamp(1.5rem,4vw,4rem)] leading-tight text-black cursor-default"
        >
          I'm a <span className="text-[yellow]">selectively skilled</span> Frontend developer and a UI/UX designer with strong
          focus on producing high quality & impactful digital experiences while bringing Figma canvases to .com domains.
        </p>
      </motion.div>

    </main>
  );
}
