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
  const [flattenedLeftSlides, setFlattenedLeftSlides] = useState([]);
  const [flattenedRightSlides, setFlattenedRightSlides] = useState([]);

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

  // Flatten slides to individual image-title pairs
  useEffect(() => {
    const flattenSlides = (slides) =>
      slides.flatMap((slide) => [
        { id: `${slide.id}-1`, image: slide.image1, title: slide.title1 },
        { id: `${slide.id}-2`, image: slide.image2, title: slide.title2 },
        { id: `${slide.id}-3`, image: slide.image3, title: slide.title3 },
      ]);

    setFlattenedLeftSlides(flattenSlides(leftSlides));
    setFlattenedRightSlides(flattenSlides(rightSlides));
  }, [leftSlides, rightSlides]);

  // Auto-slide interval
  useEffect(() => {
    const interval = setInterval(() => {
      setLeftCurrentSlide((prevSlide) =>
        (prevSlide + 1) % (flattenedLeftSlides.length || 1)
      );
      setRightCurrentSlide((prevSlide) =>
        (prevSlide + 1) % (flattenedRightSlides.length || 1)
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [flattenedLeftSlides.length, flattenedRightSlides.length]);

  return (
    <div className="sliderContainer">
      <div className="leftSlider">
        <div
          className="slider"
          style={{
            transform: `translateX(-${leftCurrentSlide * 100}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {flattenedLeftSlides.map((slide) => (
            <div
              key={slide.id}
              className="slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slideContent">{slide.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="rightSlider">
        <div
          className="slider"
          style={{
            transform: `translateX(-${rightCurrentSlide * 100}%)`,
            transition: 'transform 0.5s ease-in-out',
          }}
        >
          {flattenedRightSlides.map((slide) => (
            <div
              key={slide.id}
              className="slide"
              style={{ backgroundImage: `url(${slide.image})` }}
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