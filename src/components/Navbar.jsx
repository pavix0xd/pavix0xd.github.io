import React, { useRef } from 'react';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';

const navItems = ['About', 'Projects', 'Skills', 'Contact'];

export default function Navbar() {
  const navContainerRef = useRef(null);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 -translate-y-1/2 w-full">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo Section */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />

            {/* Contact Me Button */}
            <Button
              id="contact-me"
              title="Contact Me"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 text-black md:flex hidden items-center gap-1"
            />
          </div>

            <div className='flex h-full items-center'>
                <div className='hidden md:block'>
                    {navItems.map((item) => (
                        <a className='nav-hover-btn'>
                            {item}
                        </a>
                    ))}    
                </div>
            </div>
        </nav>
      </header>
    </div>
  );
}
