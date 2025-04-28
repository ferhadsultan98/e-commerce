import React, { useEffect, useRef } from "react";
import "../../Styles/TechSlider.scss";

const logos = [
  'src/client/Assets/com.png',
  'https://via.placeholder.com/200x100?text=Logo2',
  'https://via.placeholder.com/200x100?text=Logo2',
  'https://via.placeholder.com/200x100?text=Logo3',
  'https://via.placeholder.com/200x100?text=Logo4',
  'https://via.placeholder.com/200x100?text=Logo5',
];

const TechLogoSlider = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    let animationFrame;

    const scroll = () => {
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft -= slider.scrollWidth / 2;
      } else {
        slider.scrollLeft += 1;
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="slider-container">
      <div className="slider" ref={sliderRef}>
        {logos.concat(logos).map((logo, index) => (
          <div className="slide" key={index}>
            <img src={logo} alt={`Logo ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechLogoSlider;