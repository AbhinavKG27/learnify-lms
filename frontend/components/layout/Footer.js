import Link from "next/link";
import Image from "next/image";

import {
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

import { RiMailFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="border-t border-white/50 bg-white/45 py-10 backdrop-blur-2xl dark:border-white/10 dark:bg-[#050116]/55">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left Section */}
          <Link
            href="/"
            className="flex items-center gap-3 group select-none"
          >
            <div
              className="
                relative w-11 h-11 flex items-center justify-center
                rounded-2xl
                bg-gradient-to-br from-neon-pink via-neon-violet to-purple-600
                shadow-lg shadow-neon-pink/30
                ring-1 ring-white/10
                overflow-hidden
                transition-all duration-300
                group-hover:scale-105
              "
            >
              <Image
                src="/logo.png"
                alt="Learnify logo"
                width={26}
                height={26}
                priority
                className="w-6 h-6 object-contain rounded-full"
              />
            </div>

            <span className="font-display font-bold text-xl tracking-tight leading-none text-text-primary dark:text-text-primary-dark">
              Learnify
            </span>
          </Link>

          {/* Center */}
          <p className="text-sm text-text-secondary dark:text-text-secondary-dark text-center">
            © {new Date().getFullYear()} Learnify.
            Built with Next.js, Node.js & MySQL.
          </p>

          {/* Right Section */}
          <div className="flex items-center gap-5">

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/abhinavkg2004"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-blue-500 dark:text-text-secondary-dark dark:hover:text-blue-400 transition-all duration-300 text-lg"
            >
              <FaLinkedin />
            </a>

            {/* Email */}
            <a
              href="mailto:abhinavkg2004@gmail.com"
              className="text-text-secondary hover:text-red-500 dark:text-text-secondary-dark dark:hover:text-red-400 transition-all duration-300 text-lg"
            >
              <RiMailFill />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/AbhinavKG27"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary dark:text-text-secondary-dark dark:hover:text-white transition-all duration-300 text-lg"
            >
              <FaGithub />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;