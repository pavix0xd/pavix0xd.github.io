import { useState } from 'react';
import { motion } from 'framer-motion';
import useMousePosition from "../hooks/useMousePosition";

export default function AboutText() {
    const [isHovered, setIsHovered] = useState(false);
    const { x, y } = useMousePosition();
    const size = isHovered ? 400 : 40;

    return (
        <main className="relative h-screen overflow-hidden px-4">
            {/* Masked hover effect */}
            <motion.div
                className="absolute inset-0 flex items-center bg-[yellow] text-black
                [mask-image:url('/mask.svg')] [mask-repeat:no-repeat] [mask-size:40px] [mask-position:0_0]
                [-webkit-mask-image:url('/mask.svg')] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:40px] [-webkit-mask-position:0_0]
                cursor-default"
                animate={{
                    WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
                    WebkitMaskSize: `${size}px`,
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
            >
                <p
                    className="max-w-[1000px] p-4 sm:p-6 md:p-10 text-[24px] sm:text-[36px] md:text-[48px] lg:text-[64px] leading-tight sm:leading-[44px] md:leading-[56px] lg:leading-[66px] text-[black] text-center"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Curious right? Yeah I build Full - stacks too. Flutter? you guessed correct, Flutter too.<span className="text-[#6F8695]">Not a typical "Hello World!" guy</span> Give me a challenge or a good paycheck and watch the magic happen :3
                </p>
            </motion.div>

            {/* Static body text */}
            <div className="flex items-center justify-center w-full h-full text-[black] cursor-default">
                <p className="max-w-[1000px] p-4 sm:p-6 md:p-10 text-[24px] sm:text-[36px] md:text-[48px] lg:text-[64px] leading-tight sm:leading-[44px] md:leading-[56px] lg:leading-[66px] text-center">
                    I'm a <span className="text-[yellow]">selectively skilled</span> Frontend developer and a UI/UX designer with strong
                    focus on producing high quality & impactful digital experiences while bringing Figma canvases to .com domains.
                </p>
            </div>
        </main>
    );
}
