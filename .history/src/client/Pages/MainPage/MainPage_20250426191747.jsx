import React, { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { app } from '../../../server/server';
import '../../Styles/MainPage.scss';

const MainPage = () => {
  const [leftCurrentImage, setLeftCurrentImage] = useState(0);
  const [rightCurrentImage, setRightCurrentImage] = useState(0);
  const [leftSlides, setLeftSlides] = useState([]);
  const [rightSlides, setRightSlides] = useState([]);
  const [currentLeftSlideIndex, setCurrentLeftSlideIndex] = useState(0);
  const [currentRightSlideIndex, setCurrentRightSlideIndex] = useState(0);

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
      setLeftCurrentImage((prevImage) => {
        const nextImage = prevImage + 1;
        if (nextImage > 2) {
          setCurrentLeftSlideIndex((prevIndex) =>
            (prevIndex + 1) % (leftSlides.length || 1)
          );
          return 0;
        }
        return nextImage;
      });

      setRightCurrentImage((prevImage) => {
        const nextImage = prevImage + 1;
        if (nextImage > 2) {
          setCurrentRightSlideIndex((prevIndex) =>
            (prevIndex + 1) % (rightSlides.length || 1)
          );
          return 0;
        }
        return nextImage;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [leftSlides.length, rightSlides.length]);

  const getCurrentLeftSlideContent = () => {
    if (!leftSlides.length) return { image: '', title: '' };
    const slide = leftSlides[currentLeftSlideIndex];
    if (leftCurrentImage === 0)
      return { image: slide.image1, title: slide.title1 };
    if (leftCurrentImage === 1)
      return { image: slide.image2, title: slide.title2 };
    return { image: slide.image3, title: slide.title3 };
  };

  const getCurrentRightSlideContent = () => {
    if (!rightSlides.length) return { image: '', title: '' };
    const slide = rightSlides[currentRightSlideIndex];
    if (rightCurrentImage === 0)
      return { image: slide.image1, title: slide.title1 };
    if (rightCurrentImage === 1)
      return { image: slide.image2, title: slide.title2 };
    return { image: slide.image3, title: slide.title3 };
  };

  const leftContent = getCurrentLeftSlideContent();
  const rightContent = getCurrentRightSlideContent();

  return (
    <div className="sliderContainer">
      <div className="leftSlider">
        <div className="slider">
          <div
            className="slide"
            style={{ backgroundImage: `url(${leftContent.image})` }}
          >
            <div className="slideContent">{leftContent.title}</div>
          </div>
        </div>
      </div>

      <div className="rightSlider">
        <div className="slider">
          <div
            className="slide"
            style={{ backgroundImage: `url(${rightContent.image})` }}
          >
            <div className="slideContent">{rightContent.title}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;