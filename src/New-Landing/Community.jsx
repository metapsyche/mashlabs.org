import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

const Community = ({ landingContent, creatorLink, collectorLink }) => {
  const headingStyle = {
    textShadow: "0 4px 80px rgba(255, 255, 255, 0.30)",
    letterSpacing: "-3.52px",
    fontFamily: "'FFF Acid Grotesk', sans-serif",
  };

  // Get creators section safely
  const creatorsData = landingContent?.documents?.find(
    doc => doc.sectionId === "creatorsSection"
  );

  // Get collectors section safely
  const collectorsData = landingContent?.documents?.find(
    doc => doc.sectionId === "collectorsSection"
  );

  // Dynamic titles
  const mainTitle = creatorsData?.content?.title || "Create the Rare. Own the Original";
  const creatorsSubtitle = creatorsData?.content?.subtitle || "Creators";
  const collectorsSubtitle = collectorsData?.content?.subtitle || "Collectors";

  // Safe fallback arrays
  const creatorItems = creatorsData?.content?.items || [];
  const collectorItems = collectorsData?.content?.items || [];

  // Safe text handling
  const collectorText1 = collectorItems[0]?.description || "";
  const collectorText2 = collectorItems[1]?.description || "";

  const parts = collectorText1.split("Explore page");
  const section = collectorText2.split("Mashboard");

  return (
    <div className="w-full pt-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* HEADING */}
        <h1
          style={headingStyle}
          className="mx-auto max-w-[600px] text-white text-[45px] md:text-[78px] font-[500] leading-[1] text-center mb-15 md:mb-25"
        >
          {mainTitle}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* ================= CREATORS CARD ================= */}
          <a
            href={creatorLink}
            className="group relative overflow-hidden rounded-[20px] p-6 lg:p-12 border border-white/5 cursor-pointer block transition-all duration-700 hover:scale-[1.02]"
          >
            {/* Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img
                src="/gif/bg-gif-6.gif"
                className="w-full h-full object-cover opacity-30 mix-blend-screen"
                alt="Creators Background"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#000001] to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-500 bg-gradient-to-b from-[#F035CC] to-[#1D0E18]" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex flex-wrap xl:flex-nowrap items-center gap-3 lg:gap-4 mb-8 lg:mb-10">
                <h2 className="text-white text-[32px] sm:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight font-['FFF_Acid_Grotesk'] break-words">
                  {creatorsSubtitle}
                </h2>
                <div className="shrink-0 w-[72px] h-[36px] sm:w-20 sm:h-10 xl:w-28 xl:h-14 rounded-full overflow-hidden bg-black/50 border border-white/10">
                  <img
                    src="/gif/creators.gif" 
                    alt="Creators"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-8 mb-12 flex-grow">
                {creatorItems.map((item, idx) => (
                    <p
                      key={idx}
                      className="text-[#FFFFFFCC] text-[14px] md:text-[18px] font-[400] max-w-sm leading-relaxed group-hover:text-white transition-colors"
                    >
                      {item.description}
                    </p>
                  )
                )}
              </div>

              {/* BUTTON */}
              <div className="inline-flex w-[190px] h-[48px] font-[600] justify-center items-center gap-[6px] rounded-[10px] border border-white/40 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
                Join as Artist/ Musician
                <FiArrowUpRight className="text-current text-lg transition-transform duration-300 group-hover:rotate-45" />
              </div>
            </div>
          </a>

          {/* ================= COLLECTORS CARD ================= */}
          <a
            href={collectorLink}
            className="group relative overflow-hidden rounded-[20px] p-6 lg:p-12 border border-white/5 cursor-pointer block transition-all duration-700 hover:scale-[1.02]"
          >
            {/* Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img
                src="/gif/bg-gif-6.gif"
                className="w-full h-full object-cover opacity-30 mix-blend-screen"
                alt="Collectors Background"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#000001] to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-80 transition-opacity duration-500 bg-gradient-to-b from-[#00DA6C] to-[#1C1F1D]" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex flex-wrap xl:flex-nowrap items-center gap-3 lg:gap-4 mb-8 lg:mb-10">
                <h2 className="text-white text-[32px] sm:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tight font-['FFF_Acid_Grotesk'] break-words">
                  {collectorsSubtitle}
                </h2>
                <div className="shrink-0 w-[72px] h-[36px] sm:w-20 sm:h-10 xl:w-28 xl:h-14 rounded-full overflow-hidden bg-black/50 border border-white/10">
                  <img
                    src="/gif/collectors.gif"
                    alt="Collectors"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-8 mb-12 flex-grow">
                <p className="text-[#FFFFFFCC] text-[14px] md:text-[18px] font-[400] max-w-sm leading-relaxed group-hover:text-white transition-colors">
                  {parts[0]}{" "}
                  {/*<span className="text-white font-medium border-b border-white/20">
                    Explore page
                  </span>*/}{" "}
                  {parts[1]}
                </p>

                <p className="text-[#FFFFFFCC] text-[14px] md:text-[18px] font-[400] max-w-sm leading-relaxed group-hover:text-white transition-colors">
                  {section[0]}{" "}
                  {/*<span className="text-white font-medium border-b border-white/20">
                    Mashboard
                  </span>*/}{" "}
                  {section[1]}
                </p>

                <p className="text-[#FFFFFFCC] text-[14px] md:text-[18px] font-[400] max-w-sm leading-relaxed group-hover:text-white transition-colors">
                  {collectorItems[2]?.description}
                </p>
              </div>

              {/* BUTTON */}
              <div className="inline-flex w-[190px] h-[48px] font-[600] justify-center items-center gap-[6px] rounded-[10px] border border-white/40 text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
                Join as Fan/ Collector
                <FiArrowUpRight className="text-current text-lg transition-transform duration-300 group-hover:rotate-45" />
              </div>
            </div>
          </a>

        </div>
      </div>
    </div>
  );
};

export default Community;
