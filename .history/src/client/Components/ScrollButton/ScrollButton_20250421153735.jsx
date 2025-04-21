import React from 'react';
import '../../Styles/ScrollButton.scss';

const ScrollButton = () => {
  const handleScroll = () => {
    const scrollStep = (timestamp) => {
      const start = performance.now();
      const duration = 1000; // Animasyon süresi (ms)
      const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

      const step = () => {
        const progress = Math.min((performance.now() - start) / duration, 1);
        const easing = easeInOutQuad(progress);
        window.scrollTo(0, easing * (document.body.scrollHeight - window.innerHeight));

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    requestAnimationFrame(scrollStep);
  };

  return (
    <button className="scroll-button" onClick={handleScroll}>
      Scroll Down
    </button>
  );
};

export default ScrollButton;