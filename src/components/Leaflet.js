import React, { useEffect, useState } from "react";
import axios from "axios";
import Geocode from "react-geocode";
import { MapContainer, TileLayer, Marker, Popup, defaultMarker } from 'react-leaflet'
import * as L from "leaflet";
//import Sidebar_left from "./sidbar/sidebar";
import Sidebar_left from "./sidebar";
import Footer_thin from "./Footer_thin";
import needMarker from './map-marker-alt-red.svg';
import resourceMarker from './map-marker-alt-green.svg';
import assistedMarker from './assisted.svg';
import 'leaflet/dist/leaflet.css'

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_APIKEY);
Geocode.setLanguage("en");
Geocode.enableDebug();

const Map = () => {
  const [center, setCenter] = useState([-29.883333, 31.049999])
  const [needs, setNeeds] = useState([])
  const [assists, setAssists] = useState([])
  const [assisted, setAssisted] = useState([])
  const [need, setNeed] = useState()
  const [user_type, setUserType] = useState('need')
  const [type, setType] = useState('need')
  const [resources, setResources] = useState([])
  const [sidebar, setSidebar] = useState("");
  const [address, setAddress] = useState("")


  const need_icon = new L.Icon({
    iconUrl: needMarker,
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
  });
  const resource_icon = new L.Icon({
    iconUrl: resourceMarker,
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
  });

  const assisted_icon = new L.Icon({
    iconUrl: assistedMarker,
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
  });

  const convertCoordinatesToAddress = (lat, lng) => {
    Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const addres = response.results[0].formatted_address;
        let city, state, country;
        for (let i = 0; i < response.results[0].address_components.length; i++) {
          for (let j = 0; j < response.results[0].address_components[i].types.length; j++) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }
        console.log(city, state, country);
        console.log(addres);
        setAddress(addres)
      },
      (error) => {
        console.error(error);
      }
    );
  }


  const sidebarTrigger = () => {
    if (sidebar) {
      setSidebar("")

    } else {
      setSidebar("open")
    }
  }

  const lognewTrigger = () => {
    if (sidebar) {
      setSidebar("")

    } else {
      setSidebar("open")
    }
    setUserType('need')
  }

  const openLastNeeds = () => {
    needInfo(needs[needs.length])
  }

  const needInfo = id => {
    let data = needs.filter(value => {
      return (
        value.id === id
      )
    })
    getAssist(id)
    setNeed(data[0])
    setUserType('want-to-assist')
    setType('need')
    setSidebar("open")
    convertCoordinatesToAddress(data[0].lat, data[0].long)
    console.log('needInfo', data)
  }

  const resourceInfo = id => {
    let data = resources.filter(value => {
      return (
        value.id === id
      )
    })
    //getAssist([])
    setNeed(data[0])
    setUserType('want-to-assist')
    setType('resource')
    setSidebar("open")
    convertCoordinatesToAddress(data[0].lat, data[0].long)
    console.log('resourceInfo', data)
  }


  const getNeeds = () => {


    axios.get(`/assists`)
      .then(res => {
        let arr_assisted = []
        let ass = res.data
        for (let i = 0; i < ass.length; i++) {
          let current = ass[i]
          if(current){
            arr_assisted.push(current.need_id.toString())
          }
        }

        axios.get('/needs')
          .then(res => {
            let arr = []
            let data = res.data
            for (let i = 0; i < data.length; i++) {
              let current = data[i]
              if (arr_assisted.includes(current.id.toString())) {
                current['assisted'] = true
              }
              else {
                current['assisted'] = false
              }
              arr.push(current)
            }
            console.log('needs', arr)
            setNeeds(arr)
          })
          .catch(err => {
            console.log(err)
          })


      })
      .catch(err => {
        console.log(err)
      })

  }
  const getResources = () => {
    axios.get('/resources')
      .then(res => {
        console.log('resources', res.data)
        setResources(res.data)
      })
  }

  const getAssist = (id) => {
    axios.get(`/assists/${id}`)
      .then(res => {
        console.log('resources', res.data)
        setAssists(res.data)
      })
  }

  const getAssists = () => {
    axios.get(`/assists`)
      .then(res => {
        let arr = []
        let data = res.data
        for (let i = 0; i < data.length; i++) {
          let current = data[i]
          arr.push(current.need_id.toString())
        }
        console.log('assisted', arr)
        setAssisted(arr)
      })
  }

  useEffect(() => {
    getNeeds()
    getResources()
  }, [])
  return (
    <div className="leaflet-container">
      <Sidebar_left setCenter={setCenter} needInfo={needInfo} sidebar={sidebar} assist_address={address} sidebarTrigger={sidebarTrigger} lognewTrigger={lognewTrigger} getResources={getResources} openLastNeeds={openLastNeeds} getNeeds={getNeeds} need={need} type={type} user_type={user_type} setUserType={setUserType} assists={assists} getAssist={getAssist} />
      <MapContainer center={center} zoom={12}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {
          needs.map((need, index) => {
            return (
              <Marker position={[need.lat, need.long]} icon={need.assisted ? assisted_icon : need_icon} key={index}
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
          resources.map((need, index) => {
            return (
              <Marker position={[need.lat, need.long]} key={index} icon={resource_icon}
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