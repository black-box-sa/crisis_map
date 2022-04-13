import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, defaultMarker } from 'react-leaflet'
import * as L from "leaflet";
//import Sidebar_left from "./sidbar/sidebar";
import Sidebar_left from "./sidebar";
import Footer_thin from "./Footer_thin";
import image from './map-marker-alt.svg'
import 'leaflet/dist/leaflet.css'

const Map = () => {
    const [needs, setNeeds] = useState([])
    const [assists, setAssists] = useState([])
    const [need, setNeed] = useState()
    const [user_type, setUserType] = useState('need')
    const [type, setType] = useState('need')
    const [resources, setResources] = useState([])
    const [sidebar, setSidebar] = useState(""); 


    const icon = new L.Icon({
        iconUrl: image,
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40]
    });

    const sidebarTrigger = () => {
        if (sidebar) {
          setSidebar("")
    
        } else {
          setSidebar("open")
        }
        setUserType('need')
      }

    const needInfo = id =>{
        let data = needs.filter(value=>{
            return(
                value.id === id
            )
        })
        getAssist(id)
        setNeed(data[0])
        setUserType('want-to-assist')
        setType('need')
        setSidebar("open")
        console.log('needInfo', data)
    }

    const resourceInfo = id =>{
        let data = resources.filter(value=>{
            return(
                value.id === id
            )
        })
        //getAssist([])
        setNeed(data[0])
        setUserType('want-to-assist')
        setType('resource')
        setSidebar("open")
        console.log('resourceInfo', data)
    }


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

    const getAssist = (id)=>{
        axios.get(`/assists/${id}`)
        .then(res=>{
            console.log('resources',res.data)
            setAssists(res.data)
        })
    }

    useEffect(()=>{
        getNeeds()
        getResources()
    },[])
    return (
        <div className="leaflet-container">
            <Sidebar_left sidebar={sidebar} sidebarTrigger={sidebarTrigger} getResources={getResources} getNeeds={getNeeds} need={need} type={type} user_type={user_type} setUserType={setUserType} assists={assists} getAssist={getAssist} />
        <MapContainer center={[-28.5305539, 30.8958242]} zoom={8}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {
                needs.map((need, index)=>{
                    return(
                        <Marker position={[ need.lat, need.long]} icon={icon}  key={index}
                        eventHandlers={{
                            click: (e) => {
                              console.log('marker clicked', e)
                              needInfo(need.id)
                            },
                          }}
                        />

                    )
                })
            }
            {
                resources.map((need, index)=>{
                    return(
                        <Marker position={[ need.lat, need.long]} key={index} icon={icon} 
                        eventHandlers={{
                            click: (e) => {
                              resourceInfo(need.id)
                            },
                          }}
                        />

                    )
                })
            }
        </MapContainer>
        <Footer_thin />

        </div>
    )
}
export default Map;