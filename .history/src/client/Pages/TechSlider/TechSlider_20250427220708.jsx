import React, {useEffect, useRef } from "react";
import "../../Styles/TechSlider.scss";



const TechLogoSlider = () => {
  const sliderRef = useRef(null);
  
  const logos = [
    { id: 1, name: 'Blackview', src: 'https://via.placeholder.com/150x80?text=Blackview' },
    { id: 2, name: 'Sony', src: 'https://via.placeholder.com/150x80?text=Sony' },
    { id: 3, name: 'Philips', src: 'https://via.placeholder.com/150x80?text=Philips' },
    { id: 4, name: 'Gorenje', src: 'https://via.placeholder.com/150x80?text=Gorenje' },
    { id: 5, name: 'Canon', src: 'https://via.placeholder.com/150x80?text=Canon' },
    { id: 6, name: 'Lenovo', src: 'https://via.placeholder.com/150x80?text=Lenovo' },
    { id: 7, name: 'Motorola', src: 'https://via.placeholder.com/150x80?text=Motorola' },
    { id: 8, name: 'Rowenta', src: 'https://via.placeholder.com/150x80?text=Rowenta' },
    { id: 9, name: 'Moulinex', src: 'https://via.placeholder.com/150x80?text=Moulinex' },
    { id: 10, name: 'WMF', src: 'https://via.placeholder.com/150x80?text=WMF' },
    // Duplicate first few logos for seamless loop
    { id: 11, name: 'Blackview', src: 'https://via.placeholder.com/150x80?text=Blackview' },
    { id: 12, name: 'Sony', src: 'https://via.placeholder.com/150x80?text=Sony' },
    { id: 13, name: 'Philips', src: 'https://via.placeholder.com/150x80?text=Philips' },
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    let animationId;
    let startTime;
    const duration = 15000; // Complete loop time in ms
    const sliderWidth = slider.scrollWidth / 2;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      
      const scrollPos = progress * sliderWidth;
      slider.scrollLeft = scrollPos;
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="techLogoSliderWrapper">
      <div 
        ref={sliderRef}
        className="techLogoSliderContainer"
      >
        {logos.map(logo => (
          <div 
            key={logo.id} 
            className="techLogoItem"
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="techLogoImage"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default TechLogoSlider;
