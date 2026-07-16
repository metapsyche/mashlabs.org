import "./ScrollableContainer2.scss";
import { Button } from "@mui/base";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

export default function ScrollableContainer2({ children }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [dots, setDots] = useState([]);
  const [activeDot, setActiveDot] = useState(0);

  const checkScrollButtonsState = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth);
  };

  const scrollLeft = () => {
    if (activeDot > 0) {
      handleDotClick(activeDot - 1);
    }
  };

  const scrollRight = () => {
    if (activeDot < dots.length - 1) {
      handleDotClick(activeDot + 1);
    }
  };

  const handleDotClick = (index) => {
    const { scrollWidth, clientWidth } = scrollContainerRef.current;
    const scrollTo = (scrollWidth - clientWidth) * (index / (dots.length - 1));
    scrollContainerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  const updateActiveDot = () => {
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const activeIndex = Math.round(
      (scrollLeft / (scrollWidth - clientWidth)) * (dots.length - 1)
    );
    setActiveDot(activeIndex);
  };

  useEffect(() => {
    const updateDots = () => {
      const scrollableContainer = scrollContainerRef.current;
      if (scrollableContainer) {
        const totalDots = Math.ceil(
          scrollableContainer.scrollWidth / scrollableContainer.clientWidth
        );
        setDots(new Array(totalDots).fill(null));
      }
    };
    
    updateDots();
    checkScrollButtonsState();
    const handleScroll = () => {
      checkScrollButtonsState();
      updateActiveDot();
    };
    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => {
      updateDots();
      checkScrollButtonsState();
    });
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", () => {
        updateDots();
        checkScrollButtonsState();
      });
    };
  }, [dots.length, children]);

  return (
    <div className="scrollableContainer2">
      <div className="scrollControlsContainer">
        <div className="scrollable" ref={scrollContainerRef}>
          {children}
        </div>
        <div className="controls">
          <Button
            className="scrollBtn resButton"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ChevronLeft sx={{ fontSize: 20 }} />
          </Button>
          {/* <div className="dotsContainer">
            {dots.map((_, index) => (
              <span
                key={index}
                className={`dot ${activeDot === index ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
              ></span>
            ))}
          </div> */}
          <Button
            className="scrollBtn resButton"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ChevronRight sx={{ fontSize: 20 }} />
          </Button>
        </div>
      </div>
      <div className="scrollcontrols">
        <Button
          className="scrollBtn"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <ChevronLeft sx={{ fontSize: 25 }} />
        </Button>
        <Button
          className="scrollBtn"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <ChevronRight sx={{ fontSize: 25 }} />
        </Button>
      </div>
    </div>
  );
}
