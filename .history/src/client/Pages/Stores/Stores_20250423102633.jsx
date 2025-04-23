import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import '../../Styles/Stores.scss';

// Fix for default marker icons in Leaflet
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to set map view when selected store changes
function MapController({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

const Stores = () => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [stores, setStores] = useState([
    {
      id: 1,
      name: 'Bakü Merkez Mağaza',
      address: 'Neftçilər Prospekti 153, Bakü, Azerbaijan',
      phone: '+994 12 555 1234',
      workingHours: '09:00 - 21:00',
      location: { lat: null, lng: null }
    },
    {
      id: 2,
      name: 'Gəncə Şubesi',
      address: 'Atatürk Prospekti 245, Gəncə, Azerbaijan',
      phone: '+994 22 555 5678',
      workingHours: '10:00 - 20:00',
      location: { lat: null, lng: null }
    },
    {
      id: 3,
      name: 'Sumqayıt Teknoloji Merkezi',
      address: 'Sülh Küçəsi 10, Sumqayıt, Azerbaijan',
      phone: '+994 18 555 9012',
      workingHours: '10:00 - 20:00',
      location: { lat: null, lng: null }
    },
    {
      id: 4,
      name: 'Lankaran Sahil Mağazası',
      address: 'Sahil Bulvarı 78, Lankaran, Azerbaijan',
      phone: '+994 25 555 3456',
      workingHours: '09:00 - 19:00',
      location: { lat: null, lng: null }
    }
  ]);

  // Function to geocode an address using Nominatim API
  const geocodeAddress = async (address) => {
    try {
      const response = await axios.get('https://nominatim.openstreetmap.org/search', {
        params: {
          q: address,
          format: 'json',
          limit: 1
        }
      });
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
      }
      return null;
    } catch (error) {
      console.error(`Error geocoding address ${address}:`, error);
      return null;
    }
  };

  // Geocode all store addresses when component mounts
  useEffect(() => {
    const fetchCoordinates = async () => {
      const updatedStores = await Promise.all(
        stores.map(async (store) => {
          if (!store.location.lat || !store.location.lng) {
            const coords = await geocodeAddress(store.address);
            return {
              ...store,
              location: coords || { lat: 40.4093, lng: 47.5769 }
            };
          }
          return store;
        })
      );
      setStores(updatedStores);
    };

    fetchCoordinates();
  }, []);

  const handleStoreClick = (store) => {
    setSelectedStore(store);
  };

  // Center of Azerbaijan
  const azerbaijanCenter = [40.4093, 47.5769];
  const defaultZoom = 7;

  // Center and zoom for selected store
  const mapCenter = selectedStore && selectedStore.location.lat && selectedStore.location.lng 
    ? [selectedStore.location.lat, selectedStore.location.lng] 
    : azerbaijanCenter;
  const mapZoom = selectedStore && selectedStore.location.lat && selectedStore.location.lng 
    ? 13 
    : defaultZoom;

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
              center={azerbaijanCenter}
              zoom={defaultZoom}
              className="storeMap"
              style={{ height: '100%', width: '100%' }}
              whenCreated={(map) => {
                setTimeout(() => {
                  map.invalidateSize();
                }, 100);
              }}
            >
              <TileLayer
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapController center={mapCenter} zoom={mapZoom} />
              {stores
                .filter((store) => store.location.lat && store.location.lng)
                .map((store) => (
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

export default Stores;