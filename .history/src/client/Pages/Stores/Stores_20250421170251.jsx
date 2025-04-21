import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import '../../Styles/Stores.scss';

const Stores = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [mapKey, setMapKey] = useState(0); // Used to force map rerender when selected store changes
  
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
    setMapKey(prevKey => prevKey + 1); // Force map rerender
  };

  // Default center of Azerbaijan
  const defaultCenter = [40.1431, 47.5769];
  const defaultZoom = 7;

  // Center and zoom for selected store
  const mapCenter = selectedStore ? [selectedStore.location.lat, selectedStore.location.lng] : defaultCenter;
  const mapZoom = selectedStore ? 13 : defaultZoom;

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
            <MapContainer 
              key={mapKey}
              center={mapCenter} 
              zoom={mapZoom} 
              className="storeMap"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {stores.map((store) => (
                <Marker 
                  key={store.id} 
                  position={[store.location.lat, store.location.lng]}
                >
                  <Popup>
                    <div className="markerPopup">
                      <h3>{store.name}</h3>
                      <p>{store.address}</p>
                      <p>{store.phone}</p>
                      <p>{store.workingHours}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;