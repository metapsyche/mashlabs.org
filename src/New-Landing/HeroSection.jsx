import React from 'react';
import { FiArrowUpRight } from "react-icons/fi";
import "./Hero.css";

const HeroSection = ({ landingContent, scrollToFeaturedCollection }) => {

  const heroData = landingContent?.documents?.find(
    doc => doc.sectionId === "heroSection"
  );

  const title =
    heroData?.content?.title ||
    "Turn Your Eye for Talent into an Asset.";

  const subtitle =
    heroData?.content?.subtitle ||
    "In Emerging Musicians & Artists From Around The World";

  const gif = [
    "/gif/Piano-1.gif",
    "/gif/Lab-2.gif",
    "/gif/tv-crash-3.gif",
    "/gif/screen-4.gif",  
    "/gif/drumming-5.gif",
  ];

  return (
    <section className="hero-container">

      {/* Logo */}
      <div className="mash-logo-container">
        <img
          src="/images/Mash_Highlight_Still.png"
          alt="Mash Logo"
          className="mash-logo"
        />
      </div>

      {/* Join Now Button */}
      <div className="join-button-container">
        <a
          href="https://www.mashlabs.xyz/apply"
          className="join-button"
        >
          JOIN NOW
        </a>
      </div>

      {/* Background */}
      <div className="hero-bg">

        {/* TOP ROW */}
        <div className="top-row">
          {gif.slice(0, 3).map((item, index) => (
            <div key={index} className="gif-card">
              <img src={item} alt="gif" />
            </div>
          ))}
        </div>

        {/* BOTTOM ROW */}
        <div className="bottom-row">

          {/* LEFT GIF */}
          <div className="bottom-gif">
            <img src={gif[3]} alt="gif" />
          </div>

          {/* LOTUS CENTER */}
          <div className="lotus-container">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="lotus-video"
            >
              <source src="/mash-header-2.mp4" type="video/mp4" />
            </video>
          </div>

          {/* RIGHT GIF */}
          <div className="bottom-gif">
            <img src={gif[4]} alt="gif" />
          </div>

        </div>
      </div>

      {/* HERO CONTENT */}
      <div className="hero-content">

        <h1 className="hero-title">
          {title}
        </h1>

        <h2 className="hero-subtitle-2">
          {subtitle}
        </h2>

        <p className="hero-subtitle">
          {heroData?.content?.tagline ||
            "Browse a curated library of world-class creators. Mash their best work to create rare NFTs that grow in value as the artists do."}
        </p>

        <button
          onClick={scrollToFeaturedCollection}
          className="hero-button"
        >
          <span>Learn More</span>

          <div className="button-icon-box">
            <FiArrowUpRight className="text-white text-lg" />
          </div>
        </button>

      </div>

    </section>
  );
};

export default HeroSection;