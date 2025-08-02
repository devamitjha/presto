import React,  { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const ChangeView = ({ center }) => {
  const map = useMap();
  if (center) map.setView(center, 13);
  return null;
};

const ResizeMapFix = () => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 100); // Wait a bit to allow layout to stabilize
  }, [map]);
  return null;
};

const StoreMap = ({ stores, activeStore, initialCenter }) => {
    if (!initialCenter) {
        return <div>Loading map...</div>; // Or show a spinner
    }
  const mapCenter = activeStore
    ? [activeStore.lat, activeStore.lng]
    : initialCenter;

  

  return (
      <MapContainer center={mapCenter} zoom={1} style={{ height: "400px", width: "100%" }}>
          <ResizeMapFix />
      <ChangeView center={mapCenter} />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stores.map((store) => (
        <Marker key={store.id} position={[store.lat, store.lng]}>
          <Popup>{store.name}</Popup>
          <Tooltip>{store.address}</Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default StoreMap;
