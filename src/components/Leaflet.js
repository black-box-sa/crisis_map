import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Sidebar_left from "./sidebar";
import Footer_thin from "./Footer_thin";
import 'leaflet/dist/leaflet.css'

const Map = () => {
    return (
        <div className="leaflet-container">
            <Sidebar_left />
        <MapContainer center={[51.505, -0.09]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
        <Footer_thin />

        </div>
    )
}
export default Map;