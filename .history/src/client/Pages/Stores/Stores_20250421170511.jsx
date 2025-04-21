import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import shadow from 'leaflet/dist/images/marker-shadow.png';
import '../../Styles/Stores.scss';

// Leaflet icon düzəlişi (yoxsa marker görünmür)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: icon,
  shadowUrl: shadow,
});

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

  const mapCenter = selectedStore
    ? [selectedStore.location.lat, selectedStore.location.lng]
    : [40.1431, 47.5769]; // Azərbaycan mərkəz

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
            <MapContainer center={mapCenter} zoom={selectedStore ? 14 : 7} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              />
              {selectedStore && (
                <Marker position={[selectedStore.location.lat, selectedStore.location.lng]}>
                  <Popup>
                    <strong>{selectedStore.name}</strong><br />
                    {store.address}
                  </Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
