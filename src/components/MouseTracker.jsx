import { useRef, useEffect, useState } from 'react';
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'; 
/* eslint-enable no-unused-vars */
import useMousePosition from '../hooks/useMousePosition';  // Custom hook to track mouse position

export default function MouseTracker() {
  // Get current mouse coordinates from custom hook
  const { x, y } = useMousePosition();

  // Ref to the animated ball element (not used directly here but can be useful)
  const ballRef = useRef(null);

  // State to hold ball size in pixels (calculated from rem)
  const [ballSizePx, setBallSizePx] = useState(0);

  // Desired ball size in rem units
  const ballSizeRem = 2;

  // Maximum ball size in pixels to prevent it from getting too large on big screens
  const maxBallSizePx = 32;

  // Effect to calculate the ball size in pixels based on current root font size (responsive)
  useEffect(() => {
    // Function to update ball size dynamically on window resize or mount
    const updateBallSize = () => {
      // Get root font size 
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);

      // Calculate new size in px, but cap it at maxBallSizePx
      const newSize = Math.min(ballSizeRem * rootFontSize, maxBallSizePx);

      // Update state with new pixel size
      setBallSizePx(newSize);
    };

    // Call immediately on mount to set initial size
    updateBallSize();

    // Add event listener to update size when window is resized
    window.addEventListener('resize', updateBallSize);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', updateBallSize);
  }, []);

  return (
    <div className="relative h-screen w-screen bg-gray-100 cursor-none overflow-hidden">
      {/* Animated ball that follows the mouse pointer */}
      <motion.div
        ref={ballRef}
        className="absolute rounded-full bg-blue-500 pointer-events-none z-50"
        aria-hidden="true"  // Mark as decorative for screen readers
        animate={{
          x: x,  // Animate X position to mouse X
          y: y,  // Animate Y position to mouse Y
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }} // Smooth spring animation
        style={{
          width: `${ballSizePx}px`,   // Dynamic width
          height: `${ballSizePx}px`,  // Dynamic height (same as width)
          borderRadius: "50%",        // Make it a perfect circle
          position: "absolute",
          transform: "translate(-50%, -50%)", // Center the ball at cursor position
        }}
      />

      {/* Centered instruction text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800">Move your cursor</h1>
      </div>
    </div>
  );
}
