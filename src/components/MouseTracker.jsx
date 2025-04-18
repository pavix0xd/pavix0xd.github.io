import { useRef, useEffect } from 'react';
import useMousePosition from '../hooks/useMousePosition'; // Ensure this hook exists and is correctly imported

export default function MouseTracker() {
    const { x, y } = useMousePosition();
    const ballRef = useRef(null);
    const ballSizeRem = 2; // Adjust as needed
    const maxBallSizePx = 32; // Adjust as needed

    useEffect(() => {
        if (ballRef.current && typeof x === 'number' && typeof y === 'number') {
            const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const ballSizePx = Math.min(ballSizeRem * rootFontSize, maxBallSizePx);

            ballRef.current.style.width = `${ballSizePx}px`;
            ballRef.current.style.height = `${ballSizePx}px`;
            ballRef.current.style.left = `${x}px`;
            ballRef.current.style.top = `${y}px`;
            ballRef.current.style.transform = 'translate(-50%, -50%)';
        }
    }, [x, y]);

    return (
        <div className="relative h-screen w-screen bg-gray-100 cursor-none">
            <div
                ref={ballRef}
                className="absolute rounded-full bg-blue-500 pointer-events-none"
                aria-hidden="true" // Accessibility improvement
                style={{}} // Styles will be applied in useEffect
            ></div>
            {/* Additional content can go here */}
        </div>
    );
}