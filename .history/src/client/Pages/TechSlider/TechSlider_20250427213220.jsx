import React, { useState, useEffect, useRef } from "react";
import "../../Styles/TechSlider.scss";

const logos = [
  'https://via.placeholder.com/200x100?text=Logo1',
  'https://via.placeholder.com/200x100?text=Logo2',
  'https://via.placeholder.com/200x100?text=Logo3',
  'https://via.placeholder.com/200x100?text=Logo4',
  'https://via.placeholder.com/200x100?text=Logo5',
];

const TechLogoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  const techLogos = [
    {
      id: 1,
      name: "TechCorp",
      imgSrc: "src/client/Assets/com.png",
      color: "#3498db",
    },
    {
      id: 2,
      name: "InnovateTech",
      imgSrc:
        "src/client/Assets/com.png",
      color: "#e74c3c",
    },
    {
      id: 3,
      name: "FutureSystems",
      imgSrc: "src/client/Assets/com.png",
      color: "#2ecc71",
    },
    {
      id: 4,
      name: "SmartDevices",
      imgSrc: "src/client/Assets/com.png",
      color: "#f39c12",
    },
    {
      id: 5,
      name: "TechWizards",
      imgSrc:
        "src/client/Assets/com.png",
      color: "#9b59b6",
    },
    {
      id: 6,
      name: "QuantumTech",
      imgSrc: "src/client/Assets/com.png",
      color: "#1abc9c",
    },
    {
      id: 7,
      name: "CyberSolutions",
      imgSrc: "src/client/Assets/com.png",
      color: "#d35400",
    },
    {
      id: 8,
      name: "DataSystems",
      imgSrc: "src/client/Assets/com.png",
      color: "#34495e",
    },
  ];

  const visibleLogos = 4;
  const totalLogos = techLogos.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % (totalLogos - visibleLogos + 1)
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [currentIndex]);

  const handleMouseEnter = () => {
    clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  return (
    <div
      className="techLogoSlider"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={sliderRef}
    >
      <h2 className="techLogoSliderTitle">Our Technology Partners</h2>

      <div className="techLogoSliderContainer">
        <div className="techLogoSliderTrack">
          <div
            className="techLogoSliderLogos"
            style={{ transform: `translateX(-${currentIndex * 25}%)` }}
          >
            {techLogos.map((logo) => (
              <div
                key={logo.id}
                className="techLogoSliderLogoItem"
                style={{ "--hover-color": logo.color }}
              >
                <img
                  src={logo.imgSrc}
                  alt={logo.name}
                  className="techLogoSliderLogo"
                />
                <p className="techLogoSliderLogoName">{logo.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="techLogoSliderIndicators">
        {Array.from({ length: totalLogos - visibleLogos + 1 }).map((_, index) => (
          <button
            key={index}
            className={`techLogoSliderIndicator ${
              currentIndex === index ? "techLogoSliderIndicatorActive" : ""
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TechLogoSlider;