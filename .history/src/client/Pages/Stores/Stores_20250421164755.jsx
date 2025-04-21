import React, { useState } from 'react';
import '../../Styles/Stores.scss';

const StorePage = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  
  const stores = [
    {
      id: 1,
      name: 'Bakü Merkez Mağaza',
      address: 'Neftçilər Prospekti 153, Bakü',
      phone: '+994 12 555 1234',
      workingHours: '09:00 - 21:00',
      location: {
        lat: 40.3791,
        lng: 49.8530
      }
    },
    {
      id: 2,
      name: 'Gəncə Şubesi',
      address: 'Atatürk Prospekti 245, Gəncə',
      phone: '+994 22 555 5678',
      workingHours: '10:00 - 20:00',
      location: {
        lat: 40.6827,
        lng: 46.3609
      }
    },
    {
      id: 3,
      name: 'Sumqayıt Teknoloji Merkezi',
      address: 'Sülh Küçəsi 10, Sumqayıt',
      phone: '+994 18 555 9012',
      workingHours: '10:00 - 20:00',
      location: {
        lat: 40.5856,
        lng: 49.6317
      }
    },
    {
      id: 4,
      name: 'Lankaran Sahil Mağazası',
      address: 'Sahil Bulvarı 78, Lankaran',
      phone: '+994 25 555 3456',
      workingHours: '09:00 - 19:00',
      location: {
        lat: 38.7546,
        lng: 48.8510
      }
    }
  ];

  const handleStoreClick = (store) => {
    setSelectedStore(store);
  };

  // Google Maps URL with Azerbaijan centered
  const mapSrc = selectedStore
    ? `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${selectedStore.location.lat},${selectedStore.location.lng}&zoom=15`
    : 'https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=40.1431,47.5769&zoom=7';

  return (
    <div className="storePage">
      <div className="storePageContainer">
        <h1 className="storePageTitle">Mağazalarımız</h1>
        <p className="storePageSubtitle">Aşağıdaki mağazalarımızdan sizə ən yaxın olanını seçin</p>

        <div className="storeLocations">
          {stores.map((store) => (
            <div 
              key={store.id} 
              className={`storeCard ${selectedStore && selectedStore.id === store.id ? 'storeCardActive' : ''}`}
              onClick={() => handleStoreClick(store)}
            >
              <h3 className="storeCardTitle">{store.name}</h3>
              <div className="storeCardDetails">
                <div className="storeCardDetail">
                  <span className="storeCardIcon">📍</span>
                  <span>{store.address}</span>
                </div>
                <div className="storeCardDetail">
                  <span className="storeCardIcon">📞</span>
                  <span>{store.phone}</span>
                </div>
                <div className="storeCardDetail">
                  <span className="storeCardIcon">🕒</span>
                  <span>{store.workingHours}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="storeMapContainer">
          <h2 className="storeMapTitle">
            {selectedStore ? `${selectedStore.name} - Xəritədə göstər` : 'Bütün Mağazalar'}
          </h2>
          <div className="storeMapWrapper">
            <iframe
              className="storeMap"
              src={mapSrc}
              title="Store Locations"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;