{/*import React, { useState, useEffect } from "react";
import "./Starter.scss";
// import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegCopyright } from "react-icons/fa";

export default function Starter() {
  const [showInfo, setShowInfo] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/mashNew.mp4"); // Default video
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const updateView = () => {
      setIsMobileView(window.innerWidth <= 768);
      setVideoSrc(window.innerWidth <= 768 ? "/mash-phone.mp4" : "/mashNew.mp4");
    };

    updateView();
    window.addEventListener("resize", updateView);

    return () => {
      window.removeEventListener("resize", updateView);
    };
  }, []);

  return (
    <main className="Starter-main">
      <video src={videoSrc} autoPlay muted loop playsInline></video>
      <div className="Starter-overlay"></div>

      <div className="Starter-content">
        {!isMobileView && (
          <div className="logo">
            <img
              src="/images/Mash_Highlight_Still.png"
              className="heroImage"
              alt=""
            />
          </div>
        )}
        <div className="Starter-con-below">
          <h1 className="Starter-title">DISCOVER <br />+ INVEST</h1>
          <p className="Starter-subtitle">
            The future of music, art, and community is here.
          </p>
          <p className="Starter-subtitle sub2">
            Request Your Private Beta Invite
          </p>
          <div className="Starter-buttonContainer">
            <a
              // href="https://ge20ditxv6v.typeform.com/to/r2xwqqvo"
               href="https://ge20ditxv6v.typeform.com/to/blDeq6w5"
              className="Starter-button"
            >
              CREATOR
            </a>
            <a
              href="https://ge20ditxv6v.typeform.com/to/kNKjKwGm"
              className="Starter-button"
            >
              COLLECTOR
            </a>
          </div>

          <p className="Starter-partners">
            Partners / Investors get in touch{" "}
            <a
              href="https://ge20ditxv6v.typeform.com/to/BtAQbblI"
              className="Starter-link"
            >
              HERE
            </a>
          </p>
        </div>
      </div>

      {showInfo && (
        <div className="Starter-infoBox">
          <button
            onClick={() => setShowInfo(false)}
            className="Starter-closeButton"
          >
            ✕
          </button>
          <p>
            Mash is a new way to discover up-and-coming musicians and artists
            from around the world, and to be rewarded as an investor as they
            grow in success. Explore, support, and own a piece of the future
            generation of audio and visual media!
          </p>
        </div>
      )}

      <button onClick={() => setShowInfo(!showInfo)} className="Starter-infoButton">
        i
      </button>

      <div className="social-icons starter">
        <a
          className="twitterIcon start-socials"
          href="https://twitter.com/mashlabs_xyz"
          target="_blank"
          rel="noopener noreferrer"
          title="Mash Labs on X"
        >
          <FaXTwitter />
        </a>
        {/* <a
          className="instagramIcon start-socials"
          href="https://www.instagram.com/mashlabs_xyz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram />
        </a> */}
        {/* --> <a
          href="https://warpcast.com/mashlabs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="farcaster-icon" src="/images/farcaster_icon.svg" title="Mash Labs on Farcaster"></img>
        </a>
      </div>

      <div className="credits">
        <FaRegCopyright size={12} />
        <p>
          Mash Labs 2025
        </p>
      </div>


      {isMobileView && (
        <div className="logo-mob">
          <img
            src="/images/Mash_Highlight_Still.png"
            className="heroImage-mob"
            alt=""
          />
        </div>
      )}
    </main>
  );
} */}


{/* New Landing Page Code Below */}

import React, { useState, useEffect } from "react";
//import "./Starter.scss";
import HeroSection from "../New-Landing/HeroSection";
import Community from "../New-Landing/Community";
import MoreSection from "../New-Landing/MoreSection";
import CommunityFooter from "../New-Landing/CommunityFooter";

export default function Starter() {
  const LINKS = {
    creator: "https://ge20ditxv6v.typeform.com/to/blDeq6w5",
    collector: "https://ge20ditxv6v.typeform.com/to/kNKjKwGm",
  };

  // ✅ Default fallback content (SAFE OPTION)
  const defaultLandingContent = {
    documents: [
      {
        sectionId: "heroSection",
        content: {
          tagline:
            "Browse a curated library of world-class creators. Mash their best work to create rare NFTs that grow in value as the artists do."
        }
      },
      {
        sectionId: "creatorsSection",
        content: {
          items: [
            { description: "Launch your music and visual works with ease, including perks for fans" },
            { description: "Mash's decentralized protocol gives you provenance & ownership over your work forever" },
            { description: "Get paid directly to your wallet whenever your work is minted as an NFT on Mash" }
          ]
        }
      },
      {
        sectionId: "collectorsSection",
        content: {
          items: [
            { description: "Discover local and global emerging artists while investing in their limited edition digital collectibles" },
            { description: "Personalize your music discovery with the art you resonate with" },
            { description: "Promote your limited edition collectibles" }
          ]
        }
      }
    ]
  };

  const [landingContent, setLandingContent] = useState(defaultLandingContent);

  // ✅ Fetch API
  useEffect(() => {
    fetch("https://api.mashlabs.xyz/site-text/mashLabsLanding")
      .then(res => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then(data => {
        if (data?.documents?.length > 0) {
          setLandingContent(data);
        }
      })
      .catch(err => {
        console.log("Using fallback content:", err.message);
      });
  }, []);

  const scrollToFeaturedCollection = () => {
    const communitySection = document.getElementById('community-section');
    communitySection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="">
      {/* Hero Section */}
      <HeroSection 
        landingContent={landingContent} 
        scrollToFeaturedCollection={scrollToFeaturedCollection} 
      />

      {/* Community Section with Links */}
      <div id="community-section" className="md:mt-70 relative z-20">
        <Community 
          landingContent={landingContent} 
          creatorLink={LINKS.creator}
          collectorLink={LINKS.collector}
        />
      </div>

      {/* More Section */}
      <MoreSection />

      {/* Footer Section */}
      <CommunityFooter />
    </main>
  );
}  

