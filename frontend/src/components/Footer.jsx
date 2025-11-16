import React from "react";
import { FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-zinc-300 mt-10">
      <div className="max-w-7xl mx-auto p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* COPYRIGHT */}
        <h1 className="font-serif text-lg md:text-xl text-center md:text-left">
          © All Rights Reserved 2025
        </h1>

        {/* SOCIAL ICONS */}
        <div className="flex gap-5 text-3xl justify-center">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-800 transition"
          >
            <FaInstagram />
          </a>

          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-800 transition"
          >
            <FaTwitter />
          </a>
        </div>

      </div>
    </div>
  );
};

export default Footer;
