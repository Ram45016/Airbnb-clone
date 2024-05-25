'use client';
import React from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

// Import marker icons from Leaflet package
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Remove the default icon URL and merge new options
// @ts-ignore
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

// Define the MapProps interface
interface MapProps {
    center?: [number, number]; // Center of the map (optional)
}

// Define the Map component
const Map: React.FC<MapProps> = ({ center }) => {
    return (
        <MapContainer
            center={center || [51, -0.09]} // Default center if not provided
            zoom={center ? 4 : 2} // Zoom level based on center presence
            scrollWheelZoom={false} // Disable scroll wheel zoom
            className="h-[35vh] rounded-lg" 
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* Marker on the map if center is provided */}
            {center && (
                <Marker position={center} /> // Marker position based on center prop
            )}
        </MapContainer>
    );
};

export default Map; // Export the Map component
