import React, { useEffect, useState } from "react";
import axios from "axios";
import { stores as allStores } from "../../api/mockData"; 
import StoreMap from "./StoreMap";
import { Search } from 'lucide-react';

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
               <StoreMap
                    stores={filteredStores}
                    activeStore={activeStore}
                    initialCenter={cityCenter}
                />
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
          </div>
             
        
    </div>
  );
};

export default StoreLocator;
