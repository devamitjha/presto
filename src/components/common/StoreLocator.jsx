import React, { useEffect, useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
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
                  <strong>{store["Store Name"]}</strong><br />
                  {store.address || ""}
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

        <ul>
          {filteredStores.map((store, i) => (
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
            >
              <strong>{store["Store Name"]}</strong> - {store.city}, {store.State}
            </li>
          ))}
        </ul>

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
      </div>
    </div>
  );
};

export default StoreLocator;
