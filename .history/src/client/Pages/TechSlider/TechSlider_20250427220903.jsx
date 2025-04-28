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
    const sliderTrack = sliderContainerRef.current.querySelector('.techLogoTrack');
    
    // Clone logos for seamless infinite scroll
    const originalItems = sliderTrack.innerHTML;
    sliderTrack.innerHTML = originalItems + originalItems;
    
    const animateSlider = () => {
      if (sliderTrack.offsetWidth / 2 <= sliderContainerRef.current.scrollLeft) {
        sliderContainerRef.current.scrollLeft = 0;
      } else {
        sliderContainerRef.current.scrollLeft += 1;
      }
    };
    
    // Set interval for continuous movement
    const sliderInterval = setInterval(animateSlider, 20);
    
    return () => {
      clearInterval(sliderInterval);
    };
  }, []);

  return (
    <div className="techLogoSliderWrapper">
      <div 
        ref={sliderContainerRef}
        className="techLogoSliderContainer"
      >
        <div className="techLogoTrack">
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
    </div>
  );
}
export default TechLogoSlider;
