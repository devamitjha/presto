import React, { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Link } from "react-router";
import {
  MapPin,
  Building,
  Phone,
  Clock,
  CalendarDays, 
  Navigation,
  Star, StarHalf, Star as StarEmpty
} from "lucide-react";
import Rating from 'react-rating';
import Mumbai from "../../assets/images/store/Mumbai.jpg";
import Delhi from "../../assets/images/store/Delhi.jpg";
import Bangalore from "../../assets/images/store/Bangalore.jpg";
import 'leaflet/dist/leaflet.css';

// Fix for Leaflet icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// MapCenterUpdater to re-center the map
const MapCenterUpdater = ({ lat, lng }) => {
  const map = useMap();

  useEffect(() => {
    if (!isNaN(lat) && !isNaN(lng)) {
      map.setView([lat, lng], 13);
    }
  }, [lat, lng, map]);

  return null;
};


const StoreLocator = () => {
  const [stores, setStores] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [filteredStores, setFilteredStores] = useState([]);
  const [cityStoreCounts, setCityStoreCounts] = useState({});
  const [activeStore, setActiveStore] = useState(null); // ✅ NEW: track clicked store

  // Load CSV
  useEffect(() => {
    const loadCSV = async () => {
      try {
        const response = await axios.get("/data/store_data.csv", {
          responseType: "blob",
        });

        const reader = new FileReader();
        reader.onload = () => {
          Papa.parse(reader.result, {
            header: true,
            skipEmptyLines: true,
            complete: (result) => {
              const data = result.data;
              setStores(data);

              // Unique states
              const uniqueStates = [...new Set(data.map((s) => s.State))];
              setStates(uniqueStates);

              // Count total stores for specific cities
              const countByState = data.reduce((acc, curr) => {
                const state = curr.State;
                if (state) {
                  acc[state] = (acc[state] || 0) + 1;
                }
                return acc;
              }, {});
              setCityStoreCounts(countByState);
            },
          });
        };
        reader.readAsText(response.data);
      } catch (error) {
        console.error("Error fetching CSV:", error);
      }
    };

    loadCSV();
  }, []);

  // When state changes
  useEffect(() => {
    if (selectedState) {
      const filteredCities = [...new Set(
        stores.filter((s) => s.State === selectedState).map((s) => s.city)
      )];
      setCities(filteredCities);
      setSelectedCity("");
      setFilteredStores([]);
      setActiveStore(null); // ✅ reset map center
    }
  }, [selectedState, stores]);

  // When city changes
  useEffect(() => {
    const filtered = stores.filter(
      (s) => s.State === selectedState && s.city === selectedCity
    );
    setFilteredStores(filtered);
  
    if (filtered.length > 0 && filtered[0].Latitude && filtered[0].Longitude) {
      setActiveStore(filtered[0]);
    } else {
      setActiveStore(null);
    }
  }, [selectedCity, selectedState, stores]);

  const defaultPosition = [19.0760, 72.8777];

  // Get coordinates for default city center
  const cityCenterStore = filteredStores.find(
    (store) =>
      store.latitude &&
      store.longitude &&
      !isNaN(parseFloat(store.latitude)) &&
      !isNaN(parseFloat(store.longitude))
  );

  const mapCenter = activeStore && activeStore.latitude && activeStore.longitude
    ? [parseFloat(activeStore.latitude), parseFloat(activeStore.longitude)]
    : cityCenterStore
      ? [parseFloat(cityCenterStore.latitude), parseFloat(cityCenterStore.longitude)]
      : defaultPosition;

  console.log(stores);

  return (
    <div className="section-map">
      <div className="section-store-map">
        <MapContainer
          center={mapCenter}
          zoom={12}
          style={{ height: "600px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Center map on active store or city */}
          <MapCenterUpdater lat={mapCenter[0]} lng={mapCenter[1]} />

          {/* Render valid store markers */}
          {filteredStores
            .filter((store) => store.latitude && store.longitude && !isNaN(store.latitude) && !isNaN(store.longitude))
            .map((store, index) => (
              <Marker
                key={index}
                position={[parseFloat(store.latitude), parseFloat(store.longitude)]}
              >
                <Popup>
                  <strong>{store["place_name"]}</strong><br />
                  {store.address || ""}<br />
                  <strong>Contact: {store["phone"]}</strong>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      </div>

      <div className="section-store-map-input">
        <h4>Find Store Near You</h4>
        <div className="input-container">
          <div className="stateOption">
            <label htmlFor="selectState">Select State</label>
            <select
              id="selectState"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">-- Select State --</option>
              {states.map((state, i) => (
                <option key={i} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="cityOption">
            <label htmlFor="selectCity">Select City</label>
            <select
              id="selectCity"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState}
            >
              <option value="">-- Select City --</option>
              {cities.map((city, i) => (
                <option key={i} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
            {
              filteredStores.length>0 ?             
                <ul className="store-list-dropdown">
                  {filteredStores.map((store, i) => {
                    const formatTime = (time) => {
                      if (!time || time.toLowerCase() === "closed") return "Closed";
                      const [start, end] = time.split("-");
                      const format = (t) => {
                        const [h, m] = t.split(":").map(Number);
                        const ampm = h >= 12 ? "PM" : "AM";
                        const hour = h % 12 || 12;
                        return `${hour.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
                      };
                      return `${format(start)} to ${format(end)}`;
                    };

                    const monToFri = store.Hours_Monday === "Closed" ? "Closed" : formatTime(store.Hours_Monday);
                    const saturday = formatTime(store.Hours_Saturday);
                    const sunday = formatTime(store.Hours_Sunday);

                    return (
                      <li
                        key={i}
                        style={{ cursor: "pointer", marginBottom: "0.5rem" }}
                        onClick={() => {
                          if (
                            store.latitude &&
                            store.longitude &&
                            !isNaN(parseFloat(store.latitude)) &&
                            !isNaN(parseFloat(store.longitude))
                          ) {
                            setActiveStore(store);
                          } else {
                            alert("This store does not have valid coordinates.");
                          }
                        }}
                      >   <div className="city-list-container">        
                            <div className="store-name">
                              <div className="title">{store.place_name}</div>
                              <div className="sub-title">{store.store_location}</div>
                            </div>
                            <p><span className="icon-box"><MapPin size={18} /></span><span className="address">{store.address}</span></p>
                            <p><span className="icon-box"><Building size={18} /></span>City: {store.city}, {store.State}</p>
                            <p><span className="icon-box"><Phone size={18} /></span>Contact: {store.phone}</p>
                            <div className="open-hours">
                              <p><span className="icon-box">
                              <Clock size={18} /></span>
                              <strong>Open Hours:</strong></p>
                              <p><span className="icon-box"><CalendarDays size={16} /></span>Mon to Fri: {monToFri}</p>
                              <p><span className="icon-box"> <CalendarDays size={16} /></span>Sat: {saturday}</p>
                              <p><span className="icon-box"><CalendarDays size={16} /></span>Sun: {sunday}</p>
                            </div>
                            <div className="direction-review">
                              {store.google_review_rating && (
                                <div className="google-review">
                                  <span className="rating-count">Rating:{store.google_review_rating}/{store.google_review_count}</span>                         
                                  <span className="rating-stars">
                                    <Rating
                                      initialRating={parseFloat(store.google_review_rating)}
                                      emptySymbol={<StarEmpty size={16} color="#00a5b8" />} 
                                      fullSymbol={<Star size={16} color="#00a5b8" fill="#00a5b8" />} 
                                      placeholderSymbol={<StarHalf size={16} color="#00a5b8" />}
                                      readonly
                                      fractions={2}
                                    />
                                    </span>
                                </div>                               
                              )}                                      
                              {store.direction && (
                                <div className="direction-link">
                                  <span><Navigation className="inline-block mr-2" size={18} /></span>
                                  <Link to={store.direction} target="_blank">Get Direction</Link>
                                </div>
                              )}       
                            </div>  
                          </div>  
                            
                      </li>
                    );
                  })}
                </ul> :            
                <div className="alternative">
                  <span className="or">Or</span>
                  <div className="topStore">
                    <div className="store-info">
                      <div className="store-image">
                        <img src={Mumbai} alt="Mumbai Store" width="120" height="120" />
                      </div>
                      <div className="details">
                        <p>Mumbai</p>
                        <span>{cityStoreCounts["Maharashtra"] || 0} Stores</span>
                      </div>
                    </div>
                    <div className="store-info">
                      <div className="store-image">
                        <img src={Delhi} alt="Delhi Store" width="120" height="120" />
                      </div>
                      <div className="details">
                        <p>Delhi</p>
                        <span>{cityStoreCounts["Delhi NCR"] || 0} Stores</span>
                      </div>
                    </div>
                    <div className="store-info">
                      <div className="store-image">
                        <img src={Bangalore} alt="Bangalore Store" width="120" height="120" />
                      </div>
                      <div className="details">
                        <p>Karnataka</p>
                        <span>{cityStoreCounts["Karnataka"] || 0} Stores</span>
                      </div>
                    </div>
                  </div>
                  <p>
                    When you choose Pressto, you're not just extending the life of your clothes; you're making a conscious choice for the planet too.
                  </p>
                </div>
            }
      </div>
    </div>
  );
};

export default StoreLocator;
