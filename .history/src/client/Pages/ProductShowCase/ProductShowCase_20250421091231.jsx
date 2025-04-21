
import React, { useEffect, useRef } from 'react';
import './TechJourney.scss';

const milestones = [
  {
    id: 1,
    year: 2020,
    title: 'First Quantum Chip',
    description: 'Revolutionary processing power unleashed.',
    image: 'https://via.placeholder.com/200x200?text=Quantum',
  },
  {
    id: 2,
    year: 2022,
    title: 'Holo Display Launch',
    description: '3D visuals that redefine screens.',
    image: 'https://via.placeholder.com/200x200?text=Holo',
  },
  {
    id: 3,
    year: 2024,
    title: 'AI Ecosystem',
    description: 'Seamless integration with smart tech.',
    image: 'https://via.placeholder.com/200x200?text=AI',
  },
  {
    id: 4,
    year: 2025,
    title: 'Eco Revolution',
    description: 'Sustainable tech for a greener future.',
    image: 'https://via.placeholder.com/200x200?text=Eco',
  },
];

const TechJourney = () => {
  const journeyRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const nodes = document.querySelectorAll('.milestoneNode');
      nodes.forEach((node) => {
        const rect = node.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.9 && rect.bottom >= 0;
        if (isVisible) {
          node.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="techJourney">
      <div className="journeyContainer">
        <h2 className="journeyTitle">Our Tech Evolution</h2>
        <div className="journeyPath" ref={journeyRef}>
          <div className="pathLine"></div>
          {milestones.map((milestone) => (
            <div key={milestone.id} className="milestoneNode">
              <div className="nodeCircle"></div>
              <div className="milestoneCard">
                <img src={milestone.image} alt={milestone.title} className="cardImage" />
                <h3 className="cardYear">{milestone.year}</h3>
                <h4 className="cardTitle">{milestone.title}</h4>
                <p className="cardDescription">{milestone.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechJourney;
```