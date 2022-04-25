import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import faChevronLeft from '../../img/img/chevron-left.svg'
import PropTypes from 'prop-types';
import '../sidebar.scss';
import '../inputs.scss';
import '../button.scss'

const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState("");
  const [value, setValue] = useState('need');

  const [phone_number, setPhoneNumber] = useState();
  const [full_name, setFullName] = useState();
  const [location, setLocation] = useState();
  const [type, setType] = useState();
  const [description, setDescription] = useState();
  const [terms_and_c, setTandC] = useState(false);
  const [error, setError] = useState({
    phone_number : false,
    full_name: false,
    location:false,
    type: false,
    description: false
  })

  // Function that adjusts state to open or close sidebar by adding or removing the "open" class
  const sidebarTrigger = () => {
    if (sidebar) {
      setSidebar("")

    } else {
      setSidebar("open")
    }
  }
  const handleChange = (e) => {
    setValue(e.target.value);
    setType(e.target.value)
  }

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
    if(!any_errors){
      let data = {
        phone_number:phone_number,
        full_name: full_name,
        location: location,
        type: type,
        description: description
      }
      axios.post('/new_need', data)
      .then(res => {
        props.getNeeds()
      })
      .catch(err=>{
        console.log(err)
      })
    }


  }
  const new_resource = e=>{
    e.preventDefault()
    const any_errors = checkErrors()
    if(!any_errors){
      let data = {
        phone_number:phone_number,
        full_name: full_name,
        location: location,
        type: type,
        description: description
      }
      axios.post('/new_resource', data)
      .then(res => {
        props.getResources()
      })
      .catch(err=>{
        console.log(err)
      })
    }


  }
  return (
    <div className={["sidebar_right "] + sidebar} id="sideBarRight">

      <div className="sidebar_right--tab">
        <div className="sidebar_right--tab--trigger" onClick={sidebarTrigger}>
          <span>{props.title}</span>
          <i className="circle"><img src={faChevronLeft} /></i>

        </div>
      </div>

      <div className="sidebar_right--panel container">
        <h3>I have a:</h3>
        <select value={value} onChange={handleChange}>
          <option value="need">Need</option>
          <option value="resource">Resource</option>
        </select>
        {/**Need form */}
        {value === "need" ?
          <form onSubmit={new_need}>
            <label>Phone number</label>
            <input className={error['phone_number'] ? 'text-field error': 'text-field'} onChange={e => { setPhoneNumber(e.target.value) }} type="text" id="phone_number" placeholder='Phone Number' /><br />
            <label>Full name</label>
            <input className={error['full_name'] ? 'text-field error': 'text-field'}  onChange={e => { setFullName(e.target.value) }} type="text" id="full_name" placeholder='Full Name' /><br />
            <label>location</label>
            <input className={error['location'] ? 'text-field error': 'text-field'}  onChange={e => { getLocation() }} value={ location ? location[0] + ","+location[1] : ""} type="text" id="location" placeholder='Location / Address *' /><br />
            <label>Need type:</label>
            <select className={error['type'] ? 'select-need error': 'select-need'} name="type" value={value} onChange={handleChange}>
              <option value="Shelter">Shelter</option>
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Communications">Communications (Airtime / data)</option>
              <option value="Electricity">Electricity (charging)</option>
            </select><br />
            <label>Need description</label>
            <textarea className={error['description'] ? 'error': ''} onChange={e => { setDescription(e.target.value) }} name="" rows="4" cols="">  </textarea>
            <div className='d-flex'>
              <input className=''  type="checkbox" id="checkbox1" name="checkbox1" onChange={e => { setTandC(e.target.checked) }} />
              <span>I agree to making my
                mobile number public to those wanting to reach out to me, and theses term's and conditions. </span>
            </div>
            <button onClick={new_need} type='submit'>Submit</button>
          </form>
          :
          <form onSubmit={new_resource}>
            <label>Phone number</label>
            <input className={error['phone_number'] ? 'text-field error': 'text-field'} onChange={e => { setPhoneNumber(e.target.value) }} type="text" id="phone_number" placeholder='Phone Number' /><br />
            <label>Full name</label>
            <input className={error['full_name'] ? 'text-field error': 'text-field'} onChange={e => { setFullName(e.target.value) }} type="text" id="full_name" placeholder='Full Name' /><br />
            <label>location</label>
            <input className={error['location'] ? 'text-field error': 'text-field'} onChange={e => { getLocation() }} value={ location ? location[0] + ","+location[1] : ""} type="" id="location" placeholder='Location / Address *' /><br />
            <label>Resource type:</label>
            <select className={error['type'] ? 'select-resource error': 'select-resource'} value={value} onChange={handleChange}>
              <option value="Shelter">Shelter</option>
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Communications">Communications (Airtime / data)</option>
              <option value="Electricity">Electricity (charging)</option>
            </select>
            <label>Resource description</label>
            <textarea className={error['description'] ? 'error': ''} onChange={e => { setDescription(e.target.value) }} name="" rows="4" cols="">  </textarea>
            <div className='d-flex'>
              <input className='' type="checkbox" id="checkbox1" name="checkbox1" onChange={e => { setTandC(e.target.checked) }} />
              <span>I agree to making my
                mobile number public to those wanting to reach out to me, and theses term's and conditions. </span>
            </div>
            <button type='submit' onClick={new_resource} disabled={terms_and_c}>Submit</button>
          </form>

        }
      </div>
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