import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";
import AboutText from "./AboutText.jsx";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    useGSAP(() => {
        const clipAnimation = gsap.timeline({
            scrollTrigger: {
                trigger: "#clip",
                start: "center center",
                end: "+=800 center",
                scrub: 0.5,
                pin: true,
                pinSpacing: true,
            },
        });

        clipAnimation.to(".mask-clip-path", {
            width: "100vw",
            height: "100vh",
            borderRadius: 0,
        });
    });

    return (
        <div id="about" className="min-h-screen w-screen">
            <div className="relative mt-16 flex flex-col items-center gap-4">

                {/*<AnimatedTitle*/}
                {/*    title="Disc<b>o</b>ver the world's <br /> largest shared <b>a</b>dventure"*/}
                {/*    containerClass="mt-5 !text-black text-center"*/}
                {/*/>*/}

                <AboutText/>

                <div className="about-subtext">
                    <p>Minindu Suriyapperuma - Frontend ft. Full stack developer.</p>
                    <p className="text-gray-500">
                        I'm just a chill developer who loves to create cool stuff. Is there 
                        anything more interesting than watching my Figma wireframes come to life? I don't think so. <br/>
                        Web? Mobile? Anything in with visuals? I'm your guy.
                    </p>
                </div>
            </div>

            <div className="h-dvh w-screen" id="clip">
                <div className="mask-clip-path about-image">
                    <img
                        src="img/about.jpg"
                        alt="Background"
                        className="absolute left-0 top-0 size-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default About;