import React, { useEffect, useState } from "react";
import axios from "axios";
import Geocode from "react-geocode";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import Papa from 'papaparse';
import * as L from "leaflet";
//import Sidebar_left from "./sidbar/sidebar";
import Sidebar_left from "./sidebar";
import Footer_thin from "./Footer_thin";
import needMarker from './map-marker-alt-red.svg';
import exclamation from './exclamation-triangle.svg';
import resourceMarker from './map-marker-alt-green.svg';
import assistedMarker from './assisted.svg';
import FilterBar from './filterbar'
import google_link from './data/harzard.csv'
import 'leaflet/dist/leaflet.css'

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_APIKEY);
Geocode.setLanguage("en");
Geocode.enableDebug();
//const google_link = 'https://drive.google.com/file/d/1EDUPswJQWhveDVfOwnU25lJ-xoDiFpvP/view?usp=sharing'

const CapeTownMap = () => {
  const [center, setCenter] = useState([-33.92626920481366, 18.79999763557369])
  const [needs, setNeeds] = useState([])
  const [harzard, setHarzard] = useState([])
  const [assists, setAssists] = useState([])
  const [assisted, setAssisted] = useState([])
  const [need, setNeed] = useState()
  const [user_type, setUserType] = useState('need')
  const [type, setType] = useState('need')
  const [resources, setResources] = useState([])
  const [sidebar, setSidebar] = useState("");
  const [address, setAddress] = useState("")

  const [toggleNeed, setToggleNeed] = useState(true)
  const [toggleResources, setToggleResources] = useState(true)
  const [toggleAssisted, setToggleAssisted] = useState(true)
  const [toggleHazard, setToggleHazard] = useState(true)
  const [toggleShelter, setToggleShelter] = useState(true)
  const [toggleFood, setToggleFood] = useState(true)
  const [toggleClothing, setToggleClothing] = useState(true)
  const [toggleSanitation, setToggleSanitation] = useState(true)
  const [toggleCommunications, setToggleCommunications] = useState(true)
  const [toggleElecricity, setToggleElecricity] = useState(true)
  const [toggleOther, setToggleOther] = useState(true)
  const [toggleMissing, setToggleMissing] = useState(true)
  const [toggleWater, setToggleWater] = useState(true)

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

  const harzard_icon = new L.Icon({
    iconUrl: exclamation,
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40]
  });

  const updateData = (result) => {
    let new_harzard = []
    const data = result.data;
    data.map(item => {
      new_harzard.push({
        coordinates: [item['latitude'], item['longitude']],
        date: new Date(item['date']),
        type: item['type'],
        description: item['description'],
        status: item['status']
      })
    })
    setHarzard(data)
    console.log('harzard', data)
  }
  const hazardData = () => {
    Papa.parse(google_link, {
      header: true,
      download: true,
      skipEmptyLines: true,
      // Here this is also available. So we can call our custom class method
      complete: updateData
    });
  }

  console.log(center)

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

  const needHelpTrigger = () => {
    if (sidebar) {
      setSidebar("")

    } else {
      setSidebar("open")
    }
    setUserType('need')
  }
  const canHelpTrigger = () => {
    if (sidebar) {
      setSidebar("")

    } else {
      setSidebar("open")
    }
    setUserType('resource')
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
  }

  const harzardInfo = id =>{
        //getAssist([])
        setNeed(harzard[id])
        setUserType('want-to-assist')
        setType('harzard')
        setSidebar("open")
        convertCoordinatesToAddress(harzard[id].latitude, harzard[id].longitude)
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
  }


  const getNeeds = () => {


    axios.get(`/assists`)
      .then(response => {
        let arr_assisted = []
        let ass = response.data
        for (let i = 0; i < ass.length; i++) {
          let current = ass[i]
          if (current['need_id']) {
            arr_assisted.push(current['need_id'].toString())
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
        setResources(res.data)
      })
  }

  const getAssist = (id) => {
    axios.get(`/assists/${id}`)
      .then(res => {
        //console.log('resources', res.data)
        setAssists(res.data)
      })
  }

  useEffect(() => {
    getNeeds()
    getResources()
   // hazardData()
  }, [])

  const bounds = [
    [center[0] - 0.1, center[1] - 0.1],
    [center[0] + 0.1, center[1] + 0.1],
  ];

  return (
    <div className="leaflet-container">
      <Sidebar_left setCenter={setCenter} needInfo={needInfo} sidebar={sidebar} assist_address={address} sidebarTrigger={sidebarTrigger} needHelpTrigger={needHelpTrigger} canHelpTrigger={canHelpTrigger} getResources={getResources} openLastNeeds={openLastNeeds} getNeeds={getNeeds} need={need} type={type} user_type={user_type} setUserType={setUserType} assists={assists} getAssist={getAssist} />
      <FilterBar
        toggleNeed={toggleNeed}
        setToggleNeed={setToggleNeed}
        toggleResources={toggleResources}
        setToggleResources={setToggleResources}
        toggleAssisted={toggleAssisted}
        setToggleAssisted={setToggleAssisted}
        toggleHazard={toggleHazard}
        setToggleHazard={setToggleHazard}
        toggleShelter={toggleShelter}
        setToggleShelter={setToggleShelter}
        toggleFood={toggleFood}
        setToggleFood={setToggleFood}
        toggleClothing={toggleClothing}
        setToggleClothing={setToggleClothing}
        toggleSanitation={toggleSanitation}
        setToggleSanitation={setToggleSanitation}
        toggleCommunications={toggleCommunications}
        setToggleCommunications={setToggleCommunications}
        toggleElecricity={toggleElecricity}
        setToggleElecricity={setToggleElecricity}
        toggleMissing={toggleMissing}
        setToggleMissing={setToggleMissing}
        toggleWater={toggleWater}
        setToggleWater={setToggleWater}
        toggleOther={toggleOther}
        setToggleOther={setToggleOther}
      />
      <MapContainer center={center} zoom={10} maxBounds={bounds} maxBoundsViscosity={1} maxZoom={10} minZoom={10} >
    
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {
           toggleHazard && harzard && harzard.map((need, index) => {
             return (
               <Marker position={[need.latitude, need.longitude]} icon={harzard_icon} key={index}
                 eventHandlers={{
                   click: (e) => {
                     harzardInfo(index)
                   },
                 }}
               />
             )
          })
        }
        {
          toggleNeed && toggleShelter && needs.map((need, index) => {
            if (need.type === 'Shelter' && !need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={need_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />

              )
            }
          })
        }
        {
          toggleAssisted && toggleShelter && needs.map((need, index) => {
            if (need.type === 'Shelter' && need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={assisted_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />

              )
            }
          })
        }
        {
          toggleNeed && toggleFood && needs.map((need, index) => {
            if (need.type === 'Food' && !need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={need_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }
        {
          toggleAssisted && toggleFood && needs.map((need, index) => {
            if (need.type === 'Food' && need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={assisted_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }


        {
          toggleNeed && toggleClothing && needs.map((need, index) => {
            if (need.type === 'Clothing' && !need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={need_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />

              )

            }
          })
        }
        {
          toggleAssisted && toggleClothing && needs.map((need, index) => {
            if (need.type === 'Clothing' && need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={assisted_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />

              )

            }
          })
        }


        {
          toggleNeed && toggleSanitation && needs.map((need, index) => {
            if (need.type === 'Sanitation' && !need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={need_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />
              )

            }
          })
        }
        {
          toggleAssisted && toggleSanitation && needs.map((need, index) => {
            if (need.type === 'Sanitation' && need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={assisted_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />
              )

            }
          })
        }


        {
          toggleNeed && toggleCommunications && needs.map((need, index) => {
            if (need.type === 'Communications' && !need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={need_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />
              )

            }
          })
        }
        {
          toggleAssisted && toggleCommunications && needs.map((need, index) => {
            if (need.type === 'Communications' && need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={assisted_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />
              )

            }
          })
        }


        {
          toggleNeed && toggleElecricity && needs.map((need, index) => {
            if (need.type === 'Electricity' && !need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={need_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }
        {
          toggleAssisted && toggleElecricity && needs.map((need, index) => {
            if (need.type === 'Electricity' && need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={assisted_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }



        {
          toggleNeed && toggleMissing && needs.map((need, index) => {
            if (need.type === 'Missing Person/s' && !need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={need_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />

              )

            }
          })
        }
        {
          toggleAssisted && toggleMissing && needs.map((need, index) => {
            if (need.type === 'Missing Person/s' && need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={assisted_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />

              )

            }
          })
        }

        {
          toggleNeed && toggleWater && needs.map((need, index) => {
            if (need.type === 'Water' && !need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={need_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }
        {
          toggleAssisted && toggleWater && needs.map((need, index) => {
            if (need.type === 'Water' && need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={assisted_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }




        {
          toggleNeed && toggleOther && needs.map((need, index) => {
            if (need.type === 'Other' && !need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={need_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }
        {
          toggleAssisted && toggleOther && needs.map((need, index) => {
            if (need.type === 'Other' && need.assisted) {
              return (
                <Marker position={[need.lat, need.long]} icon={assisted_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      needInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }


        {
          toggleResources && toggleFood && resources.map((need, index) => {
            if (need.type === 'Food') {
              return (
                <Marker position={[need.lat, need.long]} icon={resource_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      resourceInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }

        {
          toggleResources && toggleClothing && resources.map((need, index) => {
            if (need.type === 'Clothing') {
              return (
                <Marker position={[need.lat, need.long]} icon={resource_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      resourceInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }

        {
          toggleResources && toggleSanitation && resources.map((need, index) => {
            if (need.type === 'Sanitation') {
              return (
                <Marker position={[need.lat, need.long]} icon={resource_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      resourceInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }

        {
          toggleResources && toggleCommunications && resources.map((need, index) => {
            if (need.type === 'Communications') {
              return (
                <Marker position={[need.lat, need.long]} icon={resource_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      resourceInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }

        {
          toggleResources && toggleElecricity && resources.map((need, index) => {
            if (need.type === 'Electricity') {
              return (
                <Marker position={[need.lat, need.long]} icon={resource_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      resourceInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }

        {
          toggleResources && toggleMissing && resources.map((need, index) => {
            if (need.type === 'Missing Person/s') {
              return (
                <Marker position={[need.lat, need.long]} icon={resource_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      resourceInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }

        {
          toggleResources && toggleWater && resources.map((need, index) => {
            if (need.type === 'Water') {
              return (
                <Marker position={[need.lat, need.long]} icon={resource_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      resourceInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }
        {
          toggleResources && toggleOther && resources.map((need, index) => {
            if (need.type === 'Other') {
              return (
                <Marker position={[need.lat, need.long]} icon={resource_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      resourceInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }

        {
          toggleResources && toggleShelter && resources.map((need, index) => {
            if (need.type === 'Shelter') {
              return (
                <Marker position={[need.lat, need.long]} icon={resource_icon} key={index}
                  eventHandlers={{
                    click: (e) => {
                      resourceInfo(need.id)
                    },
                  }}
                />
              )
            }
          })
        }
      </MapContainer>
      <Footer_thin />

    </div>
  )
}
export default CapeTownMap;