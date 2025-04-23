import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

// Move VideoCard outside of BentoTilt as a separate component
export const VideoCard = ({ src, loop, muted }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Try to autoplay when component mounts
    const playPromise = videoRef.current?.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        // Autoplay was prevented, we'll handle this in the intersection observer
        console.log("Autoplay prevented:", error);
      });
    }

    // Set up intersection observer for mobile devices
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            videoRef.current?.play().catch(e => {
              console.log("Playback prevented:", e);
            });
          } else {
            videoRef.current?.pause();
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="size-full">
      <video 
        ref={videoRef}
        src={src}
        loop={loop}
        muted={muted}
        playsInline
        className="size-full object-cover"
      />
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon, isVisit, buttonLink }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  const handleButtonClick = () => {
    if (buttonLink) {
      window.open(buttonLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="relative size-full">
      <div className="absolute left-0 top-0 size-full">
        <img
          src={src}
          alt={title}
          className="absolute left-0 top-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/70"></div> 
      </div>
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleButtonClick}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-yellow"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}

      {isVisit && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleButtonClick}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-yellow"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">Visit</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Projects = () => (
  <section id="projects" className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
        Exploring My Digital Universe
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
        Every project here tells a story - of late-night coding sessions, 
        breakthrough moments, and lessons learned. They represent my evolution 
        as a developer and designer, from foundational web applications to 
        cutting-edge interactive experiences. Each piece demonstrates my 
        versatility in handling different technologies while maintaining a 
        cohesive design philosophy that balances form and function. This is 
        more than a portfolio; it's a map of my professional growth.
        </p>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-70 w-full overflow-hidden rounded-md md:h-[65vh]">
      <BentoCard
            src="img/ele.png"
            title={
              <>
                Ele <b>EYE</b>
              </>
            }
            description="An AI - powered Elephant Alert and Early Warning System for rural villagers and tourists to avoid human-wildlife conflict."
            isVisit
            buttonLink="https://www.eleye.site/"
          />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="img/plane.jpg"
            title={
              <>
                Flight booking System
              </>
            }
            description="An terminal - based Plane seat management system built using pure Java"
            isVisit
            buttonLink="https://github.com/pavix0xd/PlaneManagementSystem"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
        <BentoCard
            src="img/phl.jpg"
            title={
              <>
                Play<br/>Hamster
              </>
            }
            description="PlaYHamsteR is a solo-built platform designed to empower modders and gamers by providing a streamlined space to share, discover, and collaborate on game modifications and digital assets."
            isComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="img/pacman.jpg"
            title={
              <>
                Pacman
              </>
            }
            description="A Pacman clone made with pure Java"
            isVisit
            buttonLink="https://github.com/pavix0xd/PacMan"
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-yellow-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
              <b>More coming soon</b>
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="border-hsla h-[50vh] w-full overflow-hidden rounded-md md:h-full">
          <VideoCard 
            src="videos/b&y.mp4"
            loop
            muted
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Projects;