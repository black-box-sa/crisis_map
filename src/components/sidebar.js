import React, { useState } from 'react';
import axios from 'axios';
import Geocode from "react-geocode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import GoogleInput from './googleInput';
import './sidebar.scss';
import './inputs.scss';
import './button.scss'

Geocode.setApiKey("AIzaSyAsICHbBOfdz4fNJzAYWigBM7oI0hR9Iu8");
Geocode.setLanguage("en");
Geocode.enableDebug();

const Sidebar = (props) => {
  
  //check if any assists have been logged in
  const [logged, setLogged] = useState(false); 

  /**change template states*/
  const [value, setValue] = useState('want-to-assist');
  const [fields, setFields]= useState({});
  const [loading, setLoading] = useState(false);

  const [phone_number_assist, setPhoneNumberAssist] = useState();
  const [full_name_assist, setFullNameAssist] = useState();

  const [phone_number, setPhoneNumber] = useState();
  const [full_name, setFullName] = useState();
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [type, setType] = useState('Shelter');
  const [description, setDescription] = useState();
  const [terms_and_c, setTandC] = useState(false);
  const [error, setError] = useState({
    phone_number : false,
    full_name: false,
    location:false,
    type: false,
    description: false
  })

  const checkErrors = ()=>{
    let err = error;
    if(phone_number){
      err['phone_number'] = false
    }
    else{
      err['phone_number'] = true
    }

    if(full_name){
      err['full_name'] = false
    }
    else{
      err['full_name'] = true
    }

    if(location){
      err['location'] = false
    }
    else{
      err['location'] = true
    }

    if(type){
      err['type'] = false
    }
    else{
      err['type'] = true
    }


    if(description){
      err['description'] = false
    }
    else{
      err['description'] = true
    }

    setError(err)
    return err.phone_number && err.full_name && err.location && err.type && err.description && terms_and_c
  }
  const savePosition = position =>{
    setLocation([position.coords.latitude.toString(), position.coords.longitude.toString()] )
  }
  const getLocation = ()=>{
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(savePosition);
    }
    else{
      alert("Geolocation is not supported by this browser.")
    }
  }
  const new_need = e=>{
    e.preventDefault()
    const any_errors = checkErrors()
    if(phone_number && full_name && location && type && terms_and_c){
      setLoading(true)
      let data = {
        phone_number:phone_number,
        full_name: full_name,
        location: location,
        type: type,
        description: description
      }
      axios.post('/new_need', data)
      .then(res => {
        console.log(res)
        props.getNeeds()
        setLoading(false)
      })
      .catch(err=>{
        console.log(err)
        setLoading(false)
      })
    }
    else{
      alert('fill all the fields')
    }


  }
  const new_resource = e=>{
    e.preventDefault()
    setLoading(true)
    const any_errors = checkErrors()
    if(phone_number && full_name && location && type && terms_and_c){
      let data = {
        phone_number:phone_number,
        full_name: full_name,
        location: location,
        type: type,
        description: description
      }
      axios.post('/new_resource', data)
      .then(res => {
        console.log(res)
        props.getResources()
        setLoading(false)
      })
      .catch(err=>{
        console.log(err)
        setLoading(false)
      })
    }
    else{
      alert('fill all the fields')
      setLoading(false)
    }


  }
  const new_assists = e=>{
    e.preventDefault()
    //const any_errors = checkErrors()
    if(phone_number_assist && full_name_assist && terms_and_c ){
      setLoading(true)
      let data = {
        phone_number:phone_number_assist,
        full_name: full_name_assist,
        need_id: props.need.id,
      }
      axios.post('/new_assist', data)
      .then(res => {
        console.log(res)
        props.getAssist(props.need.id)
        setLoading(false)
      })
      .catch(err=>{
        console.log(err)
        setLoading(false)
      })
    }
    else{
      alert("missing field")
    }


  }

  // Function that adjusts state to open or close sidebar by adding or removing the "open" class

  const handleChange = (e) => {
    setValue(e.target.value);
  }
  const getLocation_ = (location) => {
    // var fields = fields;
    // fields["location"] = location;
    // setFields(fields)
    console.log('location', location)
    setAddress(location.label)
    Geocode.fromAddress(location.label).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
        setLocation([lat, lng])
      },
      (error) => {
        console.error(error);
      }
    )

  }
  return (
    <div className={["sidebar_right "] + props.sidebar} id="sideBarleft">

      <div className="sidebar_right--tab">
        <div className="sidebar_right--tab--trigger" onClick={props.sidebarTrigger}>
          <span>{props.title}</span>
          <i className="circle"><FontAwesomeIcon icon={faChevronLeft} /></i>

        </div>
      </div>

      <div className="sidebar_right--panel container">
        
        {props.user_type === 'need' ?
          <div>
                <h3>I have a:</h3>
                <select className='select-need'  onChange={e=>{props.setUserType(e.target.value)}}>
                  <option value="need">Need</option>
                  <option value="resource">Resource</option>
                </select>
                </div>
                :props.user_type === 'resource' ?
                <div>
                  <h3>I have a:</h3>
                  <select className='select-resource' onChange={e=>{props.setUserType(e.target.value)}}>
                    <option value="need">Need</option>
                    <option value="resource">Resource</option>
                  </select>
                </div>
                :''
        }
        {/**Need form */}
        {props.user_type === "need" ?
          <form onSubmit={new_need}>
            <label>Phone number</label>
            <input className={error['phone_number'] ? 'text-field error': 'text-field'} onChange={e => { setPhoneNumber(e.target.value) }} type="number" id="name" placeholder='Phone Number' /><br />
            <label>Full name</label>
            <input className={error['full_name'] ? 'text-field error': 'text-field'}  onChange={e => { setFullName(e.target.value) }} type="text" id="name" placeholder='Full Name' /><br />
            <label>Use address or GPS location</label>
            <div class='gps-container'>
             <GoogleInput address={address} getLocation={getLocation_} />
             <button onClick={getLocation}>Use GPS</button>
             </div>
            <label>Need type:</label>
            <select className={error['type'] ? 'select-need error': 'select-need'} onChange={e=>{setType(e.target.value)}}>
              <option value="Shelter">Shelter</option>
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Communications">Communications (Airtime / data)</option>
              <option value="Electricity">Electricity (charging)</option>
            </select><br />
            <label>Need description</label>
            <textarea className={error['description'] ? 'error': ''} onChange={e => { setDescription(e.target.value) }} name="" rows="4" cols="">  </textarea>
            <div className='terms-box'>
              <input onChange={e => { setTandC(e.target.checked) }}  className='' type="checkbox" id="checkbox1" name="checkbox1"  />
              <span>I agree to making my
                mobile number public to those wanting to reach out to me, as mentioned in this <a class="privacy-link" target="blank" href="/Black-Box_Privacy_Policy_April22v1.pdf">privacy policy</a>. </span>
            </div>
            <button onClick={new_need} class="submit green" type='submit' disabled={loading}>{loading ? "Submitting..." : 'Submit'}</button>
          </form>
          : props.user_type === "resource" ?
          <form onSubmit={new_resource}>
            <label>Phone number</label>
            <input className={error['phone_number'] ? 'text-field error': 'text-field'} onChange={e => { setPhoneNumber(e.target.value) }}   type="text" id="name" placeholder='Phone Number' /><br />
            <label>Full name</label>
            <input className={error['full_name'] ? 'text-field error': 'text-field'}  onChange={e => { setFullName(e.target.value) }} type="text" id="name" placeholder='Full Name' /><br />
            <label>Use address or GPS location</label>
             <div class='gps-container'>
             <GoogleInput address={address} getLocation={getLocation_} />
             <button onClick={getLocation}>Use GPS</button>
             </div>
            <label>Resource type:</label>
            <select className={error['type'] ? 'select-resource error': 'select-resource'} onChange={e=>{setType(e.target.value)}}>
              <option value="Shelter">Shelter</option>
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Communications">Communications (Airtime / data)</option>
              <option value="Electricity">Electricity (charging)</option>
            </select><br />
            <label>Resource description</label>
            <textarea className={error['description'] ? 'error': ''} onChange={e => { setDescription(e.target.value) }}  name="" rows="4" cols="">  </textarea>
            <div className='terms-box'>
              <input type="checkbox" id="checkbox1" name="checkbox1" onChange={e => { setTandC(e.target.checked) }} />
              <span>I agree to making my
                mobile number public to those wanting to reach out to me, as mentioned in this <a class="privacy-link" target="blank" href="/Black-Box_Privacy_Policy_April22v1.pdf">privacy policy</a>. </span>
            </div>
            <button onClick={new_resource}  class="submit green" type='submit' disabled={loading}> {loading ? "Submitting..." : 'Submit'} </button>
          </form>
           : props.user_type === "want-to-assist" ?
          <div className='filled-in--container'>
            <label className={props.type === 'need' ? 'tag tag--need' : 'tag tag--resource'}  >{props.type === 'need' ? 'Need' : "Resource" } </label>
             <h1>{props.type === 'need' ? 'Need' : "Resource" }  Type:</h1>
             <p>{props.need ? props.need.description : ""}</p>
             {props.type === 'need' ? '' : 
             <>
             <label><strong>Logged by:</strong></label><br/>
             <label>{props.need ? props.need.full_name : ""}</label><br/><br/>
             </> } 
           <label><strong>Phone number</strong></label>
           <div className='filled-in'>
           <span >{props.need ? props.need.phone_number : ""}</span><br />
            </div>
            <label><strong>Location</strong></label>
           <div className='filled-in'>
           <span>{props.need ? props.need.lat + ", "+props.need.long : ""}</span><br />
           </div>
           {props.type === 'need' ? <label><strong>Assistance logged</strong></label> :""}
           
           {props.type === 'need' && !props.assists.length > 0 ?
                <div className='filled-in empty'>
                <span>No Assistance Logged</span><br />
                </div>
                :
                <div className='filled-in contacts'>
                <ol>
                  {
                    props.type === 'need' && props.assists.map(assist=>{
                      return(
                        <li>
                        <p><strong>{assist.full_name}</strong></p>
                        <p>{assist.phone_number}</p>
                      </li>
                      )
                    })
                  }
                </ol>
              </div>
           }

          {props.type === 'need' ? <a onClick={() => props.setUserType('assist')}>I am assisting / have assisted</a> : "" }
           
           </div>
       :
         <form onSubmit={new_assists}>
         {/* <label className='tag tag--resource'>Resource</label> */}
        <h1>Thank you</h1>
        <p>We would like to log your assistance to create a record of who's assisting this need.</p>
      <label>Phone number</label>
      <input className='text-field filled-in' onChange={e=>{setPhoneNumberAssist(e.target.value)}} type="text" id="name" placeholder='Phone Number' /><br />
      <label>Full name</label>
            <input className='text-field' onChange={e=>{setFullNameAssist(e.target.value)}} type="text" id="name" placeholder='Full Name' /><br />
      <div className='terms-box'>
              <input className='' type="checkbox" id="checkbox1" name="checkbox1" onChange={e=>{setTandC(e.target.checked)}} />
              <span>I agree to making my
                mobile number public to those wanting to reach out to me, as mentioned in this <a class="privacy-link" target="blank" href="/Black-Box_Privacy_Policy_April22v1.pdf">privacy policy</a>. </span>
            </div>
      <button type='submit' className='log-assist' onClick={new_assists} disabled={loading}>{loading ? "Submitting..." : 'Log assist'} </button>
    </form>
        }
      </div>

      <button class="log-new red" type='button' onClick={props.sidebarTrigger}>Log New</button>
    </div>

  );
}
export default Sidebar;

Sidebar.propTypes = {
  /**
   * Title text for the modal
   */
  title: PropTypes.string,
  /**
   * Accepts children components
   */
  children: PropTypes.element,
  /**
   * Accepts content as well, if preffered over children
   */
  content: PropTypes.string
};