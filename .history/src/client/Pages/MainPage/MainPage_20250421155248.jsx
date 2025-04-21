// MainPage.jsx
import React, { useEffect, useState } from 'react';
import '../../Styles/MainPage.scss';

const MainPage = () => {
  const [leftCurrentSlide, setLeftCurrentSlide] = useState(0);
  const [rightCurrentSlide, setRightCurrentSlide] = useState(0);
  
  const leftSlides = [
    {
      id: 1,
      image: '../clinsrc/Assets/advertise1.png',
      title: 'Premium Laptops - Save 30%'
    },
    {
      id: 2,
      image: '/api/placeholder/800/450',
      title: 'Latest Smartphones - New Models'
    },
    {
      id: 3,
      image: '/api/placeholder/800/450',
      title: 'Gaming Accessories - Spring Sale'
    }
  ];
  
  const rightSlides = [
    {
      id: 1,
      image: '/api/placeholder/400/450',
      title: 'Smart Watches'
    },
    {
      id: 2,
      image: '/api/placeholder/400/450',
      title: 'Wireless Headphones'
    },
    {
      id: 3,
      image: '/api/placeholder/400/450',
      title: 'Smart Home Devices'
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLeftCurrentSlide(prevSlide => (prevSlide + 1) % leftSlides.length);
      setRightCurrentSlide(prevSlide => (prevSlide + 1) % rightSlides.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [leftSlides.length, rightSlides.length]);
  
  return (
    <div className="sliderContainer">
      <div className="leftSlider">
        <div 
          className="slider" 
          style={{transform: `translateX(-${leftCurrentSlide * 100}%)`}}
        >
          {leftSlides.map(slide => (
            <div 
              key={slide.id} 
              className="slide"
              style={{backgroundImage: `url(${slide.image})`}}
            >
              <div className="slideContent">{slide.title}</div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="rightSlider">
        <div 
          className="slider" 
          style={{transform: `translateX(-${rightCurrentSlide * 100}%)`}}
        >
          {rightSlides.map(slide => (
            <div 
              key={slide.id} 
              className="slide"
              style={{backgroundImage: `url(${slide.image})`}}
            >
              <div className="slideContent">{slide.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;