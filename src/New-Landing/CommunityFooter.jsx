import React from "react";
import { FaXTwitter, FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa6";
import { FiArrowUpRight } from "react-icons/fi";

const CommunityFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full pt-6 md:pt-25 py-4 px-4 md:px-8">
      {/* Wrapper to create the white card look with navbar-like margins */}
      <div className="relative w-full bg-white rounded-3xl overflow-hidden flex flex-col min-h-[380px] md:min-h-[450px]">
        
        {/* 1. Side GIF with Gradient Fade to Right */}
        <div className="absolute left-0 top-0 bottom-0 w-full md:w-[50%] pointer-events-none z-0">
          <div className="relative w-full h-full">
            <img 
              src="/gif/featured-gif.gif" 
              alt="Artistic Side" 
              className="w-full h-full object-contain object-left"
            />
            {/* Gradient Overlay to fade opacity from left to right */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-white"></div>
          </div>
        </div>

        {/* 2. Main Content Container */}
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 pt-10 md:pt-14 pb-8">
          <h2 className="text-[#010101] text-[35px] md:text-[45px] font-[500] tracking-tight mb-6 font-['FFF_Acid_Grotesk'] leading-none text-center">
            Join The Community
          </h2>

          {/* Form Container */}
          <div className="w-full max-w-[420px] flex flex-col items-center gap-8">
            <div className="flex items-center gap-6 md:gap-8 text-black">
              <a href="https://twitter.com/mashlabs_xyz" target="_blank" rel="noreferrer" className="text-black hover:scale-110 transition-transform">
                <FaXTwitter size={30} className="text-black"/>
              </a>
              <a href="https://www.instagram.com/mashlabs_xyz/" target="_blank" rel="noreferrer" className="text-black hover:scale-110 transition-transform">
                <FaInstagram size={30} className="text-black"/>
              </a>
              {/*<a href="https://discord.gg/zvrDXQWRvQ" target="_blank" rel="noreferrer" className="text-black hover:scale-110 transition-transform">
                <FaDiscord size={30} className="text-black"/>
              </a>*/}
              <a 
                href="https://www.tiktok.com/@mashlabs_xyz" 
                target="_blank" 
                rel="noreferrer" 
                className="text-black hover:scale-110 transition-transform"
              >
                <FaTiktok size={30} className="text-black" />
              </a>
              <a href="mailto:info@mashlabs.xyz" className="text-black hover:scale-110 transition-transform">
                <FaEnvelope size={30} className="text-black"/>
              </a>
            </div>
            {/*<form 
              onSubmit={(e) => e.preventDefault()} 
              className="flex items-center border border-gray-200 rounded-2xl p-1.5 pl-6 focus-within:border-black transition-all shadow-sm bg-white"
            >
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-transparent outline-none text-black placeholder:text-gray-400 text-lg py-2"
              />
              <button 
                type="submit"
                 className="
                  bg-[radial-gradient(100.88%_63.54%_at_50%_-13.54%,_#5C5764_0%,_#010101_100%)]
                  hover:brightness-110
                  text-white
                  px-6 py-3
                  rounded-[10px]
                  flex items-center gap-2
                  font-semibold text-sm
                  transition-all duration-300
                  group shrink-0 cursor-pointer
                  active:scale-95
                "
              >
                Submit
                <FiArrowUpRight className="text-white text-lg group-hover:rotate-45 transition-transform duration-300" />
              </button>
            </form>*/}
          </div>
        </div>

        {/* 3. Bottom Utility Bar */}
        <div className="relative z-10 w-full px-6 md:px-12 pb-6 flex flex-col md:flex-row justify-between items-center gap-6 mt-auto">
          
          {/* Spacer for Desktop Alignment */}
          <div className="hidden md:block w-[150px]"></div>

          {/* Copyright & Links */}
          <div className="flex flex-col items-center gap-1">
            <p className="text-black/40 text-sm font-medium tracking-wide uppercase">
              ©{currentYear} Mash Labs
            </p>
            {/*
            <div className="flex gap-4 text-sm font-[400] tracking-widest">
              <a href="/" className="!text-black hover:opacity-60 transition-opacity">Privacy</a>
              <a href="/" className="!text-black hover:opacity-60 transition-opacity">Terms</a>
            </div>
            */}
          </div>

          {/* Social Icons 
          <div className="flex items-center gap-6 md:gap-8 text-black">
            <a href="https://twitter.com/mashlabs_xyz" target="_blank" rel="noreferrer" className="text-black hover:scale-110 transition-transform">
              <FaXTwitter size={22} className="text-black"/>
            </a>
            <a href="https://www.instagram.com/mashlabs_xyz/" target="_blank" rel="noreferrer" className="text-black hover:scale-110 transition-transform">
              <FaInstagram size={22} className="text-black"/>
            </a>
            <a href="https://discord.gg/zvrDXQWRvQ" target="_blank" rel="noreferrer" className="text-black hover:scale-110 transition-transform">
              <FaDiscord size={22} className="text-black"/>
            </a>
            <a href="mailto:info@mashlabs.xyz" className="text-black hover:scale-110 transition-transform">
              <FaEnvelope size={22} className="text-black"/>
            </a>
          </div>*/}
        </div>
      </div>
    </footer>
  );
};

export default CommunityFooter;