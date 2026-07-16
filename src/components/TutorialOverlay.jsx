import { useState, useEffect, useRef } from "react";
import "./TutorialOverlay.scss";
import tut from "/images/tut.png";
import tutCard from "/images/tutCard.png";
import sound from "/images/sound.png";
import unselected from "/images/tut-non.png";
import arrow from "/images/pngwing.com.png";

export default function TutorialOverlay({ onComplete }) {
    const [step, setStep] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const tutLeftRef = useRef(null);
    const tutRightUpFirstCardRef = useRef(null);
    const tutLeftAgainRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const steps = [
        {
            id: 1,
            title: "Welcome to Mashboard!",
            description: "This is where you can preview and mash audio and video.",
            contentPosition: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
            mobileContentPosition: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
        },
        {
            id: 2,
            title: "These are Visuals",
            description: "Select a visual to get started.",
            highlightRef: tutRightUpFirstCardRef,
            contentPosition: { top: "20%", left: "45%" },
            mobileContentPosition: { top: "57%", left: "20%" },
        },
        {
            id: 3,
            description: "Your selected visual will be visible on the preview panel",
            highlightRef: tutLeftRef,
            contentPosition: { top: "40%", left: "30%" },
            mobileContentPosition: { top: "65%", left: "10%" },
        },
        {
            id: 4,
            title: "This is the sound panel",
            description: "Select a track to make a Mash",
            highlightRef: tutLeftAgainRef,
            contentPosition: { top: "70%", left: "45%" },
            mobileContentPosition: { top: "55%", left: "10%" },
        },
        {
            id: 5,
            title: "Try different combinations of visuals and sounds",
            description: "Once done, click ‘Mash’ and make it your own!",
            highlightRef: tutLeftRef,
            contentPosition: { top: "45%", left: "30%" },
            mobileContentPosition: { top: "60%", left: "10%" },
        },
    ];

    const currentStep = steps.find((s) => s.id === step);

    function nextStep() {
        if (step < steps.length) {
            setStep(step + 1);
        }
    }

    useEffect(() => {
        // Handle screen resize
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        document.querySelectorAll(".tut-main .more").forEach((el) => {
            el.classList.remove("more");
        });
        if (currentStep?.highlightRef?.current) {
            currentStep.highlightRef.current.classList.add("more");
        }
    }, [step, currentStep]);

    return (
        <div className="tutorialOverlay">
            <div className="tut-main">
                <div ref={tutLeftRef} className="tut-left">
                    <div className="left-img-div">
                        <img src={tut} alt="" />
                    </div>
                    <button
                        className="btn mash-btn"
                        onClick={onComplete}

                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        style={{
                            color: "black",
                            border: "none",
                            cursor: step === 5 ? "pointer" : "",
                            backgroundColor:
                                step === 5
                                    ? (isHovered ? "#64ffda" : "white")
                                    : step === 3
                                        ? "grey"
                                        : "",
                            transition: "background-color 0.1s", // Smooth transition for hover
                        }}
                    >
                        Make A Mash
                    </button>
                    <div className="left-con">
                        <h1>Collection Details</h1>
                        <div className="left-con-text">
                            <h4>Artist Name</h4>
                            <p>Lil Neon x Slim Shady</p>
                        </div>
                        <div className="left-con-text">
                            <h4>Art Name</h4>
                            <p>Neon x Rap God</p>
                        </div>
                    </div>
                </div>

                <div className="tut-right">
                    <div className="tut-r-up">
                        <div ref={tutRightUpFirstCardRef} className="tut-card">
                            <img src={tutCard} alt="" />
                        </div>
                        <div className="tut-card">
                            <img src={unselected} alt="" />
                        </div>
                        <div className="tut-card">
                            <img src={unselected} alt="" />
                        </div>
                        <div className="tut-card">
                            <img src={unselected} alt="" />
                        </div>
                    </div>

                    <hr className="sep" />
                    <div className="tut-r-up">
                        <div ref={tutLeftAgainRef} className="tut-card">
                            <img src={sound} alt="" />
                        </div>
                        <div className="tut-card">
                            <img src={sound} alt="" />
                        </div>
                        <div className="tut-card">
                            <img src={sound} alt="" />
                        </div>
                        <div className="tut-card">
                            <img src={sound} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="tutorialContent">
                <div
                    className="con-tut"
                    style={{
                        ...(isMobile
                            ? currentStep?.mobileContentPosition
                            : currentStep?.contentPosition),
                        position: "absolute",
                        width: isMobile ? "80%" : "20%",
                    }}
                >
                    <h2>{currentStep.title}</h2>
                    <p>{currentStep.description}</p>
                    {step < steps.length && (
                        <button
                            className="button mint tut-btn"
                            onClick={nextStep}
                            style={{ marginTop: "10px", border: "none" }}
                        >
                            Next
                        </button>
                    )}
                </div>
                {step === 5 && (
                    <img
                        src={arrow}
                        alt="arrow"
                        className="arrow-icon"
                        style={{
                            position: "absolute",
                            top:isMobile?"50%":"62%", // Adjust based on where you want the arrow vertically
                            left:isMobile?"10%":"30%", // Adjust to align horizontally with the "Mash" button
                            transform: isMobile
                                ? "translate(-50%, -50%) rotate(230deg) scaleX(-1)"
                                : "translate(-50%, -50%) rotate(140deg) scaleX(-1)",
                            width: "85px",
                            height: "auto",
                            filter: "invert(1)",
                            zIndex: 10, // Ensure it appears above other elements
                        }}
                    />
                )}
            </div>
        </div>
    );
}
