import React, { useEffect, useRef, useState } from "react";
import "./GetSet.scss";
import { Opacity } from "@mui/icons-material";

import gsm1 from "/images/gsm1.png";
import gsm2 from "/images/gsm2.png";
import gsm3 from "/images/gsm3.png";
import gsm4 from "/videos/Mash Animated.webm";
import { useNavigate } from "react-router-dom";

const stepsData = [
  {
    number: 1,
    content: "Choose works from the Explore page",
    contentPara: "*click “+” to add to Mashboard",
    image: gsm1,
    color: "linear-gradient(to right, #1B1B1D 0%, #301752 100%)",
    opacity: 0.1,
  },
  {
    number: 2,
    content: "Select an Audio and a Visual you want to “mash” together into a multimedia or solo media digital collectible",
    contentPara: "*click “+” to add to Mashboard",
    image: gsm3,
    color: "linear-gradient(to right, #301752 0%, #49247C 100%)",
    opacity: 0.3,
  },
  {
    number: 3,
    content: "Mix and match your selections in the Mashboard",
    contentPara: "*click “MASH” to confirm your choice",
    image: gsm2,
    color: "linear-gradient(to right, #49247C 0%, #6933B3 100%)",
    opacity: 0.7,
  },
  {
    type: "video",
    number: 4,
    content:
      "Mint your piece as a collaborative multimedia digital collectible to support Creators and become an early adopter in their works",
    contentPara: "",
    video: gsm4,
    color: "linear-gradient(to bottom, #6933B3 0%, #8E3BFF 100%)",
    opacity: 1,
  },
];

const GetSet = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      if (activeStep < 4) {
        setActiveStep(activeStep + 1);
      } else if (activeStep >= 4) {
        setActiveStep(0);
      }
    }, 1700);
    return () => clearInterval(timer);
  }, [activeStep]);



  return (
    <div className="get-set-container">
      <h1 className="get-set-heading">Get, Set, Mash</h1>
      <div className="steps-container">
        {stepsData.map((step, index) => (
          <div key={index} className="step-card">
            <div
              className={`number-card ${
                activeStep >= step.number ? "colored" : ""
              }`}
              style={{
                filter:
                  activeStep >= step.number
                    ? "grayscale(0)"
                    : "grayscale(100%)",
                background: activeStep >= step.number ? step.color : "#1B1B1D",
              }}
            >
              <h1 className={activeStep >= step.number ? "active" : ""}>
                {step.number}
              </h1>
              {step.type == "video" ? (
                <video
                  className={
                    activeStep >= step.number
                      ? "number-card-image activeimg"
                      : "number-card-image"
                  }
                  autoPlay
                  playsInline
                  muted
                  loop
                  src={step.video}
                  alt={`step-${step.number}`}
                />
              ) : (
                <img
                  className={
                    activeStep >= step.number
                      ? "number-card-image activeimg"
                      : "number-card-image"
                  }
                  src={step.image}
                  alt={`step-${step.number}`}
                />
              )}
            </div>
            <div className="step-content">
              <h3>{step.content}</h3>
              <p>{step.contentPara}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="button mint" onClick={() => navigate("/mashboard")}>
        MAKE A MASH
      </button>
    </div>
  );
};

export default GetSet;
