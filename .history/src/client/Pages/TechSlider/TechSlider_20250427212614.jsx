import React, { useState, useEffect, useRef } from "react";
import "../../Styles/TechSlider.scss";

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
      imgSrc: "/api/placeholder/200/100",
      color: "#f39c12",
    },
    {
      id: 5,
      name: "TechWizards",
      imgSrc:
        "https://scontent.fgyd6-1.fna.fbcdn.net/v/t39.30808-6/299584550_562357032255807_3343331028001858647_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=62_Zp9p76DsQ7kNvwGkfTPN&_nc_oc=AdkNTb-UImfOIoAH6CIPo1inhJESbyM0hE7rI5QRbMI0LH_bm6Y1amitKUuEQIRBLQw&_nc_zt=23&_nc_ht=scontent.fgyd6-1.fna&_nc_gid=48ALSxlblP1Qumr2rTRtFQ&oh=00_AfE-503c9u46_EUZhYbRU1DXxiPLCGFTMjzQiuSXMlOVQw&oe=68096FDB",
      color: "#9b59b6",
    },
    {
      id: 6,
      name: "QuantumTech",
      imgSrc: "/api/placeholder/200/100",
      color: "#1abc9c",
    },
    {
      id: 7,
      name: "CyberSolutions",
      imgSrc: "/api/placeholder/200/100",
      color: "#d35400",
    },
    {
      id: 8,
      name: "DataSystems",
      imgSrc: "/api/placeholder/200/100",
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