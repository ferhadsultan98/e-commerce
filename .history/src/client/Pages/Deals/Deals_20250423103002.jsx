import React from 'react';
import './Deals.scss';

const dealsData = [
  {
    id: 1,
    title: 'Smartphone X Pro',
    image: 'https://via.placeholder.com/300x200?text=Smartphone',
    price: 699,
    originalPrice: 899,
    discount: '22% OFF',
    timer: '23:59:59',
  },
  {
    id: 2,
    title: 'Wireless Earbuds',
    image: 'https://via.placeholder.com/300x200?text=Earbuds',
    price: 99,
    originalPrice: 149,
    discount: '33% OFF',
    timer: '23:59:59',
  },
  {
    id: 3,
    title: '4K Smart TV',
    image: 'https://via.placeholder.com/300x200?text=TV',
    price: 499,
    originalPrice: 699,
    discount: '28% OFF',
    timer: '23:59:59',
  },
  {
    id: 4,
    title: 'Gaming Laptop',
    image: 'https://via.placeholder.com/300x200?text=Laptop',
    price: 1199,
    originalPrice: 1599,
    discount: '25% OFF',
    timer: '23:59:59',
  },
];

const DealCard = ({ deal }) => {
  return (
    <div className="dealCard">
      <img src={deal.image} alt={deal.title} className="dealImage" />
      <div className="dealContent">
        <h3 className="dealTitle">{deal.title}</h3>
        <p className="dealPrice">
          ${deal.price}
          <span className="originalPrice">${deal.originalPrice}</span>
        </p>
        <span className="dealDiscount">{deal.discount}</span>
        <p className="countdownTimer">Deal ends in: {deal.timer}</p>
        <a href="#" className="dealButton">Shop Now</a>
      </div>
    </div>
  );
};

const Deals = () => {
  return (
    <section className="dealsSection">
      <h2 className="sectionTitle">Exclusive Deals</h2>
      <div className="dealsGrid">
        {dealsData.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </section>
  );
};

export default Deals;