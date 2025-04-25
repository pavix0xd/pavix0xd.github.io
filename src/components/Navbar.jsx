import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "./Button";

const navItems = ["About", "Projects", "Why me?"];

const NavBar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    const newState = !isAudioPlaying;
    setIsAudioPlaying(newState);
    setIsIndicatorActive(newState);
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking on a nav item
  const handleNavItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play().catch(e => console.log("Audio play failed:", e));
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
      setIsScrolled(false);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
      setIsScrolled(true);
      setIsMobileMenuOpen(false); // Close mobile menu when scrolling down
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
      setIsScrolled(true);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // Animation for mobile menu
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          y: -20,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <div
        ref={navContainerRef}
        className={clsx(
          "fixed inset-x-0 top-0 z-50 h-16 transition-all duration-700 sm:inset-x-6",
          {
            "bg-black/80 backdrop-blur-sm": isScrolled,
          }
        )}
      >
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between px-4 sm:px-6">
            {/* Logo and Name */}
            <div className="flex items-center gap-4">
              <img src="/img/logo.png" alt="logo" className="w-10" />
            </div>
            
            {/* Desktop Navigation Links and Audio Button */}
            <div className="hidden h-full items-center md:flex">
              <div className="hidden md:block">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="nav-hover-btn px-4 py-2"
                  >
                    {item}
                  </a>
                ))}
              </div>
              <div>
                <Button
                  id="contact-me"
                  title="Contact Me"
                  rightIcon={<TiLocationArrow />}
                  containerClass="bg-yellow-300 flex items-center justify-center gap-1 ml-4"
                  onClick={() => {
                    const section = document.getElementById("contact");
                    if (section) {
                      section.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                />
              </div>

              <button
                onClick={toggleAudioIndicator}
                className="ml-6 flex items-center space-x-0.5"
              >
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {[1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={clsx("indicator-line", {
                      active: isIndicatorActive,
                    })}
                    style={{
                      animationDelay: `${bar * 0.1}s`,
                    }}
                  />
                ))}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="flex items-center justify-center p-2 md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6 text-white" />
              ) : (
                <FiMenu className="h-6 w-6 text-white" />
              )}
            </button>
          </nav>
        </header>
      </div>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={clsx(
          "fixed inset-x-0 top-16 z-40 bg-black/90 backdrop-blur-md transition-all duration-300 md:hidden",
          {
            "pointer-events-none invisible opacity-0": !isMobileMenuOpen,
          }
        )}
        style={{ transform: "translateY(-20px)" }}
      >
        <div className="flex flex-col items-center space-y-4 p-6">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="w-full py-3 text-center text-lg text-white hover:text-yellow-300"
              onClick={handleNavItemClick}
            >
              {item}
            </a>
          ))}
          <Button
            id="mobile-contact-me"
            title="Contact Me"
            rightIcon={<TiLocationArrow />}
            containerClass="bg-yellow-300 flex items-center justify-center gap-1 mt-2 w-full"
            onClick={() => {
              const section = document.getElementById("contact");
              if (section) {
                section.scrollIntoView({ behavior: "smooth" });
              }
              handleNavItemClick();
            }}
          />
          <div className="flex items-center justify-center pt-4">
            <button
              onClick={toggleAudioIndicator}
              className="flex items-center space-x-0.5"
            >
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;