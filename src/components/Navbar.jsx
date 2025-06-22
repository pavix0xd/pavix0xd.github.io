import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "./Button";

// Navigation items for the navbar
const navItems = ["About", "Projects", "Why me?"];

const NavBar = () => {
  // State for toggling audio playback and visual indicator bars
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // State for tracking if navbar background and blur should be applied
  const [isScrolled, setIsScrolled] = useState(false);

  // State to control mobile menu open/close
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Refs for the audio element, navbar container, and mobile menu container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Current vertical scroll position of the window
  const { y: currentScrollY } = useWindowScroll();

  // State to control visibility of navbar 
  const [isNavVisible, setIsNavVisible] = useState(true);

  // State to keep track of last scroll position 
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio playback and visual indicator bars on button click
  const toggleAudioIndicator = () => {
    const newState = !isAudioPlaying;
    setIsAudioPlaying(newState);
    setIsIndicatorActive(newState);
  };

  // Toggle the mobile menu open/close state
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a navigation item is clicked (mobile only)
  const handleNavItemClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Effect to play or pause the audio element based on isAudioPlaying state
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play().catch(e => console.log("Audio play failed:", e));
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Effect to detect scroll direction and toggle navbar visibility & styles
  useEffect(() => {
    if (currentScrollY === 0) {
      // At top of page - show navbar and remove floating styles
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
      setIsScrolled(false);
    } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
      // Scrolling down past 100px - hide navbar, add floating styles, close mobile menu
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
      setIsScrolled(true);
      setIsMobileMenuOpen(false);
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up - show navbar and keep floating styles
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
      setIsScrolled(true);
    }

    // Update last scroll position to current
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Animate navbar sliding up/down and opacity change using GSAP on isNavVisible change
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // Animate mobile menu open/close with GSAP
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        // Animate menu sliding down and fade in
        gsap.to(mobileMenuRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Animate menu sliding up and fade out
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
      {/* Navbar container fixed at top with dynamic background and blur on scroll */}
      <div
        ref={navContainerRef}
        className={clsx(
          "fixed inset-x-0 top-0 z-50 h-16 transition-all duration-700 sm:inset-x-6 border border-transparent",
          {
            "bg-black/80 backdrop-blur-sm": isScrolled,
          }
        )}
      >
        {/* Navbar content vertically centered */}
        <header className="absolute top-1/2 w-full -translate-y-1/2">
          <nav className="flex size-full items-center justify-between px-4 sm:px-6">
            {/* Logo on the left */}
            <div className="flex items-center gap-4">
              <img src="/img/logo.png" alt="logo" className="w-10" />
            </div>
            
            {/* Desktop navigation links, contact button, and audio toggle */}
            <div className="hidden h-full items-center md:flex">
              {/* Navigation links for desktop */}
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

              {/* Contact Me button with icon */}
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

              {/* Audio toggle button with visual indicator bars */}
              <button
                onClick={toggleAudioIndicator}
                className="ml-6 flex items-center space-x-0.5"
              >
                {/* Hidden audio element for playback */}
                <audio
                  ref={audioElementRef}
                  className="hidden"
                  src="/audio/loop.mp3"
                  loop
                />
                {/* Indicator bars with staggered animation delays */}
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

            {/* Mobile menu toggle button (hamburger / close icon) */}
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

      {/* Mobile menu dropdown, styled similarly to navbar */}
      <div
        ref={mobileMenuRef}
        className={clsx(
          "fixed inset-x-0 top-16 z-40 transition-all duration-300 md:hidden bg-black/80 backdrop-blur-sm",
          {
            // Hide and disable pointer events when menu is closed
            "pointer-events-none invisible opacity-0": !isMobileMenuOpen,
          }
        )}
        style={{ transform: "translateY(-20px)" }}
      >
        <div className="flex flex-col items-center space-y-0 p-4">
          {/* Mobile navigation links */}
          {navItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase()}`}
              className="nav-hover-btn w-full py-3 px-4 text-center text-white"
              onClick={handleNavItemClick}
            >
              {item}
            </a>
          ))}

          {/* Contact Me button for mobile */}
          <div className="w-full px-4 py-3">
            <Button
              id="mobile-contact-me"
              title="Contact Me"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex items-center justify-center gap-1 w-full"
              onClick={() => {
                const section = document.getElementById("contact");
                if (section) {
                  section.scrollIntoView({ behavior: "smooth" });
                }
                handleNavItemClick();
              }}
            />
          </div>

          {/* Audio toggle button in mobile menu */}
          <div className="flex items-center justify-center w-full px-4 py-3">
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
