import React, { useState, useEffect } from "react";
import "../../Styles/ScrollButton.scss";
import { FaChevronUp } from "react-icons/fa";

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Butonun görünürlüğünü kontrol et
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    const scrollStep = (timestamp) => {
      const start = performance.now();
      const duration = 800; // Animasyon süresi (ms)
      const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

      const step = () => {
        const progress = Math.min((performance.now() - start) / duration, 1);
        const easing = easeInOutQuad(progress);
        window.scrollTo(0, (1 - easing) * window.pageYOffset);

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    requestAnimationFrame(scrollStep);
  };

  return (
    <>
      {isVisible && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          <FaChevronUp />
        </button>
      )}
    </>
  );
};

export default ScrollButton;
