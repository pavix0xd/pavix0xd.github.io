import {useEffect, useRef, useState} from "react";
import Button from "./Button.jsx";
import { MdDescription } from "react-icons/md";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;
    const nextVideoRef = useRef(null);
    const headingRef = useRef(null);
    const blackHeadingRef = useRef(null);

    const videoData = [
        {
            index: 1,
            heading: "FRONTEND DEVELOPER",
            subheading: "MinindU",
            description: "Visual magics on your way!!"
        },
        {
            index: 2,
            heading: "GAMER",
            subheading: "MinindU",
            description: "Visual magics on your way!!"
        },
        {
            index: 3,
            heading: "EXPLORER",
            subheading: "MinindU",
            description: "Visual magics on your way!!"
        },
        {
            index: 4,
            heading: "BROTHER",
            subheading: "MinindU",
            description: "Visual magics on your way!!"
        }
    ];

    const currentVideoData = videoData.find(item => item.index === currentIndex) || videoData[0];
    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleVideoLoadedData = () => {
        setLoadedVideos((prev) => prev + 1);
    };

    const handleMiniVideoClick = () => {
        setHasClicked(true);
        
        // Animate headings out
        gsap.to([headingRef.current, blackHeadingRef.current], {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                setCurrentIndex(upcomingVideoIndex);
                // Animate new headings in
                gsap.to([headingRef.current, blackHeadingRef.current], {
                    opacity: 1,
                    duration: 0.5
                });
            }
        });
    };

    useEffect(() => {
        if(loadedVideos === totalVideos - 1) {
            setIsLoading(false);
        }
    }, [loadedVideos]);

    useGSAP(() => {
        if (hasClicked) {
            gsap.set("#next-video", { visibility: "visible" });
            gsap.to("#next-video", {
                transformOrigin: "center center",
                scale: 1,
                width: "100%",
                height: "100%",
                duration: 1,
                ease: "power1.inOut",
                onStart: () => nextVideoRef.current.play(),
            });
            gsap.from("#current-video", {
                transformOrigin: "center center",
                scale: 0,
                duration: 1.5,
                ease: "power1.inOut",
            });
        }
    }, { dependencies: [currentIndex], revertOnUpdate: true });

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
            borderRadius: "0% 0% 40% 10%",
        });
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0% 0% 0% 0%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
    });

    const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

    return (
        <div id="hero" className="relative h-dvh w-screen overflow-x-hidden">
            {isLoading && (
                <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    <div className="three-body">
                        <div className="three-body__dot"/>
                        <div className="three-body__dot"/>
                        <div className="three-body__dot"/>
                    </div>
                </div>
            )}

            <div id="video-frame" className="relative z-10 h-dvh w-screen overflow-x-hidden rounded-lg bg-blue-75">
                <div>
                    <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
                        <div onClick={handleMiniVideoClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                            <video
                                ref={nextVideoRef}
                                src={getVideoSrc(upcomingVideoIndex)}
                                loop
                                muted
                                id="current-video"
                                className="size-64 origin-center scale-150 object-cover object-center"
                                onLoadedData={handleVideoLoadedData}
                            />
                        </div>
                    </div>

                    <video
                        ref={nextVideoRef}
                        src={getVideoSrc(currentIndex)}
                        loop
                        muted
                        id="next-video"
                        className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                        onLoadedData={handleVideoLoadedData}
                    />

                    <video
                        src={getVideoSrc(currentIndex)}
                        autoPlay
                        loop
                        muted
                        className="absolute left-0 top-0 size-full object-cover object-center"
                        onLoadedData={handleVideoLoadedData}
                    />
                </div>

                <h1 
                    ref={headingRef}
                    className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75"
                >
                    <b>{currentVideoData.heading}</b>
                </h1>

                <div className="absolute left-0 top-0 z-40 size-full">
                    <div className="mt-40 px-5 sm:px-10">
                        <h1 
                            className="special-font hero-heading1 text-blue-100"
                            dangerouslySetInnerHTML={{ __html: currentVideoData.subheading }}
                        />
                        <p className="mb-5 max-w-64 font-robert-regular text-blue-100 whitespace-pre-line">
                            {currentVideoData.description}
                        </p>
                        <div className="absolute bottom-60 left-10">
                        <Button
                            id="resume" 
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
                <b>{currentVideoData.heading}</b>
            </h1>
        </div>
    );
};

export default Hero;