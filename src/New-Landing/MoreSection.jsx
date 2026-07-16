import React from 'react';
import { FiArrowUpRight } from "react-icons/fi";

const MoreSection = () => {
  const categories = [
    {
      title: "Audio",
      image: "/gif/bg-gif-5.gif", 
      link: "/audios"
    },
    {
      title: "Visuals",
      image: "/gif/bg-gif-1.gif", 
      link: "/videos"
    },
    {
      title: "Collections",
      image: "/gif/bg-gif-3.gif", 
      link: "/collections"
    }
  ];

  const headingStyle = {
    textShadow: "0 4px 80px rgba(255, 255, 255, 0.30)",
    letterSpacing: "-3.52px",
    fontFamily: "'FFF Acid Grotesk', sans-serif",
  };

  return (
    <div className="relative w-full pt-15 md:pt-25 px-4 md:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADING with Capsule GIF */}
        <div className="flex justify-center items-center gap-4 mb-15 md:mb-25">
          <div className="w-[80px] md:w-[105px] h-[40px] md:h-[65px]  rounded-full overflow-hidden border border-white/20">
             <img src="/gif/more-capsule.gif" alt="capsule" className="w-full h-full object-cover" />
          </div>
          <h2 style={headingStyle} className="text-white text-[45px] md:text-[78px] font-[500] leading-none">
            More
          </h2>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((item, index) => (
            <div 
              //href={item.link}
              //key={index}
              className="group relative h-[350px] md:h-[450px] rounded-3xl overflow-hidden border border-white/10 bg-[#111] transition-all duration-500 hover:border-white/30"
            >
              {/* Card Image with Halftone Effect/Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
              </div>

              {/* Top Arrow Icon 
              <div className="absolute top-6 right-6 z-20">
                <div className="bg-white p-2 rounded-lg transform group-hover:rotate-45 transition-transform duration-300">
                  <FiArrowUpRight className="text-black text-xl md:text-2xl" />
                </div>
              </div>*/}

              {/* Bottom Title */}
              <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8 right-6 md:right-8 z-20">
                <h3 className="text-white text-[32px] sm:text-4xl md:text-[40px] lg:text-5xl font-medium tracking-tight font-['FFF_Acid_Grotesk'] break-words">
                  {item.title}
                </h3>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 z-10 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default MoreSection;
