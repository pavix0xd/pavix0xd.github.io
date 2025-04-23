import { useRef, useState } from "react";
import Button from "./Button.jsx";
import { MdDescription } from "react-icons/md";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    
    const totalImages = 4;
    const nextImageRef = useRef(null);
    const headingRef = useRef(null);
    const blackHeadingRef = useRef(null);

    const imageData = [
        {
            index: 1,
            heading: "FRONTEND DEVELOPER",
            subheading: "MinindU",
            description: <i>"Visual magics on your way!"</i>
        },
        {
            index: 2,
            heading: "GAMER",
            subheading: "MinindU",
            description: <i>"Visual magics on your way!"</i>
        },
        {
            index: 3,
            heading: "EXPLORER",
            subheading: "MinindU",
            description: <i>"Visual magics on your way!"</i>
        },
        {
            index: 4,
            heading: "BROTHER",
            subheading: "MinindU",
            description: <i>"Visual magics on your way!"</i>
        }
    ];

    const currentImageData = imageData.find(item => item.index === currentIndex) || imageData[0];
    const upcomingImageIndex = (currentIndex % totalImages) + 1;

    const handleMiniImageClick = () => {
        setHasClicked(true);
        
        // Animate headings out
        gsap.to([headingRef.current, blackHeadingRef.current], {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                setCurrentIndex(upcomingImageIndex);
                // Animate new headings in
                gsap.to([headingRef.current, blackHeadingRef.current], {
                    opacity: 1,
                    duration: 0.5
                });
            }
        });
    };

    useGSAP(() => {
        if (hasClicked) {
            gsap.set("#next-image", { visibility: "visible" });
            gsap.to("#next-image", {
                transformOrigin: "center center",
                scale: 1,
                width: "100%",
                height: "100%",
                duration: 1,
                ease: "power1.inOut"
            });
            gsap.from("#current-image", {
                transformOrigin: "center center",
                scale: 0,
                duration: 1.5,
                ease: "power1.inOut",
            });
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true });

    useGSAP(() => {
        gsap.set("#image-frame", {
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
            borderRadius: "0% 0% 40% 10%",
        });
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

    const getImageSrc = (index) => `img/hero-${index}.jpeg`;

    return (
        <div id="hero" className="relative h-dvh w-screen overflow-x-hidden">
            <div id="image-frame" className="relative z-10 h-dvh w-screen overflow-x-hidden rounded-lg bg-blue-75">
                <div>
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div 
                            onClick={handleMiniImageClick} 
                            className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
                        >
                            <img
                                ref={nextImageRef}
                                src={getImageSrc(upcomingImageIndex)}
                                id="current-image"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                alt={`Hero image ${upcomingImageIndex}`}
                            />
                        </div>
                    </div>

                    <img
                        ref={nextImageRef}
                        src={getImageSrc(currentIndex)}
                        id="next-image"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        alt={`Next hero image`}
                    />

                    <img
                        src={getImageSrc(currentIndex)}
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        alt={`Main hero image ${currentIndex}`}
                    />
                </div>

                <h1 
                    ref={headingRef}
                    className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75"
                >
                    <b>{currentImageData.heading}</b>
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-40 px-5 sm:px-10">
                        <h1 
                            className="special-font hero-heading1 text-blue-100"
                            dangerouslySetInnerHTML={{ __html: currentImageData.subheading }}
                        />
                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100 whitespace-pre-line">
                            {currentImageData.description}
                        </p>
                        <div className="absolute bottom-60 left-10">
                            <Button
                                id="resume"
                                href="https://drive.google.com/drive/folders/16zQk0eQ0cJsWwyBAFY45QRGgQo_3FzfI?usp=drive_link"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Resume"
                                leftIcon={<MdDescription/>}
                                containerClass="bg-yellow-300 flex-center gap-1"
                            />
                        </div>
                    </div>
                </div>
            </div>

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