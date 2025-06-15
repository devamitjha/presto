import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './LocateUs.scss';

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const mumbaiCoordinates = [19.0760, 72.8777];

const LocateUsMap = () => {
  return (
    <div className="locate-us-container">
      <div className="locate-content">
        <div className="map-section">
          <MapContainer
            center={mumbaiCoordinates}
            zoom={10}
            scrollWheelZoom={false}
            style={{ height: '400px', width: '100%', borderRadius: '12px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={mumbaiCoordinates}>
              <Popup>Mumbai - Our Store Location</Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="info-section">
            <div className="content">
                <h3>We are now at 30+ Locations</h3>
                <p>Best in Class Dry Cleaning for Luxury and Branded Clothes, You know who has been the face of the town.</p>  
          </div>
          <button className="find-stores-btn">FIND STORES</button>        
        </div>
      </div>
    </div>
  );
};

export default LocateUsMap;
