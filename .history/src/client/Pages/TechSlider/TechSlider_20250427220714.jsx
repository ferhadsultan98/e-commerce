import React, {useEffect, useRef } from "react";
import "../../Styles/TechSlider.scss";



const TechLogoSlider = () => {
  const sliderRef = useRef(null);
  
  const logos = [
    { id: 1, name: 'Blackview', src: 'src/client/Assets/com.png' },
    { id: 2, name: 'Sony', src: 'src/client/Assets/com.png' },
    { id: 3, name: 'Philips', src: 'src/client/Assets/com.png' },
    { id: 4, name: 'Gorenje', src: 'src/client/Assets/com.png' },
    { id: 5, name: 'Canon', src: 'src/client/Assets/com.png' },
    { id: 6, name: 'Lenovo', src: 'src/client/Assets/com.png' },
    { id: 7, name: 'Motorola', src: 'src/client/Assets/com.png' },
    { id: 8, name: 'Rowenta', src: 'src/client/Assets/com.png' },
    { id: 9, name: 'Moulinex', src: 'src/client/Assets/com.png' },
    { id: 10, name: 'WMF', src: 'src/client/Assets/com.png' },
    { id: 11, name: 'Blackview', src: 'src/client/Assets/com.png' },
    { id: 12, name: 'Sony', src: 'src/client/Assets/com.png' },
    { id: 13, name: 'Philips', src: 'src/client/Assets/com.png' },
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
