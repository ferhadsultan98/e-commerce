import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../../Styles/Stores.scss';

// Leaflet marker fix (çünki default icon düzgün görünmür)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Stores = () => {
  const [selectedStore, setSelectedStore] = useState(null);

  const stores = [ /* eyni mağazalar siyahısı burda qalsın */ ];

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
          <div className="storeMapWrapper" style={{ height: '400px', width: '100%', borderRadius: '10px' }}>
            <MapContainer center={mapCenter} zoom={selectedStore ? 14 : 7} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              />
              {selectedStore && (
                <Marker position={[selectedStore.location.lat, selectedStore.location.lng]}>
                  <Popup>
                    <strong>{selectedStore.name}</strong><br />
                    {selectedStore.address}
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
