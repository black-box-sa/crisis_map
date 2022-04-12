import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, defaultMarker } from 'react-leaflet'
import * as L from "leaflet";
import Sidebar_left from "./sidbar/sidebar";
//import Sidebar_left from "./sidebar";
import Footer_thin from "./Footer_thin";
import image from './map-marker-alt.svg'
import 'leaflet/dist/leaflet.css'

const Map = () => {
    const [needs, setNeeds] = useState([])
    const [resources, setResources] = useState([])

    const icon = new L.Icon({
        iconUrl: image,
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40]
    });

    const getNeeds = ()=>{
        axios.get('/needs')
        .then(res=>{
            console.log(res.data)
            setNeeds(res.data)
        })
    }
    const getResources = ()=>{
        axios.get('/resources')
        .then(res=>{
            console.log('resources',res.data)
            setResources(res.data)
        })
    }

    useEffect(()=>{
        getNeeds()
        getResources()
    },[])
    return (
        <div className="leaflet-container">
            <Sidebar_left getResources={getResources} getNeeds={getNeeds} />
        <MapContainer center={[ -29.883333, 31.049999]} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                needs.map((need, index)=>{
                    return(
                        <Marker position={[ need.lat, need.long]} icon={icon}  key={index}>
                            <Popup>
                                {need.description}
                            </Popup>
                        </Marker>

                    )
                })
            }
            {
                resources.map((need, index)=>{
                    return(
                        <Marker position={[ need.lat, need.long]} key={index} icon={icon} >
                            <Popup>
                                {need.description}
                            </Popup>
                        </Marker>

                    )
                })
            }
        </MapContainer>
        <Footer_thin />

        </div>
    )
}
export default Map;