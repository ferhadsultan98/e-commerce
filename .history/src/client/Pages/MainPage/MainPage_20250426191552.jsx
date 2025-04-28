import React, { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { app } from '../../../server/server';
import '../../Styles/MainPage.scss';

const MainPage = () => {
  const [leftCurrentSlide, setLeftCurrentSlide] = useState(0);
  const [rightCurrentSlide, setRightCurrentSlide] = useState(0);
  const [leftSlides, setLeftSlides] = useState([]);
  const [rightSlides, setRightSlides] = useState([]);

  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribeLeft = onSnapshot(
      collection(db, 'leftSlides'),
      (snapshot) => {
        const slidesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLeftSlides(slidesData);
      },
      (error) => {
        toast.error('Failed to fetch left slides!');
        console.error('Fetch left slides error:', error);
      }
    );

    const unsubscribeRight = onSnapshot(
      collection(db, 'rightSlides'),
      (snapshot) => {
        const slidesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRightSlides(slidesData);
      },
      (error) => {
        toast.error('Failed to fetch right slides!');
        console.error('Fetch right slides error:', error);
      }
    );

    return () => {
      unsubscribeLeft();
      unsubscribeRight();
    };
  }, [db]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLeftCurrentSlide((prevSlide) => (prevSlide + 1) % (leftSlides.length || 1));
      setRightCurrentSlide((prevSlide) => (prevSlide + 1) % (rightSlides.length || 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [leftSlides.length, rightSlides.length]);

  return (
    <div className="sliderContainer">
      <div className="leftSlider">
        <div
          className="slider"
          style={{ transform: `translateX(-${leftCurrentSlide * 100}%)` }}
        >
          {leftSlides.map((slide) => (
            <div key={slide.id} className="slide">
              <div className="slideImages">
                <img src={slide.image1} alt={`${slide.title} 1`} className="slideImage" />
                <img src={slide.image2} alt={`${slide.title} 2`} className="slideImage" />
                <img src={slide.image3} alt={`${slide.title} 3`} className="slideImage" />
              </div>
              <div className="slideContent">{slide.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rightSlider">
        <div
          className="slider"
          style={{ transform: `translateX(-${rightCurrentSlide * 100}%)` }}
        >
          {rightSlides.map((slide) => (
            <div key={slide.id} className="slide">
              <div className="slideImages">
                <img src={slide.image1} alt={`${slide.title} 1`} className="slideImage" />
                <img src={slide.image2} alt={`${slide.title} 2`} className="slideImage" />
                <img src={slide.image3} alt={`${slide.title} 3`} className="slideImage" />
              </div>
              <div className="slideContent">{slide.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;