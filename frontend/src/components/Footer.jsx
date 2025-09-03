import React from 'react'
import { FaLinkedin, FaInstagram ,FaTwitter } from "react-icons/fa";
const Footer = () => {
    return (
        <div>
            <div className='flex justify-between p-10 bg-zinc-300'>
                <h1 className='font-serif text-xl'>All Right Reserve Of 2025</h1>

                <div className="flex gap-4 text-3xl">
                    <a
                        href="https://www.linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://www.instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-700"
                    >
                        <FaInstagram />
                    </a>
                    <a
                        href="https://www.Twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-500 hover:text-zinc-700"
                    >
                        <FaTwitter />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Footer
