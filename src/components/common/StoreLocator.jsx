import React, { useEffect, useState } from "react";
import axios from "axios";
import { stores as allStores } from "../../api/mockData"; 
import { Search } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Mumbai from "../../assets/images/store/Mumbai.jpg";
import Delhi from "../../assets/images/store/Delhi.jpg";
import Bangalore from "../../assets/images/store/Bangalore.jpg";


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
const mumbaiPosition = [19.0760, 72.8777];


const StoreLocator = ({ city }) => {
  const [pincode, setPincode] = useState("");
  const [filteredStores, setFilteredStores] = useState([]);
  const [activeStore, setActiveStore] = useState(null);
  const [cityCenter, setCityCenter] = useState(null);

  // Convert city name to coordinates using Nominatim API
  const fetchCityCoordinates = async () => {
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: city,
          format: "json",
          limit: 1,
        },
      });
      if (res.data.length > 0) {
        const { lat, lon } = res.data[0];
        setCityCenter([parseFloat(lat), parseFloat(lon)]);
      }
    } catch (error) {
      console.error("City geocoding error:", error);
    }
  };

  useEffect(() => {
    fetchCityCoordinates();
  }, [city]);

  const handleSearch = () => {
    const result = allStores.filter(store => store.pincode === pincode);
    setFilteredStores(result);
    setActiveStore(null);
  };

  const handleStoreClick = (store) => {
    setActiveStore(store);
  };

  return (
    <div className="section-map"> 
          <div className="section-store-map">
               <MapContainer center={mumbaiPosition} zoom={13} style={{ height: '600px', width: '100%' }}>
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mumbaiPosition}>
                  <Popup>
                    Mumbai, Maharashtra
                  </Popup>
                </Marker>
              </MapContainer>
          </div>
        
          <div className="section-store-map-input">
            <h4>Find Store Near You</h4>
            <div className="input-container">
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Enter City / Pin-code / Location"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                />
                <button onClick={handleSearch}><Search /></button>
            </div>
            <div className="store-list">
                {filteredStores.length > 0 && (
                    <ul>
                        {filteredStores.map(store => (
                        <li
                            key={store.id}
                                onClick={() => handleStoreClick(store)}
                            style={{
                               
                                backgroundColor: store.id === activeStore?.id ? "#E2FAFC" : "#fff"
                                }}    
                        >
                            <strong>{store.name}</strong>
                            <p>{store.address}</p>
                        </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="alternative">
              <span className="or">Or</span>
              <div className="topStore">
                <div className="store-info">
                  <div className="store-image">
                    <img src={Mumbai} alt="Mumbai Store" width="120" height="120"/>
                  </div>
                  <div className="details">
                    <p>Mumbai</p>
                    <span>4 Stores</span>
                  </div>
                </div>
                <div className="store-info">
                  <div className="store-image">
                    <img src={Delhi} alt="Delhi Store" width="120" height="120"/>
                  </div>
                   <div className="details">
                    <p>Delhi</p>
                    <span>4 Stores</span>
                  </div>
                </div>                
                <div className="store-info">
                  <div className="store-image">
                    <img src={Bangalore} alt="Bangalore Store" width="120" height="120"/>
                  </div>
                   <div className="details">
                    <p>Bangalore</p>
                    <span>4 Stores</span>
                  </div>
                </div>               
              </div>
              <p>When you choose Pressto, you're not just extending the life of your clothes; you're making a conscious choice for the planet too</p>
            </div>
          </div>
             
        
    </div>
  );
};

export default StoreLocator;
