import React from 'react';

const About = () => {
    return (
        <div id = "about" className = "min-h-screen w-screen">
            <div className="relative mb-0 mt-36 flex flex-col items-center gap-5">
                <h2 className="font-general text-sm uppercase md:text-[10px]">
                   This is Abut section {/*Edit this later*/}
                </h2>

                <div className="mt-5 text-center text-4xl uppercase leading-[0.8] md:text-[6rem]">
                    Welcome to the About Me!
                </div>
            </div>
            
        </div>
    );
};

export default About;