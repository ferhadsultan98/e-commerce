import React, { useEffect, useState } from 'react';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { app } from '../../../server/server';
import '../../Styles/MainPage.scss';

const MainPage = () => {
  const [leftCurrentSlide, setLeftCurrentSlide] = useState(0);
  const [rightCurrentSlide, setRightCurrentSlide] = useState(0);
  const [leftImageIndices, setLeftImageIndices] = useState({});
  const [rightImageIndices, setRightImageIndices] = useState({});
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
        // Initialize image indices for new slides
        setLeftImageIndices((prev) => {
          const newIndices = { ...prev };
          slidesData.forEach((slide) => {
            if (!(slide.id in newIndices)) {
              newIndices[slide.id] = 0;
            }
          });
          return newIndices;
        });
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
        // Initialize image indices for new slides
        setRightImageIndices((prev) => {
          const newIndices = { ...prev };
          slidesData.forEach((slide) => {
            if (!(slide.id in newIndices)) {
              newIndices[slide.id] = 0;
            }
          });
          return newIndices;
        });
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

  // Outer slider transition (between slides)
  useEffect(() => {
    const interval = setInterval(() => {
      setLeftCurrentSlide((prevSlide) => (prevSlide + 1) % (leftSlides.length || 1));
      setRightCurrentSlide((prevSlide) => (prevSlide + 1) % (rightSlides.length || 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [leftSlides.length, rightSlides.length]);

  // Inner carousel transition (between images within each slide)
  useEffect(() => {
    const interval = setInterval(() => {
      setLeftImageIndices((prev) => {
        const newIndices = { ...prev };
        leftSlides.forEach((slide) => {
          newIndices[slide.id] = (newIndices[slide.id] + 1) % 3; // Cycle through 0, 1, 2
        });
        return newIndices;
      });
      setRightImageIndices((prev) => {
        const newIndices = { ...prev };
        rightSlides.forEach((slide) => {
          newIndices[slide.id] = (newIndices[slide.id] + 1) % 3; // Cycle through 0, 1, 2
        });
        return newIndices;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [leftSlides, rightSlides]);

  const getImageAndTitle = (slide, index) => {
    const images = [slide.image1, slide.image2, slide.image3];
    const titles = [slide.title1, slide.title2, slide.title3];
    return { image: images[index], title: titles[index] };
  };

  return (
    <div className="sliderContainer">
      <div className="leftSlider">
        <div
          className="slider"
          style={{ transform: `translateX(-${leftCurrentSlide * 100}%)` }}
        >
          {leftSlides.map((slide) => (
            <div key={slide.id} className="slide">
              <div className="imageCarousel">
                <div
                  className="carouselInner"
                  style={{
                    transform: `translateX(-${leftImageIndices[slide.id] * 100}%)`,
                  }}
                >
                  {[0, 1, 2].map((index) => {
                    const { image, title } = getImageAndTitle(slide, index);
                    return (
                      <div key={index} className="carouselItem">
                        <img src={image} alt={title} className="carouselImage" />
                        <div className="slideContent">{title}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
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
              <div className="imageCarousel">
                <div
                  className="carouselInner"
                  style={{
                    transform: `translateX(-${rightImageIndices[slide.id] * 100}%)`,
                  }}
                >
                  {[0, 1, 2].map((index) => {
                    const { image, title } = getImageAndTitle(slide, index);
                    return (
                      <div key={index} className="carouselItem">
                        <img src={image} alt={title} className="carouselImage" />
                        <div className="slideContent">{title}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;