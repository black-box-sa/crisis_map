import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types';
import GoogleInput from './googleInput';
import './sidebar.scss';
import './inputs.scss';
import './button.scss'

const Sidebar = (props) => {
  const [sidebar, setSidebar] = useState(""); 
  //check if any assists have been logged in
  const [logged, setLogged] = useState(false); 
  /**change template states*/
  const [value, setValue] = useState('need');
  const [fields, setFields]= useState({});

  // Function that adjusts state to open or close sidebar by adding or removing the "open" class
  const sidebarTrigger = () => {
    if (sidebar) {
      setSidebar("")
    } else {
      setSidebar("open")
    }
  }
  const logNewSidebarTrigger = () => {
    if (sidebar) {
      setValue('need')

    } else {
      setSidebar("open")
    }
  }
  const handleChange = (e) => {
    setValue(e.target.value);
  }
  const getLocation = (location) => {
    var fields = fields;
    fields["location"] = location;
    setFields(fields)
  }
  return (
    <div className={["sidebar_right "] + sidebar} id="sideBarleft">

      <div className="sidebar_right--tab">
        <div className="sidebar_right--tab--trigger" onClick={sidebarTrigger}>
          <span>{props.title}</span>
          <i className="circle"><FontAwesomeIcon icon={faChevronLeft} /></i>

        </div>
      </div>

      <div className="sidebar_right--panel container">
        
        {value === 'need' ?
          <div>
                <h3>I have a:</h3>
                <select className='select-need' value={value} onChange={handleChange}>
                  <option value="need">Need</option>
                  <option value="resource">Resource</option>
                </select>
                </div>
                :value === 'resource' ?
                <div>
                  <h3>I have a:</h3>
                  <select className='select-resource' value={value} onChange={handleChange}>
                    <option value="need">Need</option>
                    <option value="resource">Resource</option>
                  </select>
                </div>
                :''
        }
        {/**Need form */}
        {value === "need" ?
          <form onSubmit=''>
            <label>Phone number</label>
            <input className='text-field' onChange='' value='' type="number" id="name" placeholder='Phone Number' /><br />
            <label>Full name</label>
            <input className='text-field' onChange='' value='' type="text" id="name" placeholder='Full Name' /><br />
            <label>location</label>
            <div class='gps-container'>
             <GoogleInput getLocation='' />
             <button>Use GPS</button>
             </div>
            <label>Need type:</label>
            <select className='select-need' value={value} onChange={handleChange}>
              <option value="Shelter">Shelter</option>
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Communications">Communications (Airtime / data)</option>
              <option value="Electricity">Electricity (charging)</option>
            </select><br />
            <label>Need description</label>
            <textarea name="" rows="4" cols="">  </textarea>
            <div className='terms-box'>
              <input className='' type="checkbox" id="checkbox1" name="checkbox1" onChange='' />
              <span>I agree to making my
                mobile number public to those wanting to reach out to me, and theses term's and conditions. </span>
            </div>
            <button class="submit green" type='submit'>Submit</button>
          </form>
          : value === "resource" ?
          <form onSubmit=''>
            <label>Phone number</label>
            <input className='text-field' onChange='' value='' type="text" id="name" placeholder='Phone Number' /><br />
            <label>Full name</label>
            <input className='text-field' onChange='' value='' type="text" id="name" placeholder='Full Name' /><br />
            <label>location</label>
             <div class='gps-container'>
             <GoogleInput getLocation='' />
             <button>Use GPS</button>
             </div>
            <label>Resource type:</label>
            <select className='select-resource' value={value} onChange={handleChange}>
              <option value="Shelter">Shelter</option>
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Sanitation">Sanitation</option>
              <option value="Communications">Communications (Airtime / data)</option>
              <option value="Electricity">Electricity (charging)</option>
            </select><br />
            <label>Resource description</label>
            <textarea name="" rows="4" cols="">  </textarea>
            <div className='terms-box'>
              <input className='' type="checkbox" id="checkbox1" name="checkbox1" onChange='' />
              <span>I agree to making my
                mobile number public to those wanting to reach out to me, and theses term's and conditions. </span>
            </div>
            <button class="submit green" type='submit'>Submit</button>
          </form>
           : value === "want-to-assist" ?
          <div className='filled-in--container'>
            <label className='tag tag--need'>Need</label>
             <h1>Need Type:</h1>
             <p>Need description text
              in a short paragraph that
              ends in an ellipses...</p>
           <label><strong>Phone number</strong></label>
           <div className='filled-in'>
           <span >Phone number</span><br />
            </div>
            <label><strong>location</strong></label>
           <div className='filled-in'>
           <span>location</span><br />
           </div>
           <label><strong>Assistance logged</strong></label>
           {logged ?
                <div className='filled-in empty'>
                <span>No Assistance Logged</span><br />
                </div>
                :
                <div className='filled-in contacts'>
                <ol>
                    <li>
                      <p><strong>test</strong></p>
                      <p>033 464 3742</p>
                    </li>
                    <li>
                      <p><strong>test</strong></p>
                      <p>033 464 3742</p>
                    </li>
                </ol>
              </div>
           }


           <a onClick={() => setValue('assist')}>I want to assist</a>
           </div>
       :
         <form onSubmit=''>
         {/* <label className='tag tag--resource'>Resource</label> */}
        <h1>Thank you</h1>
        <p>We would like to log your assistance to create a record of who's assisting this need.</p>
      <label>Phone number</label>
      <input className='text-field filled-in' onChange='' value='' type="text" id="name" placeholder='Phone Number' /><br />
      <label>Full name</label>
            <input className='text-field' onChange='' value='' type="text" id="name" placeholder='Full Name' /><br />
      <div className='terms-box'>
              <input className='' type="checkbox" id="checkbox1" name="checkbox1" onChange='' />
              <span>I agree to making my
                mobile number public to those wanting to reach out to me, and theses term's and conditions. </span>
            </div>
      <a className='log-assist'>Log assist</a>
    </form>
        }
      </div>

      <button class="log-new red" type='button' onClick={logNewSidebarTrigger}>Log New</button>
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