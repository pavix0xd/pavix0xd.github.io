import { FaDiscord, FaTwitter, FaYoutube, FaMedium, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  { href: "https://www.linkedin.com/in/minindu-suriyapperuma/", icon: <FaLinkedin /> },
  { href: "https://github.com/pavix0xd", icon: <FaGithub /> },
  { href: "https://www.instagram.com/pavix.___/", icon: <FaInstagram /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-yellow-300 py-4 text-black">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          © MININDU 2025. All rights reserved
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="#hero"
              rel="noopener noreferrer"
              className="text-black transition-colors duration-500 ease-in-out hover:text-violet-300"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#hero"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          To top
        </a>
      </div>
    </footer>
  );
};

export default Footer;