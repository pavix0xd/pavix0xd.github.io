import { useEffect, useRef, useState } from "react";
import Button from "./Button.jsx";
import { MdDescription } from "react-icons/md";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// Register the ScrollTrigger plugin for GSAP animations
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  // State to track which image/section is currently active
  const [currentIndex, setCurrentIndex] = useState(1);
  // Flag to track if user has clicked the mini image (for animation triggers)
  const [hasClicked, setHasClicked] = useState(false);

  const totalImages = 4; // Total number of hero images available

  // References to DOM elements for GSAP animations
  const currentImageRef = useRef(null);  // Mini image (clickable)
  const nextImageRef = useRef(null);     // Large main image that animates in
  const headingRef = useRef(null);       // heading text
  const blackHeadingRef = useRef(null);  // Black heading text for shadow effect

  // Data for each hero image with headings and descriptions
  const imageData = [
    {
      index: 1,
      heading: "FRONTEND DEVELOPER",
      subheading: "Minindu",
      description: <i>"Visual magics on your way!"</i>,
    },
    {
      index: 2,
      heading: "GAMER",
      subheading: "Minindu",
      description: <i>"Visual magics on your way!"</i>,
    },
    {
      index: 3,
      heading: "EXPLORER",
      subheading: "Minindu",
      description: <i>"Visual magics on your way!"</i>,
    },
    {
      index: 4,
      heading: "BROTHER",
      subheading: "Minindu",
      description: <i>"Visual magics on your way!"</i>,
    },
  ];

  // Get the current image data from imageData array based on currentIndex
  const currentImageData =
    imageData.find((item) => item.index === currentIndex) || imageData[0];

  // Calculate the next image index for cycling through images
  const upcomingImageIndex = (currentIndex % totalImages) + 1;

  // Helper function to build image source path given an index
  const getImageSrc = (index) => `img/hero-${index}.jpeg`;

  // Handler for when the mini image is clicked to trigger the transition animation
  const handleMiniImageClick = () => {
    setHasClicked(true); // Indicate that animation should start
    // Fade out headings first
    gsap.to([headingRef.current, blackHeadingRef.current], {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        // After fade out, update the currentIndex to next image
        setCurrentIndex(upcomingImageIndex);
        // Fade headings back in
        gsap.to([headingRef.current, blackHeadingRef.current], {
          opacity: 1,
          duration: 0.5,
        });
      },
    });
  };

  // GSAP animation effect that triggers whenever currentIndex changes
  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        if (hasClicked) {
          // Make next image visible
          gsap.set(nextImageRef.current, { visibility: "visible" });

          // Animate the next (large) image scaling in smoothly
          gsap.to(nextImageRef.current, {
            transformOrigin: "center center",
            scale: 1,
            width: "100%",
            height: "100%",
            duration: 1,
            ease: "power1.inOut",
          });

          // Animate the mini (current) image scaling out from 0 to normal size
          gsap.from(currentImageRef.current, {
            transformOrigin: "center center",
            scale: 0,
            duration: 1.5,
            ease: "power1.inOut",
          });
        }
      });
      return () => ctx.revert(); // Clean up GSAP context on unmount or deps change
    },
    { dependencies: [currentIndex] }
  );

  // GSAP animation for the #image-frame element on scroll with ScrollTrigger
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Set initial clip-path and border radius on image frame
      gsap.set("#image-frame", {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
      });

      // Animate clip-path and border radius on scroll to create a dynamic reveal effect
      gsap.from("#image-frame", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0% 0% 0% 0%",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: "#image-frame",
          start: "center center",
          end: "bottom center",
          scrub: true,
        },
      });
    });
    return () => ctx.revert(); // Cleanup context on unmount
  }, []);

  // Preload all images on component mount to avoid loading delays during transitions
  useEffect(() => {
    imageData.forEach(({ index }) => {
      const img = new Image();
      img.src = getImageSrc(index);
    });
  }, []);

  return (
    <div id="hero" className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="image-frame"
        className="relative z-10 h-dvh w-screen overflow-x-hidden rounded-lg bg-blue-75"
      >
        <div>
          {/* Mini clickable image container */}
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              role="button"
              tabIndex={0}
              onClick={handleMiniImageClick}
              onKeyPress={(e) => e.key === "Enter" && handleMiniImageClick()}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              {/* Mini image that triggers animation */}
              <img
                ref={currentImageRef}
                src={getImageSrc(upcomingImageIndex)}
                id="current-image"
                className="size-64 origin-center scale-150 object-cover object-center"
                alt={`Hero image ${upcomingImageIndex}`}
              />
            </div>
          </div>

          {/* Large image that animates in on click */}
          <img
            ref={nextImageRef}
            src={getImageSrc(currentIndex)}
            id="next-image"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            alt={`Hero image ${currentIndex}`}
          />

          {/* Main hero image visible behind */}
          <img
            src={getImageSrc(currentIndex)}
            className="absolute left-0 top-0 size-full object-cover object-center"
            alt={`Main hero image ${currentIndex}`}
          />
        </div>

        {/* Colored heading text */}
        <h1
          ref={headingRef}
          className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75"
        >
          <b>{currentImageData.heading}</b>
        </h1>

        {/* Large subheading and resume button container */}
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-20 px-5 sm:px-10">
            <br />
            <h1 className="text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-circular-web font-bold text-white tracking-tight leading-[0.8]">
              {currentImageData.subheading}
              <span className="text-yellow-300">.</span>
            </h1>

            {/* Resume button with icon */}
            <div className="absolute bottom-8 left-10">
              <Button
                id="resume"
                href="https://drive.google.com/drive/folders/16zQk0eQ0cJsWwyBAFY45QRGgQo_3FzfI?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                title="Resume"
                leftIcon={<MdDescription />}
                containerClass="bg-yellow-300 flex-center gap-1"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Black shadow heading behind the colored heading */}
      <h1
        ref={blackHeadingRef}
        className="special-font hero-heading absolute bottom-5 right-5 text-black"
      >
        <b>{currentImageData.heading}</b>
      </h1>
    </div>
  );
};

export default Hero;
