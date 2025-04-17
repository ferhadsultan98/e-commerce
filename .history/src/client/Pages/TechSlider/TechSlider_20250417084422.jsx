// TechLogoSlider.jsx
import React, { useState, useEffect, useRef } from 'react';
import '../../Styles/TechSlider.scss';

const TechLogoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);


  const techLogos = [
    { id: 1, name: 'TechCorp', imgSrc: '/api/placeholder/200/100', color: '#3498db' },
    { id: 2, name: 'InnovateTech', imgSrc: '/api/placeholder/200/100', color: '#e74c3c' },
    { id: 3, name: 'FutureSystems', imgSrc: '/api/placeholder/200/100', color: '#2ecc71' },
    { id: 4, name: 'SmartDevices', imgSrc: '/api/placeholder/200/100', color: '#f39c12' },
    { id: 5, name: 'TechWizards', imgSrc: '/api/placeholder/200/100', color: '#9b59b6' },
    { id: 6, name: 'QuantumTech', imgSrc: '/api/placeholder/200/100', color: '#1abc9c' },
    { id: 7, name: 'CyberSolutions', imgSrc: '/api/placeholder/200/100', color: '#d35400' },
    { id: 8, name: 'DataSystems', imgSrc: '/api/placeholder/200/100', color: '#34495e' },
  ];

  const visibleLogos = 4; 
  const totalLogos = techLogos.length;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalLogos - visibleLogos + 1));
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
      <h2 className="techLogoSlider__title">Our Technology Partners</h2>
      
      <div className="techLogoSlider__container">
       

        <div className="techLogoSlider__track">
          <div 
            className="techLogoSlider__logos" 
            style={{ transform: `translateX(-${currentIndex * 25}%)` }}
          >
            {techLogos.map((logo) => (
              <div 
                key={logo.id} 
                className="techLogoSlider__logoItem"
                style={{ '--hover-color': logo.color }}
              >
                <img 
                  src={logo.imgSrc} 
                  alt={logo.name} 
                  className="techLogoSlider__logo"
                />
                <p className="techLogoSlider__logoName">{logo.name}</p>
              </div>
            ))}
          </div>
        </div>

        
      </div>

      <div className="techLogoSlider__indicators">
        {Array.from({ length: totalLogos - visibleLogos + 1 }).map((_, index) => (
          <button
            key={index}
            className={`techLogoSlider__indicator ${currentIndex === index ? 'techLogoSlider__indicator--active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TechLogoSlider;