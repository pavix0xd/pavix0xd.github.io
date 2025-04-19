import { useRef, useEffect, useState } from 'react';
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';  // Suppress unused import warning
/* eslint-enable no-unused-vars */
import useMousePosition from '../hooks/useMousePosition'; // Ensure this exists

export default function MouseTracker() {
  const { x, y } = useMousePosition();
  const ballRef = useRef(null);
  const [ballSizePx, setBallSizePx] = useState(0);

  const ballSizeRem = 2;        // Base size in rem
  const maxBallSizePx = 32;     // Max size in pixels

  // Update ball size on load and window resize
  useEffect(() => {
    const updateBallSize = () => {
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const newSize = Math.min(ballSizeRem * rootFontSize, maxBallSizePx);
      setBallSizePx(newSize);
    };

    updateBallSize();
    window.addEventListener('resize', updateBallSize);
    return () => window.removeEventListener('resize', updateBallSize);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-gray-100 cursor-none overflow-hidden">
      {/* Animated Ball */}
      <motion.div
        ref={ballRef}
        className="absolute rounded-full bg-blue-500 pointer-events-none z-50"
        aria-hidden="true"
        animate={{ x, y }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        style={{
          width: `${ballSizePx}px`,
          height: `${ballSizePx}px`,
          borderRadius: "50%",
          position: "absolute",
          transform: "translate(-50%, -50%)",
        }}
      />
      
      {/* You can render children or other page content here */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">Move your cursor</h1>
      </div>
    </div>
  );
}
